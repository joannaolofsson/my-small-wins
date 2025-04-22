'use client';

import Link from "next/link";
import { useEffect, useState } from "react";
import { supabase } from "@/lib/supabase-client";
import Logout from "./Logout";

export default function Header() {
  const [user, setUser] = useState<any>(null);

  useEffect(() => {
    const getUser = async () => {
      const { data, error } = await supabase.auth.getUser();
      if (!error) setUser(data.user);
    };

    getUser();

    const { data: authListener } = supabase.auth.onAuthStateChange(
      (_event, session) => {
        setUser(session?.user ?? null);
      }
    );

    return () => {
      authListener?.subscription?.unsubscribe();
    };
  }, []);

  return (
    <nav className="flex items-center justify-between w-full px-6 py-4 bg-white/30 border border-white/20 backdrop-blur-md shadow-sm">
      <div className="flex gap-6 items-center">
        <Link href="/" className="font-medium hover:underline">Home</Link>
        <Link href="/futureself/habit" className="font-medium hover:underline">Future Self</Link>
        <Link href="/smallwins" className="font-medium hover:underline">Small Wins</Link>
      </div>

      <div className="flex items-center gap-4">
        {!user ? (
          <>
            <Link href="/login">
              <div className="bg-[#C9A7D9] text-white text-sm font-semibold px-4 py-2 rounded hover:opacity-90 transition">
                Login
              </div>
            </Link>
            <Link href="/signup">
              <div className="bg-[#5AA9A3] text-white text-sm font-semibold px-4 py-2 rounded hover:opacity-90 transition py-4">
                Sign Up
              </div>
            </Link>
          </>
        ) : (
          <>
            <div className="text-sm font-medium text-gray-700">{user.email}</div>
            <Logout />
          </>
        )}
      </div>
    </nav>
  );
}
