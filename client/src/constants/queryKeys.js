export queryKeys = {
  feed: ["feed"],
  userPost: (userId) => ["user-posts", userId],
  comments: (postId) => ["comments", postId],
}