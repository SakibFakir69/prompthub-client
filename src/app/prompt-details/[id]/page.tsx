import PromptDetails from "@/src/components/prompt/prompt-details";





async function PromptDetailsPage({ params }:{params:string}) {


  const { id } = await params;
  console.log(id);



  return <PromptDetails id={id}/>
}

export default PromptDetailsPage;