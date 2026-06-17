const Post = require('../models/post.model')
const ApiError = require('../utils/ApiError')
const { uploadImage } = require('./image.service')

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

module.exports = { createPost }