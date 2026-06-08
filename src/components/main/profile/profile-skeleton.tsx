

export function MiniProfileSkeleton() {
  return (
    <div className="flex items-center gap-2.5 px-3 py-2.5 rounded-xl bg-gray-50 border border-gray-100 mb-5 animate-pulse">
      {/* Avatar Circle Skeleton */}
      <div className="w-9 h-9 rounded-full bg-gray-200 flex-shrink-0" />

      {/* Name and Email text lines Skeletons */}
      <div className="flex-1 space-y-1.5 min-w-0">
        <div className="h-3 bg-gray-200 rounded w-3/4" />
        <div className="h-2.5 bg-gray-200 rounded w-1/2" />
      </div>

      {/* Chevron Icon Skeleton */}
      <div className="w-3.5 h-3.5 rounded bg-gray-200 flex-shrink-0" />
    </div>
  )
}