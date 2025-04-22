import SmallWinsClientPage from "@/components/SmallWinsClientPage";
export default function SmallWinsPage({ params }: { params: { category: string } }) {
  const { category } = params;

  return (
    <div>
      <span className="hidden">Post: {category}</span>
      <SmallWinsClientPage selectedCategory={category} />
    </div>
  );
}

