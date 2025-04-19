'use server';

import createClient from '@/utils/server';
import FutureselfClient from './futureselfclient';
import { FutureProvider } from '@/context/FutureContext';

export default async function FutureselfPage() {
  const supabase = await createClient();

  // Get the currently signed-in user/session
  const {
    data: { session },
  } = await supabase.auth.getSession();

  //const userId = session?.user?.id;
  // Temporary so I can work
  const userId = session?.user?.id || 'dev-user-id'; 

  if (!userId) {
    // Optional: redirect or return a message
    return <p>You must be signed in to view this page.</p>;
  }

  // Fetch existing inputs for that user
  const { data: initialInputs = [] } = await supabase
    .from("future_inputs")
    .select("*")
    .eq("user_id", userId);

  return (
    <FutureProvider initialInputs={initialInputs}>
      <FutureselfClient
        username={session.user.user_metadata?.username || session.user.email}
        userId={userId}
        initialInputs={initialInputs}
      />
    </FutureProvider>
  );
}

