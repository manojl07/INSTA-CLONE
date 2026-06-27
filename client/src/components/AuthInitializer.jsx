import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useQueryClient } from "@tanstack/react-query";
import toast from "react-hot-toast";

import { getMe } from "../api/auth.api";
import { useAuth } from "../hooks/useAuth";
import { registerLogoutHandler } from "../services/authManager";

const AuthInitializer = ({ children }) => {
  const {
    setUser,
    setIsAuthLoading,
  } = useAuth();

  const navigate = useNavigate();
  const queryClient = useQueryClient();

  useEffect(() => {
    const initialize = async () => {
      try {
        const response = await getMe();
        setUser(response.data);
      } catch {
        setUser(null);
      } finally {
        setIsAuthLoading(false);
      }
    };

    initialize();
  }, []);

  useEffect(() => {
    const unregister = registerLogoutHandler(async ({ sessionExpired }) => {
      queryClient.clear();
      setUser(null);

      if (sessionExpired) {
        toast.error("Session expired. Please login again.");
      }

      navigate("/login", {
        replace: true,
      });
    });

    return unregister;
  }, [navigate, queryClient, setUser]);

  return children;
};

export default AuthInitializer;