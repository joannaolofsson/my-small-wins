'use client';

import { useWin } from "@/context/WinContext";
import { useParams } from "next/navigation";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { PiCaretLeft } from "react-icons/pi";
import { SmallWinFormSection } from "@/components/SmallWinFormSection";
import { useEffect, useState } from "react";
import { createSupabaseClient } from "@/utils/clients";

type CardData = {
  id: string;
  name: string;
  category: string;
};

const supabase = createSupabaseClient();

const SmallWins = () => {
  const params = useParams(); // Use useParams to access the dynamic route parameter
  const id: string | null = Array.isArray(params?.id) ? params?.id[0] : params?.id || null; // Ensure id is a string or null
  const [cardData, setCardData] = useState<CardData | null>(null); // State for storing card data
  const { wins } = useWin(); // Use the context for wins state

  useEffect(() => {
    // Fetch card data from Supabase
    const fetchCardData = async () => {
      if (!id) return; // Ensure id is available before fetching
      const { data, error } = await supabase
        .from("future_inputs")
        .select("*") // Ensure the columns match the type definition
        .eq("id", id)
        .single();

      if (error) {
        console.error("Error fetching card data:", error.message);
      } else {
        setCardData(data); // Update the cardData state
      }
    };

    fetchCardData();
  }, [id]); // Run only when id changes

  if (!id) {
    return <p>Loading...</p>; // Handle cases where the dynamic route parameter is not yet available
  }

  return (
    <div className="flex flex-col mx-auto w-lg mt-10">
      {/* Back Button */}
      <div>
        <Button asChild variant="none">
          <Link href="/"><PiCaretLeft /> Tillbaka</Link>
        </Button>
      </div>

      {/* Page Title */}
      <h1>Small Wins for {cardData?.name || "Loading..."}</h1>

      {/* Form Section */}
      <SmallWinFormSection selectedId={id} />

      {/* Wins List */}
      <div className="mt-4">
        {wins.length > 0 ? (
          <ul className="list-disc list-inside w-full">
            {wins.map((win) => (
              <li key={win.uniqueKey} className="flex items-center mb-2">
                <span className="text-2xl mr-2">{win.icon || "✨"}</span>
                <div>
                  <p className="font-semibold">{win.message}</p>
                  <p className="text-sm text-gray-600 italic">{win.encouragement}</p>
                </div>
              </li>
            ))}
          </ul>
        ) : (
          <p className="text-gray-500">No wins yet. Start by adding one!</p>
        )}
      </div>
    </div>
  );
};

export default SmallWins;
