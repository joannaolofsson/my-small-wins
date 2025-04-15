"use client";
import { useEffect, useState } from "react";
import { User } from "@supabase/supabase-js";
import { createSupabaseClient } from "@/utils/clients";

export default function ClientComponent() {

  const [user, setUser] = useState<User | null>(null);

  useEffect(() => {
    async function getUser() {
      const supabase = createSupabaseClient();
      const { data, error } = await supabase.auth.getUser();
      if(error || !data?.user) {
        console.log("User do not exist");
    } else {
      setUser(data?.user);
    }
  }
    getUser();
  }, []);

  return <h2>{user?.email}</h2>;
}
