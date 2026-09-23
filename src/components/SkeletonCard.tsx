export function SkeletonCard() {
  return (
    <div className="animate-pulse rounded-xl bg-gray-800">
      <div className="aspect-[2/3] rounded-t-xl bg-gray-700" />
      <div className="space-y-2 p-3">
        <div className="h-4 w-3/4 rounded bg-gray-700" />
        <div className="h-3 w-1/2 rounded bg-gray-700" />
      </div>
    </div>
  );
}

export function SkeletonRow({ count = 6 }: { count?: number }) {
  return (
    <div className="grid grid-cols-2 gap-4 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6">
      {Array.from({ length: count }).map((_, i) => (
        <SkeletonCard key={i} />
      ))}
    </div>
  );
}

export function SkeletonDetails() {
  return (
    <div className="min-h-screen animate-pulse bg-gray-950">
      {/* Hero backdrop */}
      <div className="relative h-[50vh] bg-gray-800">
        <div className="absolute bottom-0 left-0 right-0 p-6 md:p-12">
          <div className="mx-auto flex max-w-7xl gap-6">
            <div className="hidden h-[300px] w-[200px] flex-shrink-0 rounded-xl bg-gray-700 md:block" />
            <div className="flex-1 space-y-4">
              <div className="h-4 w-48 rounded bg-gray-700" />
              <div className="h-12 w-2/3 rounded bg-gray-700" />
              <div className="flex gap-2">
                <div className="h-6 w-20 rounded-full bg-gray-700" />
                <div className="h-6 w-24 rounded-full bg-gray-700" />
                <div className="h-6 w-16 rounded-full bg-gray-700" />
              </div>
              <div className="h-4 w-80 rounded bg-gray-700" />
              <div className="flex gap-3 pt-2">
                <div className="h-10 w-28 rounded-full bg-gray-700" />
                <div className="h-10 w-32 rounded-full bg-gray-700" />
                <div className="h-10 w-32 rounded-full bg-gray-700" />
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Body */}
      <div className="mx-auto max-w-7xl space-y-8 px-4 py-8 md:px-6">
        <div className="space-y-3">
          <div className="h-5 w-32 rounded bg-gray-800" />
          <div className="h-3 w-full rounded bg-gray-800" />
          <div className="h-3 w-11/12 rounded bg-gray-800" />
          <div className="h-3 w-4/5 rounded bg-gray-800" />
        </div>

        {/* Cast skeletons */}
        <div className="space-y-4">
          <div className="h-5 w-24 rounded bg-gray-800" />
          <div className="grid grid-cols-4 gap-4 md:grid-cols-8 xl:grid-cols-10">
            {Array.from({ length: 10 }).map((_, i) => (
              <div key={i} className="flex flex-col items-center gap-2">
                <div className="h-20 w-20 rounded-full bg-gray-800" />
                <div className="h-3 w-16 rounded bg-gray-800" />
                <div className="h-2 w-12 rounded bg-gray-800" />
              </div>
            ))}
          </div>
        </div>

        {/* Grid skeletons */}
        <div className="grid grid-cols-3 gap-4 md:grid-cols-6">
          {Array.from({ length: 6 }).map((_, i) => (
            <div key={i} className="aspect-[2/3] rounded-xl bg-gray-800" />
          ))}
        </div>
      </div>
    </div>
  );
}

export function SkeletonHero() {
  return (
    <div className="relative h-[70vh] min-h-[500px] animate-pulse bg-gray-800">
      <div className="absolute bottom-0 left-0 right-0 p-12">
        <div className="mx-auto max-w-7xl space-y-4">
          <div className="h-6 w-32 rounded bg-gray-700" />
          <div className="h-12 w-96 rounded bg-gray-700" />
          <div className="h-4 w-[500px] rounded bg-gray-700" />
          <div className="h-4 w-64 rounded bg-gray-700" />
          <div className="flex gap-3">
            <div className="h-12 w-36 rounded-full bg-gray-700" />
            <div className="h-12 w-36 rounded-full bg-gray-700" />
          </div>
        </div>
      </div>
    </div>
  );
}
