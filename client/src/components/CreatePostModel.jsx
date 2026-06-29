import { useEffect, useState } from "react";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { AnimatePresence, motion } from "framer-motion";
import { X, ImagePlus } from "lucide-react";
import toast from "react-hot-toast";

import { createPost } from "../api/post.api";
import {
  backdropVariants,
  modalVariants,
} from "../constants/animations";

const CreatePostModal = ({ isOpen, onClose }) => {
  const queryClient = useQueryClient();

  const [caption, setCaption] = useState("");
  const [image, setImage] = useState(null);
  const [preview, setPreview] = useState("");

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
      window.removeEventListener(
        "keydown",
        handleKeyDown
      );
    };
  }, [isOpen, onClose]);

  const createPostMutation = useMutation({
    mutationFn: createPost,

    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ["feed"],
      });

      toast.success("Post created 🚀");

      setCaption("");
      setImage(null);
      setPreview("");

      onClose();
    },

    onError: (error) => {
      toast.error(
        error?.response?.data?.message ||
          "Failed to create post"
      );
    },
  });

  const handleImage = (e) => {
    const file = e.target.files?.[0];

    if (!file) return;

    setImage(file);
    setPreview(URL.createObjectURL(file));
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    if (!image) {
      toast.error("Please select an image");
      return;
    }

    const formData = new FormData();

    formData.append("caption", caption);
    formData.append("image", image);

    createPostMutation.mutate(formData);
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          variants={backdropVariants}
          initial="hidden"
          animate="visible"
          exit="exit"
          onClick={onClose}
          className="fixed inset-0 z-50 flex items-center justify-center bg-black/70 backdrop-blur-sm p-4"
        >
          <motion.div
            variants={modalVariants}
            onClick={(e) => e.stopPropagation()}
            className="relative w-full max-w-md rounded-xl border border-zinc-800 bg-zinc-900 p-6 shadow-2xl"
          >
            {/* Close */}

            <motion.button
              type="button"
              onClick={onClose}
              whileHover={{
                rotate: 90,
                scale: 1.08,
              }}
              whileTap={{
                scale: 0.9,
              }}
              transition={{
                duration: 0.15,
              }}
              className="absolute right-4 top-4 flex h-10 w-10 items-center justify-center rounded-full bg-zinc-800 text-zinc-300 hover:bg-zinc-700 hover:text-white"
            >
              <X size={20} />
            </motion.button>

            <h2 className="mb-6 text-2xl font-bold text-white">
              Create Post
            </h2>

            <form onSubmit={handleSubmit}>
              {/* Upload */}

              <label className="mb-2 block text-sm font-medium text-zinc-300">
                Upload Image
              </label>

              <motion.label
                whileHover={{
                  scale: 1.01,
                }}
                whileTap={{
                  scale: 0.99,
                }}
                className="mb-5 flex h-36 cursor-pointer flex-col items-center justify-center rounded-xl border-2 border-dashed border-zinc-700 transition hover:border-blue-500"
              >
                <ImagePlus
                  size={30}
                  className="text-zinc-400"
                />

                <p className="mt-2 text-white">
                  {image
                    ? image.name
                    : "Click to upload"}
                </p>

                <p className="text-xs text-zinc-500">
                  PNG, JPG, JPEG
                </p>

                <input
                  hidden
                  type="file"
                  accept="image/*"
                  onChange={handleImage}
                />
              </motion.label>

              {/* Preview */}

              {preview && (
                <motion.div
                  layout
                  className="mb-5 overflow-hidden rounded-xl border border-zinc-700"
                >
                  <img
                    src={preview}
                    alt="Preview"
                    className="h-72 w-full object-cover"
                  />
                </motion.div>
              )}

              {/* Caption */}

              <textarea
                rows={4}
                value={caption}
                onChange={(e) =>
                  setCaption(e.target.value)
                }
                placeholder="Write a caption..."
                className="w-full resize-none rounded-xl bg-zinc-800 p-3 text-white outline-none transition focus:ring-2 focus:ring-blue-500"
              />

              {/* Buttons */}

              <div className="mt-6 flex gap-3">
                <motion.button
                  whileHover={{
                    scale: 1.03,
                  }}
                  whileTap={{
                    scale: 0.97,
                  }}
                  transition={{
                    duration: 0.15,
                  }}
                  type="submit"
                  disabled={
                    createPostMutation.isPending
                  }
                  className="flex-1 rounded-xl bg-blue-600 py-3 font-semibold text-white hover:bg-blue-500 disabled:opacity-60"
                >
                  {createPostMutation.isPending
                    ? "Uploading..."
                    : "Create"}
                </motion.button>

                <motion.button
                  whileHover={{
                    scale: 1.03,
                  }}
                  whileTap={{
                    scale: 0.97,
                  }}
                  transition={{
                    duration: 0.15,
                  }}
                  type="button"
                  onClick={onClose}
                  className="flex-1 rounded-xl bg-zinc-700 py-3 font-semibold text-white hover:bg-zinc-600"
                >
                  Cancel
                </motion.button>
              </div>
            </form>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default CreatePostModal;