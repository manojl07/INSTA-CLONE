import useInfiniteFeed from "../hooks/useInfiniteFeed";

import PostCard from "../components/post/PostCard";
import FeedEndTrigger from "../components/feed/FeedEndTrigger";
// import SkeletonCard from "../components/UI/SkeletonCard";
import FeedEndState from "../components/feed/FeedEndState";
import FeedPostSkeleton from "../components/UI/FeedPostSkeleton";
import ProtectedRoute from "../layouts/ProtectedRoute";


const Feed = () => {
  const {
    data,
    isLoading,
    isError,
    error,
    fetchNextPage,
    hasNextPage,
    isFetchingNextPage,
  } = useInfiniteFeed();

  if (isLoading) {
    return <ProtectedRoute />;
  }

  if (isError) {
    return (
      <div className="min-h-screen bg-black flex items-center justify-center">
        <div className="text-center">
          <h2 className="text-red-500 text-xl font-semibold">
            Failed to load feed
          </h2>

          <p className="text-zinc-400 mt-2">
            {error?.response?.data?.message || error.message}
          </p>
        </div>
      </div>
    );
  }

  // Merge all pages into one array
  const posts =
    data?.pages.flatMap(
      (page) => page.data.posts
    ) || [];

  return (
    <div className="min-h-screen bg-black py-10">

      <div className="max-w-lg mx-auto space-y-5">

        {posts.map((post) => (
          <PostCard
            key={post.id}
            post={post}
          />
        ))}

        <>
          {hasNextPage && (
            <FeedEndTrigger
              fetchNextPage={fetchNextPage}
              hasNextPage={hasNextPage}
              isFetchingNextPage={isFetchingNextPage}
            />
          )}

          {isFetchingNextPage && (
            <>
              <FeedPostSkeleton />
              <FeedPostSkeleton />
            </>
          )}

          {!hasNextPage &&
            posts.length > 0 &&
            !isFetchingNextPage && (
              <FeedEndState />
            )}
        </>

      </div>

    </div>
  );
};

export default Feed;