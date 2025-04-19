// app/futureself/futureselfclient.tsx
'use client';

import { FutureProvider } from '@/context/FutureContext';
import InnerClientComponent from './InnerClientComponent';

export default function FutureselfClient({ userId, username, initialInputs }) {
  return (
    <FutureProvider initialInputs={initialInputs}>
      <InnerClientComponent userId={userId} username={username} />
    </FutureProvider>
  );
}
