import type { Metadata } from 'next'
import { cookies } from 'next/headers';
import PromptDetails from "@/src/components/prompt/prompt-details";

interface PageProps {
  params: Promise<{ id: string }>;
}



async function PromptDetailsPage({ params }: PageProps) {
  const { id } = await params;

  return <PromptDetails id={id} />;
}

export default PromptDetailsPage;