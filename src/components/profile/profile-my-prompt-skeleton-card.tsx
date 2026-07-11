


export function SkeletonCard() {
  return (
    <div className="bg-white border border-gray-100 rounded-2xl overflow-hidden animate-pulse">
      <div className="h-32 bg-gray-100" />
      <div className="p-4 flex flex-col gap-3">
        <div className="flex gap-1.5">
          <div className="h-5 w-16 bg-gray-100 rounded-full" />
          <div className="h-5 w-12 bg-gray-100 rounded-full" />
        </div>
        <div className="h-4 bg-gray-100 rounded w-3/4" />
        <div className="space-y-1.5">
          <div className="h-3 bg-gray-100 rounded w-full" />
          <div className="h-3 bg-gray-100 rounded w-5/6" />
          <div className="h-3 bg-gray-100 rounded w-4/6" />
        </div>
        <div className="flex justify-between pt-2 border-t border-gray-50">
          <div className="flex gap-2">
            <div className="h-5 w-10 bg-gray-100 rounded" />
            <div className="h-5 w-10 bg-gray-100 rounded" />
          </div>
          <div className="h-7 w-24 bg-gray-100 rounded-lg" />
        </div>
      </div>
    </div>
  );
}
