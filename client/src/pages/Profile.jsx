import { useQuery } from '@tanstack/react-query'
import { getUserPosts } from '../api/post.api';
import Loader from '../components/Loader';
import ProfileHeader from '../components/ProfileHeader';
import ProfilePostsGrid from '../components/ProfilePostsGrid';
import { useAuth } from "../hooks/useAuth";

const Profile = () => {

  const { user } = useAuth();

  const { data: postsData, isLoading } = useQuery({
    queryKey: ["user-posts", user?.id],
    queryFn: () => (getUserPosts({ userId: user.id })),
    enabled: !!user,
  });

  if (isLoading) {
    return <Loader />
  }

  console.log(postsData);

  return (
    <div className='min-h-screen bg-black'>

      <div className='max-w-4xl mx-auto'>

        <ProfileHeader user={user} />

        <ProfilePostsGrid
          posts={postsData?.data?.posts || []}
        />
      </div>
    </div>
  )
}

export default Profile