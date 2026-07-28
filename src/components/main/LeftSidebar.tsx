import { cookies } from 'next/headers';
import { MiniProfile } from './profile/profile';
import { NavLinks } from './left-sidebar-menu';
import Image from 'next/image';
import Link from 'next/link';


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
        <Link prefetch={true} href={'/home'}>
        <Image src={'/ph-logo-2-bg.png'} alt={'PromptHub'} height={180} width={150}/>
        </Link>

      </div>

    
      <MiniProfile profileData={profileData} />

      <NavLinks />
    </div>
  )
}