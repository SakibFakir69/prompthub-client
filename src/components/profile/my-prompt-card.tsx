"use client";

import { useState } from "react";
import { ArrowBigUp, Copy, Trash2, Edit2, Globe, Lock, Check } from "lucide-react";
import { toast } from "react-toastify";
import EditPromptModal from "./edit-prompt-modal";
import DeletePromptDialog from "./delete-prompt-dialog";


interface Prompt {
  _id: string;
  title: string;
  prompt: string;
  tags?: string[];
  category?: string[];
  emoji?: string;
  upVote?: number;
  isPublic?: boolean;
}

const CATEGORY_COLORS: Record<string, { bg: string; text: string }> = {
  Writing: { bg: "bg-indigo-50", text: "text-indigo-600" },
  Code: { bg: "bg-emerald-50", text: "text-emerald-700" },
  Marketing: { bg: "bg-amber-50", text: "text-amber-700" },
  AI: { bg: "bg-purple-50", text: "text-purple-700" },
  Default: { bg: "bg-gray-100", text: "text-gray-600" },
};

function getCategoryStyle(cat: string) {
  return CATEGORY_COLORS[cat] ?? CATEGORY_COLORS.Default;
}

interface MyPromptCardProps {
  prompt: Prompt;
}

export default function MyPromptCard({ prompt }: MyPromptCardProps) {
  const [copied, setCopied] = useState(false);
  const [isPublic, setIsPublic] = useState(prompt.isPublic ?? true);
  const [editOpen, setEditOpen] = useState(false);
  const [deleteOpen, setDeleteOpen] = useState(false);

  const handleCopy = async () => {
    await navigator.clipboard.writeText(prompt.prompt);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const handleTogglePublic = async () => {
    const next = !isPublic;
    setIsPublic(next);
    try {
      // wire your visibility mutation here
    } catch {
      setIsPublic(!next);
      toast.error("Failed to update visibility");
    }
  };

  const primaryCategory = prompt.category?.[0] ?? "Default";
  const style = getCategoryStyle(primaryCategory);

  return (
    <>
      <div className="bg-white border border-gray-100 rounded-2xl p-4 flex flex-col gap-3 hover:border-gray-200 transition-colors group">
        {/* Header */}
        <div className="flex items-start justify-between gap-2">
          <div className="flex flex-wrap gap-1.5">
            {prompt.category?.map((cat) => {
              const s = getCategoryStyle(cat);
              return (
                <span
                  key={cat}
                  className={`text-[10px] font-semibold px-2 py-0.5 rounded-full capitalize ${s.bg} ${s.text}`}
                >
                  {cat}
                </span>
              );
            })}
          </div>
          <div className="flex items-center gap-1 opacity-0 group-hover:opacity-100 transition-opacity">
            <button
              onClick={handleTogglePublic}
              title={isPublic ? "Make private" : "Make public"}
              className="p-1.5 rounded-lg hover:bg-gray-100 text-gray-400 hover:text-gray-600 transition-colors"
            >
              {isPublic ? <Globe size={14} /> : <Lock size={14} />}
            </button>
            <button
              onClick={() => setEditOpen(true)}
              title="Edit prompt"
              className="p-1.5 rounded-lg hover:bg-gray-100 text-gray-400 hover:text-gray-600 transition-colors"
            >
              <Edit2 size={14} />
            </button>
            <button
              onClick={() => setDeleteOpen(true)}
              title="Delete prompt"
              className="p-1.5 rounded-lg hover:bg-red-50 text-gray-400 hover:text-red-500 transition-colors"
            >
              <Trash2 size={14} />
            </button>
          </div>
        </div>

        {/* Body */}
        <div className="flex-1">
          <p className="text-sm font-semibold text-gray-900 leading-snug mb-1.5 line-clamp-2">
            {prompt.emoji && <span className="mr-1.5">{prompt.emoji}</span>}
            {prompt.title}
          </p>
          <p className="text-xs text-gray-500 leading-relaxed line-clamp-3">{prompt.prompt}</p>
        </div>

        {/* Footer */}
        <div className="flex items-center justify-between pt-2 border-t border-gray-50">
          <span className="flex items-center gap-1 text-xs text-gray-400">
            <ArrowBigUp size={14} className="text-indigo-400" />
            {prompt.upVote ?? 0}
          </span>
          <button
            onClick={handleCopy}
            className="flex items-center gap-1.5 text-xs font-semibold px-3 py-1.5 bg-gray-900 text-white rounded-lg hover:bg-gray-700 transition-colors"
          >
            {copied ? <Check size={12} /> : <Copy size={12} />}
            {copied ? "Copied!" : "Use prompt"}
          </button>
        </div>
      </div>

      <EditPromptModal
        prompt={prompt}
        isOpen={editOpen}
        onClose={() => setEditOpen(false)}
      />
      <DeletePromptDialog
        promptId={prompt._id}
        promptTitle={prompt.title}
        isOpen={deleteOpen}
        onClose={() => setDeleteOpen(false)}
      />
    </>
  );
}