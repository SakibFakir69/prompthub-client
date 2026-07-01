"use client";

import { useState } from "react";
import Link from "next/link";
import { Settings } from "lucide-react";
import { useGetMeQuery } from "@/src/store/features/auth/auth.features";
import {
  useGetAllPromptsQuery,
  useGetSavedPromptsQuery,
} from "@/src/store/features/prompt/prompt.features";

import ProfileHeader from "./profile-header";
import ProfileTabs from "./profile-tabs";
import MyPrompt from "./my-prompt";
import SavedPromptList from "./saved-prompt-list";
import ProfileSkeleton from "./profile-skeleton";
// SSR


export default function ProfileComponent() {
  const [activeTab, setActiveTab] = useState<"my" | "saved">("my");

  const { data: meData, isLoading: isMeLoading } = useGetMeQuery(null);
  const { data: allPromptsData, isLoading: isPromptsLoading } = useGetAllPromptsQuery();
  const { data: savedData, isLoading: isSavedLoading } = useGetSavedPromptsQuery();

  const user = meData?.data;
  const myPrompts = allPromptsData?.data;
  const savedPrompts = savedData?.data ||  [];

  
  if (isMeLoading) {
    return <ProfileSkeleton />;
  }

  // ─── Unauthenticated ──────────────────────────────────────────────────────
  if (!user) {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center gap-3">
        <p className="text-sm text-gray-500">You are not logged in.</p>
        <Link href="/login" className="text-sm font-semibold text-indigo-600 hover:underline">
          Go to login
        </Link>
      </div>
    );
  }

  // ─── UI ───────────────────────────────────────────────────────────────────
  return (
    <div className="min-h-screen bg-gray-50">
      <header className="sticky top-0 z-10 bg-white border-b border-gray-100 px-4 py-3 flex items-center justify-between">
        <span className="text-base font-semibold text-gray-900">Profile</span>
        <Link
          href="/settings"
          className="p-2 rounded-xl hover:bg-gray-100 transition-colors text-gray-500"
          aria-label="Settings"
        >
          <Settings size={20} />
        </Link>
      </header>

      <main className="max-w-2xl mx-auto px-4 py-6 flex flex-col gap-6">
        <section className="bg-white rounded-2xl p-6 border border-gray-100">
          <ProfileHeader user={user} promptCount={myPrompts?.length} />
        </section>

        <section className="bg-white rounded-2xl border border-gray-100 overflow-hidden">
          <div className="px-4 pt-4">
            <ProfileTabs
              activeTab={activeTab}
              setActiveTab={setActiveTab}
              myCount={myPrompts?.length}
              savedCount={savedPrompts.length}
            />
          </div>

          <div className="p-4">
            {activeTab === "my" ? (
              <MyPrompt data={myPrompts} isLoading={isPromptsLoading} />
            ) : (
              <SavedPromptList prompt={savedPrompts} isLoading={isSavedLoading} />
            )}
          </div>
        </section>
      </main>
    </div>
  );
}