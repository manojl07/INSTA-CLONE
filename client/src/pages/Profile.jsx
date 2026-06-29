import { useQuery } from '@tanstack/react-query'
import { getUserPosts } from '../api/post.api';
// import Loader from '../components/UI/Loader';
import ProfileHeader from '../components/profile/ProfileHeader';
import ProfilePostsGrid from '../components/profile/ProfilePostGrid';
import { useAuth } from "../hooks/useAuth";
import { useState } from 'react';
import PostModal from "../components/post/PostModal";
import { queryKeys } from '../constants/queryKeys'
import SkeletonGrid from "../components/UI/SkeletonGrid";
import ErrorState from "../components/UI/ErrorState";

const Profile = () => {

  const [selectedPost, setSelectedPost] = useState(null);

  const [isModalOpen, setIsModalOpen] = useState(false);

  const { user } = useAuth();

  const { data: postsData, isLoading, isError, error, } = useQuery({
    queryKey: queryKeys.userPosts(user.id),
    queryFn: () => getUserPosts({ userId: user.id }),
    enabled: !!user,
  });

  if (isLoading) {
    return (
      <div className="min-h-screen bg-black">

        <div className="max-w-4xl mx-auto py-10">

          <SkeletonGrid />

        </div>

      </div>
    );
  }

  if (isError) {
    return (
      <ErrorState
        title="Couldn't load profile"
        message={
          error.response?.data?.message ||
          error.message
        }
      />
    );
  }



  return (
    <div className='min-h-screen bg-black'>

      <div className='max-w-4xl mx-auto'>

        <ProfileHeader user={user} />

        <ProfilePostsGrid
          posts={postsData?.data?.posts || []}
          onPostClick={(post) => {
            setSelectedPost(post);
            setIsModalOpen(true);
          }}
        />

        <PostModal
          isOpen={isModalOpen}
          onClose={() => {
            setIsModalOpen(false);
            setSelectedPost(null);
          }}
          post={selectedPost}
        />
      </div>
    </div>
  )
}

export default Profile