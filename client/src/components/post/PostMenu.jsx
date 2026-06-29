import {
  useEffect,
  useRef,
  useState,
} from "react";

import {
  AnimatePresence,
  motion,
} from "framer-motion";

import {
  MoreHorizontal,
} from "lucide-react";

import DeletePostDialog from "./DeletePostDialog";

import {
  dropdownVariants,
} from "../../constants/animations";

const PostMenu = ({
  postId,
  onPostDeleted,
}) => {
  const [isMenuOpen, setIsMenuOpen] =
    useState(false);

  const [isDeleteOpen, setIsDeleteOpen] =
    useState(false);

  const menuRef = useRef(null);

  useEffect(() => {
    const handleClick = (e) => {
      if (
        !menuRef.current?.contains(e.target)
      ) {
        setIsMenuOpen(false);
      }
    };

    document.addEventListener(
      "mousedown",
      handleClick
    );

    return () =>
      document.removeEventListener(
        "mousedown",
        handleClick
      );
  }, []);

  useEffect(() => {
    const handleKey = (e) => {
      if (e.key === "Escape") {
        setIsMenuOpen(false);
      }
    };

    window.addEventListener(
      "keydown",
      handleKey
    );

    return () =>
      window.removeEventListener(
        "keydown",
        handleKey
      );
  }, []);

  return (
    <>
      <div
        ref={menuRef}
        className="relative"
      >
        <motion.button
          whileHover={{
            rotate: 90,
          }}
          whileTap={{
            scale: 0.9,
          }}
          onClick={() =>
            setIsMenuOpen(
              (prev) => !prev
            )
          }
          className="text-zinc-400 transition hover:text-white"
        >
          <MoreHorizontal size={20} />
        </motion.button>

        <AnimatePresence>
          {isMenuOpen && (
            <motion.div
              variants={dropdownVariants}
              initial="hidden"
              animate="visible"
              exit="exit"
              className="absolute right-0 z-50 mt-2 w-52 overflow-hidden rounded-xl border border-zinc-800 bg-zinc-900 shadow-2xl"
            >
              <motion.button
                whileHover={{
                  x: 4,
                }}
                transition={{
                  duration: 0.15,
                }}
                onClick={() => {
                  setIsMenuOpen(false);
                  setIsDeleteOpen(true);
                }}
                className="w-full px-4 py-3 text-left text-red-500 transition hover:bg-zinc-800"
              >
                Delete Post
              </motion.button>

              <button
                disabled
                className="w-full cursor-not-allowed px-4 py-3 text-left text-zinc-500"
              >
                Edit Caption
              </button>

              <button
                disabled
                className="w-full cursor-not-allowed px-4 py-3 text-left text-zinc-500"
              >
                Archive
              </button>

              <button
                disabled
                className="w-full cursor-not-allowed px-4 py-3 text-left text-zinc-500"
              >
                Copy Link
              </button>
            </motion.div>
          )}
        </AnimatePresence>
      </div>

      <DeletePostDialog
        isOpen={isDeleteOpen}
        onClose={() =>
          setIsDeleteOpen(false)
        }
        postId={postId}
        onDeleted={onPostDeleted}
      />
    </>
  );
};

export default PostMenu;