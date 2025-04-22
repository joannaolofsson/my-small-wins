'use client';

import React, { createContext, useContext, useState } from "react";
import { supabase } from "@/lib/supabase-client";
import { FutureContextProps } from "@/types/interfaces";

const FutureContext = createContext<FutureContextProps | undefined>(undefined);

export function FutureProvider({ children }: { children: React.ReactNode }) {
  const [inputFuture, setInputFuture] = useState<any[]>([]); // Renamed from `inputs`

  const fetchInputs = async () => {
    const { data, error } = await supabase
      .from("future_inputs")
      .select("*");
  
      console.log("Raw data:", data, error);
      
    if (error) {
      console.error("Error fetching Future Self inputs:", error.message);
      return;
    }

    setInputFuture(data || []);
  };

  const addInput = async (category: string, name: string) => {
    console.log("🧪 addInput called with:", { category, name });
    const {data: userData} = await supabase.auth.getUser();
    const user = userData?.user;

    console.log("👤 Current user:", user);

    if(!user) {
      console.error("No user found.");
      return;
    }

    const { data, error } = await supabase
      .from("future_inputs")
      .insert([{ category, name, user_id: user.id, created_at: new Date().toISOString() }
        
      ]);
      console.log("📤 Insert result:", { data, error });

    if (error) {
      console.error("Error adding input:", error.message);
      return;
    }

    console.log("Insert result:", userData, error);

    fetchInputs(); // Refresh inputs after adding
  };

  const deleteInput = async (id: string) => {
    const { error } = await supabase
      .from("future_inputs")
      .delete()
      .eq("id", id);

    if (error) {
      console.error("Error deleting input:", error.message);
      return;
    }

    fetchInputs(); // Refresh inputs after deleting
  };

  return (
    <FutureContext.Provider value={{ inputFuture, fetchInputs, addInput, deleteInput }}>
      {children}
    </FutureContext.Provider>
  );
}

export function useFuture() {
  const context = useContext(FutureContext);
  if (!context) {
    throw new Error("useFuture must be used within a FutureProvider");
  }
  return context;
}
