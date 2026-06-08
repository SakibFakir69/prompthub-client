// components/feed/PromptCardSkeleton.tsx
export function PromptCardSkeleton() {
  return (
    <div className="bg-white border border-gray-100 rounded-xl p-4 animate-pulse">
      <div className="flex gap-2.5 mb-3">
        <div className="w-8 h-8 rounded-full bg-gray-100 flex-shrink-0" />
        <div className="flex-1 space-y-1.5 pt-0.5">
          <div className="h-3 bg-gray-100 rounded w-2/5" />
          <div className="h-2.5 bg-gray-100 rounded w-1/4" />
        </div>
      </div>
      <div className="h-4 bg-gray-100 rounded w-3/5 mb-2.5" />
      <div className="space-y-1.5 mb-3">
        <div className="h-3 bg-gray-100 rounded w-full" />
        <div className="h-3 bg-gray-100 rounded w-4/5" />
      </div>
      <div className="flex gap-1.5 mb-3">
        {[48, 56, 40].map(w => (
          <div key={w} className="h-5 bg-gray-100 rounded-full" style={{ width: w }} />
        ))}
      </div>
      <div className="flex justify-between pt-2.5 border-t border-gray-100">
        <div className="flex gap-1.5">
          <div className="h-7 w-14 bg-gray-100 rounded-lg" />
          <div className="h-7 w-14 bg-gray-100 rounded-lg" />
        </div>
        <div className="flex gap-1">
          <div className="h-7 w-7 bg-gray-100 rounded-lg" />
          <div className="h-7 w-7 bg-gray-100 rounded-lg" />
        </div>
      </div>
    </div>
  )
}