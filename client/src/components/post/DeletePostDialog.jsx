import { AnimatePresence, motion } from "framer-motion";

import useDeletePost from "../../hooks/useDeletePost";
import {
  backdropVariants,
  modalVariants,
} from "../../constants/animations";

const DeletePostDialog = ({
  isOpen,
  onClose,
  postId,
  onDeleted,
}) => {
  const {
    deletePost,
    isDeleting,
  } = useDeletePost();

  const handleDelete = () => {
    deletePost(postId, {
      onSuccess: () => {
        onClose();
        onDeleted?.();
      },
    });
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          initial="hidden"
          animate="visible"
          exit="exit"
          variants={backdropVariants}
          onClick={onClose}
          className="fixed inset-0 z-[70] flex items-center justify-center bg-black/70 backdrop-blur-sm p-6"
        >
          <motion.div
            variants={modalVariants}
            onClick={(e) => e.stopPropagation()}
            className="w-full max-w-sm overflow-hidden rounded-2xl border border-zinc-800 bg-zinc-900"
          >
            <div className="p-8 text-center">
              <h2 className="text-xl font-semibold text-white">
                Delete Post?
              </h2>

              <p className="mt-3 text-zinc-400">
                This action cannot be undone.
              </p>
            </div>

            <div className="border-t border-zinc-800">
              <motion.button
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                onClick={handleDelete}
                disabled={isDeleting}
                className="w-full py-4 font-semibold text-red-500 transition hover:bg-zinc-800 disabled:opacity-50"
              >
                {isDeleting
                  ? "Deleting..."
                  : "Delete"}
              </motion.button>

              <motion.button
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                onClick={onClose}
                disabled={isDeleting}
                className="w-full border-t border-zinc-800 py-4 text-white transition hover:bg-zinc-800"
              >
                Cancel
              </motion.button>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default DeletePostDialog;