"use client";

import { useState } from "react";
import { ArrowBigUp, Copy, Trash2, Check, Bookmark } from "lucide-react";
import { useDeleteSavedPromptMutation } from "@/src/store/features/prompt/prompt.features";
import type { Prompt } from "@/src/store/features/prompt/prompt.features";
import { toast } from "react-toastify";


// ─── Skeleton ─────────────────────────────────────────────────────────────────

function SkeletonCard() {
  return (
    <div className="bg-white border border-gray-100 rounded-2xl p-4 flex items-start gap-3 animate-pulse">
      <div className="w-10 h-10 bg-gray-100 rounded-xl flex-shrink-0" />
      <div className="flex-1 space-y-2">
        <div className="h-4 bg-gray-100 rounded w-2/3" />
        <div className="h-3 bg-gray-100 rounded w-full" />
        <div className="h-3 bg-gray-100 rounded w-4/5" />
        <div className="flex justify-between pt-1">
          <div className="h-3 w-16 bg-gray-100 rounded" />
          <div className="h-6 w-16 bg-gray-100 rounded-lg" />
        </div>
      </div>
    </div>
  );
}

// ─── Card ─────────────────────────────────────────────────────────────────────

function SavedCard({ prompt }: { prompt: Prompt }) {
  const [copied, setCopied] = useState(false);
  const [deleteSaved, { isLoading: isDeleting }] = useDeleteSavedPromptMutation();

  const handleCopy = async () => {
    await navigator.clipboard.writeText(prompt.prompt);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const handleRemove = async () => {
    if (!confirm("Remove from saved?")) return;
    try {
      await deleteSaved({ promptId: prompt._id }).unwrap(); 
      toast.success("Removed from saved");
    } catch {
      toast.error("Failed to remove");
    }
  };

  
  const firstTag = prompt.tags?.[0]?.toLowerCase() ?? "";
  const icon =
    firstTag.includes("code") || firstTag.includes("dev") ? "💻"
    : firstTag.includes("write") || firstTag.includes("blog") ? "✍️"
    : firstTag.includes("ai") || firstTag.includes("llm") ? "🤖"
    : firstTag.includes("market") ? "📣"
    : "📄";

    console.log(prompt, ' svd')

  return (
    <div className="bg-white border border-gray-100 rounded-2xl p-4 flex items-start gap-3 hover:border-gray-200 transition-colors group">
      {/* Icon */}
      <div className="w-10 h-10 rounded-xl bg-indigo-50 flex items-center justify-center flex-shrink-0 text-lg">
        {icon}
      </div>

      {/* Content */}
      <div className="flex-1 min-w-0">
        <div className="flex items-start justify-between gap-2 mb-1">
          <p className="text-sm font-semibold text-gray-900 leading-snug line-clamp-1">
            {prompt?.promptId?.title || prompt?.title}
          </p>
          <button
            onClick={handleRemove}
            disabled={isDeleting}
            className="p-1 rounded-lg opacity-0 group-hover:opacity-100 hover:bg-red-50 text-gray-400 hover:text-red-500 transition-all flex-shrink-0"
            aria-label="Remove saved prompt"
          >
            <Trash2 size={13} />
          </button>
        </div>

        {/* Tags */}
        <div className="flex flex-wrap gap-1 mb-2">
          {prompt.tags?.slice(0, 3).map((tag) => (
            <span
              key={tag}
              className="text-[10px] font-medium px-1.5 py-0.5 bg-gray-100 text-gray-500 rounded-full"
            >
              #{tag}
            </span>
          ))}
        </div>

        <p className="text-xs text-gray-500 leading-relaxed line-clamp-2 mb-3">
          {prompt.promptId?.prompt || prompt.prompt}
        </p>

        <div className="flex items-center justify-between">
          <span className="flex items-center gap-1 text-xs text-gray-400">
            <ArrowBigUp size={13} className="text-indigo-400" />
            {prompt.promptId?.upVote  || prompt?.upVote} upvotes
          </span>
          <button
            onClick={handleCopy}
            className="flex items-center gap-1.5 text-xs font-semibold px-3 py-1.5 bg-[#FF6B35] text-white rounded-lg hover:bg-gray-700 transition-colors"
          >
            {copied ? <Check size={12} /> : <Copy size={12} />}
            {copied ? "Copied!" : "Use"}
          </button>
        </div>
      </div>
    </div>
  );
}

// ─── List ─────────────────────────────────────────────────────────────────────

interface SavedPromptListProps {
  prompt: Prompt[]; // matches your existing prop name
  isLoading: boolean;
}

export default function SavedPromptList({ prompt, isLoading }: SavedPromptListProps) {
  if (isLoading) {
    return (
      <div className="flex flex-col gap-3">
        {Array.from({ length: 4 }).map((_, i) => <SkeletonCard key={i} />)}
      </div>
    );
  }

  if (!prompt.length) {
    return (
      <div className="flex flex-col items-center justify-center py-20 text-center">
        <div className="w-16 h-16 bg-gray-50 rounded-full flex items-center justify-center mb-4">
          <Bookmark size={28} className="text-gray-300" />
        </div>
        <p className="text-gray-900 font-semibold mb-1">No saved prompts</p>
        <p className="text-sm text-gray-500">Browse the feed and bookmark prompts you love.</p>
      </div>
    );
  }

  return (
    <div className="flex flex-col gap-3">
      {prompt.map((item) => (
        <SavedCard key={item._id} prompt={item} />
      ))}
    </div>
  );
}