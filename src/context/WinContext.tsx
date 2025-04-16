'use client';
import React, { createContext, useContext, useState, useCallback } from 'react';

export interface WinInput {
  id: string; 
  inputId: string; 
  uniqueKey: string;
  message: string;
  icon: string;
  encouragement: string;
}

interface WinProviderProps {
  wins: WinInput[];
  addWin: (input: Omit<WinInput, 'id'>) => void;
}

const WinContext = createContext<WinProviderProps | undefined>(undefined);

export const WinProvider = ({ children }: { children: React.ReactNode }) => {
  const [wins, setWins] = useState<WinInput[]>([]);

  const addWin = useCallback((input: Omit<WinInput, 'id'>) => {
    const newWin: WinInput = {
      id: Date.now().toString(), 
      ...input, 
    };
    setWins((prev) => [...prev, newWin]);
  }, []);

  return (
    <WinContext.Provider value={{ wins, addWin }}>
      {children}
    </WinContext.Provider>
  );
};

export const useWin = () => {
  const context = useContext(WinContext);
  if (!context) throw new Error('useWin must be used within a WinProvider');
  return context;
};
