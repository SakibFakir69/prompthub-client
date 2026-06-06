'use client'
import { useState } from 'react'

export default function CreatePromptBox() {
  const [text, setText] = useState('')

  return (
    <div className="bg-white rounded-xl border border-gray-200 p-4 mb-4">
      <div className="flex gap-3">
        <div className="w-9 h-9 rounded-full bg-[#FF6B35] flex items-center justify-center text-white text-sm font-medium shrink-0">
          SK
        </div>
        <textarea
          rows={2}
          value={text}
          onChange={(e) => setText(e.target.value)}
          placeholder="Share a prompt with the community..."
          className="flex-1 resize-none text-sm bg-gray-50 border border-gray-200 rounded-lg px-3 py-2 text-gray-900 placeholder-gray-400 focus:outline-none focus:border-[#FF6B35] transition-colors"
        />
      </div>
      <div className="flex items-center justify-between mt-3">
        <div className="flex gap-2">
          <button className="text-xs px-3 py-1.5 rounded-lg border border-gray-200 text-gray-600 hover:bg-gray-50 transition-colors">
            # Tag
          </button>
          <button className="text-xs px-3 py-1.5 rounded-lg border border-gray-200 text-gray-600 hover:bg-gray-50 transition-colors">
            ◫ Category
          </button>
        </div>
        <button
          disabled={!text.trim()}
          className="text-xs px-4 py-1.5 rounded-lg bg-[#FF6B35] text-white font-medium hover:bg-[#e5602e] disabled:opacity-40 disabled:cursor-not-allowed transition-colors"
        >
          Publish
        </button>
      </div>
    </div>
  )
}