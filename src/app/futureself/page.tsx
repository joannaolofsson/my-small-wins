// app/futureself/page.tsx
'use server';

import createClient from '@/utils/server';
import FutureselfClient from './futureselfclient';
import { redirect } from 'next/navigation';

export default async function FutureselfPage() {
  const supabase = createClient();

  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) {
    return redirect('/login');
  }

  const { data: inputs, error } = await supabase
    .from('future_inputs')
    .select('*')
    .eq('user_id', user.id);

  if (error) {
    console.error('Error fetching inputs:', error.message);
    return <div>Failed to load data. Please try again later.</div>;
  }

  return (
    <FutureselfClient
      username={user.user_metadata?.username ?? 'Friend'}
      userId={user.id}
      initialInputs={inputs ?? []}
    />
  );
}