import axios from "axios";
import { triggerLogout } from "../services/authManager";

const API = axios.create({
  baseURL: import.meta.env.VITE_API_URL || "http://localhost:5000/api",
  withCredentials: true,
  timeout: 15000,
});

// Plain axios instance for refresh requests.
// This avoids the response interceptor and prevents infinite loops.
const refreshClient = axios.create({
  baseURL: import.meta.env.VITE_API_URL || "http://localhost:5000/api",
  withCredentials: true,
  timeout: 15000,
});

let isRefreshing = false;
let failedQueue = [];

const processQueue = (error = null) => {
  failedQueue.forEach(({ resolve, reject }) => {
    if (error) {
      reject(error);
    } else {
      resolve();
    }
  });

  failedQueue = [];
};

/* -------------------------
   REQUEST INTERCEPTOR
-------------------------- */

API.interceptors.request.use(
  (config) => config,
  (error) => Promise.reject(error)
);

/* -------------------------
   RESPONSE INTERCEPTOR
-------------------------- */

API.interceptors.response.use(
  (response) => response,

  async (error) => {
    const originalRequest = error.config || {};

    if (
      error.response?.status !== 401 ||
      originalRequest._retry ||
      originalRequest.url === "/auth/refresh"
    ) {
      return Promise.reject(error);
    }

    originalRequest._retry = true;

    if (isRefreshing) {
      return new Promise((resolve, reject) => {
        failedQueue.push({ resolve, reject });
      }).then(() => API(originalRequest));
    }

    isRefreshing = true;

    try {
      await refreshClient.post("/auth/refresh");

      processQueue();

      return API(originalRequest);
    } catch (refreshError) {
      processQueue(refreshError);

      const hadRefreshCookie =
        document.cookie.includes("deviceId");

      if (hadRefreshCookie) {
        await triggerLogout();
      }

      return Promise.reject(refreshError);

  } finally {
    isRefreshing = false;
  }
  }
);

export default API;