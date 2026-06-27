export const queryKeys = {
  feed: ["feed"],
  userPosts: (userId) => ["user-posts", userId],
  comments: (postId) => ["comments", postId],
}