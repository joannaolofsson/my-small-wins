'use client';

import React, { createContext, useContext, useState, useEffect } from "react";
import { InputItem } from "@/types/interfaces";
import { FutureContextProps } from "@/types/interfaces";
import { supabase } from "@/lib/supabase-client";


const FutureContext = createContext<FutureContextProps | undefined>(undefined);

export const FutureProvider = ({ children }: { children: React.ReactNode }) => {
  const [inputs, setInputs] = useState<InputItem[]>([]);

  const fetchInputs = async () => {
    const { data, error } = await supabase.from("future_inputs").select("*");

    if (error) {
      console.error("Error fetching inputs:", error.message);
      return;
    }

    setInputs(data || []);
  };

  const addInput = async (category: string, name: string) => {
    const { data: sessionData } = await supabase.auth.getSession();
    const userId = sessionData?.session?.user?.id;

    if (!userId) {
      console.error("User is not authenticated");
      return;
    }

    const { error } = await supabase
      .from("future_inputs")
      .insert({ category, name, user_id: userId });

    if (!error) {
      const newInput: InputItem = {
        id: crypto.randomUUID(),
        user_id: userId,
        category,
        name,
        created_at: new Date().toISOString(),
      };
      setInputs((prev) => [...prev, newInput]);
    } else {
      console.error("Error adding input:", error.message);
    }
  };

  const deleteInput = async (id: string) => {
    const { error } = await supabase
      .from("future_inputs")
      .delete()
      .match({ id });

    if (!error) {
      setInputs((prev) => prev.filter((input) => input.id !== id)); // Remove input locally
    } else {
      console.error("Error deleting input:", error.message);
    }
  };

  useEffect(() => {
    fetchInputs();
  }, []);

  return (
    <FutureContext.Provider value={{ inputs, addInput, deleteInput, fetchInputs }}>
      {children}
    </FutureContext.Provider>
  );
};

export const useFuture = () => {
  const context = useContext(FutureContext);
  if (!context) {
    throw new Error("useFuture must be used within a FutureProvider");
  }
  return context;
};
