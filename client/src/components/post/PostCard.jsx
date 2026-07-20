// import { MoreHorizontal, } from "lucide-react";
import { useState } from "react";
import PostActions from "./PostActions";
import PostModal from "./PostModal";
import useProfileNavigation from "../../hooks/useProfileNavigation";
import { Link } from "react-router-dom";
import { useAuth } from "../../hooks/useAuth";
import FollowTextButton from "../social/FollowTextButton";
import { queryKeys } from "../../constants/queryKeys";
import PostMenu from "./PostMenu";

const PostCard = ({ post }) => {

  const { user: currentUser } = useAuth();

  const isOwnPost = currentUser?.id === post.user.id;

  const [isCommentsOpen, setIsCommentsOpen] = useState(false);

  const goToProfile = useProfileNavigation();



  return (
    <div className="bg-black border border-zinc-900 rounded-lg overflow-hidden">

      {/* Header */}
      <div className="flex items-center justify-between px-4 py-3">

        <div className="flex items-center gap-3">

          <Link
            to={`/profile/${post.user.id}`}
            className="flex items-center gap-3"
          >
            <img
              src={post.user.profileImg}
              alt={post.user.username}
              className="w-8 h-8 rounded-full object-cover"
            />

            <h3 className="text-white text-sm font-semibold hover:underline">
              {post.user.username}
            </h3>
          </Link>

          {!isOwnPost && (
            <>
              <span className="text-zinc-600">•</span>

              <FollowTextButton
                user={post.user}
              />
            </>
          )}

        </div>

        <PostMenu />

      </div>

      {/* Post Image */}
      <img
        src={post.imageUrl}
        alt="Post"
        className="w-full object-cover max-h-[700px]"
      />

      {/* Actions */}
      <div className="px-4 py-3">
        <PostActions
          post={post}
          queryKey={queryKeys.feed}
          onCommentClick={() =>
            setIsCommentsOpen(true)
          }
        />

        {/* Likes */}
        <p className="mt-3 text-sm font-semibold text-white">
          {post.likesCount}{" "}
          {post.likesCount === 1
            ? "like"
            : "likes"}
        </p>



        {/* Caption */}
        {post.caption && (
          <p className="mt-2 text-sm text-white wrap-break-word">
            <span className="font-semibold mr-2">
              {post.user.username}
            </span>

            {post.caption}
          </p>
        )}

        {post.commentsCount > 0 && (
          <p
            className="
      mt-1
      text-sm
      text-zinc-400
      cursor-pointer
      hover:text-zinc-300
      transition
    "
            onClick={() => setIsCommentsOpen(true)}
          >
            View all {post.commentsCount} comments
          </p>
        )}

        {/* Date */}
        <p className="mt-2 text-xs uppercase tracking-wide text-zinc-500">
          {new Date(post.createdAt).toLocaleDateString("en-GB")}
        </p>
      </div>

      <PostModal
        isOpen={isCommentsOpen}
        onClose={() => setIsCommentsOpen(false)}
        post={post}
      />
    </div>
  );
};

export default PostCard;