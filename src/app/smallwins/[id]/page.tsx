import SmallWinsClientPage from "@/components/SmallWinsClientPage";

export default async function SmallWinsPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params; 

  return (
  
  <div>
    <span className="hidden">Post: {id}</span>
  <SmallWinsClientPage selectedId/>
  </div>

  )}