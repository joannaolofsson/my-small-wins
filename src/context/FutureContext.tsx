'use client';

import React, { createContext, useContext, useState, useCallback } from "react";

export type InputType = "Habit" | "Accomplishment" | "Gift" | "WinMessage";

export interface FutureInput {
  id: string;
  type: InputType;
  value: string;
}

interface FutureProviderProps {
    inputs: FutureInput[];
    addInput: (type: InputType, value: string) => void;
  }

const FutureContext = createContext<FutureProviderProps | undefined>(undefined);

export const FutureProvider = ({ children }: { children: React.ReactNode }) => {
  const [inputs, setInputs] = useState<FutureInput[]>([]);

  const addInput = useCallback((type: InputType, value: string) => {
    const newInput: FutureInput = {
      id: Date.now().toString(),
      type,
      value
    };
    setInputs((prev) => [...prev, newInput]);
  }, []);

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
