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

  return (
    <>
      {session ? (
        <div>
          {/* Logged-in view */}
          <div className="w-full max-w-6xl text-end px-4 md:px-16 lg:px-24">
            <p className="hidden"> {session.user.email}</p>
            <Button onClick={handleLogout} variant="none">
              Log out
            </Button>
          </div>

          {/* Render dashboard or main content */}
          <section className="w-full max-w-4xl mx-auto">
          <Summary />
          </section>
        </div>
      ) : (
        // Render authentication form if not logged in
        <section className="w-full">
        <AuthForm />
        </section>
      )}
    </>
  );
};

export default AppWrapper;

