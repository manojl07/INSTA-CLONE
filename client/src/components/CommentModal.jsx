import { useState } from "react";
import {
  useQuery,
  useMutation,
  useQueryClient,
} from "@tanstack/react-query";

import {
  getComments,
  createComment,
  deleteComment,
} from "../api/comment.api";

import {useAuth} from "../hooks/useAuth";

const CommentModal = ({
  isOpen,
  onClose,
  post,
}) => {
  const { user } = useAuth();

  const [content, setContent] =
    useState("");

  const queryClient =
    useQueryClient();

  const {
    data,
    isLoading,
  } = useQuery({
    queryKey: [
      "comments",
      post?.id,
    ],

    queryFn: () =>
      getComments(post?.id),

    enabled:
      !!post && isOpen,
  });

  const createMutation =
    useMutation({
      mutationFn:
        createComment,

      onMutate: async (
        newComment
      ) => {
        await queryClient.cancelQueries({
          queryKey: [
            "comments",
            post.id,
          ],
        });

        const previousComments =
          queryClient.getQueryData([
            "comments",
            post.id,
          ]);

        queryClient.setQueryData(
          [
            "comments",
            post.id,
          ],
          (oldData) => {
            if (!oldData)
              return oldData;

            return {
              ...oldData,

              data: [
                {
                  id: Date.now(),

                  content:
                    newComment.content,

                  user,

                  createdAt:
                    new Date(),
                },

                ...oldData.data,
              ],
            };
          }
        );

        return {
          previousComments,
        };
      },

      onError: (
        err,
        variables,
        context
      ) => {
        queryClient.setQueryData(
          [
            "comments",
            post.id,
          ],
          context?.previousComments
        );
      },

      onSettled: () => {
        queryClient.invalidateQueries({
          queryKey: [
            "comments",
            post.id,
          ],
        });

        queryClient.invalidateQueries({
          queryKey: ["feed"],
        });
      },
    });

  const deleteMutation =
    useMutation({
      mutationFn:
        deleteComment,

      onSuccess: () => {
        queryClient.invalidateQueries({
          queryKey: [
            "comments",
            post.id,
          ],
        });

        queryClient.invalidateQueries({
          queryKey: ["feed"],
        });
      },
    });

  const handleSubmit = () => {
    if (!content.trim())
      return;

    createMutation.mutate({
      postId: post.id,
      content,
    });

    setContent("");
  };

  const handleDelete = (
    commentId
  ) => {
    deleteMutation.mutate(
      commentId
    );
  };

  if (!isOpen) {
    return null;
  }

  console.log("COMMENTS RESPONSE:", data);

  return (
    <div
      className="
      fixed
      inset-0
      bg-black/70
      backdrop-blur-sm
      flex
      justify-center
      items-center
      z-50
      "
    >
      <div
        className="
        bg-zinc-900
        w-full
        max-w-lg
        rounded-2xl
        border
        border-zinc-800
        shadow-2xl
        "
      >
        {/* Header */}
        <div
          className="
          flex
          items-center
          justify-between
          p-4
          border-b
          border-zinc-800
          "
        >
          <h2
            className="
            text-white
            text-xl
            font-bold
            "
          >
            Comments
          </h2>

          <button
            onClick={onClose}
            className="
            text-zinc-400
            hover:text-white
            text-xl
            transition
            "
          >
            ✕
          </button>
        </div>

        {/* Comments */}
        <div
          className="
          max-h-[450px]
          overflow-y-auto
          p-4
          "
        >
          {isLoading && (
            <p
              className="
              text-zinc-400
              text-center
              "
            >
              Loading comments...
            </p>
          )}

          {!isLoading &&
            data?.data?.length ===
              0 && (
              <p
                className="
                text-zinc-500
                text-center
                py-6
                "
              >
                No comments yet
              </p>
            )}

          {data?.data?.map(
            (comment) => (
              <div
                key={comment.id}
                className="
                flex
                gap-3
                mb-5
                "
              >
                <img
                  src={
                    comment.user
                      .profileImg ||
                    "https://via.placeholder.com/150"
                  }
                  alt={
                    comment.user
                      .username
                  }
                  className="
                  w-9
                  h-9
                  rounded-full
                  object-cover
                  flex-shrink-0
                  "
                />

                <div className="flex-1">
                  <p
                    className="
                    text-white
                    font-semibold
                    text-sm
                    "
                  >
                    {
                      comment.user
                        .username
                    }
                  </p>

                  <p
                    className="
                    text-zinc-300
                    text-sm
                    break-words
                    "
                  >
                    {
                      comment.content
                    }
                  </p>
                </div>

                {comment.user.id ===
                  user?.id && (
                  <button
                    onClick={() =>
                      handleDelete(
                        comment.id
                      )
                    }
                    disabled={
                      deleteMutation.isPending
                    }
                    className="
                    text-red-500
                    text-xs
                    hover:text-red-400
                    transition
                    self-start
                    "
                  >
                    Delete
                  </button>
                )}
              </div>
            )
          )}
        </div>

        {/* Comment Input */}
        <div
          className="
          border-t
          border-zinc-800
          p-4
          flex
          gap-2
          "
        >
          <input
            type="text"
            value={content}
            onChange={(e) =>
              setContent(
                e.target.value
              )
            }
            placeholder="Add a comment..."
            className="
            flex-1
            bg-zinc-800
            text-white
            p-3
            rounded-lg
            outline-none
            "
          />

          <button
            onClick={
              handleSubmit
            }
            disabled={
              createMutation.isPending
            }
            className="
            bg-blue-600
            hover:bg-blue-500
            text-white
            px-4
            rounded-lg
            transition
            "
          >
            {createMutation.isPending
              ? "..."
              : "Post"}
          </button>
        </div>
      </div>
    </div>
  );
};

export default CommentModal;