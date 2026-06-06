
import LeftSidebar from "@/src/components/main/LeftSidebar"
import MobileNav from "@/src/components/main/MobileNav"
import RightSidebar from "@/src/components/main/RightSidebar"

// USER CAN ACCESS THIS PAGE BUT NOT POST 
// IF POST MUST NEED LOGIN
// FOR CREATE PROMPT ,TAKE INSPARE

export default function MainRootLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="min-h-screen bg-gray-50 flex ">

      {/* Left sidebar — sticky, hidden on mobile */}
      <aside className="hidden lg:flex flex-col w-[240px] xl:w-[260px] shrink-0 sticky top-0 h-screen border-r border-gray-200 bg-white overflow-y-auto">
        <LeftSidebar />
      </aside>

      {/* Center feed — scrollable */}
      <main className="flex-1 min-w-0 pb-20 lg:pb-0">
        <div className="max-w-[680px] mx-auto px-4">
          {children}
        </div>
      </main>

      {/* Right sidebar — sticky, hidden below xl */}
      <aside className="hidden xl:flex flex-col w-[300px] shrink-0 sticky top-0 h-screen border-l border-gray-200 bg-white overflow-y-auto">
        <RightSidebar />
      </aside>

      {/* Mobile bottom nav */}
      <MobileNav />
    </div>
  )
}