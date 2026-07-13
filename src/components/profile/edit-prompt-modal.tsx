"use client";

import { useState, useEffect } from "react";
import { X, Loader2, Eye, EyeOff } from "lucide-react";
import { toast } from "react-toastify";
import { useUpdatePromptMutation } from "@/src/store/features/prompt/prompt.features";
import type { Prompt } from "@/src/store/features/prompt/prompt.features";

interface EditPromptModalProps {
  prompt: Prompt;
  isOpen: boolean;
  onClose: () => void;
}

export default function EditPromptModal({ prompt, isOpen, onClose }: EditPromptModalProps) {
  const [title, setTitle] = useState(prompt.title);
  const [body, setBody] = useState(prompt.prompt);
  const [tags, setTags] = useState(prompt.tags?.join(", ") ?? "");
  const [visibility, setVisibility] = useState(prompt.visibility ?? true);
  const [updatePrompt, { isLoading }] = useUpdatePromptMutation();

  useEffect(() => {
    if (isOpen) {
      setTitle(prompt.title);
      setBody(prompt.prompt);
      setTags(prompt.tags?.join(", ") ?? "");
      setVisibility(prompt.visibility ?? true);
    }
  }, [isOpen, prompt]);

  if (!isOpen) return null;

  const isDirty =
    title !== prompt.title ||
    body !== prompt.prompt ||
    tags !== (prompt.tags?.join(", ") ?? "") ||
    visibility !== (prompt.visibility ?? true);

  const handleSave = async () => {
    if (!title.trim() || !body.trim()) {
      toast.error("Title and prompt can't be empty");
      return;
    }
    try {
      await updatePrompt({
        id: prompt._id,
        title: title.trim(),
        prompt: body.trim(),
        tags: tags.split(",").map((t) => t.trim()).filter(Boolean),
        visibility,
      }).unwrap();
      toast.success("Prompt updated");
      onClose();
    } catch {
      toast.error("Failed to update prompt");
    }
  };

  return (
    <div
      onClick={(e) => e.target === e.currentTarget && !isLoading && onClose()}
      className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 backdrop-blur-sm p-4"
    >
      <div
        onClick={(e) => e.stopPropagation()}
        className="bg-white w-full max-w-lg rounded-2xl shadow-xl border border-gray-100 overflow-hidden"
      >
        <div className="flex items-center justify-between px-5 py-4 border-b border-gray-100">
          <h2 className="text-sm font-semibold text-gray-900">Edit prompt</h2>
          <button onClick={onClose} disabled={isLoading} className="p-1.5 rounded-lg text-gray-400 hover:text-gray-600 hover:bg-gray-100 transition-colors disabled:opacity-50">
            <X size={16} />
          </button>
        </div>

        <div className="px-5 py-4 flex flex-col gap-4">
          <div className="flex flex-col gap-1.5">
            <label className="text-xs font-medium text-gray-500">Title</label>
            <input
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              maxLength={100}
              disabled={isLoading}
              className="w-full text-sm px-3 py-2 rounded-lg border border-gray-200 focus:outline-none focus:ring-2 focus:ring-gray-900/10 disabled:bg-gray-50"
            />
          </div>

          <div className="flex flex-col gap-1.5">
            <div className="flex items-center justify-between">
              <label className="text-xs font-medium text-gray-500">Prompt</label>
              <span className="text-[11px] text-gray-400">{body.length}/2000</span>
            </div>
            <textarea
              value={body}
              onChange={(e) => setBody(e.target.value)}
              maxLength={2000}
              disabled={isLoading}
              rows={6}
              className="w-full text-sm px-3 py-2 rounded-lg border border-gray-200 focus:outline-none focus:ring-2 focus:ring-gray-900/10 disabled:bg-gray-50 resize-none"
            />
          </div>

          <div className="flex flex-col gap-1.5">
            <label className="text-xs font-medium text-gray-500">Tags (comma separated)</label>
            <input
              value={tags}
              onChange={(e) => setTags(e.target.value)}
              disabled={isLoading}
              className="w-full text-sm px-3 py-2 rounded-lg border border-gray-200 focus:outline-none focus:ring-2 focus:ring-gray-900/10 disabled:bg-gray-50"
              placeholder="writing, marketing, ai"
            />
          </div>

          {/* Visibility toggle */}
          <div className="flex flex-col gap-1.5">
            <label className="text-xs font-medium text-gray-500">Visibility</label>
            <div className="flex gap-2">
              <button
                type="button"
                onClick={() => setVisibility(true)}
                disabled={isLoading}
                className={`flex-1 flex items-center justify-center gap-1.5 text-xs font-semibold px-3 py-2 rounded-lg border transition-colors disabled:opacity-50 ${
                  visibility
                    ? "bg-green-50 border-green-200 text-green-700"
                    : "bg-white border-gray-200 text-gray-400 hover:bg-gray-50"
                }`}
              >
                <Eye size={13} />
                Public
              </button>
              <button
                type="button"
                onClick={() => setVisibility(false)}
                disabled={isLoading}
                className={`flex-1 flex items-center justify-center gap-1.5 text-xs font-semibold px-3 py-2 rounded-lg border transition-colors disabled:opacity-50 ${
                  !visibility
                    ? "bg-gray-100 border-gray-300 text-gray-700"
                    : "bg-white border-gray-200 text-gray-400 hover:bg-gray-50"
                }`}
              >
                <EyeOff size={13} />
                Private
              </button>
            </div>
            <p className="text-[11px] text-gray-400">
              {visibility
                ? "Anyone can find and view this prompt."
                : "Only you can see this prompt."}
            </p>
          </div>
        </div>

        <div className="flex items-center justify-end gap-2 px-5 py-4 border-t border-gray-100 bg-gray-50/50">
          <button onClick={onClose} disabled={isLoading} className="text-xs font-semibold px-4 py-2 rounded-lg text-gray-600 hover:bg-gray-100 disabled:opacity-50">
            Cancel
          </button>
          <button
            onClick={handleSave}
            disabled={isLoading || !isDirty}
            className="flex items-center gap-1.5 text-xs font-semibold px-4 py-2 rounded-lg bg-[#FF6B35] text-white hover:bg-[#FF6B35] disabled:opacity-40"
          >
            {isLoading && <Loader2 size={12} className="animate-spin" />}
            {isLoading ? "Saving..." : "Save changes"}
          </button>
        </div>
      </div>
    </div>
  );
}