"use client";

import { useState } from "react";
import { useGetPromptDetailsQuery } from "@/src/store/features/prompt/prompt.features";
import {
  Copy, Check, ThumbsUp, ThumbsDown,
  Tag, Calendar, Share2, Bookmark,
  ChevronDown, UserCircle
} from "lucide-react";
import Image from "next/image";

// ADD BACK BUTTON

function PromptDetails({ id }: { id: string }) {
  const { data, isLoading } = useGetPromptDetailsQuery(id);
  const [isCopied, setIsCopied] = useState(false);
  const [isExpanded, setIsExpanded] = useState(false);
  const [voteState, setVoteState] = useState<"up" | "down" | null>(null);
  const [upvoteCount, setUpvoteCount] = useState<number | null>(null);
  const [downvoteCount, setDownvoteCount] = useState<number | null>(null);

  const prompt = data?.data;

  // Initialize counts from data once loaded
  const displayUpvotes = upvoteCount ?? prompt?.upVote ?? 0;
  const displayDownvotes = downvoteCount ?? prompt?.downVote ?? 0;

  const handleCopy = () => {
    if (!prompt?.prompt || isCopied) return;
    navigator.clipboard.writeText(prompt.prompt);
    setIsCopied(true);
    setTimeout(() => setIsCopied(false), 2000);
  };

  const handleVote = (type: "up" | "down") => {
    if (voteState === type) {
      // toggle off
      setVoteState(null);
      type === "up"
        ? setUpvoteCount(displayUpvotes - 1)
        : setDownvoteCount(displayDownvotes - 1);
    } else {
      // switch vote
      if (voteState === "up") setUpvoteCount(displayUpvotes - 1);
      if (voteState === "down") setDownvoteCount(displayDownvotes - 1);
      setVoteState(type);
      type === "up"
        ? setUpvoteCount(displayUpvotes + 1)
        : setDownvoteCount(displayDownvotes + 1);
    }
  };

  // ── Skeleton ──────────────────────────────────────────────
  if (isLoading) {
    return (
      <div className="max-w-2xl mx-auto px-4 py-6 space-y-5 animate-pulse">
        <div className="flex items-center justify-between pb-4 border-b border-gray-200">
          <div className="h-5 bg-gray-200 rounded w-1/2" />
          <div className="h-8 bg-gray-200 rounded-lg w-20" />
        </div>
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 rounded-full bg-gray-200" />
            <div className="h-4 bg-gray-200 rounded w-28" />
          </div>
          <div className="h-3 bg-gray-200 rounded w-20" />
        </div>
        <div className="w-full aspect-video rounded-xl bg-gray-200" />
        <div className="w-full h-44 rounded-xl bg-gray-200" />
        <div className="flex gap-2">
          {[60, 72, 50].map((w, i) => (
            <div key={i} className="h-6 rounded-full bg-gray-200" style={{ width: w }} />
          ))}
        </div>
        <div className="flex gap-2 pt-2">
          <div className="h-9 w-24 rounded-lg bg-gray-200" />
          <div className="h-9 w-24 rounded-lg bg-gray-200" />
        </div>
      </div>
    );
  }

  // ── Not found ─────────────────────────────────────────────
  if (!prompt) {
    return (
      <div className="flex flex-col items-center justify-center py-24 text-gray-400 gap-3">
        <span className="text-5xl">🔍</span>
        <p className="text-base font-medium text-gray-500">Prompt not found</p>
        <p className="text-sm">This prompt may have been removed or doesn't exist.</p>
      </div>
    );
  }

  // ── Main ──────────────────────────────────────────────────
  return (
    <div className="max-w-2xl mx-auto px-4 py-6">

      {/* Header */}
      <div className="flex items-center justify-between pb-4 border-b border-gray-200 mb-5 gap-3">
        <h1 className="text-base font-semibold text-gray-900 truncate">
          {prompt.title || "Untitled Prompt"}
        </h1>
        <button className="flex items-center gap-1.5 text-sm font-medium px-4 py-2 rounded-lg bg-[#FF6B35] text-white hover:bg-[#e5602e] transition-colors shrink-0">
          <Bookmark size={14} />
          Save
        </button>
      </div>

      {/* Author & Date */}
      <div className="flex items-center justify-between mb-5">
        <div className="flex items-center gap-2">
          {prompt?.createdBy?.avatar ? (
            <Image
              src={prompt?.createdBy?.avatar}
              alt={prompt?.createdBy?.name}
              className="w-8 h-8 rounded-full object-cover border border-gray-200"
            />
          ) : (
            <div className="w-8 h-8 rounded-full bg-orange-100 border border-orange-200 flex items-center justify-center text-xs font-medium text-orange-700">
              {prompt?.createdBy?.name
                ?.split(" ")
                .map((w: string) => w[0])
                .join("")
                .toUpperCase()
                .slice(0, 2) || <UserCircle size={18} />}
            </div>
          )}
          <span className="text-sm font-medium text-gray-800">
            {prompt?.createdBy?.name || "Unknown"}
          </span>
        </div>
        <div className="flex items-center gap-1.5 text-xs text-gray-400">
          <Calendar size={13} />
          {new Date(prompt.createdAt).toLocaleDateString("en-US", {
            month: "short", day: "numeric", year: "numeric",
          })}
        </div>
      </div>

      {/* Image */}
      {prompt.image && (
        <div className="w-full relative aspect-video rounded-xl overflow-hidden border border-gray-200 bg-gray-100 mb-5">
          <Image
            src={prompt.image}
            alt={prompt.title || "Prompt image"}
            fill
            className="object-cover"
            sizes="(max-width: 768px) 100vw, 672px"
          />
        </div>
      )}

      {/* Prompt Content */}
      <div className="border border-gray-200 rounded-xl overflow-hidden mb-5 bg-white">
        {/* Box header */}
        <div className="flex items-center justify-between px-4 py-3 border-b border-gray-200">
          <span className="text-[11px] font-semibold uppercase tracking-widest text-gray-400">
            Prompt
          </span>
          <button
            onClick={handleCopy}
            className={`flex items-center gap-1.5 text-xs font-medium px-2.5 py-1.5 rounded-lg border transition-all duration-200
              ${isCopied
                ? "border-green-300 text-green-600 bg-green-50"
                : "border-gray-200 text-gray-500 bg-gray-50 hover:border-[#FF6B35] hover:text-[#FF6B35] hover:bg-white"
              }`}
          >
            {isCopied ? <Check size={13} /> : <Copy size={13} />}
            {isCopied ? "Copied!" : "Copy prompt"}
          </button>
        </div>

        {/* Content */}
        <div
          className={`px-4 py-4 font-mono text-sm text-gray-800 leading-relaxed whitespace-pre-wrap overflow-y-auto transition-all duration-300 ${
            isExpanded ? "max-h-none" : "max-h-64"
          }`}
        >
          {prompt.prompt}
        </div>

        {/* Expand toggle */}
        <div className="border-t border-gray-100 flex justify-center py-2">
          <button
            onClick={() => setIsExpanded(!isExpanded)}
            className="flex items-center gap-1 text-xs text-gray-400 hover:text-gray-600 transition-colors px-3 py-1 rounded-lg hover:bg-gray-50"
          >
            {isExpanded ? "Show less" : "Show more"}
            <ChevronDown
              size={13}
              className={`transition-transform duration-200 ${isExpanded ? "rotate-180" : ""}`}
            />
          </button>
        </div>
      </div>

      {/* Tags */}
      {prompt.tags?.length > 0 && (
        <div className="flex items-center gap-2 flex-wrap mb-5">
          <Tag size={13} className="text-gray-400 shrink-0" />
          {prompt.tags.map((tag: string, i: number) => (
            <span
              key={i}
              className="text-xs font-medium px-2.5 py-1 rounded-full border border-gray-200 bg-gray-50 text-gray-600 hover:border-[#FF6B35] hover:text-[#FF6B35] transition-colors cursor-pointer"
            >
              #{tag}
            </span>
          ))}
        </div>
      )}

      {/* Divider */}
      <div className="border-t border-gray-200 mb-5" />

      {/* Actions */}
      <div className="flex items-center gap-2">
        {/* Upvote */}
        <button
          onClick={() => handleVote("up")}
          className={`flex items-center gap-2 px-4 py-2 rounded-lg border text-sm font-medium transition-all
            ${voteState === "up"
              ? "border-[#FF6B35] text-[#FF6B35] bg-orange-50"
              : "border-gray-200 text-gray-500 bg-white hover:border-gray-300 hover:text-gray-700"
            }`}
        >
          <ThumbsUp size={15} />
          {displayUpvotes}
        </button>

        {/* Downvote */}
        <button
          onClick={() => handleVote("down")}
          className={`flex items-center gap-2 px-4 py-2 rounded-lg border text-sm font-medium transition-all
            ${voteState === "down"
              ? "border-red-400 text-red-500 bg-red-50"
              : "border-gray-200 text-gray-500 bg-white hover:border-gray-300 hover:text-gray-700"
            }`}
        >
          <ThumbsDown size={15} />
          {displayDownvotes}
        </button>

        <div className="flex-1" />

        {/* Share */}
        <button className="flex items-center gap-1.5 px-4 py-2 rounded-lg border border-gray-200 bg-white text-sm font-medium text-gray-500 hover:border-gray-300 hover:text-gray-700 transition-all">
          <Share2 size={15} />
          Share
        </button>
      </div>

    </div>
  );
}

export default PromptDetails;