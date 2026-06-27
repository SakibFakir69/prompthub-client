import { useGetTrendingQuery } from "@/src/store/features/prompt/prompt.features";




export default function RightSidebar() {
  const { data, isLoading } = useGetTrendingQuery(undefined);

  const tags       = data?.data?.tags       ?? [];
  const categories = data?.data?.categories ?? [];

  return (
    <div className="p-4 flex flex-col gap-4">

      {/* Top Categories */}
      <div className="bg-white rounded-xl border border-gray-100 p-4">
        <h3 className="text-sm font-medium text-gray-900 mb-3">Top categories</h3>

        {isLoading ? (
          <div className="flex flex-wrap gap-1.5">
            {Array.from({ length: 6 }).map((_, i) => (
              <div key={i} className="h-6 w-20 rounded-full bg-gray-100 animate-pulse" />
            ))}
          </div>
        ) : (
          <div className="flex flex-wrap gap-1.5">
            {categories.map(({ category }: { category: string }) => (
              <button
                key={category}
                className="text-xs px-3 py-1 rounded-full border border-gray-200 text-gray-600 hover:border-[#FF6B35] hover:text-[#FF6B35] transition-colors"
              >
                {category}
              </button>
            ))}
          </div>
        )}
      </div>

      {/* Trending Tags */}
      <div className="bg-white rounded-xl border border-gray-100 p-4">
        <div className="flex items-center justify-between mb-3">
          <h3 className="text-sm font-medium text-gray-900">Trending</h3>
          <button className="text-xs text-[#FF6B35] hover:underline">See all</button>
        </div>

        {isLoading ? (
          <div className="flex flex-col gap-2">
            {Array.from({ length: 4 }).map((_, i) => (
              <div key={i} className="flex items-center justify-between py-1">
                <div className="h-4 w-28 rounded bg-gray-100 animate-pulse" />
                <div className="h-3 w-12 rounded bg-gray-100 animate-pulse" />
              </div>
            ))}
          </div>
        ) : (
          <div className="flex flex-col gap-2">
            {tags.map(({ tag, count }: { tag: string; count: number }) => (
              <div
                key={tag}
                className="flex items-center justify-between py-1 cursor-pointer group"
              >
                <span className="text-sm text-gray-600 group-hover:text-[#FF6B35] transition-colors">
                  #{tag}
                </span>
                <span className="text-xs text-gray-400">{count} uses</span>
              </div>
            ))}
          </div>
        )}
      </div>

    </div>
  );
}