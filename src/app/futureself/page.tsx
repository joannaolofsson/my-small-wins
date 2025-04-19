// app/futureself/page.tsx

import { supabase } from '@/lib/supabase-client';
import FutureselfClient from './futureselfclient';

export default async function FutureselfPage() {
  const {
    data: { session },
  } = await supabase.auth.getSession();

  const userId = session?.user?.id || 'dev-user-id';
  const username = session?.user?.user_metadata?.username || session?.user?.email;

  if (!userId) {
    return (
      <div className="p-10 text-center text-red-600">
        You must be signed in to view this page.
      </div>
    );
  }

  const { data: initialInputs = [] } = await supabase
    .from("future_inputs")
    .select("*")
    .eq("user_id", userId);

  return (
    <FutureselfClient
      username={username}
      userId={userId}
      initialInputs={initialInputs}
    />
  );
}
