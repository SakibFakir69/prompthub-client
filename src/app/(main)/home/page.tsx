import FeedMainComponent from "@/src/components/feed/feed-main-component";

async function getInitialFeed() {
  try {
    const res = await fetch(`${process.env.NEXT_PUBLIC_BACKEND_URL}/feed/feed?cursor=`, {
      cache: "no-store",
    });

    if (!res.ok) throw new Error("Failed to fetch feed");
    return await res.json();
  } catch (error) {
    console.error(error);
    return { data: [], nextCursor: null };
  }
}

export default async function HomePage() {
  const initialData = await getInitialFeed();

  return (
    <div className="max-w-2xl mx-auto p-4">
      <FeedMainComponent initialData={initialData} />
    </div>
  );
}