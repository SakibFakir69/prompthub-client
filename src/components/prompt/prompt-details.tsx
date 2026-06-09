"use client";

import { useState } from "react";
import { useGetPromptDetailsQuery } from "@/src/store/features/prompt/prompt.features";
import { Copy, Check, ThumbsUp, ThumbsDown, Tag, Calendar, UserCircle } from "lucide-react";
import Image from "next/image";

function PromptDetails({ id }: { id: string }) {
    console.log(id, ' client')
  const { data, isLoading } = useGetPromptDetailsQuery(id);
  const [isCopied, setIsCopied] = useState(false);

  // Assuming your RTK query returns { data: { ...promptObject } }
  const prompt = data?.data;
    console.log(prompt , ' prompt detials')
  const handleCopy = () => {
    if (prompt?.prompt) {
      navigator.clipboard.writeText(prompt.prompt);
      setIsCopied(true);
      setTimeout(() => setIsCopied(false), 2000); // Reset after 2 seconds
    }
  };

  if (isLoading) {
    return (
      <div className="max-w-3xl mx-auto p-4 space-y-4 animate-pulse">
        <div className="h-6 bg-gray-200 rounded w-1/2"></div>
        <div className="h-4 bg-gray-200 rounded w-1/4"></div>
        <div className="h-64 bg-gray-200 rounded-xl"></div>
        <div className="h-24 bg-gray-200 rounded-xl"></div>
      </div>
    );
  }

  if (!prompt) {
    return (
      <div className="text-center py-20 text-gray-500">
        Prompt not found or error loading data.
      </div>
    );
  }

  return (
    <div className="max-w-3xl mx-auto bg-gray-50 min-h-screen pb-10">
      {/* Header Section */}
      <div className="sticky top-0 z-10 bg-gray-50/80 backdrop-blur-sm border-b border-gray-200 flex items-center justify-between py-3 px-4 mb-6">
        <h1 className="text-base font-semibold text-gray-900 truncate mr-4">
          {prompt.title || "Untitled Prompt"}
        </h1>
        <button className="flex items-center gap-1.5 text-sm bg-[#FF6B35] text-white px-3 py-1.5 rounded-lg hover:bg-[#e5602e] transition-colors shrink-0">
          Save
        </button>
      </div>

      <div className="px-4 space-y-5">
        {/* Author & Date Info */}
        <div className="flex items-center justify-between text-sm text-gray-500">
          <div className="flex items-center gap-2">
            {prompt.createdBy?.avatar ? (
              <img 
                src={prompt.createdBy.avatar} 
                alt={prompt.createdBy.name} 
                className="w-7 h-7 rounded-full object-cover"
              />
            ) : (
              <UserCircle className="w-7 h-7 text-gray-400" />
            )}
            <span className="font-medium text-gray-700">{prompt.createdBy?.name || "Unknown"}</span>
          </div>
          <div className="flex items-center gap-1.5">
            <Calendar size={14} />
            <span>{new Date(prompt.createdAt).toLocaleDateString()}</span>
          </div>
        </div>

        {/* Image (if exists) */}
                {/* Image (if exists) */}
        {prompt.image && (
          <div className="w-full relative aspect-video rounded-xl overflow-hidden border border-gray-200 bg-gray-100">
            <Image 
              src={prompt.image} 
              alt={prompt.title || "Prompt image"} 
              fill
              className="object-cover" 
              sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
            />
          </div>
        )}

        {/* Prompt Content Box - The core UX element */}
        <div className="bg-white border border-gray-200 rounded-xl p-5 relative group shadow-sm">
          <div className="flex items-center justify-between mb-3">
            <h3 className="text-xs font-semibold uppercase tracking-wider text-gray-400">Prompt</h3>
            <button 
              onClick={handleCopy}
              className="flex items-center gap-1.5 text-xs font-medium px-2.5 py-1 rounded-md transition-all duration-200 
                         bg-gray-100 text-gray-600 hover:bg-[#FF6B35] hover:text-white group-hover:opacity-100 opacity-0"
            >
              {isCopied ? <Check size={14} /> : <Copy size={14} />}
              {isCopied ? "Copied!" : "Copy"}
            </button>
          </div>
          <p className="text-gray-800 whitespace-pre-wrap leading-relaxed font-mono text-sm">
            {prompt.prompt}
          </p>
        </div>

        {/* Tags */}
        {prompt.tags?.length > 0 && (
          <div className="flex items-center gap-2 flex-wrap">
            <Tag size={14} className="text-gray-400" />
            {prompt.tags.map((tag, index) => (
              <span 
                key={index} 
                className="bg-gray-200 text-gray-700 px-2.5 py-1 rounded-full text-xs font-medium hover:bg-gray-300 transition-colors cursor-pointer"
              >
                #{tag}
              </span>
            ))}
          </div>
        )}

        {/* Voting / Actions Bar */}
        <div className="flex items-center gap-3 pt-4 border-t border-gray-200">
          <button className="flex items-center gap-2 px-4 py-2 rounded-lg border border-gray-200 bg-white text-gray-600 hover:border-[#FF6B35] hover:text-[#FF6B35] transition-colors text-sm font-medium">
            <ThumbsUp size={16} />
            <span>{prompt.upVote || 0}</span>
          </button>
          <button className="flex items-center gap-2 px-4 py-2 rounded-lg border border-gray-200 bg-white text-gray-600 hover:border-red-400 hover:text-red-400 transition-colors text-sm font-medium">
            <ThumbsDown size={16} />
            <span>{prompt.downVote || 0}</span>
          </button>
        </div>
      </div>
    </div>
  );
}

export default PromptDetails;