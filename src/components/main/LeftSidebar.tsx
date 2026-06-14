import { cookies } from 'next/headers';
import { MiniProfile } from './profile/profile';
import { NavLinks } from './left-sidebar-menu';


export const getProfileInfo = async () => {
  try {
  
    const cookieStore = await cookies()
    const allCookies = cookieStore.toString() 

    
    const res = await fetch(`${process.env.NEXT_PUBLIC_BACKEND_URL}/auth/me`, {
      method: "GET",
      cache: "no-store", 
      headers: {
       
        Cookie: allCookies, 
      },
    });
    
    if (!res.ok) {
      console.warn(`Server-side fetch failed with status: ${res.status}`);
      return null; 
    }
    
    return await res.json();
  } catch (error) {
    console.error("Error inside getProfileInfo server wrapper:", error);
    return null;
  }
}

export default async function LeftSidebar() {
  const profileData = await getProfileInfo();

  return (
    <div className="flex flex-col h-full p-4 border-r border-gray-100">
    
    
      <div className="px-3 py-2 mb-5">
        <span className="text-lg font-semibold tracking-tight">
          Prompt<span className="text-[#FF6B35]">Hub</span>
        </span>
      </div>

    
      <MiniProfile profileData={profileData} />

      <NavLinks />
    </div>
  )
}