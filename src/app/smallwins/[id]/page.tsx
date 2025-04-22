import SmallWinsClientPage from "@/components/SmallWinsClientPage";


export default async function SmallWinsPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params; // ✅ Works in Next.js 15

  return (
  <div>Post: {id}
  <SmallWinsClientPage selectedId/>
  </div>

  )}