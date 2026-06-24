import CommentModal from "./CommentModal";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import {
  Heart,
  MessageCircle,
  Send,
  MoreHorizontal,
} from "lucide-react";

import { toggleLike } from "../api/post.api";
import { useState } from "react";

const PostCard = ({ post }) => {

  const [isCommentsOpen, setIsCommentsOpen] = useState(false);
  const queryClient = useQueryClient();

  const likeMutation = useMutation({
    mutationFn: () => toggleLike(post.id),

    onMutate: async () => {
      await queryClient.cancelQueries({
        queryKey: ["feed"],
      });

      const previousFeed =
        queryClient.getQueryData(["feed"]);

      queryClient.setQueryData(
        ["feed"],
        (oldData) => {
          if (!oldData) return oldData;

          return {
            ...oldData,

            data: {
              ...oldData.data,

              posts:
                oldData.data.posts.map((p) => {
                  if (p.id !== post.id) {
                    return p;
                  }

                  return {
                    ...p,

                    isLiked: !p.isLiked,

                    likesCount: p.isLiked
                      ? Math.max(
                        0,
                        p.likesCount - 1
                      )
                      : p.likesCount + 1,
                  };
                }),
            },
          };
        }
      );

      return {
        previousFeed,
      };
    },

    onError: (
      error,
      variables,
      context
    ) => {
      queryClient.setQueryData(
        ["feed"],
        context.previousFeed
      );
    },

    onSettled: () => {
      queryClient.invalidateQueries({
        queryKey: ["feed"],
      });
    },
  });

  return (
    <div className="bg-black border border-zinc-900 rounded-lg overflow-hidden">

      {/* Header */}
      <div className="flex items-center justify-between px-4 py-3">

        <div className="flex items-center gap-3">
          <img
            src={
              post.user.profileImg ||
              "https://via.placeholder.com/150"
            }
            alt={post.user.username}
            className="w-8 h-8 rounded-full object-cover"
          />

          <h3 className="text-white text-sm font-semibold">
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

        <div className="flex items-center gap-4">

          <button
            onClick={() =>
              likeMutation.mutate()
            }
            className="active:scale-95 transition"
          >
            <Heart
              size={26}
              className={`transition-all duration-300 ${post.isLiked
                ? "fill-red-500 text-red-500 scale-110"
                : "text-white"
                }`}
            />
          </button>

          <button onClick={() => setIsCommentsOpen(true)} >
            <MessageCircle
              size={24}
              className="text-white hover:text-zinc-300 transition"
            />
          </button>

          <button>
            <Send
              size={23}
              className="text-white"
            />
          </button>
        </div>

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
          {new Date(
            post.createdAt
          ).toLocaleDateString()}
        </p>
      </div>

      <CommentModal
        isOpen={isCommentsOpen}
        onClose={() => setIsCommentsOpen(false)}
        post={post}
      />
    </div>
  );
};

export default PostCard;