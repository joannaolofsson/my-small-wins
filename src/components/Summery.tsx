'use client';
import { PostgrestSingleResponse } from '@supabase/supabase-js';
import { useState, useEffect } from 'react';
import { supabase } from '@/lib/supabase-client';
import { Button } from './ui/button';
import Link from 'next/link';
import SmallWinBooster from './SmallWinBooster';
import { FutureInput } from '@/types/interfaces';

export default function Summary() {
  // State for Future Self goals
  const [habits, setHabits] = useState<FutureInput[]>([]);
const [accomplishments, setAccomplishments] = useState<FutureInput[]>([]);
const [gifts, setGifts] = useState<FutureInput[]>([]);

  const [loading, setLoading] = useState(true);

  // Fetch Future Self data
  useEffect(() => {
    let isMounted = true;

    const fetchFutureGoals = async () => {
      setLoading(true);
      const { data, error }: PostgrestSingleResponse<FutureInput[]> = await supabase
        .from('future_inputs')
        .select('*')
        .order('created_at', { ascending: false });
    
      if (error) {
        console.error('Error fetching future inputs:', error.message);
        setLoading(false);
        return;
      }
    
      if (!Array.isArray(data)) {
        console.error('Unexpected data format:', data);
        setLoading(false);
        return;
      }
    
      const groupedData = data.reduce(
        (acc, item) => {
          if (item.category === 'Habit') acc.habits.push(item);
          if (item.category === 'Accomplishment') acc.accomplishments.push(item);
          if (item.category === 'Gift') acc.gifts.push(item);
          return acc;
        },
        { habits: [], accomplishments: [], gifts: [] } as {
          habits: FutureInput[];
          accomplishments: FutureInput[];
          gifts: FutureInput[];
        }
      );
    
      setHabits(groupedData.habits);
      setAccomplishments(groupedData.accomplishments);
      setGifts(groupedData.gifts);
      setLoading(false);
    };
    

    fetchFutureGoals();

    return () => {
      isMounted = false; // Cleanup if component unmounts
    };
  }, []);

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 w-full mx-auto">
      {/* Small Wins Column */}
      <div className="flex flex-col justify-start gap-4 border border-gray-200 rounded-xl p-4">
        <h2 className="text-2xl font-semibold">Small Wins</h2>
        <SmallWinBooster limit={5}/>
        <div className="mt-2 text-center self-end">
          <Link href="/smallwins">
            <Button variant="default">Go to Small Wins</Button>
          </Link>
        </div>
      </div>

      {/* Future Self Goals Column */}
      <div className="flex flex-col justify-start gap-4 border border-gray-200 rounded-xl p-4">
        <h2 className="text-2xl font-semibold">Future Self Goals</h2>
        {loading ? (
          <p>Loading Future Self goals...</p>
        ) : (
          <div className="flex flex-col gap-2">
            {/* Habit Card */}
            <div className="bg-white/30 border border-gray-200 rounded-lg p-4 shadow-md">
              <h3 className="text-md font-normal">Habit</h3>
              <p>{habits.length > 0 ? habits[0]?.name : 'No habits yet!'}</p>
            </div>
            {/* Accomplishment Card */}
            <div className="bg-white/30 border border-gray-200 rounded-lg p-4 shadow-md">
              <h3 className="text-md font-normal">Accomplishment</h3>
              <p>
                {accomplishments.length > 0
                  ? accomplishments[0]?.name
                  : 'No accomplishments yet!'}
              </p>
            </div>
            {/* Gift Card */}
            <div className="bg-white/30 border border-gray-200 rounded-lg p-4 shadow-md">
              <h3 className="text-md font-normal">Gift</h3>
              {gifts.length > 0 ? (
                <p>{gifts[0]?.name}</p>
              ) : (
                <div>
                  <p className="text-gray-500">No gifts yet!</p>
                  <button 
                    onClick={() => window.location.href = '/futureself/gift'} 
                    className="mt-2 px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600"
                  >
                    Add a Gift
                  </button>
                </div>
              )}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
