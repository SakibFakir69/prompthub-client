


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

export function ProfileDetail({
  userId,
  onBack,
  onToggleFollow,
}: {
  userId: string;
  onBack: () => void;
  onToggleFollow: (id: string) => Promise<void>;
}) {
  const [profile, setProfile] = useState<UserProfile | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    let active = true;
    setLoading(true);
    mockGetProfile(userId).then((p) => {
      if (active) {
        setProfile(p);
        setLoading(false);
      }
    });
    return () => {
      active = false;
    };
  }, [userId]);

  const handleToggle = async () => {
    await onToggleFollow(userId);
    setProfile((p) => (p ? { ...p, isFollowing: !p.isFollowing, followers: p.followers + (p.isFollowing ? -1 : 1) } : p));
  };

  return (
    <div>
      <button
        onClick={onBack}
        className="mb-4 flex items-center gap-1.5 text-[13px] font-medium text-gray-500 transition hover:text-gray-900"
      >
        <ArrowLeft size={15} />
        Back to search
      </button>

      {loading || !profile ? (
        <div className="animate-pulse space-y-4">
          <div className="flex items-center gap-4">
            <div className="h-16 w-16 rounded-full bg-gray-100" />
            <div className="space-y-2">
              <div className="h-4 w-32 rounded bg-gray-100" />
              <div className="h-3 w-44 rounded bg-gray-100" />
            </div>
          </div>
          <div className="h-20 rounded-lg bg-gray-100" />
        </div>
      ) : (
        <div className="space-y-5">
          <div className="flex items-start justify-between gap-4">
            <div className="flex items-center gap-4">
              <Avatar name={profile.name} size={64} />
              <div className="min-w-0">
                <h2 className="truncate text-lg font-medium text-gray-900">{profile.name}</h2>
                <p className="truncate text-[13px] text-gray-500">{profile.email}</p>
                <span className="mt-1 inline-block rounded-full bg-gray-50 px-2 py-0.5 text-[11px] text-gray-500">
                  {genderLabel(profile.gender)} · {profile.age} years
                </span>
              </div>
            </div>
            <FollowButton isFollowing={profile.isFollowing} onToggle={handleToggle} size="md" />
          </div>

          {profile.bio && <p className="text-[14px] leading-relaxed text-gray-600">{profile.bio}</p>}

          <div className="grid grid-cols-3 gap-3">
            <div className="rounded-lg bg-gray-50 p-3">
              <p className="flex items-center gap-1.5 text-[12px] text-gray-500">
                <Users size={13} /> Followers
              </p>
              <p className="mt-1 text-xl font-medium text-gray-900">{formatCount(profile.followers)}</p>
            </div>
            <div className="rounded-lg bg-gray-50 p-3">
              <p className="flex items-center gap-1.5 text-[12px] text-gray-500">
                <FileText size={13} /> Posts
              </p>
              <p className="mt-1 text-xl font-medium text-gray-900">{formatCount(profile.totalPosts)}</p>
            </div>
            <div className="rounded-lg bg-gray-50 p-3">
              <p className="flex items-center gap-1.5 text-[12px] text-gray-500">
                <Calendar size={13} /> Joined
              </p>
              <p className="mt-1 text-[13px] font-medium text-gray-900">
                {new Date(profile.joinedAt).toLocaleDateString("en-US", { month: "short", year: "numeric" })}
              </p>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}