import Link from "next/link"
import createClient from "@/utils/server";
import Logout from "@/components/Logout";
import ClientComponent from "@/components/ClientComponent";

export default async function Dashboard() {
  const supabase = createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();

  return (
    <div className="flex flex-col items-center justify-start h-screen mt-12">
      <ClientComponent />
      <div className="flex gap-2">
        <h1>Hi,</h1>
        {!user ? (
          <Link href="/login">
            <div className="bg-[#C9A7D9] text-white text-sm px-4 py-2 rounded-sm">
              Login
            </div>
          </Link>
        ) : (
          <>
            <div className="flex items-center gap-x-2 text-sm">
              {user?.email}
            </div>
            <Logout />
          </>)}
      </div>
      
      <div className="flex flex-row items-start gap-6">
        <div>Futureself</div>
        <div>Small wins</div>

      </div>
    </div>
  )
}