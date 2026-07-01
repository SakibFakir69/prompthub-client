import Image from "next/image";
import { useState } from "react";



export function Avatar({ name, avatar }: { name: string; avatar: string }) {
  const initials = name.split(' ').map(n => n[0]).slice(0, 2).join('').toUpperCase()
  const [imgError, setImgError] = useState(false)

  if (avatar && !imgError) {
    return (
      <Image
        src={avatar} width={32} height={32} alt={name}
        className="w-8 h-8 rounded-full object-cover flex-shrink-0"
        onError={() => setImgError(true)}
      />
    )
  }
  return (
    <div className="w-8 h-8 rounded-full bg-[#FF6B35] flex items-center justify-center text-white text-xs font-medium flex-shrink-0">
      {initials}
    </div>
  )
}
