import UserSearchComponent from "@/src/components/people/people-main";

// app/saved/page.tsx
async function getUsersSearchData() {
  
  const res = await fetch(`${process.env.NEXT_PUBLIC_BACKEND_URL}/people/search`, {
    method: "GET",
    headers: { "Content-Type": "application/json" },
    cache: "no-store",
  });
  console.log(res);

  if (!res.ok) {
    throw new Error(`Search failed: ${res.status}`);
  }

  return res.json();
}

async function Page() {
  const data = await getUsersSearchData();
  console.log(data, "data");


  return <UserSearchComponent data={data}/>
}

export default Page;