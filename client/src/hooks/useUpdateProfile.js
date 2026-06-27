import { useMutation, useQueryClient } from "@tanstack/react-query";
import toast from "react-hot-toast";

import { updateProfile } from "../api/auth.api";
import { useAuth } from "./useAuth";

const useUpdateProfile = (onSuccessCallback) => {
  const queryClient = useQueryClient();

  const { setUser } = useAuth();

  return useMutation({
    mutationFn: updateProfile,

    onSuccess: (response) => {
      const updatedUser = response.data;

      // Update Auth Context
      setUser(updatedUser);

      // Keep cached profile posts in sync
      queryClient.setQueryData(
        ["user-posts", updatedUser.id],
        (oldData) => oldData
      );

      // Refresh feed so updated avatar/bio appear everywhere
      queryClient.invalidateQueries({
        queryKey: ["feed"],
      });

      toast.success("Profile updated 🚀");

      onSuccessCallback?.();
    },

    onError: (error) => {
      toast.error(
        error.response?.data?.message ||
          "Failed to update profile"
      );
    },
  });
};

export default useUpdateProfile;