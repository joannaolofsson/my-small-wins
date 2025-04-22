'use client'

import React, { useEffect, useState } from 'react';
import Link from 'next/link';
import { ImQrcode, ImPencil } from 'react-icons/im';
import { supabase } from "@/lib/supabase-client";
import Logout from "./Logout";

export default function TabBar() {
  const [user, setUser] = useState<any>(null);
  const [authTab, setAuthTab] = useState<'login' | 'signup'>('login');

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
    <div className="fixed bottom-0 left-0 z-50 w-full h-24 bg-[#333333]">
      <div className="grid h-full max-w-lg grid-cols-4 mx-auto font-medium">
        <div className='flex flex-col justify-end items-center pb-4'>
          <Link href="/" className="inline-flex flex-col items-center justify-center px-5 hover:bg-zinc-600 group">
            <svg className="w-4 h-4 mb-1 text-zinc-400 group-hover:text-[#71CB86]" fill="currentColor" viewBox="0 0 20 20">
              <path d="M10.707 2.293a1 1 0 00-1.414 0l-7 7a1 1 0 001.414 1.414L4 10.414V17a1 1 0 001 1h2a1 1 0 001-1v-2a1 1 0 011-1h2a1 1 0 011 1v2a1 1 0 001 1h2a1 1 0 001-1v-6.586l.293.293a1 1 0 001.414-1.414l-7-7z"></path>
            </svg>
            <span className="text-xs text-zinc-400 group-hover:text-[#71CB86]">Home</span>
          </Link>
        </div>

        <div className='flex flex-col justify-end pb-4'>
          <Link href="/futureself/habit" className="inline-flex flex-col items-center justify-center px-5 hover:bg-zinc-600 group">
            <ImPencil className="w-4 h-4 mb-1 text-zinc-400 group-hover:text-[#71CB86]" />
            <span className="text-xs text-zinc-400 group-hover:text-[#71CB86]">Future</span>
          </Link>
        </div>

        <div className='flex flex-col justify-end pb-4'>
          <Link href="/smallwins/manual" className="inline-flex flex-col items-center justify-center px-5 hover:bg-zinc-600 group">
            <ImQrcode className="w-4 h-4 mb-1 text-zinc-400 group-hover:text-[#71CB86]" />
            <span className="text-xs text-zinc-400 group-hover:text-[#71CB86]">wins</span>
          </Link>
        </div>

        <div className='flex flex-col justify-end pb-4'>
          {!user ? (
            <>
              <div className="flex justify-center mb-1">
                <button
                  className={`px-3 py-1 text-xs rounded-l bg-zinc-700 ${
                    authTab === 'login' ? 'text-[#71CB86]' : 'text-zinc-400'
                  }`}
                  onClick={() => setAuthTab('login')}
                >
                  Login
                </button>
                <button
                  className={`px-3 py-1 text-xs rounded-r bg-zinc-700 ${
                    authTab === 'signup' ? 'text-[#71CB86]' : 'text-zinc-400'
                  }`}
                  onClick={() => setAuthTab('signup')}
                >
                  Sign Up
                </button>
              </div>
              <Link
                href={authTab === 'login' ? '/' : '/signup'}
                className="inline-flex flex-col items-center justify-center px-5 hover:bg-zinc-600 group"
              >
                <svg className="w-6 h-6 mb-1 text-zinc-400 group-hover:text-[#71CB86]" fill="currentColor" viewBox="0 0 20 20">
                  <path clipRule="evenodd" fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-6-3a2 2 0 11-4 0 2 2 0 014 0zm-2 4a5 5 0 00-4.546 2.916A5.986 5.986 0 0010 16a5.986 5.986 0 004.546-2.084A5 5 0 0010 11z"></path>
                </svg>
                <span className="text-xs text-zinc-400 group-hover:text-[#71CB86] capitalize">
                  {authTab}
                </span>
              </Link>
            </>
          ) : (
            <>
              <div className="text-sm font-medium text-zinc-300 text-center hidden">{user.email}</div>
              <Logout />
            </>
          )}
        </div>
      </div>
    </div>
  );
}
