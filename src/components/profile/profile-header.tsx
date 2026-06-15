import Link from "next/link";
import { Share2 } from "lucide-react";
import ProfileStats from "./profile-stats";
import ProfileAvatar from "./Profile-avatar";

interface IUser {
  _id: string;
  name: string;
  email: string;
  avatar?: string;
  bio?: string;
  tags?: string[];
  isVerify?: boolean;
  followers?: string[];
  following?: string[];
}

interface ProfileHeaderProps {
  user: IUser;
  promptCount: number;
}

export default function ProfileHeader({ user, promptCount }: ProfileHeaderProps) {
  return (
    <div className="flex flex-col items-center text-center md:gap-3 gap-1">
      <ProfileAvatar
        avatar={user?.avatar}
        name={user?.name}
        isVerify={user?.isVerify}
        size={96}
      />

      <div>
        <h1 className="text-xl font-bold text-gray-900">{user?.name}</h1>
        <p className="text-sm text-gray-500 mt-0.5">{user?.email}</p>
      </div>

      {user?.bio && (
        <p className="text-sm text-gray-600  max-w-sm">{user.bio}</p>
      )}

      {user?.tags && user.tags.length > 0 && (
        <div className="flex flex-wrap justify-center gap-1.5">
          {user.tags.map((tag, i) => (
            <span
              key={i}
              className="text-xs font-medium px-2.5 py-1 bg-indigo-50 text-indigo-600 rounded-full border border-indigo-100"
            >
              #{tag.toLowerCase()}
            </span>
          ))}
        </div>
      )}

      <ProfileStats
        promptCount={promptCount}
        followers={user?.followers?.length ?? 0}
        following={user?.following?.length ?? 0}
      />

      <div className="flex gap-2 w-full max-w-xs">
        <Link
          href="/profile/edit"
          className="flex-1 text-center text-sm font-semibold py-2.5 bg-gray-900 text-white rounded-xl hover:bg-gray-700 transition-colors"
        >
          Edit profile
        </Link>
        <button
          className="p-2.5 border border-gray-200 rounded-xl hover:bg-gray-50 transition-colors text-gray-600"
          aria-label="Share profile"
        >
          <Share2 size={18} />
        </button>
      </div>
    </div>
  );
}