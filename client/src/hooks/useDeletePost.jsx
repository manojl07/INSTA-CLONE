import { useMutation, useQueryClient } from '@tanstack/react-query'
import React from 'react'
import { deletePost } from '../api/post.api';
import toast from 'react-hot-toast';
import { queryKeys } from "../constants/queryKeys";

const useDeletePost = () => {

  const queryClient = useQueryClient();

  const mutation = useMutation({
    mutationFn: deletePost,

    onMutate: async (postId) => {
      await Promise.all([
        queryClient.cancelQueries({queryKey: queryKeys.feed}),
        queryClient.cancelQueries({queryKey: ["user-posts"]})
    ])

    const previousFeed = queryClient.getQueryData(["feed"])

    const userPostQueries = queryClient.getQueriesData({queryKey: ["user-posts"]})

    //feed optimistic update
    queryClient.setQueryData(["feed"], (oldData) => {
      if(!oldData?.data?.posts) return oldData

      return {
        ...oldData,
        data: {
          ...oldData.data,
          posts: oldData.data.posts.filter((post) => post.id !== postId)
        }
      }
    })

    // Profile optimistic update
    userPostQueries.forEach(([queryKey, oldData]) => {
      if(!oldData?.data?.posts) return;

      queryClient.setQueryData(
        queryKey,
        {
          ...oldData,
          data: {
            ...oldData.data,
            posts: oldData.data.posts.filter((post => post.id !== postId))
          }
        }
      )
    })

    return {previousFeed, userPostQueries}
    },

    onError: (error, postId, context) => {
      if(context?.previousFeed){
        queryClient.setQueryData(["feed"], context.previousFeed)
      }

      context?.userPostQueries?.forEach(([queryKey, data]) => {
        queryClient.setQueryData(queryKey, data)
      })

      toast.error(error?.response?.data?.message || "Failed to delete post")
    },

    onSuccess: () => {
      toast.success("Post Delted");
    },

    onSettled: () => {
      queryClient.invalidateQueries({queryKey: queryKeys.feed})
      queryClient.invalidateQueries({queryKey: ["user-posts"]})
    }
  })


  return {
    deletePost: mutation.mutate,
    deletePostAsync: mutation.mutateAsync,
    isDeleting: mutation.isPending,
  }
}

export default useDeletePost;