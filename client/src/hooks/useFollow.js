import { useMutation, useQueryClient } from "@tanstack/react-query";
import toast from 'react-hot-toast'

import { toggleFollow } from '../api/user.api'
import { queryKeys } from "../constants/queryKeys";

const useFollow = (userId) => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: () => toggleFollow(userId),
    onMutate: async () => {
      await queryClient.cancelQueries({ queryKey: queryKeys.profile(userId) })

      const previous = queryClient.getQueryData(queryKeys.profile(userId))

      queryClient.setQueryData(["user-profile", userId], (old) => {
        if (!old) return old;

        const following = old.data.isFollowing;

        return {
          ...old,
          data: {
            ...old.data,
            isFollowing: !following,
            followersCount: following ? old.data.followersCount - 1 : old.data.followersCount + 1,
          }
        }
      })
      return { previous };
    },

    onError: (_error, _variables, context) => {
      if (context?.previous) {
        queryClient.setQueryData(
          queryKeys.profile(userId),
          context.previous
        );
      }

      toast.error("Something went wrong");
    },

    onSettled: () => {
      queryClient.invalidateQueries({ queryKey: queryKeys.profile(userId) })

      queryClient.invalidateQueries({ queryKey: queryKeys.feed })

      queryClient.invalidateQueries({ queryKey: queryKeys.userPosts(userId) })
    }
  })
}

export default useFollow;