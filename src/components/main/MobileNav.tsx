'use client'
import Link from 'next/link'
import { usePathname } from 'next/navigation'

const TABS = [
  { href: '/home',    icon: '⌂', label: 'Home' },
  { href: '/explore', icon: '◎', label: 'Explore' },
  { href: '/new',     icon: '+', label: 'New' },
  { href: '/saved',   icon: '◈', label: 'Saved' },
  { href: '/profile', icon: '◉', label: 'Me' },
]

export default function MobileNav() {
  const pathname = usePathname()

  return (
    <nav className="lg:hidden fixed bottom-0 left-0 right-0 z-50 bg-white border-t border-gray-200">
      <div className="flex justify-around items-center py-2">
        {TABS.map(({ href, icon, label }) => (
          <Link
            key={href}
            href={href}
            className={`flex flex-col items-center gap-0.5 px-4 py-1 rounded-lg text-xs transition-colors
              ${pathname === href ? 'text-[#FF6B35]' : 'text-gray-500'}`}
          >
            <span className="text-xl leading-none">{icon}</span>
            {label}
          </Link>
        ))}
      </div>
    </nav>
  )
}