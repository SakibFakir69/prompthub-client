'use client'

import { useState } from 'react'
import Image from 'next/image'
import {
   Check, Tag,
  Calendar, Share2, BookmarkPlus, BookmarkCheck,
  ChevronDown, ArrowLeft, Eye, EyeOff, Loader2,
} from 'lucide-react'
import { ArrowUp, ArrowDown, Copy } from 'lucide-react'
import {
  useGetPromptDetailsQuery,
  useUpVoteMutation,
  useDownVoteMutation,
  useSavePromptMutation,
} from '@/src/store/features/prompt/prompt.features'
import { useRouter } from 'next/navigation'
import { toast, ToastContainer } from 'react-toastify'

// ─── Skeleton ─────────────────────────────────────────────────────────────────

function Skeleton() {
  return (
    <div className="min-h-screen bg-gray-50 px-4 py-6">
      <div className="max-w-2xl mx-auto animate-pulse">
        <div className="h-8 w-16 rounded-lg bg-gray-200 mb-4" />
        <div className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden">
          <div className="w-full h-56 bg-gray-200" />
          <div className="p-5 space-y-4">
            <div className="h-5 bg-gray-200 rounded w-3/4" />
            <div className="flex items-center gap-3">
              <div className="w-9 h-9 rounded-full bg-gray-200 shrink-0" />
              <div className="space-y-1.5 flex-1">
                <div className="h-3.5 bg-gray-200 rounded w-28" />
                <div className="h-3 bg-gray-200 rounded w-20" />
              </div>
              <div className="h-8 w-20 rounded-xl bg-gray-200" />
            </div>
            <div className="h-px bg-gray-100" />
            {[100, 88, 94, 70, 82].map((w, i) => (
              <div key={i} className="h-3.5 bg-gray-100 rounded" style={{ width: `${w}%` }} />
            ))}
            <div className="flex gap-2 pt-1">
              {[52, 68, 44].map((w, i) => (
                <div key={i} className="h-6 rounded-full bg-gray-100" style={{ width: w }} />
              ))}
            </div>
            <div className="h-px bg-gray-100" />
            <div className="flex gap-2">
              <div className="h-9 w-24 rounded-xl bg-gray-100" />
              <div className="h-9 w-24 rounded-xl bg-gray-100" />
              <div className="ml-auto h-9 w-20 rounded-xl bg-gray-100" />
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

// ─── Not Found ────────────────────────────────────────────────────────────────

function NotFound({ onBack }: { onBack?: () => void }) {
  return (
    <div className="min-h-screen bg-gray-50 px-4 py-6">
      <div className="max-w-2xl mx-auto">
        {onBack && (
          <button
            onClick={onBack}
            className="flex items-center gap-1.5 text-sm font-medium text-gray-500 hover:text-gray-800 mb-6 transition-colors"
          >
            <ArrowLeft size={15} /> Back
          </button>
        )}
        <div className="flex flex-col items-center justify-center py-32 gap-3 text-gray-400">
          <span className="text-6xl select-none">🔍</span>
          <p className="text-base font-semibold text-gray-600">Prompt not found</p>
          <p className="text-sm">This prompt may have been removed or doesn't exist.</p>
        </div>
      </div>
    </div>
  )
}

// ─── Main ─────────────────────────────────────────────────────────────────────

function PromptDetails({ id }: { id: string }) {
  const { data, isLoading } = useGetPromptDetailsQuery(id)

  const [upVote, { isLoading: isUpVoting }]     = useUpVoteMutation()
  const [downVote, { isLoading: isDownVoting }] = useDownVoteMutation()
  const [savePrompt, { isLoading: isSaving }]   = useSavePromptMutation()

  const [isCopied,   setIsCopied]   = useState(false)
  const [isExpanded, setIsExpanded] = useState(false)
  const [isSaved,    setIsSaved]    = useState(false)
  const [shareMsg,   setShareMsg]   = useState(false)
  const [voteState,  setVoteState]  = useState<'up' | 'down' | null>(null)
  const [upCount,    setUpCount]    = useState<number | null>(null)
  const [downCount,  setDownCount]  = useState<number | null>(null)

  const prompt      = data?.data
  const displayUp   = upCount   ?? prompt?.upVote   ?? 0
  const displayDown = downCount ?? prompt?.downVote ?? 0
  const router = useRouter()
  const isVoting = isUpVoting || isDownVoting

  const handleCopy = () => {
    if (!prompt?.prompt || isCopied) return
    navigator.clipboard.writeText(prompt.prompt)
    setIsCopied(true)
    setTimeout(() => setIsCopied(false), 2000)
  }

  const handleVote = async (type: 'up' | 'down') => {
    if (!prompt?._id || isVoting) return

    const prevVoteState = voteState
    const isUnvoting = voteState === type
    const isSwitching = voteState !== null && voteState !== type

    // Optimistic local update using functional setState (safe against rapid clicks)
    if (isUnvoting) {
      setVoteState(null)
      type === 'up' ? setUpCount(v => (v ?? prompt.upVote) - 1) : setDownCount(v => (v ?? prompt.downVote) - 1)
    } else {
      if (isSwitching) {
        prevVoteState === 'up'
          ? setUpCount(v => (v ?? prompt.upVote) - 1)
          : setDownCount(v => (v ?? prompt.downVote) - 1)
      }
      setVoteState(type)
      type === 'up' ? setUpCount(v => (v ?? prompt.upVote) + 1) : setDownCount(v => (v ?? prompt.downVote) + 1)
    }

    try {
      type === 'up'
        ? await upVote({ postId: prompt._id }).unwrap()
        : await downVote({ postId: prompt._id }).unwrap()
    } catch {
      // rollback to state before this click
      setVoteState(prevVoteState)
      setUpCount(null)
      setDownCount(null)
    }
  }

  const handleSave = async () => {
    if (!prompt?._id || isSaved || isSaving) return
    try {
      const res=await savePrompt({ prompt: prompt }).unwrap();
      console.log(res)
      toast.success(res?.message)
      
      // This prompt is already saved
      setIsSaved(true)
    } catch(err) {
      toast.error(`${err?.data?.message || "Something went to wrong"}`)
      // no-op: leave isSaved false so the user can retry
    }
  }

  const handleShare = () => {
    navigator.clipboard.writeText(window.location.href)
    setShareMsg(true)
    setTimeout(() => setShareMsg(false), 2000)
  }

  const initials = prompt?.createdBy?.name
    ?.split(' ')
    .map((w: string) => w[0])
    .join('')
    .toUpperCase()
    .slice(0, 2) ?? '?'

  const onBack = () => {
    router.back()
  }

  if (isLoading) return <Skeleton />
  if (!prompt)   return <NotFound onBack={onBack} />

  const hasImage = !!prompt.image

  return (
    <div className="min-h-screen bg-gray-50 px-4 py-6">
      <div className="max-w-2xl mx-auto">

        {/* ── Back button ─────────────────────────────────────────────────── */}
        <button
          onClick={onBack}
          className="flex items-center gap-1.5 text-sm font-medium text-gray-500 hover:text-gray-900 mb-4 transition-colors group"
        >
          <ArrowLeft size={15} className="group-hover:-translate-x-0.5 transition-transform" />
          Back
        </button>

        {/* ── Single card ─────────────────────────────────────────────────── */}
        <div className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden">

          {/* ── Cover image ─────────────────────────────────────────────── */}
          {hasImage ? (
            <div className="relative w-full h-56 sm:h-72 bg-gray-100">
              <Image
                src={prompt.image!}
                alt={prompt.title || 'Prompt cover'}
                fill
                priority
                className="object-cover"
                sizes="(max-width: 768px) 100vw, 672px"
              />
              <div className="absolute top-3 right-3">
                <span className={`flex items-center gap-1 text-xs font-medium px-2.5 py-1 rounded-full backdrop-blur-sm border ${
                  prompt.visibility
                    ? 'bg-white/80 text-green-700 border-green-200'
                    : 'bg-white/80 text-gray-600 border-gray-200'
                }`}>
                  {prompt.visibility ? <Eye size={11} /> : <EyeOff size={11} />}
                  {prompt.visibility ? 'Public' : 'Private'}
                </span>
              </div>
            </div>
          ) : null}

          {/* ── Card body ───────────────────────────────────────────────── */}
          <div className="p-5 flex flex-col gap-5">

            <div className="flex items-start justify-between gap-3">
              <h1 className="text-lg sm:text-xl font-bold text-gray-900 leading-snug">
                {prompt.title || 'Untitled Prompt'}
              </h1>
              {!hasImage && (
                <span className={`flex items-center gap-1 text-xs font-medium px-2.5 py-1 rounded-full border shrink-0 ${
                  prompt.visibility
                    ? 'bg-green-50 text-green-700 border-green-200'
                    : 'bg-gray-50 text-gray-600 border-gray-200'
                }`}>
                  {prompt.visibility ? <Eye size={11} /> : <EyeOff size={11} />}
                  {prompt.visibility ? 'Public' : 'Private'}
                </span>
              )}
            </div>

            {/* Author row */}
            <div className="flex items-center gap-3">
              {prompt.createdBy?.avatar ? (
                <Image
                  src={prompt.createdBy.avatar}
                  alt={prompt.createdBy.name ?? 'Author'}
                  width={36}
                  height={36}
                  className="w-9 h-9 rounded-full object-cover border border-gray-200 shrink-0"
                />
              ) : (
                <div className="w-9 h-9 rounded-full bg-orange-100 border border-orange-200 flex items-center justify-center text-xs font-bold text-orange-700 shrink-0">
                  {initials}
                </div>
              )}
              <div className="flex-1 min-w-0">
                <p className="text-sm font-semibold text-gray-900 truncate">
                  {prompt.createdBy?.name || 'Anonymous'}
                </p>
                <div className="flex items-center gap-1 text-xs text-gray-400 mt-0.5">
                  <Calendar size={11} />
                  {new Date(prompt.createdAt).toLocaleDateString('en-US', {
                    month: 'short', day: 'numeric', year: 'numeric',
                  })}
                </div>
              </div>
              {/* Save */}
              <button
                onClick={handleSave}
                disabled={isSaving || isSaved}
                className={`flex items-center gap-1.5 text-sm font-medium px-3.5 py-2 rounded-xl border transition-all shrink-0 disabled:cursor-default ${
                  isSaved
                    ? 'bg-[#FF6B35]/10 border-[#FF6B35] text-[#FF6B35]'
                    : 'bg-[#FF6B35] border-[#FF6B35] text-white hover:bg-[#e5602e] disabled:opacity-70'
                }`}
              >
                {isSaving ? (
                  <Loader2 size={14} className="animate-spin" />
                ) : isSaved ? (
                  <BookmarkCheck size={14} />
                ) : (
                  <BookmarkPlus size={14} />
                )}
                {isSaving ? 'Saving...' : isSaved ? 'Saved' : 'Save'}
              </button>
            </div>

            {/* Categories */}
            {prompt.category?.length > 0 && (
              <div className="flex flex-wrap gap-1.5">
                {prompt.category.map((cat: string) => (
                  <span
                    key={cat}
                    className="text-xs font-medium px-2.5 py-1 rounded-full bg-orange-50 text-[#FF6B35] border border-orange-100"
                  >
                    {cat}
                  </span>
                ))}
              </div>
            )}

            <div className="border-t border-gray-100" />

            {/* ── Prompt content ──────────────────────────────────────────── */}
            <div className="rounded-xl border border-gray-100 bg-gray-50/50 overflow-hidden">
              <div className="flex items-center justify-between px-4 py-2.5 border-b border-gray-100">
                <span className="text-[10px] font-bold uppercase tracking-widest text-gray-400">
                  Prompt
                </span>
                <button
                  onClick={handleCopy}
                  className={`flex items-center gap-1.5 text-xs font-medium px-2.5 py-1.5 rounded-lg border transition-all ${
                    isCopied
                      ? 'border-green-300 text-green-600 bg-green-50'
                      : 'border-gray-200 text-gray-500 bg-white hover:border-[#FF6B35] hover:text-[#FF6B35]'
                  }`}
                >
                  {isCopied ? <Check size={12} /> : <Copy size={12} />}
                  {isCopied ? 'Copied!' : 'Copy'}
                </button>
              </div>

              <div
                className={`px-4 py-4 font-mono text-sm text-gray-800 leading-relaxed whitespace-pre-wrap overflow-hidden transition-[max-height] duration-300 ${
                  isExpanded ? 'max-h-[9999px]' : 'max-h-52'
                }`}
              >
                {prompt.prompt}
              </div>

              <div className="border-t border-gray-100 flex justify-center py-2">
                <button
                  onClick={() => setIsExpanded(!isExpanded)}
                  className="flex items-center gap-1 text-xs text-gray-400 hover:text-gray-600 transition-colors px-4 py-1.5 rounded-lg hover:bg-gray-100"
                >
                  {isExpanded ? 'Show less' : 'Show more'}
                  <ChevronDown
                    size={13}
                    className={`transition-transform duration-200 ${isExpanded ? 'rotate-180' : ''}`}
                  />
                </button>
              </div>
            </div>

            {/* Tags */}
            {prompt.tags?.length > 0 && (
              <div className="flex items-center gap-2 flex-wrap">
                <Tag size={12} className="text-gray-300 shrink-0" />
                {prompt.tags.map((tag: string, i: number) => (
                  <span
                    key={i}
                    className="text-xs font-medium px-2.5 py-1 rounded-full border border-gray-200 bg-white text-gray-500 hover:border-[#FF6B35] hover:text-[#FF6B35] transition-colors cursor-pointer"
                  >
                    #{tag}
                  </span>
                ))}
              </div>
            )}

            <div className="border-t border-gray-100" />

            {/* ── Vote + share ─────────────────────────────────────────────── */}
            <div className="flex items-center gap-2">
              <button
                onClick={() => handleVote('up')}
                disabled={isVoting}
                className={`flex items-center gap-2 px-4 py-2 rounded-xl border text-sm font-medium transition-all disabled:opacity-60 disabled:cursor-default ${
                  voteState === 'up'
                    ? 'border-[#FF6B35] text-[#FF6B35] bg-orange-50'
                    : 'border-gray-200 text-gray-500 bg-white hover:border-orange-200 hover:text-orange-500'
                }`}
              >
                {isUpVoting ? <Loader2 size={14} className="animate-spin" /> : <ArrowUp size={14} fill={voteState === 'up' ? '#FF6B35' : 'none'} />}
                {displayUp}
              </button>

              <button
                onClick={() => handleVote('down')}
                disabled={isVoting}
                className={`flex items-center gap-2 px-4 py-2 rounded-xl border text-sm font-medium transition-all disabled:opacity-60 disabled:cursor-default ${
                  voteState === 'down'
                    ? 'border-red-400 text-red-500 bg-red-50'
                    : 'border-gray-200 text-gray-500 bg-white hover:border-red-200 hover:text-red-400'
                }`}
              >
                {isDownVoting ? <Loader2 size={14} className="animate-spin" /> : <ArrowDown size={14} fill={voteState === 'down' ? '#ef4444' : 'none'} />}
                {displayDown}
              </button>

              <div className="flex-1" />

              <button
                onClick={handleShare}
                className={`flex items-center gap-1.5 px-4 py-2 rounded-xl border text-sm font-medium transition-all ${
                  shareMsg
                    ? 'border-green-300 text-green-600 bg-green-50'
                    : 'border-gray-200 text-gray-500 bg-white hover:border-gray-300 hover:text-gray-700'
                }`}
              >
                {shareMsg ? <Check size={14} /> : <Share2 size={14} />}
                {shareMsg ? 'Link copied!' : 'Share'}
              </button>
            </div>

          </div>
        </div>
      </div>
    </div>
  )
}

export default PromptDetails