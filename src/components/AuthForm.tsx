'use client';

import React, { useState } from 'react';
import { supabase } from '@/lib/supabase-client';
import { useRouter } from 'next/navigation';
import { Label } from './ui/label';
import { Input } from './ui/input';
import { Button } from './ui/button';

export default function AuthForm() {
  const [isSignUp, setIsSignUp] = useState(false);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const router = useRouter();

  const toggleMode = () => setIsSignUp(!isSignUp);

  const handleSubmit = async (event: React.FormEvent) => {
    event.preventDefault();
    setLoading(true);
    setError(null);

    const { data, error } = isSignUp
      ? await supabase.auth.signUp({ email, password })
      : await supabase.auth.signInWithPassword({ email, password });

    if (error) {
      setError(error.message);
    } else if (data?.user) {
      router.push('/');
    }
    setLoading(false);
  };

  return (
    <div className="w-full max-w-md flex flex-col justify-center bg-white/30 border border-white/20 rounded-xl backdrop-blur-[15px] shadow-lg cursor-pointer my-6 gap-2 p-8">
      <h2 className="mb-4 text-2xl md:text-4xl text-center text-[#333333]">{isSignUp ? 'Sign Up' : 'Login'}</h2>
      {error && <p className="text-red-500">{error}</p>}
      <section>
      <form onSubmit={handleSubmit} className="w-full flex flex-col gap-4">
        <div className='flex flex-col gap-2'>
        <Label htmlFor="email" className='text-[#333333]'>Email:</Label>
        <Input
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          placeholder="Email"
          required
          className="bg-[#F8F9FA] text-[#333333]"
        />
        </div>
        <div className='flex flex-col gap-2'>
        <Label htmlFor="password" className='text-[#333333]'>Password:</Label>
        <Input
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          placeholder="Password"
          required
          className="bg-[#F8F9FA] text-[#333333]"
        />
        </div>
        <Button
          type="submit"
          disabled={loading}
          className={` ${loading ? 'bg-gray-400' : 'bg-[#C9A7D9]'}`}
        >
          {loading ? 'Loading...' : isSignUp ? 'Sign Up' : 'Login'}
        </Button>
      </form>
      </section>
      <button onClick={toggleMode} className="text-sm text-[#333333] mt-2 self-end">
        {isSignUp ? 'Already have an account? Login' : "Don't have an account? Sign up"}
      </button>
    </div>
  );
}
