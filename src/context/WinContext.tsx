'use client'
import { supabase } from '@/lib/supabase-client';
import React, { createContext, useContext, useState, useEffect } from 'react';
import { WinInput } from '@/types/interfaces';
import { WinProviderProps } from '@/types/interfaces';

const WinContext = createContext<WinProviderProps | undefined>(undefined);

export const WinProvider = ({ children }: { children: React.ReactNode }) => {
  const [smallWins, setSmallWins] = useState<WinInput[]>([]);

  const fetchSmallWins = async () => {
    const { data, error } = await supabase
      .from('smallwins')
      .select('*')
      .order('created_at', { ascending: false });

    console.log('Supabase data:', data);

    if (error) {
      console.error('Error fetching smallwin inputs:', error.message);
    } else {
      const uniqueWins = data.reduce((acc, win) => {
        if (!acc.some((existingWin: WinInput) => existingWin.inputId === win.input_id)) {
          acc.push({
            id: win.id,
            inputId: win.input_id,
            message: win.message,
            icon: win.icon,
            encouragement: win.encouragement,
            color: win.color,
            emotion: win.emotion,
          });
        }
        return acc;
      }, [] as WinInput[]);

      setSmallWins(uniqueWins);
    }
  };

  const addWin = async (input: Omit<WinInput, 'id'>) => {
    const { data: existingWins, error: fetchError } = await supabase
      .from('smallwins')
      .select('*')
      .eq('input_id', input.inputId);

    if (fetchError) {
      console.error('Error checking for existing win:', fetchError.message);
      return;
    }

    if (existingWins && existingWins.length > 0) {
      console.warn('Duplicate win detected. Skipping insert.');
      return;
    }

    const { error } = await supabase.from('smallwins').insert([
      {
        input_id: input.inputId,
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
      fetchSmallWins();
    }
  };

  const clearAllWins = () => {
    setSmallWins([]); // Clear the small wins
  };

  useEffect(() => {
    fetchSmallWins();
  }, []);

  return (
    <WinContext.Provider value={{ smallWins, addWin, clearAllWins, existingWin: {} as WinInput }}>
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


