// components/feed/PromptCard.tsx
import { useState } from 'react'
import Image from 'next/image'
import Link from 'next/link'
import { ArrowUp, ArrowDown, Copy, Bookmark, Share2 } from 'lucide-react'
import { useGetSavedPromptsQuery, useSavePromptMutation } from '@/src/store/features/prompt/prompt.features'
import { toast } from 'react-toastify'

interface Prompt {
  _id: string
  title: string
  prompt: string
  category: string[]
  tags: string[]
  image?: string
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

export function PromptCard({ prompt: p, promptId }: { prompt: Prompt; promptId: string }) {
  const [copied, setCopied] = useState(false)
  const [saved, setSaved] = useState(false)
  const [userVote, setUserVote] = useState<'up' | 'down' | null>(null)
  const [savePrompt, { isLoading }] = useSavePromptMutation()

  const handleSavedPrompt = async (e: React.MouseEvent) => {
    e.preventDefault()
    e.stopPropagation()
    try {
      const res = await savePrompt({ prompt: p }).unwrap()
      setSaved(prev => !prev);
     
      if(res.success) toast.success(`${res?.message}`)
        
      console.log(res)
    } catch (error: any) {
      toast.error(error?.data?.message || error?.data?.name || 'Failed to save prompt')
    }
  }

  function copyPrompt(e: React.MouseEvent) {
    e.preventDefault()
    e.stopPropagation()
    navigator.clipboard.writeText(p.prompt).then(() => {
      setCopied(true)
      setTimeout(() => setCopied(false), 1500)
    })
  }

  function handleVote(e: React.MouseEvent, direction: 'up' | 'down') {
    e.preventDefault()
    e.stopPropagation()
    setUserVote(prev => (prev === direction ? null : direction))
  }

  function handleShare(e: React.MouseEvent) {
    e.preventDefault()
    e.stopPropagation()
    const url = `${window.location.origin}/prompt-details/${promptId}`
    if (navigator.share) {
      navigator.share({ title: p.title, url }).catch(() => { })
    } else {
      navigator.clipboard.writeText(url)
    }
  }

  return (
    <Link href={`/prompt-details/${promptId}`}>
      <div className="bg-white border border-gray-100 rounded-xl p-4 hover:border-gray-200 transition-colors">

        <div className="flex items-center gap-2 mb-3">
          <Avatar name={p.createdBy.name} avatar={p.createdBy.avatar} />
          <div>
            <p className="text-[13px] font-medium text-gray-900">{p.createdBy.name}</p>
            <p className="text-[11px] text-gray-400">{timeAgo(p.createdAt)}</p>
          </div>
        </div>

        {p.image && (
          <div className="relative w-full aspect-video rounded-lg overflow-hidden mb-3 bg-gray-50">
            <Image
              src={p.image}
              alt={p.title}
              fill
              className="object-cover"
              sizes="(max-width: 768px) 100vw, 400px"
            />
          </div>
        )}

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
          <div className="flex items-center gap-1.5">
            <button
              onClick={(e) => handleVote(e, 'up')}
              className={`w-7 h-7 flex items-center justify-center rounded-lg border transition-colors ${userVote === 'up'
                  ? 'border-[#FF6B35] bg-orange-50 text-[#FF6B35]'
                  : 'border-gray-100 text-gray-400 hover:bg-gray-50 hover:text-gray-700'
                }`}
              aria-label="Upvote"
            >
              <ArrowUp size={15} strokeWidth={2.25} />
            </button>
            <span className="text-[12px] text-gray-500 min-w-[14px] text-center">
              {p.upVote}
            </span>
            <button
              onClick={(e) => handleVote(e, 'down')}
              className={`w-7 h-7 flex items-center justify-center rounded-lg border transition-colors ${userVote === 'down'
                  ? 'border-gray-400 bg-gray-100 text-gray-700'
                  : 'border-gray-100 text-gray-400 hover:bg-gray-50 hover:text-gray-700'
                }`}
              aria-label="Downvote"
            >
              <ArrowDown size={15} strokeWidth={2.25} />
            </button>
            <span className="text-[12px] text-gray-500 min-w-[14px] text-center">
              {p.downVote}
            </span>
          </div>
          <div className="flex gap-1">
            <div className="relative">
              <button
                onClick={copyPrompt}
                className="w-7 h-7 flex items-center justify-center rounded-lg border border-gray-100 text-gray-400 hover:bg-gray-50 hover:text-gray-700 transition-colors"
                aria-label="Copy prompt"
              >
                <Copy size={14} strokeWidth={2.25} />
              </button>
              {copied && (
                <span className="absolute -top-7 left-1/2 -translate-x-1/2 text-[11px] bg-white border border-gray-200 rounded-md px-2 py-0.5 whitespace-nowrap">
                  Copied!
                </span>
              )}
            </div>
            <button
              onClick={handleSavedPrompt}
              disabled={isLoading}
              className={`w-7 h-7 flex items-center justify-center rounded-lg border transition-colors disabled:opacity-50 ${saved
                  ? 'border-[#FF6B35] bg-orange-50 text-[#FF6B35]'
                  : 'border-gray-100 text-gray-400 hover:bg-gray-50 hover:text-gray-700'
                }`}
              aria-label="Save prompt"
            >
              <Bookmark size={14} strokeWidth={2.25} fill={saved ? '#FF6B35' : 'none'} />
            </button>
            <button
              onClick={handleShare}
              className="w-7 h-7 flex items-center justify-center rounded-lg border border-gray-100 text-gray-400 hover:bg-gray-50 hover:text-gray-700 transition-colors"
              aria-label="Share prompt"
            >
              <Share2 size={14} strokeWidth={2.25} />
            </button>
          </div>
        </div>
      </div>
    </Link>
  )
}