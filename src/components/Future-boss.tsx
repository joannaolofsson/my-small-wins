'use client';

import { supabase } from '@/lib/supabase-client';
import { useEffect, useState } from 'react';

interface Future {
  user_id: string;
  id: number;
  name: string;
  category: string;
  created_at: string;
}

type Props = {
  session: any;
};

export function Futuremanager({ session }: Props) {
  const [profile, setProfile] = useState<any>(null);
  const [futureSelf, setFutureSelf] = useState<Future[]>([]);
  const [newFuture, setNewFuture] = useState({ name: '', category: '' });
  const [newName, setNewName] = useState('');

  useEffect(() => {
    if (session?.user) {
      fetchUserProfile();
      fetchFutureInputs();
    }
  }, [session]);

  const fetchUserProfile = async () => {
    const { data, error } = await supabase
      .from('user_profiles')
      .select('*')
      .eq('id', session.user.id)
      .single();

    if (error) {
      console.error('Error fetching profile:', error.message);
    } else {
      setProfile(data);
    }
  };

  const fetchFutureInputs = async () => {
    const { data, error } = await supabase
      .from('future_inputs')
      .select('*')
      .eq('user_id', session.user.id)
      .order('created_at', { ascending: true });

    if (error) {
      console.error('Error fetching future inputs:', error.message);
    } else {
      setFutureSelf(data);
    }
  };

  const handleDelete = async (id: number) => {
    const { error } = await supabase.from('future_inputs').delete().eq('id', id);

    if (error) {
      console.error('Error deleting row:', error.message);
    } else {
      fetchFutureInputs(); 
    }
  };

  const handleUpdate = async (id: number) => {
    const { error } = await supabase
      .from('future_inputs')
      .update({ name: newName })
      .eq('id', id);

    if (error) {
      console.error('Error updating row:', error.message);
    } else {
      fetchFutureInputs(); 
      setNewName(''); 
    }
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const user = session?.user;

    if (!user) {
      console.error('User is not logged in.');
      return;
    }

    const { error } = await supabase.from('future_inputs').insert({
      name: newFuture.name,
      category: newFuture.category,
      user_id: user.id,
    });

    if (error) {
      console.error('Error adding future input:', error.message);
    } else {
      setNewFuture({ name: '', category: '' }); // Reset form
      fetchFutureInputs(); // Refresh the list
    }
  };

  const InputField = ({ placeholder, onChange }: { placeholder: string; onChange: (e: React.ChangeEvent<HTMLInputElement>) => void }) => (
    <input type="text" placeholder={placeholder} onChange={onChange} className="border rounded p-2 my-2" />
  );

  return (
    <div className="flex flex-col mt-12">
      <div className="w-lg bg-white/30 border border-white/20 rounded-xl backdrop-blur-[15px] shadow-lg my-4 p-6">
        <h2>Future Self</h2>
        <p>Who is your future self?</p>
      </div>

      <section>
        <form onSubmit={handleSubmit} className="flex flex-col gap-4">
          <InputField
            placeholder="Habit"
            onChange={(e) => setNewFuture((prev) => ({ ...prev, name: e.target.value }))}
          />
          <InputField
            placeholder="Accomplishment"
            onChange={(e) => setNewFuture((prev) => ({ ...prev, category: e.target.value }))}
          />
          <button type="submit" className="bg-blue-500 text-white rounded p-2">
            Add
          </button>
        </form>
      </section>

      <section>
        <ul className="mt-6">
          {futureSelf.map((future) => (
            <li key={future.id} className="border-b py-4">
              <h3 className="font-bold">{future.name}</h3>
              <div className="flex gap-2 mt-2">
                <InputField
                  placeholder="Updated name"
                  onChange={(e) => setNewName(e.target.value)}
                />
                <button
                  onClick={() => handleUpdate(future.id)}
                  className="bg-green-500 text-white rounded px-4"
                >
                  Edit
                </button>
                <button
                  onClick={() => handleDelete(future.id)}
                  className="bg-red-500 text-white rounded px-4"
                >
                  Delete
                </button>
              </div>
            </li>
          ))}
        </ul>
      </section>
    </div>
  );
}
