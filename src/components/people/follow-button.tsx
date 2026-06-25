

import { useState, useEffect, useCallback, useRef } from "react";
import { Search, X, ChevronDown, Users, FileText, Calendar, ArrowLeft, SlidersHorizontal, Check, Loader2 } from "lucide-react";

// ---------- Types (mirror the backend contract) ----------

interface SearchUser {
  _id: string;
  name: string;
  email: string;
  gender: string;
  age: number;
  followers: number;
  avatarUrl?: string;
  isFollowing: boolean;
}

interface UserProfile extends SearchUser {
  totalPosts: number;
  joinedAt: string;
  bio?: string;
}

interface SearchResponse {
  data: SearchUser[];
  pagination: {
    nextCursor: string | null;
    hasNextPage: boolean;
  };
}

interface Filters {
  name: string;
  gender: string;
  minAge: string;
  sortBy: "followers" | "name";
}

const GENDER_OPTIONS = ["ALL", "MALE", "FEMALE", "OTHER"];




export function FollowButton({
  isFollowing,
  onToggle,
  size = "sm",
}: {
  isFollowing: boolean;
  onToggle: () => Promise<void> | void;
  size?: "sm" | "md";
}) {
  const [pending, setPending] = useState(false);
  const [hover, setHover] = useState(false);

  const handleClick = async (e: React.MouseEvent) => {
    e.stopPropagation();
    if (pending) return;
    setPending(true);
    try {
      await onToggle();
    } finally {
      setPending(false);
    }
  };

  const pad = size === "sm" ? "px-3 py-1.5 text-[12px]" : "px-4 py-2 text-[13px]";

  let label = "Follow";
  if (isFollowing) label = hover ? "Unfollow" : "Following";

  return (
    <button
      onClick={handleClick}
      onMouseEnter={() => setHover(true)}
      onMouseLeave={() => setHover(false)}
      disabled={pending}
      className={`flex items-center justify-center gap-1.5 rounded-full font-medium transition disabled:opacity-60 ${pad} ${
        isFollowing
          ? hover
            ? "border border-red-300 bg-red-50 text-red-600"
            : "border border-gray-200 bg-white text-gray-700 hover:bg-gray-50"
          : "border border-indigo-600 bg-indigo-600 text-white hover:bg-indigo-700"
      }`}
    >
      {pending ? (
        <Loader2 size={size === "sm" ? 12 : 13} className="animate-spin" />
      ) : isFollowing && !hover ? (
        <Check size={size === "sm" ? 12 : 13} />
      ) : null}
      {label}
    </button>
  );
}