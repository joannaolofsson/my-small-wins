'use client';

import { supabase } from '@/lib/supabase-client';
import React, { createContext, useContext, useState, useEffect } from 'react';

export interface WinInput {
  id: string;
  inputId: string;
  message: string;
  icon: string;
  encouragement: string;
  color: string;
  emotion: string;
}

interface WinProviderProps {
  smallWins: WinInput[];
  addWin: (input: Omit<WinInput, 'id'>) => Promise<void>;
  clearAllWins: any;
}

const WinContext = createContext<WinProviderProps | undefined>(undefined);

export const WinProvider = ({ children }: { children: React.ReactNode }) => {
  const [smallWins, setSmallWins] = useState<WinInput[]>([]);

  const fetchSmallWins = async () => {
    const { data, error } = await supabase
      .from('smallwins')
      .select('id, input_id, message, icon, encouragement, color, emotion, created_at')
      .order('created_at', { ascending: false });


    if (error) {
      console.error('Error fetching smallwin inputs:', error.message);
    } else {
      const normalized = data.map((d: any) => ({
        id: d.id,
        inputId: d.input_id,
        message: d.message,
        icon: d.icon,
        encouragement: d.encouragement,
        color: d.color,
        emotion: d.emotion,
      }));
      

      setSmallWins(normalized);
    }
  };

  const addWin = async (input: Omit<WinInput, 'id'>) => {
    const { data: sessionData } = await supabase.auth.getSession();
    const userId = sessionData?.session?.user?.id;

    if (!userId) {
      console.error("User not authenticated");
      return;
    }

 

    const { error } = await supabase.from('smallwins').insert([
      {
        input_id: input.inputId,
        user_id: userId,
        message: input.message,
        icon: input.icon,
        encouragement: input.encouragement,
        color: input.color,
        emotion: input.emotion,
        created_at: new Date().toISOString(),
      },
    ]);
    

    if (error) {
      console.error('Error inserting win:', error.message);
    } else {
      fetchSmallWins(); // Refresh state
    }
  };
  const clearAllWins = async () => {
    // Delete from Supabase
    await supabase.from("smallwins").delete().neq("input_id", ""); // delete all rows
  
    // Clear from local context state
    setSmallWins([]);
  };

  useEffect(() => {
    fetchSmallWins();
  }, []);

  return (
    <WinContext.Provider value={{ smallWins, addWin, clearAllWins }}>
      {children}
    </WinContext.Provider>
  );
};

export const useWin = () => {
  const context = useContext(WinContext);
  if (!context) {
    throw new Error('useWin must be used within a WinProvider');
  }
  return context;
};
