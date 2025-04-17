'use client';

import Link from "next/link";
import { useEffect, useState } from "react";
import { supabase } from "@/lib/supabase-client";
import Logout from "./Logout";

export default function Header() {
  const [user, setUser] = useState<any>(null);

  useEffect(() => {
    const getUser = async () => {
      const {
        data: { user },
      } = await supabase.auth.getUser();
      setUser(user);
    };

    getUser();

    const {
      data: { subscription },
    } = supabase.auth.onAuthStateChange((_event, session) => {
      setUser(session?.user ?? null);
    });

    return () => subscription.unsubscribe();
  }, []);

  return (
    <nav className="flex-nowrap relative flex w-full items-center bg-white/30 p-6 rounded-xl border border-white/20 backdrop-blur-md">
      <div className="flex w-full items-center justify-evenly">
        <Link className="font-semibold" href="/">
          Home
        </Link>
        <Link href="/futureself" className="font-semibold">Future Self</Link>
        <Link href="/smallwins" className="font-semibold">Small Wins</Link>

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
            </>
          )}
          <Link href="/signup" className="bg-[#5AA9A3] text-white text-sm font-semibold px-4 py-2 rounded-sm">
            Sign Up
          </Link>
        </div>
      </div>
    </nav>
  );
}
