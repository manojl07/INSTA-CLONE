import { useMutation, useQueryClient } from "@tanstack/react-query";

import { toggleFollow } from "../api/user.api";

const useToggleFollow = (user) => {
  const queryClient = useQueryClient();

  const mutation = useMutation({
    mutationFn: () => toggleFollow(user.id),

    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ["user-profile"],
      });

      queryClient.invalidateQueries({
        queryKey: ["followers", user.id],
      });

      queryClient.invalidateQueries({
        queryKey: ["following"],
      });

      queryClient.invalidateQueries({
        queryKey: ["feed"],
      });
    },
  });

  return {
    toggleFollow: mutation.mutate,
    isPending: mutation.isPending,
    isFollowing: user.isFollowing,
  };
};

export default useToggleFollow;