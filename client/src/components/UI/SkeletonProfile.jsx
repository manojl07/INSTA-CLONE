import Skeleton from "./Skeleton";

const SkeletonProfile = () => {
  return (
    <div className="min-h-screen bg-black">
      <div className="mx-auto max-w-4xl px-6 py-10">

        {/* Profile Header */}

        <div className="flex flex-col items-center gap-8 md:flex-row md:items-start">

          {/* Avatar */}

          <Skeleton className="h-40 w-40 rounded-full shrink-0" />

          {/* Right */}

          <div className="flex-1 space-y-6 w-full">

            {/* Username + Button */}

            <div className="flex items-center gap-4">

              <Skeleton className="h-8 w-40 rounded-md" />

              <Skeleton className="h-10 w-32 rounded-lg" />

            </div>

            {/* Stats */}

            <div className="flex gap-8">

              <Skeleton className="h-6 w-16 rounded" />

              <Skeleton className="h-6 w-16 rounded" />

              <Skeleton className="h-6 w-16 rounded" />

            </div>

            {/* Bio */}

            <div className="space-y-3">

              <Skeleton className="h-5 w-48 rounded" />

              <Skeleton className="h-4 w-full rounded" />

              <Skeleton className="h-4 w-3/4 rounded" />

            </div>

          </div>

        </div>

        {/* Divider */}

        <div className="my-10 border-t border-zinc-800" />

        {/* Posts Grid */}

        <div className="grid grid-cols-3 gap-1">

          {Array.from({ length: 9 }).map((_, index) => (
            <Skeleton
              key={index}
              className="aspect-square rounded-sm"
            />
          ))}

        </div>

      </div>
    </div>
  );
};

export default SkeletonProfile;