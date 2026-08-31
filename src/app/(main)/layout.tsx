
import FcmInitializer from "@/src/components/fcm/FcmInitializer"
import LeftSidebar from "@/src/components/main/LeftSidebar"
import MobileNav from "@/src/components/main/MobileNav"
import RightSidebar from "@/src/components/main/RightSidebar"



export default function MainRootLayout({ children }: { children: React.ReactNode }) {
  return (
    <>
      <FcmInitializer />

      <div className="min-h-screen bg-gray-50 flex m-10">
        {/* Left sidebar */}
        <aside
          aria-label="Primary navigation"
          className="hidden lg:flex flex-col w-[240px] xl:w-[260px] shrink-0 sticky top-0 h-dvh border-r border-gray-200 bg-white overflow-y-auto"
        >
          <LeftSidebar />
        </aside>

        {/* Center feed */}
        <main className="flex-1 min-w-0 pb-20 lg:pb-0">
          <div className="max-w-[780px] mx-auto px-4 py-2">
            {children}
          </div>
        </main>

        {/* Right sidebar */}
        <aside
          aria-label="Suggestions"
          className="hidden xl:flex flex-col w-[300px] shrink-0 sticky top-0 h-dvh border-l border-gray-200 bg-white overflow-y-auto"
        >
          <RightSidebar />
        </aside>
      </div>

      <MobileNav />
    </>
  )
}