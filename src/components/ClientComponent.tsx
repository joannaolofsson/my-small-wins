"use client";
import { useEffect, useState } from "react";
import { User } from "@supabase/supabase-js";
import { createSupabaseClient } from "@/utils/clients";

export default function ClientComponent() {
  const [user, setUser] = useState<User | null>(null);

  useEffect(() => {
    const fetchUserWithRetry = async () => {
      const supabase = createSupabaseClient();
      let attempts = 0;
    

while (attempts < 3) {
  const { data, error } = await supabase.auth.getSession();
  if (data?.session?.user) {
    console.log("Session successfully retrieved:", data.session.user.id);
    break;
  } else {
    console.log("Retry fetching session...");
    attempts++;
    await new Promise((resolve) => setTimeout(resolve, 1000)); // Wait 1 second
  }
}
      return null;
    };

    fetchUserWithRetry();
  }, []);

  return (<h2>{user? user.email : "Loading user..."}</h2>)
};