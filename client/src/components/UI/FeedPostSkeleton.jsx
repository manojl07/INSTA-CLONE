const FeedPostSkeleton = () => {
  return (
    <div className="bg-black border border-zinc-900 rounded-lg overflow-hidden animate-pulse">

      {/* Header */}
      <div className="flex items-center gap-3 px-4 py-3">
        <div className="w-8 h-8 rounded-full bg-zinc-800" />

        <div className="h-3 w-24 rounded bg-zinc-800" />
      </div>

      {/* Image */}
      <div className="aspect-square w-full bg-zinc-800" />

      {/* Actions */}
      <div className="px-4 py-4 space-y-4">

        <div className="flex gap-5">
          <div className="w-6 h-6 rounded bg-zinc-800" />
          <div className="w-6 h-6 rounded bg-zinc-800" />
          <div className="w-6 h-6 rounded bg-zinc-800" />
        </div>

        <div className="h-3 w-20 rounded bg-zinc-800" />

        <div className="space-y-2">
          <div className="h-3 w-4/5 rounded bg-zinc-800" />
          <div className="h-3 w-2/3 rounded bg-zinc-800" />
        </div>

        <div className="h-2 w-16 rounded bg-zinc-900" />

      </div>

    </div>
  );
};

export default FeedPostSkeleton;