'use server';

import createClient from '@/utils/server';
import FutureselfClient from './futureselfclient';
import { redirect } from 'next/navigation';

interface User {
  id: string;
  user_metadata?: { username: string };
}

export default async function FutureselfPage() {
  const supabase = await createClient();

  const { data: { user } } = await supabase.auth.getUser();

  if (!user) {
    console.log('User is not authenticated. Redirecting to login...');
    return redirect('/login');
  }

  const { data: inputs, error } = await supabase
    .from('future_inputs')
    .select('*')
    .eq('user_id', user.id);

  if (error) {
    console.error('Error fetching inputs:', error.message);
    return redirect('/error');
  }

  return (
    <FutureselfClient
      username={user.user_metadata?.username ?? 'Friend'}
      userId={user.id}
      initialInputs={inputs ?? []}
/>
  );
}