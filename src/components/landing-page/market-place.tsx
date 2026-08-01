"use client"

import { Star } from "lucide-react"
import type { Prompt } from "@/src/constants/landing-page"

interface PromptCardProps {
  prompt: Prompt
  delay?: number
}

export function PromptCard({ prompt: p, delay = 0 }: PromptCardProps) {
  return (
    <div
      className="reveal bg-white border border-gray-100 rounded-xl p-4 hover:border-gray-200 transition-colors"
      style={{ transitionDelay: `${delay}s` }}
    >
      <div className="flex items-center gap-2 mb-3">
        <div
          className="w-9 h-9 rounded-full flex items-center justify-center shrink-0 text-[17px]"
          style={{ background: `${p.color}1A` }}
        >
          {p.emoji}
        </div>
        <div className="min-w-0">
          <p className="text-[13px] font-medium text-gray-900 truncate">{p.author}</p>
          <p className="text-[11px] text-gray-400">{p.category}</p>
        </div>
      </div>

      <h3 className="text-[15px] font-medium text-gray-900 mb-3 leading-snug">
        {p.title}
      </h3>

      <div className="flex items-center justify-between pt-2.5 border-t border-gray-100">
        <div className="flex items-center gap-1">
          {Array.from({ length: 5 }).map((_, i) => (
            <Star
              key={i}
              size={12}
              strokeWidth={0}
              fill={i < p.rating ? "#F59E0B" : "#e5e7eb"}
            />
          ))}
        </div>
        <span className="text-[12px] text-gray-400">{p.uses} uses</span>
      </div>
    </div>
  )
}