// app/explore/page.tsx
import ExploreMainComponent from "@/src/components/explore/explore-main"

// No server fetch needed — RTK Query handles data client-side with cursor pagination.
// Keeping this a thin server shell avoids double-fetching page 1.
function Page() {
  return (
    <div className="min-h-screen bg-[#FAFAFA]">
      <ExploreMainComponent />
    </div>
  )
}

export default Page