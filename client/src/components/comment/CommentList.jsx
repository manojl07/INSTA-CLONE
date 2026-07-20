import SkeletonComments from "../UI/SketetonComments";
import EmptyState from "../UI/EmptyState";

import { useAuth } from '../../hooks/useAuth'
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import { deleteComment, getComments } from '../../api/comment.api';
import CommentItem from './CommentItem';
import { queryKeys } from '../../constants/queryKeys'

const CommentList = ({ postId, queryKey, onNavigate }) => {


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
      queryClient.invalidateQueries({ queryKey: queryKeys.userPosts(user.id) })
    }
  })

  if (isLoading) {
    return <SkeletonComments />;
  }

  if (!data?.data?.length) {
    return (
      <EmptyState
        icon="💬"
        title="No Comments Yet"
        description="Start the conversation."
      />
    );
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