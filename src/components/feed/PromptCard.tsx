
"use client"

import { useState } from 'react'
import Image from 'next/image'
import Link from 'next/link'
import { ArrowUp, ArrowDown, Copy, Bookmark, Share2 } from 'lucide-react'
import { useSavePromptMutation, useUpVoteMutation, useDownVoteMutation } from '@/src/store/features/prompt/prompt.features'
import { toast } from 'react-toastify'
import { Prompt } from "@/src/types/feed/types.feed";
import { timeAgo } from '@/src/utils/time'
import { Avatar } from './avatar-card'


interface PromptCardProps {
  prompt: Prompt
  promptId: string
  onVoteUpdate?: (promptId: string, type: 'up' | 'down', delta: number) => void
}

export function PromptCard({ prompt: p, promptId, onVoteUpdate }: PromptCardProps) {
  const [copied, setCopied] = useState(false)
  const [saved, setSaved] = useState(false)
  const [userVote, setUserVote] = useState<'up' | 'down' | null>(null)

  const [savePrompt, { isLoading: isSaving }] = useSavePromptMutation()
  const [upVote, { isLoading: isLoadingUpVote }] = useUpVoteMutation()
  const [downVote, { isLoading: isLoadingDownVote }] = useDownVoteMutation()

  const handleSavedPrompt = async (e: React.MouseEvent) => {
    e.preventDefault()
    e.stopPropagation()
    console.log({promptId:p._id} , ' saved prompt');
    try {
      const res = await savePrompt({ prompt: p }).unwrap();
      console.log({promptId:p._id} , ' saved prompt');

      setSaved(prev => !prev)
      if (res.success) toast.success(res.message)
    } catch (error: any) {
      toast.error(error?.data?.message || error?.data?.name || 'Failed to save prompt')
    }
  }

  const handelUpVote = async (e: React.MouseEvent) => {
    e.preventDefault()
    e.stopPropagation()
    if (isLoadingUpVote || isLoadingDownVote) return

    const wasUp = userVote === 'up'
    const wasDown = userVote === 'down'

    // Optimistic local update
    onVoteUpdate?.(p._id, 'up', wasUp ? -1 : 1)
    if (wasDown) onVoteUpdate?.(p._id, 'down', -1)
    setUserVote(wasUp ? null : 'up')

    try {
      const res = await upVote({ postId: p._id }).unwrap()
      toast.success(res?.message)
    } catch (error: any) {
      // rollback
      onVoteUpdate?.(p._id, 'up', wasUp ? 1 : -1)
      if (wasDown) onVoteUpdate?.(p._id, 'down', 1)
      setUserVote(wasUp ? 'up' : wasDown ? 'down' : null)
      toast.error(error?.data?.message || 'Something went wrong')
    }
  }

  const handelDownVote = async (e: React.MouseEvent) => {
    e.preventDefault()
    e.stopPropagation()
    if (isLoadingUpVote || isLoadingDownVote) return

    const wasDown = userVote === 'down'
    const wasUp = userVote === 'up'

    onVoteUpdate?.(p._id, 'down', wasDown ? -1 : 1)
    if (wasUp) onVoteUpdate?.(p._id, 'up', -1)
    setUserVote(wasDown ? null : 'down')

    try {
      const res = await downVote({ postId: p._id }).unwrap()
      toast.success(res?.message)
    } catch (error: any) {
      onVoteUpdate?.(p._id, 'down', wasDown ? 1 : -1)
      if (wasUp) onVoteUpdate?.(p._id, 'up', 1)
      setUserVote(wasDown ? 'down' : wasUp ? 'up' : null)
      toast.error(error?.data?.message || 'Something went wrong')
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
      navigator.share({ title: p.title, url }).catch(() => {})
    } else {
      navigator.clipboard.writeText(url)
      toast.success('Link copied')
    }
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
            disabled={isLoadingUpVote || isLoadingDownVote}
            className={`w-7 h-7 flex items-center justify-center rounded-lg border transition-colors disabled:opacity-60 ${
              userVote === 'up'
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
            onClick={handelDownVote}
            disabled={isLoadingUpVote || isLoadingDownVote}
            className={`w-7 h-7 flex items-center justify-center rounded-lg border transition-colors disabled:opacity-60 ${
              userVote === 'down'
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
            disabled={isSaving}
            className={`w-7 h-7 flex items-center justify-center rounded-lg border transition-colors disabled:opacity-50 ${
              saved
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