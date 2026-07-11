"use client";

import { useState } from "react";
import Image from "next/image";
import {
  ThumbsUp, ThumbsDown, Copy, Trash2, Edit2, Check,
  LayoutGrid, Eye, EyeOff, Clock, Sparkles,
} from "lucide-react";
import { useDeletePromptMutation } from "@/src/store/features/prompt/prompt.features";
import type { Prompt } from "@/src/store/features/prompt/prompt.features";
import { toast } from "react-toastify";
import EditPromptModal from "./edit-prompt-modal";

// ─── Skeleton ─────────────────────────────────────────────────────────────────

function SkeletonCard() {
  return (
    <div className="bg-white border border-gray-100 rounded-2xl overflow-hidden animate-pulse">
      <div className="h-32 bg-gray-100" />
      <div className="p-4 flex flex-col gap-3">
        <div className="flex gap-1.5">
          <div className="h-5 w-16 bg-gray-100 rounded-full" />
          <div className="h-5 w-12 bg-gray-100 rounded-full" />
        </div>
        <div className="h-4 bg-gray-100 rounded w-3/4" />
        <div className="space-y-1.5">
          <div className="h-3 bg-gray-100 rounded w-full" />
          <div className="h-3 bg-gray-100 rounded w-5/6" />
          <div className="h-3 bg-gray-100 rounded w-4/6" />
        </div>
        <div className="flex justify-between pt-2 border-t border-gray-50">
          <div className="flex gap-2">
            <div className="h-5 w-10 bg-gray-100 rounded" />
            <div className="h-5 w-10 bg-gray-100 rounded" />
          </div>
          <div className="h-7 w-24 bg-gray-100 rounded-lg" />
        </div>
      </div>
    </div>
  );
}

// ─── Card ─────────────────────────────────────────────────────────────────────

function PromptCard({ prompt, onView }: { prompt: Prompt; onView?: (id: string) => void }) {
  const [copied, setCopied] = useState(false);
  const [confirm, setConfirm] = useState(false);
  const [editOpen, setEditOpen] = useState(false);
  const [deletePrompt, { isLoading: isDeleting }] = useDeletePromptMutation();

  const handleCopy = async (e: React.MouseEvent) => {
    e.stopPropagation();
    await navigator.clipboard.writeText(prompt.prompt);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const handleEditClick = (e: React.MouseEvent) => {
    e.stopPropagation();
    setEditOpen(true);
  };

  const handleDeleteClick = (e: React.MouseEvent) => {
    e.stopPropagation();
    if (!confirm) {
      setConfirm(true);
      setTimeout(() => setConfirm(false), 3000);
      return;
    }
    handleDeleteConfirm();
  };

  const handleDeleteConfirm = async () => {
    try {
      await deletePrompt(prompt._id).unwrap();
      toast.success("Prompt deleted");
    } catch {
      toast.error("Failed to delete");
      setConfirm(false);
    }
  };

  const formatDate = (d: string) =>
    new Date(d).toLocaleDateString("en-US", { month: "short", day: "numeric", year: "numeric" });

  const hasImage = !!prompt.image;

  return (
    <>
      <div
        onClick={() => onView?.(prompt._id)}
        className="group bg-white border border-gray-100 rounded-2xl overflow-hidden hover:border-[#FF6B35]/30 hover:shadow-md transition-all duration-200 cursor-pointer flex flex-col"
      >
        {/* Image or gradient placeholder */}
        <div className="relative h-32 shrink-0 overflow-hidden">
          {hasImage ? (
            <Image
              src={prompt.image!}
              alt={prompt.title}
              fill
              className="object-cover group-hover:scale-[1.02] transition-transform duration-300"
              sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
            />
          ) : (
            <div className="w-full h-full bg-gradient-to-br from-orange-50 via-white to-orange-100 flex items-center justify-center">
              <Sparkles className="w-8 h-8 text-[#FF6B35]/20" />
            </div>
          )}

          <div className="absolute inset-0 bg-black/0 group-hover:bg-black/10 transition-colors duration-200" />

          {/* Visibility + edit + delete — top row */}
          <div className="absolute top-2.5 left-2.5 right-2.5 flex items-center justify-between">
            <span className={`flex items-center gap-1 text-[10px] font-semibold px-2 py-0.5 rounded-full backdrop-blur-sm border ${
              prompt?.visibility
                ? "bg-white/80 text-green-700 border-green-200"
                : "bg-white/80 text-gray-500 border-gray-200"
            }`}>
              {prompt?.visibility ? <Eye size={10} /> : <EyeOff size={10} />}
              {prompt?.visibility ? "Public" : "Private"}
            </span>

            <div className="flex items-center gap-1 opacity-0 group-hover:opacity-100 transition-opacity">
              <button
                onClick={handleEditClick}
                className="flex items-center gap-1 text-[10px] font-semibold px-2 py-1 rounded-full backdrop-blur-sm border bg-white/80 text-gray-500 border-gray-200 hover:bg-blue-50 hover:text-blue-500 hover:border-blue-200 transition-all"
                aria-label="Edit prompt"
              >
                <Edit2 size={10} />
                Edit
              </button>

              <button
                onClick={handleDeleteClick}
                disabled={isDeleting}
                className={`flex items-center gap-1 text-[10px] font-semibold px-2 py-1 rounded-full backdrop-blur-sm border transition-all ${
                  confirm
                    ? "bg-red-500 text-white border-red-500"
                    : "bg-white/80 text-gray-500 border-gray-200 hover:bg-red-50 hover:text-red-500 hover:border-red-200"
                }`}
                aria-label="Delete prompt"
              >
                <Trash2 size={10} />
                {confirm ? "Confirm?" : "Delete"}
              </button>
            </div>
          </div>
        </div>

        {/* Card body */}
        <div className="p-4 flex flex-col gap-2.5 flex-1">
          {prompt.category?.length > 0 && (
            <div className="flex flex-wrap gap-1">
              {prompt.category.slice(0, 3).map((cat) => (
                <span
                  key={cat}
                  className="text-[10px] font-semibold px-2 py-0.5 rounded-full bg-[#FF6B35]/8 text-[#FF6B35] border border-[#FF6B35]/15"
                >
                  {cat}
                </span>
              ))}
              {prompt.category.length > 3 && (
                <span className="text-[10px] font-semibold px-2 py-0.5 rounded-full bg-gray-50 text-gray-400 border border-gray-100">
                  +{prompt.category.length - 3}
                </span>
              )}
            </div>
          )}

          <p className="text-sm font-bold text-gray-900 leading-snug line-clamp-2 group-hover:text-[#FF6B35] transition-colors">
            {prompt.title}
          </p>

          <p className="text-xs text-gray-400 leading-relaxed line-clamp-3 flex-1 font-mono">
            {prompt.prompt}
          </p>

          {prompt.tags?.length > 0 && (
            <div className="flex flex-wrap gap-1">
              {prompt.tags.slice(0, 3).map((tag) => (
                <span key={tag} className="text-[10px] text-gray-400 px-1.5 py-0.5 rounded bg-gray-50">
                  #{tag}
                </span>
              ))}
            </div>
          )}

          <div className="flex items-center justify-between pt-2.5 border-t border-gray-50 mt-auto">
            <div className="flex items-center gap-3">
              <span className="flex items-center gap-1 text-xs text-gray-400">
                <ThumbsUp size={11} className="text-[#FF6B35]" />
                {prompt.upVote}
              </span>
              <span className="flex items-center gap-1 text-xs text-gray-400">
                <ThumbsDown size={11} className="text-gray-300" />
                {prompt.downVote}
              </span>
              <span className="flex items-center gap-1 text-[10px] text-gray-300">
                <Clock size={10} />
                {formatDate(prompt.createdAt)}
              </span>
            </div>

            <button
              onClick={handleCopy}
              className={`flex items-center gap-1.5 text-xs font-semibold px-3 py-1.5 rounded-xl transition-all ${
                copied ? "bg-green-500 text-white" : "bg-[#FF6B35] text-white hover:bg-[#FF6B35]"
              }`}
            >
              {copied ? <Check size={11} /> : <Copy size={11} />}
              {copied ? "Copied!" : "Copy"}
            </button>
          </div>
        </div>
      </div>

      <EditPromptModal prompt={prompt} isOpen={editOpen} onClose={() => setEditOpen(false)} />
    </>
  );
}

// ─── Empty state ──────────────────────────────────────────────────────────────

function EmptyState() {
  return (
    <div className="flex flex-col items-center justify-center py-24 text-center">
      <div className="w-20 h-20 rounded-2xl bg-gradient-to-br from-orange-50 to-orange-100 flex items-center justify-center mb-5 border border-orange-100">
        <LayoutGrid size={32} className="text-[#FF6B35]/40" />
      </div>
      <p className="text-base font-bold text-gray-900 mb-1.5">No prompts yet</p>
      <p className="text-sm text-gray-400 max-w-xs leading-relaxed">
        You haven't shared any prompts yet. Hit the button above to share your first one.
      </p>
    </div>
  );
}

// ─── Grid ─────────────────────────────────────────────────────────────────────

interface MyPromptProps {
  data: Prompt[];
  isLoading: boolean;
  onView?: (id: string) => void;
}

export default function MyPrompt({ data, isLoading, onView }: MyPromptProps) {
  if (isLoading) {
    return (
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
        {Array.from({ length: 6 }).map((_, i) => <SkeletonCard key={i} />)}
      </div>
    );
  }

  if (!data?.length) return <EmptyState />;

  return (
    <>
      <p className="text-xs text-gray-400 mb-3">
        {data.length} prompt{data.length !== 1 ? "s" : ""}
      </p>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
        {data.map((prompt) => (
          <PromptCard key={prompt._id} prompt={prompt} onView={onView} />
        ))}
      </div>
    </>
  );
}