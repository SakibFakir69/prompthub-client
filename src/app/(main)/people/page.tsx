import { cookies } from "next/headers";
import { jwtDecode } from "jwt-decode";
import PeopleSearch from "@/src/components/people/people-main";

interface JwtPayload {
  id: string;
  email?: string;
  iat?: number;
  exp?: number;
}

async function getUsersSearchData(cookieHeader: string) {
  const res = await fetch(
    `${process.env.NEXT_PUBLIC_BACKEND_URL}/people/search`,
    {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Cookie: cookieHeader, // ✅ forwards accessToken cookie to Express
      },
      cache: "no-store",
    }
  );

  if (!res.ok) {
    throw new Error(`Search failed: ${res.status}`);
  }

  return res.json();
}

async function Page() {
  // 1. ✅ Await the cookies() call itself
  const cookieStore = await cookies();

  // 2. ✅ Read accessToken cookie (no await needed here anymore)
  const accessToken = cookieStore?.get("accessToken")?.value;

  // 3. ✅ Forward all cookies to backend (no await needed here anymore)
  const cookieHeader = cookieStore.getAll()
    .map((c) => `${c.name}=${c.value}`)
    .join('; ');

  // ✅ Decode JWT to get currentUserId
  let currentUserId: string | undefined;
  if (accessToken) {
    try {
      const decoded = jwtDecode<JwtPayload>(accessToken);
      currentUserId = decoded.id;
    } catch {
      // invalid or expired token
    }
  }

  const data = await getUsersSearchData(cookieHeader);

  return <PeopleSearch data={data} currentUserId={currentUserId} />;
}

export default Page;