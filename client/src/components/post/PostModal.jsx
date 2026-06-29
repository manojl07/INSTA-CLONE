import { useEffect } from "react";
import { useQueryClient } from "@tanstack/react-query";
import { AnimatePresence, motion } from "framer-motion";

import PostHeader from "./PostHeader";
import PostActions from "./PostActions";
import PostMeta from "./PostMeta";

import CommentList from "../comment/CommentList";
import CommentInput from "../comment/CommentInput";

import { useAuth } from "../../hooks/useAuth";

import { queryKeys } from "../../constants/queryKeys";
import {
  backdropVariants,
  modalVariants,
} from "../../constants/animations";

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
    ? userPosts?.data?.posts?.find(
        (p) => p.id === post.id
      ) ||
      feedPosts?.data?.posts?.find(
        (p) => p.id === post.id
      ) ||
      post
    : null;

  useEffect(() => {
    if (!isOpen) return;

    document.body.style.overflow = "hidden";

    const handleKeyDown = (e) => {
      if (e.key === "Escape") {
        onClose();
      }
    };

    window.addEventListener(
      "keydown",
      handleKeyDown
    );

    return () => {
      document.body.style.overflow = "auto";

      window.removeEventListener(
        "keydown",
        handleKeyDown
      );
    };
  }, [isOpen, onClose]);

  return (
    <AnimatePresence>
      {isOpen && currentPost && (
        <motion.div
          initial="hidden"
          animate="visible"
          exit="exit"
          variants={backdropVariants}
          onClick={onClose}
          className="fixed inset-0 z-50 flex items-center justify-center bg-black/80 p-6"
        >
          <motion.div
            variants={modalVariants}
            onClick={(e) =>
              e.stopPropagation()
            }
            className="grid h-[90vh] w-full max-w-6xl min-h-0 grid-cols-1 overflow-hidden rounded-xl bg-zinc-950 lg:grid-cols-[2fr_1fr]"
          >
            <div className="flex min-h-0 items-center justify-center bg-black">
              <img
                src={currentPost.imageUrl}
                alt={currentPost.caption}
                className="h-full w-full object-contain"
              />
            </div>

            <div className="flex min-h-0 flex-col bg-zinc-950">

              <PostHeader
                post={currentPost}
                onClose={onClose}
              />

              <div className="shrink-0 border-b border-zinc-800 px-5 py-4">
                <p className="text-sm leading-6 text-zinc-300">
                  {currentPost.caption ||
                    "No caption"}
                </p>
              </div>

              <div className="min-h-0 flex-1">
                <CommentList
                  postId={currentPost.id}
                  queryKey={queryKeys.comments(
                    currentPost.id
                  )}
                  onNavigate={onClose}
                />
              </div>

              <div className="shrink-0 border-t border-zinc-800">

                <div className="p-4">
                  <PostActions
                    post={currentPost}
                    queryKey={[
                      "user-posts",
                      user.id,
                    ]}
                  />
                </div>

                <PostMeta
                  post={currentPost}
                />

                <CommentInput
                  postId={currentPost.id}
                  queryKey={[
                    "comments",
                    currentPost.id,
                  ]}
                />

              </div>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default PostModal;