import { Heart, MessageCircle, Send } from 'lucide-react'
import { useMutation, useQueryClient } from '@tanstack/react-query'
import { toggleLike } from '../../api/post.api'



const PostActions = ({ post, queryKey, onCommentClick }) => {

  const queryClient = useQueryClient();

  const likeMutation = useMutation({
    mutationFn: () => toggleLike(post.id),

    onMutate: async () => {
      await queryClient.cancelQueries({
        queryKey,
      });

      const previous = queryClient.getQueryData(queryKey);

      queryClient.setQueryData(queryKey, (oldData) => {
        if (!oldData?.data?.posts) return oldData;

        return {
          ...oldData,

          data: {
            ...oldData.data,

            posts: oldData.data.posts.map((p) => {
              if (p.id !== post.id) return p;

              return {
                ...p,
                isLiked: !p.isLiked,
                likesCount: p.isLiked
                  ? Math.max(0, p.likesCount - 1)
                  : p.likesCount + 1,
              };
            }),
          },
        };
      });

      return { previous };
    },

    onError: (err, variables, context) => {
      if (context?.previous) {
        queryClient.setQueryData(queryKey, context.previous);
      }
    },

    onSettled: () => {
      queryClient.invalidateQueries({
        queryKey,
      });

      queryClient.invalidateQueries({
        queryKey: ["feed"],
      });

      queryClient.invalidateQueries({
        queryKey: ["user-posts"],
      });
    },
  });


  return (
    <div className="flex items-center gap-6">

      {/* Like */}
      <button
        onClick={() => likeMutation.mutate()}
        className="flex items-center gap-2"
      >
        <Heart
          size={24}
          className={
            post.isLiked
              ? "fill-red-500 text-red-500"
              : "text-white"
          }
        />

        <span className="text-white text-sm font-medium">
          {post.likesCount}
        </span>
      </button>

      {/* Comment */}
      <button
        onClick={() => onCommentClick?.()}
        className="flex items-center gap-2"
      >
        <MessageCircle
          size={24}
          className="text-white"
        />

        <span className="text-white text-sm font-medium">
          {post.commentsCount}
        </span>
      </button>

      {/* Share */}
      <button>
        <Send
          size={23}
          className="text-white"
        />
      </button>

    </div>
  );
}


export default PostActions;