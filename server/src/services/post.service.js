const Post = require('../models/post.model')
const ApiError = require('../utils/ApiError')
const { uploadImage } = require('./image.service')
const { deleteImage } = require('./image.service')

const sanitizePost = (post) => ({
  id: post._id,
  caption: post.caption,
  imageUrl: post.imageUrl,
  likesCount: post.likesCount,
  commentsCount: post.commentsCount,
  isEdited: post.isEdited,
  user: post.user,
  createdAt: post.createdAt,
});

const sanitizeFeedPost = (post) => ({
  id: post._id,
  caption: post.caption,
  imageUrl: post.imageUrl,
  likesCount: post.likesCount,
  commentsCount: post.commentsCount,
  isEdited: post.isEdited,
  createdAt: post.createdAt,

  user: {
    id: post.user._id,
    username: post.user.username,
    profileImg: post.user.profileImg,
  }
});

const createPost = async ({ caption, image, userId }) => {
  if (!image) {
    throw new ApiError(400, "Image is required")
  }

  const uploadedImage = await uploadImage(image, "/insta-clone/post-images");

  const post = await Post.create({
    caption,
    imageUrl: uploadedImage.imageUrl,
    imageFileId: uploadedImage.imageFileId,
    user: userId,
  })

  return sanitizePost(post);
}

const deletePost = async (postId, userId) => {
  const post = await Post.findById(postId);

  if (!post) {
    throw new ApiError(404, "Post not found");
  }

  if (post.user.toString() !== userId.toString()) {
    throw new ApiError(403, "Unauthorized");
  }

  await deleteImage(post.imageFileId)

  await Post.findByIdAndDelete(postId);

  return true;
}

const getUserPosts = async ({ userId, page = 1, limit = 12 }) => {
  const skip = (page - 1) * limit;

  const [posts, total] = await Promise.all([Post
    .find({ user: userId })
    .sort({ createdAt: -1 })
    .skip(skip)
    .limit(limit),

  Post.countDocuments({ user: userId })
  ]);

  return {
    posts: posts.map(sanitizePost),
    pagination: { page, limit, total, totalPages: Math.ceil(total / limit) }
  }
}

const getFeed = async ({ page = 1, limit = 10 }) => {
  const skip = (page - 1) * limit;

  const [posts, total] = await Promise.all([
    Post.find()
      .populate("user", "username profileImg")
      .sort({ createdAt: -1 })
      .skip(skip)
      .limit(limit),

    Post.countDocuments()
  ])

  return {
    posts: posts.map(sanitizeFeedPost),
    pagination: {
      page, limit, total, totalPages: Math.ceil(total / limit)
    }
  }
}

module.exports = { createPost, deletePost, getUserPosts, getFeed }