import { useQuery } from '@tanstack/react-query'
import React from 'react'
import { getMe } from '../api/auth.api';
import { getUserPosts } from '../api/post.api';
import Loader from '../components/Loader';
import ProfileHeader from '../components/ProfileHeader';
import ProfilePostsGrid from '../components/ProfilePostsGrid';

const Profile = () => {

  const { data: me, isLoading: userLoading } = useQuery({
    queryKey: ["me"],
    queryFn: getMe,
  });

  const user = me?.data;

  const { data: postsData, isLoading: postsLoading } = useQuery({
    queryKey: ["user-posts", user?.id],
    queryFn: () => getUserPosts({ userId: user.id }),
    enabled: !!user,
  })

  if (userLoading || postsLoading) {
    return <Loader />
  }
  return (
    <div className='min-h-screen bg-black'>

      <div className='max-w-4xl mx-auto'>

        <ProfileHeader user={user} />

        <ProfilePostsGrid posts={postsData.data.posts} />
      </div>
    </div>
  )
}

export default Profile