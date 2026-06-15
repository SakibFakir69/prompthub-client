"use client";

import { useState, KeyboardEvent } from "react";
import { X } from "lucide-react";

interface TagsInputProps {
  value: string[];
  onChange: (tags: string[]) => void;
  max?: number;
}

export default function TagsInput({ value, onChange, max = 8 }: TagsInputProps) {
  const [input, setInput] = useState("");

  const add = () => {
    const tag = input.trim().toLowerCase().replace(/^#+/, "");
    if (!tag || value.includes(tag) || value.length >= max) return;
    onChange([...value, tag]);
    setInput("");
  };

  const remove = (tag: string) => onChange(value.filter((t) => t !== tag));

  const onKeyDown = (e: KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter" || e.key === ",") {
      e.preventDefault();
      add();
    }
    if (e.key === "Backspace" && !input && value.length) {
      remove(value[value.length - 1]);
    }
  };

  return (
    <div className="flex flex-col gap-1.5">
      <label className="text-sm font-medium text-gray-700">Interests / Tags</label>

      <div className="flex flex-wrap gap-1.5 px-3 py-2.5 border border-gray-200 hover:border-gray-300 rounded-xl bg-white min-h-[44px] focus-within:ring-2 focus-within:ring-indigo-500 focus-within:border-transparent transition-colors">
        {value.map((tag) => (
          <span
            key={tag}
            className="flex items-center gap-1 text-xs font-medium px-2.5 py-1 bg-indigo-50 text-indigo-600 rounded-full border border-indigo-100"
          >
            #{tag}
            <button
              type="button"
              onClick={() => remove(tag)}
              className="text-indigo-400 hover:text-indigo-700 transition-colors"
              aria-label={`Remove ${tag}`}
            >
              <X size={11} />
            </button>
          </span>
        ))}
        {value.length < max && (
          <input
            type="text"
            value={input}
            onChange={(e) => setInput(e.target.value)}
            onKeyDown={onKeyDown}
            onBlur={add}
            placeholder={value.length === 0 ? "Add tags (press Enter)" : ""}
            className="flex-1 min-w-[120px] text-sm text-gray-900 placeholder:text-gray-400 outline-none bg-transparent"
          />
        )}
      </div>
      <p className="text-xs text-gray-400">
        Press Enter or comma to add · {value.length}/{max} tags
      </p>
    </div>
  );
}