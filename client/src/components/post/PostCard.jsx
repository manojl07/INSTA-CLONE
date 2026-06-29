import { MoreHorizontal, } from "lucide-react";
import { useState } from "react";
import PostActions from "./PostActions";
import PostModal from "./PostModal";
import useProfileNavigation from "../../hooks/useProfileNavigation";

const PostCard = ({ post }) => {

  const [isCommentsOpen, setIsCommentsOpen] = useState(false);

  const goToProfile = useProfileNavigation();



  return (
    <div className="bg-black border border-zinc-900 rounded-lg overflow-hidden">

      {/* Header */}
      <div className="flex items-center justify-between px-4 py-3">

        <div className="flex items-center gap-3">

          <img
            src={post.user.profileImg}
            alt={post.user.username}
            onClick={() => goToProfile(post.user.id)}
            className="w-8 h-8 rounded-full object-cover cursor-pointer"
          />

          <h3
            onClick={() => goToProfile(post.user.id)}
            className="text-white text-sm font-semibold cursor-pointer hover:text-zinc-300 transition"
          >
            {post.user.username}
          </h3>

        </div>

        <MoreHorizontal
          size={18}
          className="text-zinc-400 cursor-pointer"
        />
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
          queryKey={["feed"]}
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
          <p className="mt-2 text-sm text-white">
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