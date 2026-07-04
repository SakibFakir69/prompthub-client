"use client"
import { Search, X, SlidersHorizontal } from 'lucide-react'

export function EmptyState({ search }: { search: string }) {
  return (
    <div className="col-span-full flex flex-col items-center justify-center py-20 text-center">
      <div className="w-14 h-14 rounded-full bg-orange-50 flex items-center justify-center mb-4">
        <Search size={22} className="text-[#FF6B35]" strokeWidth={2} />
      </div>
      <p className="text-[15px] font-medium text-gray-900 mb-1">
        {search ? `No results for "${search}"` : 'No prompts yet'}
      </p>
      <p className="text-[13px] text-gray-400">
        {search ? 'Try a different keyword or clear your search.' : 'Check back soon for new prompts.'}
      </p>
    </div>
  )
}