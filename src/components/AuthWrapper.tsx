'use client';

import { useEffect, useState } from 'react';
import { supabase } from '@/lib/supabase-client';
import AuthForm from '@/components/AuthForm';
import { Button } from './ui/button';

export default function AppWrapper() {
  const [session, setSession] = useState<any>(null);

  useEffect(() => {
    const fetchSession = async () => {
      const { data } = await supabase.auth.getSession();
      setSession(data.session);
    };
    fetchSession();

      const { data: { subscription } } = supabase.auth.onAuthStateChange((_event, session) => {
        setSession(session);
      }) as { data: { subscription: { unsubscribe: () => void } } };
    
      return () => subscription.unsubscribe(); 
    }, []);
    

  const handleLogout = async () => {
    await supabase.auth.signOut();
    setSession(null);
  };

 return (
  <main className="p-4">
    {session ? (
      <div>
        <p>Logged in as {session.user.email}</p>
        <Button onClick={handleLogout} className="bg-red-500 text-white p-2 rounded">
          Log out
        </Button>
      </div>
    ) : (

      <AuthForm />
    )}
  </main>
)};
