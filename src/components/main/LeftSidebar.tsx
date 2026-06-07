'use client'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { MiniProfile } from './profile/profile'

const NAV = [
  { href: '/home',      icon: '⌂',  label: 'Home' },
  { href: '/explore',   icon: '◎',  label: 'Explore' },
  { href: '/saved',     icon: '◈',  label: 'Saved' },
  { href: '/profile',   icon: '◉',  label: 'Profile' },
  { href: '/settings',  icon: '⚙',  label: 'Settings' },
]

export default function LeftSidebar() {
  const pathname = usePathname()

  return (
    <div className="flex flex-col h-full p-4">
      {/* Logo */}
      <div className="px-3 py-2 mb-5">
        <span className="text-lg font-semibold tracking-tight">
          Prompt<span className="text-[#FF6B35]">Hub</span>
        </span>
      </div>

      {/* Profile mini */}
      <MiniProfile/>

      {/* Nav links */}
      <nav className="flex flex-col gap-1 flex-1">
        {NAV.map(({ href, icon, label }) => (
          <Link
            key={href}
            href={href}
            className={`flex items-center gap-3 px-3 py-2.5 rounded-xl text-sm transition-colors
              ${pathname === href
                ? 'bg-orange-50 text-[#FF6B35] font-medium'
                : 'text-gray-600 hover:bg-gray-50 hover:text-gray-900'
              }`}
          >
            <span className="text-base w-5 text-center">{icon}</span>
            {label}
          </Link>
        ))}
      </nav>

      {/* New prompt button */}
      <div className="pt-4 border-t border-gray-100 mt-4">
        <button className="w-full flex items-center justify-center gap-2 bg-[#FF6B35] hover:bg-[#e5602e] text-white text-sm font-medium py-2.5 rounded-xl transition-colors">
          + New Prompt
        </button>
      </div>
    </div>
  )
}