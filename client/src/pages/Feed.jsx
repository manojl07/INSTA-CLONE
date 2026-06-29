import { useQuery } from '@tanstack/react-query';
import { getFeed } from '../api/post.api'
import PostCard from '../components//post/PostCard'
import { queryKeys } from '../constants/queryKeys'
import SkeletonCard from "../components/UI/SkeletonCard";

const Feed = () => {

  const { data, isLoading, error } = useQuery({
    queryKey: queryKeys.feed,
    queryFn: () => getFeed({ page: 1, limit: 10 })
  });

  if (isLoading) {
    return (
      <div className="min-h-screen bg-black py-10">

        <div className="max-w-lg mx-auto space-y-5">

          {[...Array(5)].map((_, index) => (
            <SkeletonCard key={index} />
          ))}

        </div>

      </div>
    );
  }

  if (error) {
    return (
      <div className='text-red-500'>
        Failed to load feed
      </div>
    )
  }

  return (
    <div className='min-h-screen bg-black py-10'>

      <div className='max-w-lg mx-auto space-y-5'>

        {data.data.posts.map((post) => {
          return (
            <PostCard key={post.id || post._id} post={post} />
          )
        })}
      </div>
    </div>
  )
}

export default Feed;