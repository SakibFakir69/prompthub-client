'use client'
import { useState } from 'react'

interface Post {
  id: string
  author: { initials: string; name: string; username: string; color: string }
  title: string
  body: string
  tags: string[]
  likes: number
  comments: number
  time: string
}

export default function PromptFeedCard({ post }: { post: Post }) {
  const [liked, setLiked] = useState(false)
  const [saved, setSaved] = useState(false)
  const [likes, setLikes] = useState(post.likes)

  const handleLike = () => {
    setLiked(!liked)
    setLikes(liked ? likes - 1 : likes + 1)
  }

  return (
    <div className="bg-white rounded-xl border border-gray-200 hover:border-gray-300 p-4 mb-3 transition-colors">
      {/* Header */}
      <div className="flex items-start gap-3 mb-3">
        <div
          className="w-8 h-8 rounded-full flex items-center justify-center text-white text-xs font-medium shrink-0"
          style={{ background: post.author.color }}
        >
          {post.author.initials}
        </div>
        <div className="flex-1 min-w-0">
          <h3 className="text-sm font-medium text-gray-900 truncate">{post.title}</h3>
          <p className="text-xs text-gray-500">{post.author.name} · {post.time}</p>
        </div>
        <button className="text-gray-400 hover:text-gray-600 text-lg leading-none">⋯</button>
      </div>

      {/* Body */}
      <p className="text-sm text-gray-600 leading-relaxed mb-3 line-clamp-3">{post.body}</p>

      {/* Tags */}
      <div className="flex flex-wrap gap-1.5 mb-3">
        {post.tags.map((tag) => (
          <span
            key={tag}
            className="text-xs px-2.5 py-0.5 rounded-full border border-gray-200 text-gray-500 hover:border-[#FF6B35] hover:text-[#FF6B35] cursor-pointer transition-colors"
          >
            {tag}
          </span>
        ))}
      </div>

      {/* Footer */}
      <div className="flex items-center justify-between pt-3 border-t border-gray-100">
        <div className="flex gap-1">
          <button
            onClick={handleLike}
            className={`flex items-center gap-1.5 text-xs px-2.5 py-1.5 rounded-lg transition-colors
              ${liked ? 'text-[#FF6B35] bg-orange-50' : 'text-gray-500 hover:bg-gray-50'}`}
          >
            {liked ? '♥' : '♡'} {likes}
          </button>
          <button className="flex items-center gap-1.5 text-xs px-2.5 py-1.5 rounded-lg text-gray-500 hover:bg-gray-50 transition-colors">
            ◎ {post.comments}
          </button>
          <button className="flex items-center gap-1.5 text-xs px-2.5 py-1.5 rounded-lg text-gray-500 hover:bg-gray-50 transition-colors">
            ⧉ Copy
          </button>
        </div>
        <button
          onClick={() => setSaved(!saved)}
          className={`text-xs px-2.5 py-1.5 rounded-lg transition-colors
            ${saved ? 'text-[#FF6B35] bg-orange-50' : 'text-gray-500 hover:bg-gray-50'}`}
        >
          {saved ? '◈' : '◇'} Save
        </button>
      </div>
    </div>
  )
}