import { useState } from "react"
import { useMutation, useQueryClient } from '@tanstack/react-query'
import { useAuth } from '../../hooks/useAuth'
import { createComment } from "../../api/comment.api";


const CommentInput = ({ postId, queryKey, onCommentCreated }) => {

  const [content, setContent] = useState("");

  const { user } = useAuth();

  const queryClient = useQueryClient();

  const createMutation = useMutation({
    mutationFn: createComment,

    onMutate: async (newComment) => {
      await queryClient.cancelQueries({ queryKey })
      const previousComments = queryClient.getQueryData(queryKey);

      queryClient.setQueryData(queryKey, (oldData) => {
        if (!oldData) return oldData;

        return {
          ...oldData,
          data: [
            {
              id: Date.now(),
              content: newComment.content,
              user,
              createdAt: new Date().toISOString(),
            },
            ...oldData.data,
          ]
        }
      })

      return { previousComments }
    },

    onError: (err, variables, context) => {
      if (context?.previousComments) {
        queryClient.setQueryData(queryKey, context.previousComments)
      }
    },

    onSuccess: () => {
      setContent("");
      onCommentCreated?.();
    },

    onSettled: () => {
      queryClient.invalidateQueries({ queryKey })
      queryClient.invalidateQueries({ queryKey: ["feed"] })
      queryClient.invalidateQueries({ queryKey: ["user-posts"] })
    }
  });

  const handleSubmit = () => {
    if (!content.trim()) return;

    createMutation.mutate(
      {
        postId,
        content,
      },
    );
  }


  return (
    <div className="p-4 flex gap-2">

      <input type="text"
        value={content}
        onChange={(e) => setContent(e.target.value)}
        placeholder="Add a comment..."
        className="flex-1 bg-zinc-800 text-white rounded-lg p-3 outline-none"
        onKeyDown={(e) => {
          if (e.key === "Enter" && !e.shiftKey) {
            e.preventDefault();
            handleSubmit();
          }
        }}
      />

      <button onClick={handleSubmit} disabled={createMutation.isPending || !content.trim()} className="bg-blue-600 hover:bg-blue-500 disabled:opacity-50 text-white px-5 rounded-lg transition">{createMutation.isPending ? "..." : "Post"}</button>

    </div>
  )
}

export default CommentInput;