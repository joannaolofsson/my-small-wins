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
    <div className="max-w-md mx-auto p-4">
      <h2 className="text-lg font-bold">{isSignUp ? 'Sign Up' : 'Login'}</h2>
      {error && <p className="text-red-500">{error}</p>}
      <form onSubmit={handleSubmit} className="w-full flex flex-col gap-4">
        <Label htmlFor="email" className='block text-sm font-medium text-[#333333]'>Email:</Label>
        <Input
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          placeholder="Email"
          required
          className="mt-1 w-full px-4 p-2  h-10 rounded-md border border-gray-200 bg-white text-sm text-gray-700"
        />
        <Label htmlFor="password" className='block text-sm font-medium text-[#333333]'>Password:</Label>
        <Input
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          placeholder="Password"
          required
          className="mt-1 w-full px-4 p-2  h-10 rounded-md border border-gray-200 bg-white text-sm text-gray-700"
        />
        <Button
          type="submit"
          disabled={loading}
          className={`p-2 rounded text-white ${loading ? 'bg-gray-400' : 'bg-blue-500'}`}
        >
          {loading ? 'Loading...' : isSignUp ? 'Sign Up' : 'Login'}
        </Button>
      </form>
      <button onClick={toggleMode} className="text-sm text-blue-500 mt-2 underline">
        {isSignUp ? 'Already have an account? Login' : "Don't have an account? Sign up"}
      </button>
    </div>
  );
}
