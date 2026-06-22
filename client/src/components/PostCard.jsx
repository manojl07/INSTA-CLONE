import { useMutation, useQueryClient } from '@tanstack/react-query'
import { Heart } from 'lucide-react'
import { toggleLike } from '../api/post.api'

const PostCard = ({ post }) => {

  const queryClient = useQueryClient();

  const likeMutation = useMutation({
    mutationFn: () => toggleLike(post.id),

    onMutate: async () => {
      await queryClient.cancelQueries({ queryKey: ["feed"] })

      const previousFeed = queryClient.getQueryData(["feed"]);

      queryClient.setQueryData(['feed'], (oldData) => {
        if (!oldData) return oldData;

        return {
          ...oldData, data: {
            ...oldData.data, posts: oldData.data.posts.map((p) => {
              if (p.id !== post.id) {
                return p;
              }

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

      return { previousFeed }
    },

    onError: (error, variables, context) => {
      queryClient.setQueryData(["feed"], context.previousFeed)
    },

    onSettled: () => {
      queryClient.invalidateQueries({ queryKey: ['feed'] });
    },
  });

  return (
    <div className='bg-zinc-900 border border-zinc-800 rounded-xl overflow-hidden'>

      <div className='flex items-center gap-3 p-4'>

        <img
          src={
            post.user.profileImg ||
            "https://via.placeholder.com/150"
          }
          alt={post.user.username}
          className="w-10 h-10 rounded-full object-cover"
        />

        <div>
          <h3 className='text-white font-semibold'>{post.user.username}</h3>
        </div>
      </div>

      <img src={post.imageUrl} alt="Post" className='w-full max-h-150 object-cover' />

      <div className='p-4'>
        <div className='flex gap-4 text-white'>
          <button
            onClick={() => likeMutation.mutate()}
            disabled={likeMutation.isPending}
            className="flex items-center gap-1 group active:scale-95 transition-transform duration-150">
            <Heart size={22} className={`transition-all duration-300 ease-out ${post.isLiked
              ? "text-red-500 fill-red-500 scale-110"
              : "text-white fill-none group-hover:scale-110"
              }`} />

            <span className="text-sm font-medium transition-colors duration-300">
              {post.likesCount}
            </span>
          </button>

          <span>💬 {post.commentsCount}</span>
        </div>
        {post.caption && (
          <p className='text-zinc-300 mt-3'>
            <span className='font-semibold text-white
          mr-2'>{post.user.username}</span>
            {post.caption}
          </p>
        )}
      </div>
    </div>
  )
}

export default PostCard;











