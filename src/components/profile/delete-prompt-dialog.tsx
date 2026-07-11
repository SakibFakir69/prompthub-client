"use client";

import { useDeletePromptMutation } from "@/src/store/features/prompt/prompt.features";
import { AlertTriangle, Loader2 } from "lucide-react";
import { toast } from "react-toastify";


interface DeletePromptDialogProps {
  promptId: string;
  promptTitle: string;
  isOpen: boolean;
  onClose: () => void;
}

export default function DeletePromptDialog({
  promptId,
  promptTitle,
  isOpen,
  onClose,
}: DeletePromptDialogProps) {
  const [deletePrompt, { isLoading }] = useDeletePromptMutation();

  if (!isOpen) return null;

  const handleDelete = async () => {
    try {
      await deletePrompt(promptId).unwrap();
      toast.success("Prompt deleted");
      onClose();
    } catch {
      toast.error("Failed to delete prompt");
    }
  };

  return (
    <div
      onClick={(e) => e.target === e.currentTarget && !isLoading && onClose()}
      className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 backdrop-blur-sm p-4"
    >
      <div className="bg-white w-full max-w-sm rounded-2xl shadow-xl border border-gray-100 p-5 flex flex-col gap-4 animate-in zoom-in-95 duration-150">
        <div className="flex items-start gap-3">
          <div className="p-2 rounded-full bg-red-50 shrink-0">
            <AlertTriangle size={18} className="text-red-500" />
          </div>
          <div className="flex flex-col gap-1">
            <h2 className="text-sm font-semibold text-gray-900">Delete prompt?</h2>
            <p className="text-xs text-gray-500 leading-relaxed">
              This will permanently delete{" "}
              <span className="font-medium text-gray-700">"{promptTitle}"</span>. This
              action can't be undone.
            </p>
          </div>
        </div>

        <div className="flex items-center justify-end gap-2 pt-1">
          <button
            onClick={onClose}
            disabled={isLoading}
            className="text-xs font-semibold px-4 py-2 rounded-lg text-gray-600 hover:bg-gray-100 transition-colors disabled:opacity-50"
          >
            Cancel
          </button>
          <button
            onClick={handleDelete}
            disabled={isLoading}
            className="flex items-center gap-1.5 text-xs font-semibold px-4 py-2 rounded-lg bg-red-500 text-white hover:bg-red-600 transition-colors disabled:opacity-50"
          >
            {isLoading && <Loader2 size={12} className="animate-spin" />}
            {isLoading ? "Deleting..." : "Delete"}
          </button>
        </div>
      </div>
    </div>
  );
}