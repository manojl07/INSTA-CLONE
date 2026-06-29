import { X } from "lucide-react";
import { motion } from "framer-motion";

import { useAuth } from "../../hooks/useAuth";
import PostMenu from "./PostMenu";

const PostHeader = ({
  post,
  onClose,
}) => {
  const { user } = useAuth();

  return (
    <div className="flex items-center justify-between border-b border-zinc-800 p-4">
      <div className="flex items-center gap-3">
        <img
          src={post.user.profileImg}
          alt={post.user.username}
          className="h-10 w-10 rounded-full object-cover"
        />

        <p className="font-semibold text-white">
          {post.user.username}
        </p>
      </div>

      <div className="flex items-center gap-2">
        {user?.id === post.user.id && (
          <PostMenu
            postId={post.id}
            onPostDeleted={onClose}
          />
        )}

        <motion.button
          whileHover={{
            rotate: 90,
          }}
          whileTap={{
            scale: 0.9,
          }}
          onClick={onClose}
          className="text-zinc-400 transition hover:text-white"
        >
          <X size={20} />
        </motion.button>
      </div>
    </div>
  );
};

export default PostHeader;