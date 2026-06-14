"use client";

import { useState } from "react";
import { ArrowBigUp, ArrowBigDown, Copy, Trash2, Check, LayoutGrid } from "lucide-react";
import { useDeletePromptMutation } from "@/src/store/features/prompt/prompt.features";
import type { Prompt } from "@/src/store/features/prompt/prompt.features";
import { ToastContainer,toast } from "react-toastify";


// ─── Skeleton ─────────────────────────────────────────────────────────────────

function SkeletonCard() {
  return (
    <div className="bg-white border border-gray-100 rounded-2xl p-4 flex flex-col gap-3 animate-pulse">
      <div className="flex gap-2">
        <div className="h-5 w-16 bg-gray-100 rounded-full" />
        <div className="h-5 w-12 bg-gray-100 rounded-full" />
      </div>
      <div className="space-y-2 flex-1">
        <div className="h-4 bg-gray-100 rounded w-3/4" />
        <div className="h-3 bg-gray-100 rounded w-full" />
        <div className="h-3 bg-gray-100 rounded w-5/6" />
      </div>
      <div className="flex justify-between pt-2 border-t border-gray-50">
        <div className="h-4 w-10 bg-gray-100 rounded" />
        <div className="h-7 w-24 bg-gray-100 rounded-lg" />
      </div>
    </div>
  );
}

// ─── Card ─────────────────────────────────────────────────────────────────────

function PromptCard({ prompt }: { prompt: Prompt }) {
  const [copied, setCopied] = useState(false);
  const [deletePrompt, { isLoading: isDeleting }] = useDeletePromptMutation();

  const handleCopy = async () => {
    await navigator.clipboard.writeText(prompt.prompt);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const handleDelete = async () => {
    if (!confirm("Delete this prompt?")) return;
    try {
      await deletePrompt(prompt._id).unwrap(); // ✅ plain string id
      toast.success("Prompt deleted");
    } catch {
      toast.error("Failed to delete");
    }
  };

  return (
    <div className="bg-white border border-gray-100 rounded-2xl p-4 flex flex-col gap-3 hover:border-gray-200 transition-colors group">
      {/* Tags */}
      <div className="flex items-start justify-between gap-2">
        <div className="flex flex-wrap gap-1.5">
          {prompt.tags?.slice(0, 2).map((tag) => (
            <span
              key={tag}
              className="text-[10px] font-semibold px-2 py-0.5 rounded-full bg-indigo-50 text-indigo-600 capitalize"
            >
              #{tag}
            </span>
          ))}
        </div>
        <button
          onClick={handleDelete}
          disabled={isDeleting}
          className="p-1 rounded-lg opacity-0 group-hover:opacity-100 hover:bg-red-50 text-gray-400 hover:text-red-500 transition-all"
          aria-label="Delete prompt"
        >
          <Trash2 size={13} />
        </button>
      </div>

      {/* Content */}
      <div className="flex-1">
        <p className="text-sm font-semibold text-gray-900 leading-snug mb-1.5 line-clamp-2">
          {prompt.title}
        </p>
        <p className="text-xs text-gray-500 leading-relaxed line-clamp-3">
          {prompt.prompt}
        </p>
      </div>

      {/* Footer */}
      <div className="flex items-center justify-between pt-2 border-t border-gray-50">
        <div className="flex items-center gap-2 text-xs text-gray-400">
          <span className="flex items-center gap-0.5">
            <ArrowBigUp size={14} className="text-indigo-400" />
            {prompt.upVote}
          </span>
          <span className="flex items-center gap-0.5">
            <ArrowBigDown size={14} className="text-gray-300" />
            {prompt.downVote}
          </span>
        </div>
        <button
          onClick={handleCopy}
          className="flex items-center gap-1.5 text-xs font-semibold px-3 py-1.5 bg-gray-900 text-white rounded-lg hover:bg-gray-700 transition-colors"
        >
          {copied ? <Check size={12} /> : <Copy size={12} />}
          {copied ? "Copied!" : "Use prompt"}
        </button>
      </div>
    </div>
  );
}

// ─── Grid ─────────────────────────────────────────────────────────────────────

interface MyPromptProps {
  data: Prompt[];
  isLoading: boolean;
}

export default function MyPrompt({ data, isLoading }: MyPromptProps) {
  if (isLoading) {
    return (
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3">
        {Array.from({ length: 6 }).map((_, i) => <SkeletonCard key={i} />)}
      </div>
    );
  }

  if (!data.length) {
    return (
      <div className="flex flex-col items-center justify-center py-20 text-center">
        <div className="w-16 h-16 bg-gray-50 rounded-full flex items-center justify-center mb-4">
          <LayoutGrid size={28} className="text-gray-300" />
        </div>
        <p className="text-gray-900 font-semibold mb-1">No prompts yet</p>
        <p className="text-sm text-gray-500">Share your first prompt with the community.</p>
      </div>
    );
  }

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3">
      {data.map((prompt) => (
        <PromptCard key={prompt._id} prompt={prompt} />
      ))}
    </div>
  );
}