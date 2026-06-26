import API from "../api/axios";

export const logoutUser = async () => {
  try {
    await API.post("/auth/logout");
  } catch (error) {
    console.error("Logout request failed:", error);
  }
};