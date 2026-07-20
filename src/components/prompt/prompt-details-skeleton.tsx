
export function Skeleton() {
  return (
    <div className="min-h-screen bg-gray-50 px-4 py-6">
      <div className="max-w-2xl mx-auto animate-pulse">
        <div className="h-8 w-16 rounded-lg bg-gray-200 mb-4" />
        <div className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden">
          <div className="w-full h-56 bg-gray-200" />
          <div className="p-5 space-y-4">
            <div className="h-5 bg-gray-200 rounded w-3/4" />
            <div className="flex items-center gap-3">
              <div className="w-9 h-9 rounded-full bg-gray-200 shrink-0" />
              <div className="space-y-1.5 flex-1">
                <div className="h-3.5 bg-gray-200 rounded w-28" />
                <div className="h-3 bg-gray-200 rounded w-20" />
              </div>
              <div className="h-8 w-20 rounded-xl bg-gray-200" />
            </div>
            <div className="h-px bg-gray-100" />
            {[100, 88, 94, 70, 82].map((w, i) => (
              <div key={i} className="h-3.5 bg-gray-100 rounded" style={{ width: `${w}%` }} />
            ))}
            <div className="flex gap-2 pt-1">
              {[52, 68, 44].map((w, i) => (
                <div key={i} className="h-6 rounded-full bg-gray-100" style={{ width: w }} />
              ))}
            </div>
            <div className="h-px bg-gray-100" />
            <div className="flex gap-2">
              <div className="h-9 w-24 rounded-xl bg-gray-100" />
              <div className="h-9 w-24 rounded-xl bg-gray-100" />
              <div className="ml-auto h-9 w-20 rounded-xl bg-gray-100" />
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}