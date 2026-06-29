import EmptyState from "../UI/EmptyState";
import { motion } from "framer-motion";

const ProfilePostsGrid = ({ posts, onPostClick }) => {
  if (!posts.length) {
    return (
      <EmptyState
        icon="📷"
        title="No Posts Yet"
        description="Share your first photo."
      />
    );
  }

  return (
    <div className="mx-auto grid max-w-2xl grid-cols-3 gap-1">
      {posts.map((post) => (
        <motion.div
          key={post.id}
          layout
          whileHover={{ y: -4 }}
          transition={{ duration: 0.2 }}
          onClick={() => onPostClick(post)}
          className="group relative aspect-square cursor-pointer overflow-hidden rounded-sm"
        >
          {/* Image */}

          <motion.img
            src={post.imageUrl}
            alt={post.caption || "Post"}
            whileHover={{ scale: 1.08 }}
            transition={{
              duration: 0.35,
              ease: "easeOut",
            }}
            className="h-full w-full object-cover"
          />

          {/* Overlay */}

          <motion.div
            initial={{ opacity: 0 }}
            whileHover={{ opacity: 1 }}
            transition={{ duration: 0.2 }}
            className="absolute inset-0 flex items-center justify-center bg-black/40"
          >
            <span className="text-lg font-semibold text-white">
              ❤️ {post.likesCount}
            </span>
          </motion.div>
        </motion.div>
      ))}
    </div>
  );
};

export default ProfilePostsGrid;