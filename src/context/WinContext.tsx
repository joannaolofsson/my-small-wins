"use client";

import React, { createContext, useContext, useState, useEffect } from "react";
import { supabase } from "@/lib/supabase-client";
import { WinInput } from "@/types/interfaces";
import { fetchSmallWins } from "@/lib/supabase-smallwinHelpers";

const WinContext = createContext<{
  wins: WinInput[];
  createWin: (winData: Omit<WinInput, "id">) => Promise<void>;
} | undefined>(undefined);

export const WinProvider = ({ children }: { children: React.ReactNode }) => {
  const [wins, setWins] = useState<WinInput[]>([]);

  const loadWins = async () => {
    const fetchedWins = await fetchSmallWins();
    setWins(fetchedWins);
  };

  const createWin = async (win: Omit<WinInput, "id">) => {
    const { error } = await supabase
      .from("smallwins")
      .insert([
        {
          input_future: win.inputFuture,
          message: win.message,
          icon: win.icon,
          encouragement: win.encouragement,
          created_at: new Date().toISOString(),
          emotion: win.emotion,
          color: win.color || "default-color",
        },
      ]);


    if (error) {
      console.error("Error adding Small Win:", error.message);
      return;
    }

    loadWins(); // Refresh wins after successful insert
  };

  useEffect(() => {
    loadWins(); // Fetch all Small Wins on mount
  }, []);

  return (
    <WinContext.Provider value={{ wins, createWin }}>
      {children}
    </WinContext.Provider>
  );
};

export const useWin = () => {
  const context = useContext(WinContext);
  if (!context) {
    throw new Error("useWin must be used within a WinProvider");
  }
  return context;
};
