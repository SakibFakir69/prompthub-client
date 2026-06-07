
"use client"

import { useGetMeQuery } from "@/src/store/features/auth/auth.features"
import Image from "next/image"



export function MiniProfile() {
  
  const { data: getMeData } = useGetMeQuery()
  const { name, email, avatar } = getMeData?.data || {}

  const initials = name
    ?.split(' ')
    .map((n: string) => n[0])
    .slice(0, 2)
    .join('')
    .toUpperCase()

  return (
    <div className="flex items-center gap-2.5 px-3 py-2.5 rounded-xl bg-gray-50 border border-gray-100 mb-5 cursor-pointer hover:bg-gray-100 transition-colors">
      {avatar ? (
        <Image
          src={avatar}
          width={36}
          height={36}
          alt={`${name} photo`}
          className="rounded-full flex-shrink-0 object-cover"
        />
      ) : (
        <div className="w-9 h-9 rounded-full bg-[#FF6B35] flex items-center justify-center text-white text-xs font-medium flex-shrink-0">
          {initials ?? '?'}
        </div>
      )}

      <div className="flex-1 min-w-0">
        <p className="text-[13px] font-medium text-gray-900 truncate">{name ?? '—'}</p>
        <p className="text-[11px] text-gray-500 truncate">{email ?? '—'}</p>
      </div>

      <svg className="w-3.5 h-3.5 text-gray-400 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
      </svg>
    </div>
  )
}