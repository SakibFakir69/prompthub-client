"use client"

import { useGetMeQuery, useLogoutUserMutation } from "@/src/store/features/auth/auth.features"
import Image from "next/image"
import { MiniProfileSkeleton } from "./profile-skeleton"
import { useState } from "react"
import { toast, ToastContainer } from "react-toastify"
import { useDispatch } from "react-redux"
import { baseApi } from "@/src/store/baseApi"

export function MiniProfile({ profileData }: { profileData: any }) {
  const [isClick, setIsClicked] = useState<boolean>(false);

  const { data: getMeData, isLoading } = useGetMeQuery();
  const [logoutUser] = useLogoutUserMutation();
  const dispatch = useDispatch();

  const activeUser = getMeData?.data || profileData?.data || profileData || {}
  const { name, email, avatar } = activeUser

  const initials = name
    ?.split(' ')
    .map((n: string) => n[0])
    .slice(0, 2)
    .join('')
    .toUpperCase()

  const handleLogout = async () => {
    console.log("handel logout clicked")
    try {
      const res = await logoutUser().unwrap();
      setIsClicked(false);
      console.log(res)
      
      // Clear RTK Query cache
      dispatch(baseApi.util.resetApiState());
      
      toast.success("User logged out successfully");
      
    } catch (error) {
      console.log(error);
      toast.error("Failed to log out. Please try again.");
    }
  }

  if (isLoading) {
    return <MiniProfileSkeleton />
  }

  return (
    <div className="relative flex items-center gap-2.5 px-3 py-2.5 rounded-xl bg-gray-50 border border-gray-100 mb-5 cursor-pointer hover:bg-gray-100 transition-colors">
      <ToastContainer />
      
      {avatar ? (
        <Image
          src={avatar}
          width={36}
          height={36}
          alt={name ? `${name} photo` : "User profile photo"}
          className="rounded-full flex-shrink-0 object-cover w-9 h-9"
        />
      ) : (
        <div className="w-9 h-9 rounded-full bg-[#FF6B35] flex items-center justify-center text-white text-xs font-medium flex-shrink-0">
          {initials ?? '?'}
        </div>
      )}

      <div className="flex-1 min-w-0">
        <p className="text-[13px] font-medium text-gray-900 truncate">{name ?? 'Loading...'}</p>
        <p className="text-[11px] text-gray-500 truncate">{email ?? '...'}</p>
      </div>

      <svg 
        onClick={() => setIsClicked((prev) => !prev)} 
        className={`w-3.5 h-3.5 text-gray-400 flex-shrink-0 transition-transform ${isClick ? 'rotate-90' : ''}`} 
        fill="none" 
        stroke="currentColor" 
        viewBox="0 0 24 24"
      >
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
      </svg>

      {/* Dropdown Menu - Positioned absolutely so it doesn't break the flex layout */}
      {isClick && (
        <div className="absolute top-full left-0 right-0 mt-1 bg-white border border-gray-200 rounded-lg shadow-lg p-2 z-50">
          <button 
            onClick={handleLogout} 
            className="w-full text-left px-3 py-2 text-sm text-red-500 hover:bg-gray-100 rounded-md font-semibold transition-colors"
          >
            Log out
          </button>
        </div>
      )}
    </div>
  )
}