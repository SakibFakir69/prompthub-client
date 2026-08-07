'use client'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { Home, Compass, PlusCircle, CircleUser, Users } from 'lucide-react'

const TABS = [
  { href: '/home', icon: Home, label: 'Home' },
  { href: '/explore', icon: Compass, label: 'Explore' },
  { href: '/create', icon: PlusCircle, label: 'Create' },
  { href: '/people', icon: Users, label: 'People' },
  { href: '/profile', icon: CircleUser, label: 'Me' },
]

export default function MobileNav() {
  const pathname = usePathname()

  return (
    <nav className="lg:hidden fixed bottom-0 left-0 right-0 z-50 bg-white border-t border-gray-200">
      <div className="flex justify-around items-center py-2">
        
        {TABS.map(({ href, icon: Icon, label }) => {
          const isActive = pathname === href
          return (
            <Link
              key={href}
              href={href}
              className={`flex flex-col items-center gap-0.5 px-4 py-1 rounded-lg text-xs transition-colors
                ${isActive ? 'text-[#FF6B35]' : 'text-gray-500'}`}
            >
              <Icon
                size={22}
                strokeWidth={isActive ? 2.4 : 2}
                fill={isActive ? 'currentColor' : 'none'}
                fillOpacity={isActive ? 0.12 : 0}
              />
              {label}
            </Link>
          )
        })}
      </div>
    </nav>
  )
}