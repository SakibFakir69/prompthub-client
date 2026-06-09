import PromptDetails from "@/src/components/prompt/prompt-details";



interface PageProps {
  params: Promise<{ id: string }>;
}

async function PromptDetailsPage({ params }:PageProps) {


  const { id } = await params;
  console.log(id)



  return <PromptDetails id={id}/>
}

export default PromptDetailsPage;