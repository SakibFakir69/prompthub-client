
"use client";


import {

  LayoutGrid
} from "lucide-react";


export function EmptyState() {
  return (
    <div className="flex flex-col items-center justify-center py-24 text-center">
      <div className="w-20 h-20 rounded-2xl bg-gradient-to-br from-orange-50 to-orange-100 flex items-center justify-center mb-5 border border-orange-100">
        <LayoutGrid size={32} className="text-[#FF6B35]/40" />
      </div>
      <p className="text-base font-bold text-gray-900 mb-1.5">No prompts yet</p>
      <p className="text-sm text-gray-400 max-w-xs leading-relaxed">
        You haven't shared any prompts yet. Hit the button above to share your first one.
      </p>
    </div>
  );
}