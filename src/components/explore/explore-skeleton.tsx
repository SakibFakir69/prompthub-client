

// src/components/explore/explore-main.tsx
"use client"



export function CardSkeleton() {
  return (
    <div className="bg-white border border-gray-100 rounded-xl p-4 animate-pulse">
      <div className="flex items-center gap-2 mb-3">
        <div className="w-8 h-8 rounded-full bg-gray-100" />
        <div className="space-y-1.5">
          <div className="h-2.5 w-20 bg-gray-100 rounded" />
          <div className="h-2 w-12 bg-gray-100 rounded" />
        </div>
      </div>
      <div className="w-full aspect-video rounded-lg bg-gray-100 mb-3" />
      <div className="h-3.5 w-3/4 bg-gray-100 rounded mb-2" />
      <div className="h-3 w-full bg-gray-100 rounded mb-1.5" />
      <div className="h-3 w-2/3 bg-gray-100 rounded mb-3" />
      <div className="flex gap-1.5 mb-3">
        <div className="h-4 w-14 bg-gray-100 rounded-full" />
        <div className="h-4 w-16 bg-gray-100 rounded-full" />
      </div>
      <div className="flex justify-between pt-2.5 border-t border-gray-100">
        <div className="h-7 w-24 bg-gray-100 rounded-lg" />
        <div className="h-7 w-20 b-gray-100 rounded-lg" />
      </div>
    </div>
  )
}