'use client';

import { FutureProvider } from "@/context/FutureContext";
import FutureClient from "./FutureClient";

export default function FutureselfClient() {
  return (
    <FutureProvider>
      <FutureClient />
    </FutureProvider>
  );
}

