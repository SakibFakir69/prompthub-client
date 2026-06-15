"use client";

import { useRef, useState } from "react";
import Image from "next/image";
import { Camera, Loader2 } from "lucide-react";

interface AvatarUploadProps {
  currentAvatar?: string;
  name?: string;
  onUpload: (file: File) => Promise<void>;
  isUploading?: boolean;
}

export default function AvatarUpload({
  currentAvatar,
  name,
  onUpload,
  isUploading,
}: AvatarUploadProps) {
  const inputRef = useRef<HTMLInputElement>(null);
  const [preview, setPreview] = useState<string | null>(null);

  const handleChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    // Local preview immediately
    const reader = new FileReader();
    reader.onload = () => setPreview(reader.result as string);
    reader.readAsDataURL(file);

    await onUpload(file);
  };

  const displaySrc = preview ?? currentAvatar;

  return (
    <div className="flex flex-col items-center gap-3">
      <button
        type="button"
        onClick={() => inputRef.current?.click()}
        disabled={isUploading}
        className="relative group w-24 h-24 rounded-full focus:outline-none focus-visible:ring-2 focus-visible:ring-indigo-500"
        aria-label="Change profile photo"
      >
        {displaySrc ? (
          <Image
            src={displaySrc}
            alt="Profile photo"
            width={96}
            height={96}
            className="w-24 h-24 rounded-full object-cover border-4 border-white shadow-sm"
          />
        ) : (
          <div className="w-24 h-24 rounded-full bg-indigo-100 border-4 border-white shadow-sm flex items-center justify-center text-indigo-600 font-semibold text-3xl">
            {name?.charAt(0)?.toUpperCase() ?? "?"}
          </div>
        )}

        {/* Overlay */}
        <span className="absolute inset-0 rounded-full bg-black/40 flex items-center justify-center opacity-0 group-hover:opacity-100 group-focus-visible:opacity-100 transition-opacity">
          {isUploading ? (
            <Loader2 size={22} className="text-white animate-spin" />
          ) : (
            <Camera size={22} className="text-white" />
          )}
        </span>
      </button>

      <button
        type="button"
        onClick={() => inputRef.current?.click()}
        disabled={isUploading}
        className="text-xs font-medium text-indigo-600 hover:text-indigo-700 disabled:opacity-50"
      >
        {isUploading ? "Uploading…" : "Change photo"}
      </button>

      <input
        ref={inputRef}
        type="file"
        accept="image/*"
        className="hidden"
        onChange={handleChange}
      />
    </div>
  );
}