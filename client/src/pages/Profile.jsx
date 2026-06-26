import { useQuery } from '@tanstack/react-query'
import { getUserPosts } from '../api/post.api';
import Loader from '../components/UI/Loader';
import ProfileHeader from '../components/profile/ProfileHeader';
import ProfilePostsGrid from '../components/profile/ProfilePostGrid';
import { useAuth } from "../hooks/useAuth";
import { useState } from 'react';
import PostModal from "../components/post/PostModal";

const Profile = () => {

  const [selectedPost, setSelectedPost] = useState(null);

  const [isModalOpen, setIsModalOpen] = useState(false);

  const { user } = useAuth();

  const { data: postsData, isLoading, isError, error, } = useQuery({
    queryKey: ["user-posts", user?.id],
    queryFn: () => getUserPosts({ userId: user.id }),
    enabled: !!user,
  });

  if (isLoading) {
    return <Loader />
  }

  if (isError) {
    console.log(error);

    return (
      <div className="min-h-screen bg-black flex items-center justify-center">
        <div className="text-center">
          <h2 className="text-red-500 text-xl font-semibold">
            Request Failed
          </h2>

          <p className="text-zinc-400 mt-2">
            {error.response?.data?.message || error.message}
          </p>
        </div>
      </div>
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