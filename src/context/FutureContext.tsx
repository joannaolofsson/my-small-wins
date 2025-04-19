'use client';

import React, { createContext, useContext, useState } from "react";
import { InputItem } from "@/types/interfaces";
import { FutureProviderProps } from "@/types/interfaces";
import { supabase } from "@/lib/supabase-client";

const FutureContext = createContext<FutureProviderProps | undefined>(undefined);

export const FutureProvider = ({ children, initialInputs }: FutureProviderProps) => {
  const [inputs, setInputs] = useState<InputItem[]>(initialInputs || []);

  const addInput = async (category: string, name: string, user_id: string) => {
    const { error } = await supabase.from("future_inputs").insert({
      category,
      name,
      user_id: 'dev-user-id',
    });



    if (!error) {
      const newInput: InputItem = {
        id: crypto.randomUUID(),
        category,
        name,
        user_id,
        created_at: new Date().toISOString(),
      };
      setInputs((prev) => [...prev, newInput]);
    }
  };

  return (
    <FutureContext.Provider value={{ inputs, addInput }}>
      {children}
    </FutureContext.Provider>
  );
};

// Custom Hook to Use Context
export const useFuture = () => {
  const context = useContext(FutureContext);
  if (!context) {
    throw new Error("useFuture must be used within a FutureProvider");
  }
  return context;
};



/*

export const FutureProvider = ({ children }: { children: React.ReactNode }) => {
  const [inputs, setInputs] = useState<InputItem[]>([]);

  const addInput = async (category: string, name: string) => {
    try {

      // Fetch the authenticated user's session
     // const { data: session, error: sessionError } = await supabase.auth.getSession();
     // if (sessionError || !session?.session?.user?.id) {
       // console.error("User is not authenticated:", sessionError?.message || "No session found.");
        //return;
      //}

      //const userId = session.session.user.id;

      // Insert the new input into the Supabase table
      const { error } = await supabase.from("future_inputs").insert({
        category,
        name,
       // user_id: userId, // Ensure user_id is being properly set
      });

      if (error) {
        console.error("Error inserting input into Supabase:", error.message);
        return;
      }

      console.log("Input added successfully!");

      // Update local state
      const newInput: InputItem = {
        id: Math.random().toString(), // Generate a random ID for local state
       // user_id: userId,
        category,
        name,
      };
      setInputs((prev) => [...prev, newInput]);
    } catch (err) {
      console.error("Unexpected error in addInput:", err);
    }
  };

  return (
    <FutureContext.Provider value={{ inputs, addInput }}>
      {children}
    </FutureContext.Provider>
  );
};

// Custom Hook to Use Context
export const useFuture = () => {
  const context = useContext(FutureContext);
  if (!context) {
    throw new Error("useFuture must be used within a FutureProvider");
  }
  return context;
};*/
