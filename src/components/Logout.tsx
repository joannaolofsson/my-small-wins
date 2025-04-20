'use client';

import { useState } from "react";
import { supabase } from "@/lib/supabase-client";

const Logout = () => {
  const [loading, setLoading] = useState(false);

  const handleLogout = async (event: React.FormEvent) => {
    event.preventDefault();
    setLoading(true);

    try {
      await supabase.auth.signOut();
      // Optionally handle any additional logic post-signout here (like redirecting)
    } catch (error) {
      console.error("Error during sign out:", error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <form onSubmit={handleLogout}>
      <button
        type="submit"
        disabled={loading}
        className="bg-[#469A90] text-white text-sm px-4 py-2 rounded-lg cursor-pointer"
      >
        {loading ? "Signing out..." : "Sign out"}
      </button>
    </form>
  );
};

export default Logout;

