import { useState } from "react";
import { useParams } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";

import { useAuth } from "../hooks/useAuth";

import { getUserProfile } from "../api/user.api";
import { getUserPosts } from "../api/post.api";

import SkeletonProfile from "../components/UI/SkeletonProfile";

import ProfileHeader from "../components/profile/ProfileHeader";
import ProfilePostsGrid from "../components/profile/ProfilePostGrid";

import PostModal from "../components/post/PostModal";
import EditProfileModal from "../components/profile/EditProfileModal";

const Profile = () => {

  const [isEditOpen, setIsEditOpen] = useState(false);

  const { user } = useAuth();

  const { userId } = useParams();

  const profileId = userId || user.id;

  const [selectedPost, setSelectedPost] = useState(null);

  const [isModalOpen, setIsModalOpen] = useState(false);

  /* ------------------------
     PROFILE
  ------------------------- */

  const { data: profileData, isLoading: profileLoading } =
    useQuery({
      queryKey: ["user-profile", profileId],

      queryFn: () => getUserProfile(profileId),

      enabled: !!profileId,
    });

  /* ------------------------
     POSTS
  ------------------------- */

  const { data: postsData, isLoading: postsLoading } =
    useQuery({
      queryKey: ["user-posts", profileId],

      queryFn: () =>
        getUserPosts({
          userId: profileId,
        }),

      enabled: !!profileId,
    });

  if (profileLoading || postsLoading) {
    return <SkeletonProfile />;
  }

  return (
    <div className="min-h-screen bg-black">

      <div className="max-w-4xl mx-auto">

        <ProfileHeader
          user={profileData.data}
          isOwnProfile={profileId === user.id}
          onEditProfile={() => setIsEditOpen(true)}
        />

        <ProfilePostsGrid
          posts={postsData.data.posts}
          onPostClick={(post) => {
            setSelectedPost(post);
            setIsModalOpen(true);
          }}
        />

        <PostModal
          isOpen={isModalOpen}
          post={selectedPost}
          onClose={() => {
            setSelectedPost(null);
            setIsModalOpen(false);
          }}
        />

        <EditProfileModal
          isOpen={isEditOpen}
          onClose={() => setIsEditOpen(false)}
          user={profileData.data}
        />

      </div>

    </div>
  );
};

export default Profile;