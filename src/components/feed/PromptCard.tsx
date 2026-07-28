"use client"

import { useState, useEffect, useRef } from 'react'
import Image from 'next/image'
import Link from 'next/link'
import { ArrowUp, ArrowDown, Copy, Bookmark, Share2, Loader2 } from 'lucide-react'
import { useSavePromptMutation, useUpVoteMutation, useDownVoteMutation } from '@/src/store/features/prompt/prompt.features'
import { toast } from 'react-toastify'
import { Prompt } from "@/src/types/feed/types.feed";
import { timeAgo } from '@/src/utils/time'
import { Avatar } from './avatar-card'

// ADD LOADING ON NUMBER COUNT THIS ISSUE FIX


interface PromptCardProps {
  prompt: Prompt;
  promptId: string;
  userVote?: "up" | "down" | null;
  onVoteUpdate?: (promptId: string, type: "up" | "down", delta: number) => void;
}

type VoteState = {
  userVote?: "up" | "down" | null;
  upCount: number
  downCount: number
}

export function PromptCard({ prompt: p, promptId }: PromptCardProps) {
  const [copied, setCopied] = useState(false)
  const [saved, setSaved] = useState(false)

  const [vote, setVote] = useState<VoteState>({
    userVote: p.userVote ?? null,
    upCount: p.upVote,
    downCount: p.downVote,
  })

  // Which button is currently mid-request, so we know what to spin/disable.
  const [pending, setPending] = useState<'up' | 'down' | null>(null)
  // Synchronous lock — prevents a second click firing before React re-renders
  // with the `pending` state (closes the same race a state-only guard misses).
  const lockRef = useRef(false)

  useEffect(() => {
    setVote({
      userVote: p.userVote ?? null,
      upCount: p.upVote,
      downCount: p.downVote,
    })
  }, [p.userVote, p.upVote, p.downVote])

  const [savePrompt, { isLoading: isSaving }] = useSavePromptMutation()
  const [upVote] = useUpVoteMutation()
  const [downVote] = useDownVoteMutation()

  const handleSavedPrompt = async (e: React.MouseEvent) => {
    e.preventDefault()
    e.stopPropagation()
    try {
      const res = await savePrompt({ promptId: p._id }).unwrap();
      setSaved(prev => !prev)
      if (res.success) toast.success(res.message)
    } catch (error: any) {
      toast.error(error?.data?.message || error?.data?.name || 'Failed to save prompt')
    }
  }

  const handelUpVote = async (e: React.MouseEvent) => {
    e.preventDefault()
    e.stopPropagation()
    if (lockRef.current) return
    lockRef.current = true
    setPending('up')

    try {
      // No optimistic guess here — UI stays exactly as-is until the
      // server tells us the real numbers. That's what removes the
      // "flash to a wrong count" behavior entirely.
      const res = await upVote({ postId: p._id }).unwrap()
      if (res?.data) {
        setVote({
          userVote: res.data.userVote ?? null,
          upCount: res.data.upVote,
          downCount: res.data.downVote,
        })
      }
    } catch (error: any) {
      toast.error(error?.data?.message || 'Something went wrong')
    } finally {
      lockRef.current = false
      setPending(null)
    }
  }

  const handelDownVote = async (e: React.MouseEvent) => {
    e.preventDefault()
    e.stopPropagation()
    if (lockRef.current) return
    lockRef.current = true
    setPending('down')

    try {
      const res = await downVote({ postId: p._id }).unwrap()
      if (res?.data) {
        setVote({
          userVote: res.data.userVote ?? null,
          upCount: res.data.upVote,
          downCount: res.data.downVote,
        })
      }
    } catch (error: any) {
      toast.error(error?.data?.message || 'Something went wrong')
    } finally {
      lockRef.current = false
      setPending(null)
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

  function handleShare(e: React.MouseEvent) {
    e.preventDefault()
    e.stopPropagation()
    const url = `${window.location.origin}/prompt-details/${promptId}`
    if (navigator.share) {
      navigator.share({ title: p.title, url }).catch(() => { })
    } else {
      navigator.clipboard.writeText(url)
      toast.success('Link copied')
    }
  }

  const isVoting = pending !== null

  return (
    <div className="bg-white border border-gray-100 rounded-xl p-4 hover:border-gray-200 transition-colors">
      <div className="flex items-center gap-2 mb-3">
        <Avatar name={p.createdBy.name} avatar={p.createdBy.avatar} />
        <div>
          <p className="text-[13px] font-medium text-gray-900">{p.createdBy.name}</p>
          <p className="text-[11px] text-gray-400">{timeAgo(p.createdAt)}</p>
        </div>
      </div>

      <Link href={`/prompt-details/${promptId}`}>
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
          {p.category?.map(c => (
            <span key={c} className="text-[11px] px-2 py-0.5 rounded-full bg-orange-50 text-orange-800 border border-orange-100">{c}</span>
          ))}
          {p.tags?.map(t => (
            <span key={t} className="text-[11px] px-2 py-0.5 rounded-full bg-gray-50 text-gray-500 border border-gray-100">#{t}</span>
          ))}
        </div>
      </Link>

      <div className="flex items-center justify-between pt-2.5 border-t border-gray-100">
        <div className="flex items-center gap-1.5">
          <button
            onClick={handelUpVote}
            disabled={isVoting}
            className={`w-7 h-7 flex items-center justify-center rounded-lg border transition-colors disabled:opacity-60 disabled:cursor-not-allowed ${vote.userVote === 'up'
              ? 'border-[#FF6B35] bg-orange-50 text-[#FF6B35]'
              : 'border-gray-100 text-gray-400 hover:bg-gray-50 hover:text-gray-700'
              }`}
            aria-label="Upvote"
          >
            {pending === 'up' ? (
              <Loader2 size={14} strokeWidth={2.25} className="animate-spin" />
            ) : (
              <ArrowUp size={15} strokeWidth={2.25} />
            )}
          </button>
          <span className="text-[12px] text-gray-500 min-w-[14px] text-center">
            {vote.upCount}
          </span>
          <button
            onClick={handelDownVote}
            disabled={isVoting}
            className={`w-7 h-7 flex items-center justify-center rounded-lg border transition-colors disabled:opacity-60 disabled:cursor-not-allowed ${vote.userVote === 'down'
              ? 'border-gray-400 bg-gray-100 text-gray-700'
              : 'border-gray-100 text-gray-400 hover:bg-gray-50 hover:text-gray-700'
              }`}
            aria-label="Downvote"
          >
            {pending === 'down' ? (
              <Loader2 size={14} strokeWidth={2.25} className="animate-spin" />
            ) : (
              <ArrowDown size={15} strokeWidth={2.25} />
            )}
          </button>
          <span className="text-[12px] text-gray-500 min-w-[14px] text-center">
            {vote.downCount}
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
            disabled={isSaving}
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
  )
}