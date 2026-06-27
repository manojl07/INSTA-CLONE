
import { useAuth } from '../../hooks/useAuth'
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import { deleteComment, getComments } from '../../api/comment.api';
import CommentItem from './CommentItem';
import {queryKeys} from '../../constants/queryKeys'

const CommentList = ({ postId, queryKey }) => {


  const { user } = useAuth();

  const queryClient = useQueryClient();

  const { data, isLoading } = useQuery({
    queryKey, queryFn: () => getComments(postId)
  })

  const deleteMutation = useMutation({
    mutationFn: deleteComment,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey })
      queryClient.invalidateQueries({ queryKey: queryKeys.feed })
      queryClient.invalidateQueries({ queryKey: ["user-posts"] })
    }
  })

  if (isLoading) {
    return (
      <div className='max-h-[450px] overflow-y-auto p-4'>

        <p className='text-zinc-400 text-center'>Loading comments...</p>
      </div>
    )
  }

  if (!data?.data?.length) {
    return (
      <div className='max-h-[450px] overflow-y-auto p-4'>

        <p className='text-zinc-500 text-center py-6'>No comments yet</p>
      </div>
    )
  }


  return (
    <div className="h-full overflow-y-auto px-4 py-2  space-y-1 scrollbar-thin scrollbar-thumb-zinc-700 scrollbar-track-transparent scroll-smooth">

      {data.data.map((comment) => (
        <CommentItem
          key={comment.id}
          comment={comment}
          currentUserId={user?.id}
          deleting={deleteMutation.isPending}
          onDelete={(id) => deleteMutation.mutate(id)}
        />
      ))}
    </div>
  )
}

export default CommentList