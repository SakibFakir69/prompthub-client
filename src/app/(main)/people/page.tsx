export const dynamic = "force-dynamic";

import { cookies } from "next/headers";
import { jwtDecode } from "jwt-decode";
import PeopleSearch from "@/src/components/people/people-main";

interface JwtPayload {
  id: string;
  email?: string;
  iat?: number;
  exp?: number;
}

async function getUsersSearchData(cookieHeader: string, accessToken?: string) {
  const res = await fetch(
    `${process.env.NEXT_PUBLIC_BACKEND_URL}/people/search`,
    {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Cookie: cookieHeader,
        // FIX: forward the token explicitly too, in case the auth
        // middleware reads Authorization instead of / in addition to cookies
        ...(accessToken ? { Authorization: `Bearer ${accessToken}` } : {}),
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
  const cookieStore = await cookies();

  const accessToken = cookieStore?.get("accessToken")?.value;

  const cookieHeader = cookieStore
    .getAll()
    .map((c) => `${c.name}=${c.value}`)
    .join("; ");

  let currentUserId: string | undefined;
  if (accessToken) {
    try {
      const decoded = jwtDecode<JwtPayload>(accessToken);
      currentUserId = decoded.id;
    } catch {
      // invalid or expired token
    }
  }

  const data = await getUsersSearchData(cookieHeader, accessToken);

  return <PeopleSearch data={data} currentUserId={currentUserId} />;
}

export default Page;