// app/summary/page.tsx or a client component
"use client";

import { useEffect, useState } from "react";
import {createcli}
import { fetchFutureInputs } from "@/lib/fetchFutureInputs";

const supabase = createClientComponentClient();

export default function SummaryPage() {
  const [userId, setUserId] = useState<string | null>(null);
  const [inputs, setInputs] = useState([]);

  useEffect(() => {
    const getUser = async () => {
      const { data: { session } } = await supabase.auth.getSession();
      setUserId(session?.user?.id || null);
    };

    getUser();
  }, []);

  useEffect(() => {
    if (!userId) return;

    const fetchData = async () => {
      const data = await fetchFutureInputs(userId);
      setInputs(data);
    };

    fetchData();
  }, [userId]);

  return (
    <div>
      <h2>Your Future Self Inputs</h2>
      {inputs.length ? (
        inputs.map((item) => (
          <div key={item.id}>
            <strong>{item.category}</strong>: {item.name}
          </div>
        ))
      ) : (
        <p>No inputs or loading...</p>
      )}
    </div>
  );
}
