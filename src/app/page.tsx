'use server'
import Link from "next/link"
import createClient from "@/utils/server";
import Logout from "@/components/Logout";
import ClientComponent from "@/components/ClientComponent";

export default async function Home() {
  const supabase = await createClient();
  const {
    data: {user},
  } = await supabase.auth.getUser();
  return (
    <div className="flex flex-col items-center justify-center h-screen">
       <div className="flex flex-col items-start gap-6">
        <ClientComponent />
        <h1 className="text-6xl">Track your small wins</h1>

        <p className="text-2xl">What habits does your future self have?</p>
        <p className="text-2xl">Track your small wins today and meet a future you want to live in.</p>
        <div className="flex gap-2">
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
      </div>
      </div>
  )
}