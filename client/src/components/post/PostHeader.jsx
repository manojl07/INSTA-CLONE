import { MoreHorizontal, Trash2, X } from "lucide-react";
import { useState } from "react";
import { useAuth } from "../../hooks/useAuth";

const PostHeader = ({
  post,
  onClose,
  onDeleteClick,
}) => {
  const { user } = useAuth();

  const [showMenu, setShowMenu] =
    useState(false);

  return (
    <div className="flex items-center justify-between p-4 border-b border-zinc-800 relative">

      <div className="flex items-center gap-3">

        <img
          src={post.user.profileImg}
          alt={post.user.username}
          className="w-10 h-10 rounded-full object-cover"
        />

        <p className="font-semibold text-white">
          {post.user.username}
        </p>

      </div>

      <div className="flex items-center gap-2">

        {user?.id === post.user.id && (
          <div className="relative">

            <button
              onClick={() =>
                setShowMenu((prev) => !prev)
              }
              className="text-zinc-400 hover:text-white transition"
            >
              <MoreHorizontal size={20} />
            </button>

            {showMenu && (
              <div
                className="
                absolute
                right-0
                top-8
                w-44
                bg-zinc-900
                border
                border-zinc-800
                rounded-xl
                overflow-hidden
                shadow-xl
                z-50
                "
              >
                <button
                  onClick={() => {
                    setShowMenu(false);
                    onDeleteClick();
                  }}
                  className="
                  w-full
                  flex
                  items-center
                  gap-3
                  px-4
                  py-3
                  text-red-500
                  hover:bg-zinc-800
                  transition
                  "
                >
                  <Trash2 size={17} />
                  Delete Post
                </button>
              </div>
            )}

          </div>
        )}

        <button
          onClick={onClose}
          className="text-zinc-400 hover:text-white transition"
        >
          <X size={20} />
        </button>

      </div>

    </div>
  );
};

export default PostHeader;