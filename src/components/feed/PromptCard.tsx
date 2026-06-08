// components/feed/PromptCard.tsx
import { useState } from 'react'
import Image from 'next/image'

interface Prompt {
  _id: string
  title: string
  prompt: string
  category: string[]
  tags: string[]
  createdBy: { userId: string; name: string; avatar: string }
  upVote: number
  downVote: number
  upVotedBy: string[]
  createdAt: string
}

function timeAgo(dateStr: string) {
  const diff = Date.now() - new Date(dateStr).getTime()
  const mins = Math.floor(diff / 60000)
  if (mins < 60) return `${mins}m ago`
  const hrs = Math.floor(mins / 60)
  if (hrs < 24) return `${hrs}h ago`
  const days = Math.floor(hrs / 24)
  if (days < 30) return `${days}d ago`
  return new Date(dateStr).toLocaleDateString('en-US', { month: 'short', day: 'numeric' })
}

function Avatar({ name, avatar }: { name: string; avatar: string }) {
  const initials = name.split(' ').map(n => n[0]).slice(0, 2).join('').toUpperCase()
  const [imgError, setImgError] = useState(false)

  if (avatar && !imgError) {
    return (
      <Image
        src={avatar} width={32} height={32} alt={name}
        className="w-8 h-8 rounded-full object-cover flex-shrink-0"
        onError={() => setImgError(true)}
      />
    )
  }
  return (
    <div className="w-8 h-8 rounded-full bg-[#FF6B35] flex items-center justify-center text-white text-xs font-medium flex-shrink-0">
      {initials}
    </div>
  )
}

export function PromptCard({ prompt: p }: { prompt: Prompt }) {

 
  const [copied, setCopied] = useState(false)



  function copyPrompt() {
    navigator.clipboard.writeText(p.prompt).then(() => {
      setCopied(true)
      setTimeout(() => setCopied(false), 1500)
    })
  }

  return (
    <div className="bg-white border border-gray-100 rounded-xl p-4 hover:border-gray-200 transition-colors">
      <div className="flex items-center gap-2 mb-3">
        <Avatar name={p.createdBy.name} avatar={p.createdBy.avatar} />
        <div>
          <p className="text-[13px] font-medium text-gray-900">{p.createdBy.name}</p>
          <p className="text-[11px] text-gray-400">{timeAgo(p.createdAt)}</p>
        </div>
      </div>

      <h3 className="text-[15px] font-medium text-gray-900 mb-1.5">{p.title}</h3>
      <p className="text-[13px] text-gray-500 leading-relaxed line-clamp-2 mb-3">{p.prompt}</p>

      <div className="flex flex-wrap gap-1.5 mb-3">
        {p.category.map(c => (
          <span key={c} className="text-[11px] px-2 py-0.5 rounded-full bg-orange-50 text-orange-800 border border-orange-100">{c}</span>
        ))}
        {p.tags.map(t => (
          <span key={t} className="text-[11px] px-2 py-0.5 rounded-full bg-gray-50 text-gray-500 border border-gray-100">#{t}</span>
        ))}
      </div>

      <div className="flex items-center justify-between pt-2.5 border-t border-gray-100">
        <div className="flex gap-1.5">
          <button >
           
            ↑ 
          </button>
          <button 
           >
            ↓ 
          </button>
        </div>
        <div className="flex gap-1">
          <div className="relative">
            <button onClick={copyPrompt} className="w-7 h-7 flex items-center justify-center rounded-lg border border-gray-100 text-gray-400 hover:bg-gray-50 hover:text-gray-700 transition-colors text-sm">
              📋
            </button>
            {copied && <span className="absolute -top-7 left-1/2 -translate-x-1/2 text-[11px] bg-white border border-gray-200 rounded-md px-2 py-0.5 whitespace-nowrap">Copied!</span>}
          </div>
          <button className="w-7 h-7 flex items-center justify-center rounded-lg border border-gray-100 text-gray-400 hover:bg-gray-50 hover:text-gray-700 transition-colors text-sm">🔖</button>
          <button className="w-7 h-7 flex items-center justify-center rounded-lg border border-gray-100 text-gray-400 hover:bg-gray-50 hover:text-gray-700 transition-colors text-sm">↗</button>
        </div>
      </div>
    </div>
  )
}