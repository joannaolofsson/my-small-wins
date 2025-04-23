  'use client';
  import React from "react";
  import { useFuture } from "@/context/FutureContext"; // Fetch Future Self goals
  import { useWin } from "@/context/WinContext"; // Fetch Small Wins
  import SmallWinBooster from "./SmallWinBooster";
  import { Button } from "./ui/button";
  import Link from "next/link";
  import { useEffect, useState } from "react";
  import { supabase } from "@/lib/supabase-client";
  import { useRouter } from "next/navigation";


  type Input = {
    id: string;
    name: string;
    category: string;
    created_at: string;
  };

  export default function Summary() {
    const { inputFuture } = useFuture(); // Use FutureContext for Future Self goals
    const { wins } = useWin(); // Use WinContext for Small Wins
    const [userId, setUserId] = useState<string | null>(null);
    const [inputs, setInputs] = useState<Input[]>([]);
    const [loading, setLoading] = useState(true);

    const router = useRouter();
    
    useEffect(() => {
      const getUser = async () => {
        const { data: { session } } = await supabase.auth.getSession();
        console.log("Session:", session); // ✅ ADD THIS
        setUserId(session?.user?.id ?? null);
      };
      getUser();
    }, []);

    useEffect(() => {
      if (!userId) return;

      const fetchInputs = async () => {
        const { data, error } = await supabase
          .from("future_inputs")
          .select("*")
          .eq("user_id", userId)
          .order("created_at", { ascending: false });



console.log("Fetched data:", data); // ✅ ADD THIS


        if (error) {
          console.error("Error fetching:", error.message);
          return;
        }

        

        // Get only one input per category (latest)
        const seen = new Set();
        const latestPerCategory = data.filter((item) => {
          if (seen.has(item.category)) return false;
          seen.add(item.category);
          return true;
        });

        setInputs(latestPerCategory.slice(0, 3)); // Only up to 3 cards
        setLoading(false);
      };

      fetchInputs();
    }, [userId]);

    const handleClick = (category: string) => {
      router.push(`/smallwins/${category}`);
    };

    return (
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
   
        <div className="flex flex-col gap-4 border border-gray-200 rounded-xl p-6 shadow-lg">
          <h2 className="text-2xl font-semibold">Small Wins</h2>
          <SmallWinBooster limit={5} />
          <p>Total Small Wins: {wins.length}</p> {/* Display count of wins */}
          <div className="mt-4 text-center">
            <Link href="/smallwins/manual">
              <Button variant="default">Small Wins</Button>
            </Link>
          </div>
        </div>

        <div className="flex flex-col gap-4 border border-gray-200 rounded-xl p-6 shadow-lg">
          <h2 className="text-2xl font-semibold">Future Self Goals</h2>
          {loading ? (
        <p>Loading...</p>
        ) : inputs.length ? (

          <div className="grid grid-cols-1 gap-2 p-2 w-full">
        {inputs.map((item) => (
          <div
            key={item.id}
            onClick={() => router.push(`/smallwins/${item.category}`)}
            className="cursor-pointer bg-white/30 border border-white/20 rounded-xl backdrop-blur-[15px] shadow-lg flex flex-col gap-2 w-full px-4 py-2"
          >
            {/* Ej responsiv */}
            <h3 className="text-md italic text-[#333333] capitalize pr-4">{item.category}</h3>
            <p className="text-[#333333] text-md font-semibold mt-2 pr-4">{item.name}</p>
          </div>
        ))}
      </div>
        ) : (
          <p>No entries found.</p>
        )}
          <p>Total Inputs: {inputFuture.length}</p> 
        </div>
      </div>
    );
  }



      



