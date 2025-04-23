'use client';
import { useEffect } from 'react';
import { supabase } from "@/lib/supabase-client";

export default function TestInsertPage() {
  useEffect(() => {
    const insertTest = async () => {
      const { data: userData } = await supabase.auth.getUser();
      const user = userData?.user;
      if (!user) {
        console.error("No user found");
        return;
      }

      const { data, error } = await supabase
        .from("futureself")
        .insert([
          {
            category: "habit",
            name: "Test insert",
            user_id: user.id,
            created_at: new Date().toISOString(),
          },
        ]);

      console.log("Test Insert Result:", { data, error });
    };

    insertTest();
  }, []);

  return <div>Insert test running... check console</div>;
}
