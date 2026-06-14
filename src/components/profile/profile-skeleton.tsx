
export default function ProfileSkeleton() {
  return (
    <div className="min-h-screen bg-gray-50 animate-pulse">
      {/* Top nav */}
      <header className="sticky top-0 z-10 bg-white border-b border-gray-100 px-4 py-3 flex items-center justify-between">
        <div className="h-5 w-16 bg-gray-100 rounded-full" />
        <div className="h-5 w-14 bg-gray-100 rounded-full" />
      </header>

      <main className="max-w-2xl mx-auto px-4 py-6 flex flex-col gap-6">
        {/* Profile card skeleton */}
        <section className="bg-white rounded-2xl p-6 border border-gray-100 flex flex-col items-center gap-5">
          {/* Avatar */}
          <div className="w-24 h-24 rounded-full bg-gray-100" />

          {/* Name + email */}
          <div className="flex flex-col items-center gap-2">
            <div className="h-5 w-36 bg-gray-100 rounded-full" />
            <div className="h-3.5 w-48 bg-gray-100 rounded-full" />
          </div>

          {/* Bio */}
          <div className="flex flex-col items-center gap-1.5 w-full max-w-sm">
            <div className="h-3 w-full bg-gray-100 rounded-full" />
            <div className="h-3 w-4/5 bg-gray-100 rounded-full" />
          </div>

          {/* Tags */}
          <div className="flex gap-2 justify-center flex-wrap">
            {[60, 80, 56, 72].map((w, i) => (
              <div key={i} className="h-6 bg-gray-100 rounded-full" style={{ width: w }} />
            ))}
          </div>

          {/* Stats */}
          <div className="grid grid-cols-3 divide-x divide-gray-100 border border-gray-100 rounded-xl overflow-hidden w-full">
            {[0, 1, 2].map((i) => (
              <div key={i} className="flex flex-col items-center py-4 gap-2">
                <div className="h-5 w-8 bg-gray-100 rounded" />
                <div className="h-2.5 w-14 bg-gray-100 rounded-full" />
              </div>
            ))}
          </div>

          {/* Action buttons */}
          <div className="flex gap-2 w-full max-w-xs">
            <div className="flex-1 h-10 bg-gray-100 rounded-xl" />
            <div className="w-10 h-10 bg-gray-100 rounded-xl" />
          </div>
        </section>

        {/* Tabs + prompt grid skeleton */}
        <section className="bg-white rounded-2xl border border-gray-100 overflow-hidden">
          {/* Tabs */}
          <div className="px-4 pt-4 flex border-b border-gray-100 gap-4 pb-3">
            <div className="h-4 w-28 bg-gray-100 rounded-full" />
            <div className="h-4 w-20 bg-gray-100 rounded-full" />
          </div>

          {/* Prompt cards */}
          <div className="p-4 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3">
            {Array.from({ length: 6 }).map((_, i) => (
              <div
                key={i}
                className="border border-gray-100 rounded-2xl p-4 flex flex-col gap-3"
              >
                <div className="flex gap-2">
                  <div className="h-5 w-14 bg-gray-100 rounded-full" />
                  <div className="h-5 w-10 bg-gray-100 rounded-full" />
                </div>
                <div className="space-y-2 flex-1">
                  <div className="h-4 bg-gray-100 rounded w-3/4" />
                  <div className="h-3 bg-gray-100 rounded w-full" />
                  <div className="h-3 bg-gray-100 rounded w-5/6" />
                </div>
                <div className="flex justify-between pt-2 border-t border-gray-50">
                  <div className="h-4 w-10 bg-gray-100 rounded" />
                  <div className="h-7 w-24 bg-gray-100 rounded-lg" />
                </div>
              </div>
            ))}
          </div>
        </section>
      </main>
    </div>
  );
}