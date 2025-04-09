'use client';

import React, { createContext, useContext, useState, useCallback } from 'react';

export interface WinInput {
  id: string;
  message: string;
}

interface WinProviderProps {
  wins: WinInput[];
  addWin: (message: string) => void;
}

const WinContext = createContext<WinProviderProps | undefined>(undefined);

export const WinProvider = ({ children }: { children: React.ReactNode }) => {
  const [wins, setWins] = useState<WinInput[]>([]);

  const addWin = useCallback((message: string) => {
    const newWin: WinInput = {
      id: Date.now().toString(),
      message,
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
