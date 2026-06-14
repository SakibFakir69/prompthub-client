import Image from "next/image";
import { CheckCircle } from "lucide-react";

interface ProfileAvatarProps {
  avatar?: string;
  name?: string;
  isVerify?: boolean;
  size?: number;
}

export default function ProfileAvatar({
  avatar,
  name,
  isVerify,
  size = 96,
}: ProfileAvatarProps) {
  return (
    <div className="relative inline-block" style={{ width: size, height: size }}>
      {avatar ? (
        <Image
          src={avatar}
          alt={name || "User avatar"}
          width={size}
          height={size}
          className="rounded-full object-cover border-4 border-white"
        />
      ) : (
        <div
          className="rounded-full bg-indigo-100 border-4 border-white flex items-center justify-center font-semibold text-indigo-600"
          style={{ width: size, height: size, fontSize: size * 0.35 }}
        >
          {name?.charAt(0)?.toUpperCase() || "?"}
        </div>
      )}
      {isVerify && (
        <span className="absolute bottom-0.5 right-0.5 bg-white rounded-full p-0.5">
          <CheckCircle size={18} className="text-sky-500 fill-white" />
        </span>
      )}
    </div>
  );
}