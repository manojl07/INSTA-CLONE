import { Link } from 'react-router-dom'
import { useQuery } from '@tanstack/react-query';
import { getFeed } from '../api/post.api'
import PostCard from '../components/PostCard'
import Loader from '../components/Loader';

const Feed = () => {

  const { data, isLoading, error } = useQuery({
    queryKey: ["feed"],
    queryFn: () => getFeed({ page: 1, limit: 10 })
  });

  if (isLoading) {
    return (
      <Loader />
    )
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