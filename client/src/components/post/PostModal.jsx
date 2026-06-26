import { useEffect } from "react";
import { useQueryClient } from "@tanstack/react-query";

import { useAuth } from "../../hooks/useAuth";

import PostHeader from "./PostHeader";
import PostActions from "./PostActions";
import PostMeta from "./PostMeta";

import CommentList from "../comment/CommentList";
import CommentInput from "../comment/CommentInput";

const PostModal = ({
  isOpen,
  onClose,
  post,
}) => {

  const { user } = useAuth();
  const queryClient = useQueryClient();

  const userPosts = queryClient.getQueryData([
    "user-posts",
    user?.id,
  ]);

  const feedPosts = queryClient.getQueryData([
    "feed",
  ]);

  const currentPost = post
    ? userPosts?.data?.posts?.find((p) => p.id === post.id) ||
    feedPosts?.data?.posts?.find((p) => p.id === post.id) ||
    post
    : null;

  // ALL hooks come before any return
  useEffect(() => {
    if (!isOpen) return;

    document.body.style.overflow = "hidden";

    const handleKeyDown = (e) => {
      if (e.key === "Escape") {
        onClose();
      }
    };

    window.addEventListener("keydown", handleKeyDown);

    return () => {
      document.body.style.overflow = "auto";
      window.removeEventListener("keydown", handleKeyDown);
    };
  }, [isOpen, onClose]);

  // Return AFTER all hooks
  if (!isOpen || !currentPost) {
    return null;
  }


  return (
    <div
      onClick={onClose}
      className="fixed inset-0 z-50 bg-black/80 flex items-center justify-center p-6"
    >
      <div onClick={(e) => e.stopPropagation()} className="bg-zinc-950 rounded-xl overflow-hidden w-full max-w-6xl h-[90vh] grid grid-cols-1 lg:grid-cols-[2fr_1fr] min-h-0 " >

        {/* LEFT IMAGE */}
        <div className="bg-black flex items-center justify-center min-h-0">
          <img
            src={currentPost.imageUrl}
            alt={currentPost.caption || "Post image"}
            className="w-full h-full object-contain"
          />
        </div>

        {/* RIGHT PANEL */}
        <div className="flex flex-col h-full min-h-0 bg-zinc-950">

          {/* Header */}
          <PostHeader
            post={currentPost}
            onClose={onClose}
          />

          {/* Caption */}
          <div className="shrink-0 px-5 py-4 border-b border-zinc-800">

            <p className="text-zinc-300 text-sm leading-6">
              {currentPost.caption || "No caption"}
            </p>

          </div>

          {/* Only comments scroll */}
          <div className="flex-1 min-h-0">

            <CommentList
              postId={currentPost.id}
              queryKey={["comments", currentPost.id]}
            />

          </div>

          {/* Footer */}
          <div className="shrink-0 border-t border-zinc-800">

            <div className="p-4">
              <PostActions
                post={currentPost}
                queryKey={["user-posts", user.id]}
              />
            </div>

            <PostMeta
              post={currentPost}
            />

            <CommentInput
              postId={currentPost.id}
              queryKey={["comments", currentPost.id]}
            />

          </div>

        </div>
      </div>
    </div>
  );
};

export default PostModal;