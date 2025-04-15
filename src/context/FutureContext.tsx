'use client';

import React, { createContext, useContext, useState } from "react";
import { InputItem, InputType } from "@/types/interfaces";
import { FutureProviderProps } from "@/types/interfaces";

const FutureContext = createContext<FutureProviderProps | undefined>(undefined);

export const FutureProvider = ({ children }: { children: React.ReactNode }) => {
  const [inputs, setInputs] = useState<InputItem[]>([]);

  const addInput = async (category: InputType, name: string): Promise<void> => {
    const newInput: InputItem = {
      id: Math.random().toString(),
      user_id: "MockUserId",
      category,
      name,
    };
    setInputs((prev) => [...prev, newInput]);
  };

  return (
    <FutureContext.Provider value={{ inputs, addInput }}>
      {children}
    </FutureContext.Provider>
  );
};

export const useFuture = () => {
  const context = useContext(FutureContext);
  if (!context) throw new Error("useFuture must be used within a FutureProvider");
  return context;
};

