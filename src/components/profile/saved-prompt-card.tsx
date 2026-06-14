"use client";

import { useState } from "react";
import { ArrowBigUp, Copy, Trash2, Check } from "lucide-react";

import { toast } from "react-toastify";



interface SavedPromptItem {
  _id: string;
  promptId: {
    _id: string;
    title: string;
    prompt: string;
    category?: string[];
    upVote?: number;
  } | null;
}

interface SavedPromptCardProps {
  item: SavedPromptItem;
}

const ICON_COLORS: Record<string, { bg: string; text: string }> = {
  Writing:   { bg: "bg-amber-50",   text: "text-amber-600"  },
  Code:      { bg: "bg-emerald-50", text: "text-emerald-600" },
  Marketing: { bg: "bg-pink-50",    text: "text-pink-600"   },
  AI:        { bg: "bg-indigo-50",  text: "text-indigo-600" },
  Default:   { bg: "bg-gray-100",   text: "text-gray-500"   },
};

const CATEGORY_ICONS: Record<string, string> = {
  Writing:   "✍️",
  Code:      "💻",
  Marketing: "📣",
  AI:        "🤖",
  Default:   "📄",
};

export default function SavedPromptCard({ item }: SavedPromptCardProps) {
  const [copied, setCopied] = useState(false);


  const data = item.promptId;
  if (!data) return null;

  const primaryCat = data.category?.[0] ?? "Default";
  const iconStyle = ICON_COLORS[primaryCat] ?? ICON_COLORS.Default;
  const icon = CATEGORY_ICONS[primaryCat] ?? CATEGORY_ICONS.Default;

  const handleCopy = async () => {
    await navigator.clipboard.writeText(data.prompt);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const handleDelete = async () => {
    if (!confirm("Remove this saved prompt?")) return;
    try {
     
      toast.success("Removed from saved");
    } catch {
      toast.error("Failed to remove");
    }
  };

  return (
    <div className="bg-white border border-gray-100 rounded-2xl p-4 flex items-start gap-3 hover:border-gray-200 transition-colors group">
      {/* Icon */}
      <div className={`w-10 h-10 rounded-xl flex items-center justify-center flex-shrink-0 text-lg ${iconStyle.bg}`}>
        {icon}
      </div>

      {/* Content */}
      <div className="flex-1 min-w-0">
        <div className="flex items-start justify-between gap-2 mb-1">
          <p className="text-sm font-semibold text-gray-900 leading-snug line-clamp-1">
            {data.title}
          </p>
          <div className="flex items-center gap-1 opacity-0 group-hover:opacity-100 transition-opacity flex-shrink-0">
            <button
              onClick={handleDelete}
             
              className="p-1 rounded-lg hover:bg-red-50 text-gray-400 hover:text-red-500 transition-colors"
            >
              <Trash2 size={13} />
            </button>
          </div>
        </div>

        <p className="text-xs text-gray-500 leading-relaxed line-clamp-2 mb-3">
          {data.prompt}
        </p>

        <div className="flex items-center justify-between">
          <span className="flex items-center gap-1 text-xs text-gray-400">
            <ArrowBigUp size={13} className="text-indigo-400" />
            {data.upVote ?? 0} upvotes
          </span>
          <button
            onClick={handleCopy}
            className="flex items-center gap-1.5 text-xs font-semibold px-3 py-1.5 bg-gray-900 text-white rounded-lg hover:bg-gray-700 transition-colors"
          >
            {copied ? <Check size={12} /> : <Copy size={12} />}
            {copied ? "Copied!" : "Use"}
          </button>
        </div>
      </div>
    </div>
  );
}