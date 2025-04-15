'use client';

import { useState } from 'react';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Button } from '@/components/ui/button';
import { createClient } from '../utils/supabase/clients';

export default function TestSignup() {
  const [email, setEmail] = useState("joanna.olofsson@tutamail.com"); // Hardcoded test email
  const [password, setPassword] = useState("JoannaTuta"); // Hardcoded test password
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState(false);

  const handleSignup = async () => {
    setLoading(true);
    setError(null);
    setSuccess(false);

    try {
      const supabase = createClient(); 
      const { data, error } = await supabase.auth.signUp({
        email,
        password,
      });

      setLoading(false);

      if (error) {
        setError(error.message);
      } else {
        setSuccess(true);
        console.log("Signup data:", data);
      }
    } catch (err: any) {
      setLoading(false);
      setError(err.message || "An unknown error occurred.");
    }
  };

  return (
    <div className="max-w-md mx-auto mt-20">
      <h1 className="text-xl font-bold mb-4 text-center">Test Signup</h1>
      <div className="flex flex-col gap-4 bg-white/30 p-6 rounded-xl border border-white/20 backdrop-blur-md">
        <Label htmlFor="email">Email</Label>
        <Input
          id="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          className="bg-[#F8F9FA]"
        />

        <Label htmlFor="password">Password</Label>
        <Input
          id="password"
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          className="bg-[#F8F9FA]"
        />

        <Button onClick={handleSignup} disabled={loading}>
          {loading ? "Signing up..." : "Signup"}
        </Button>

        {error && <p className="text-red-600 text-sm">Error: {error}</p>}
        {success && <p className="text-green-600 text-sm">Signup successful! Check your email!</p>}
      </div>
    </div>
  );
}