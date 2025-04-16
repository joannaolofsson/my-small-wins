import createClient from "@/utils/server";
import Link from "next/link";
import React from "react";
import Logout from "./Logout";

const Header = async () => {
  const supabase = createClient();
  const {
    data: {user},
  } = await supabase.auth.getUser();

  return (
    <nav className="flex-nowrap relative flex w-full items-center bg-white/30 p-6 rounded-xl border border-white/20 backdrop-blur-md">
      <div className="flex w-full items-center justify-evenly">
        <Link className="font-semibold" href="/">
          Home
        </Link>

        <div className="flex items-center gap-x-5">
          <Link href="/futureself" className="font-semibold">Future Self</Link>
        </div>
        <div className="flex items-center gap-x-5">
          <Link href="/smallwins" className="font-semibold">Small Wins</Link>
        </div>
        <div className="flex items-center gap-x-5">
 
          {!user ? (
              <Link href="/login">
              <div className="bg-[#C9A7D9] text-white text-sm font-semibold px-4 py-2 rounded-sm">
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
            <div>
            <Link href="/signup" className="bg-[#5AA9A3] text-white text-sm font-semibold px-4 py-2 rounded-sm">Sign Up</Link>
          </div>
          
        </div>
      </div>
    </nav>
  );
};

export default Header;
