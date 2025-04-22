'use client';

import React, { useEffect, useState } from "react";
import { supabase } from "@/lib/supabase-client";
import AuthForm from "@/components/AuthForm"; // Login/Signup form
import Summary from "./Summery"; // Dashboard or main app content
import { Button } from "./ui/button"; // Reusable styled button component

const AppWrapper = () => {
  const [session, setSession] = useState<any>(null); // Manage user session state

  // Fetch the session on component mount
  useEffect(() => {
    const fetchSession = async () => {
      const { data } = await supabase.auth.getSession();
      setSession(data.session); // Set session if available
    };
    fetchSession();
  
    const {
      data: { subscription },
    } = supabase.auth.onAuthStateChange((_event, newSession) => {
      setSession(newSession); // Update session on login/logout
    }) as { data: { subscription: { unsubscribe: () => void } } };
  
    return () => subscription.unsubscribe();
  }, []);
  

  // Handle user logout
  const handleLogout = async () => {
    await supabase.auth.signOut(); // Sign out from Supabase
    setSession(null); // Clear session state
  };

  // Render content based on session state
  return (
    <main className="p-4">
      {session ? (
        <div className="flex flex-col gap-4">
          {/* Logged-in view */}
          <div className="flex flex-row items-center justify-between">
            <p>Logged in as {session.user.email}</p>
            <Button onClick={handleLogout} variant="outline">
              Log out
            </Button>
          </div>

          {/* Render dashboard or main content */}
          <Summary />
        </div>
      ) : (
        // Render authentication form if not logged in
        <AuthForm />
      )}
    </main>
  );
};

export default AppWrapper;

