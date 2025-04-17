"use client";
import React, { useState } from "react";
import { signOut } from "../../actions/auth";

const Logout = () => {
  const [loading, setLoading] = useState(false);

  const handleLogout = async (event: React.FormEvent) => {
    event.preventDefault();
    setLoading(true);
    await signOut();

    setLoading(false);
  };

  return (
    <>
      <form onSubmit={handleLogout}>
        <button type="submit" disabled={loading} className="bg-[#469A90] text-white text-sm px-4 py-2 rounded-lg cursor-pointer">
          {loading ? "Signing out..." : "Sign out"}
        </button>
      </form>
    </>
  );
};

export default Logout;
