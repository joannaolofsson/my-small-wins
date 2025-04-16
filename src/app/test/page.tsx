'use client';

import { useEffect } from 'react';
import { createSupabaseClient } from '@/utils/clients';

export default function TestPage() {
  useEffect(() => {
    const testSupabaseAuth = async () => {
      const supabase = createSupabaseClient();

      // Test Login
      console.log('Testing login...');
      const { data: loginData, error: loginError } = await supabase.auth.signInWithPassword({
        email: 'joanna.olofsson@tutamail.com', // Use a valid email
        password: 'Tonga2356',   // Use a valid password
      });
      if (loginError) {
        console.error('Login Error:', loginError.message);
        return;
      } else {
        console.log('Login Successful:', loginData?.user);
      }

      // Test Session
      console.log('Testing session retrieval...');
      const { data: sessionData, error: sessionError } = await supabase.auth.getSession();
      if (sessionError) {
        console.error('Session Error:', sessionError.message);
      } else {
        console.log('Session Retrieved:', sessionData);
      }

      // Test User Retrieval
      console.log('Testing user retrieval...');
      const { data: userData, error: userError } = await supabase.auth.getUser();
      if (userError) {
        console.error('User Error:', userError.message);
      } else {  
        console.log('User Retrieved:', userData?.user);
      }
    };

    testSupabaseAuth();
  }, []);

  return <h2>Check the console for test results!</h2>;
}
