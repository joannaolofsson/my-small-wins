import type { Metadata } from "next";
import { Manrope } from "next/font/google";
import './globals.css'
import Header from "@/components/Header";
import { FutureProvider } from "@/context/FutureContext";
import { WinProvider } from "@/context/WinContext";

const manropeSans = Manrope({
  weight: ['400', '500', '600', '700'],
  style: ['normal'],
  subsets: ['latin'],
  display: 'swap',
})

export const metadata: Metadata = {
  title: "Small win tracker",
  description: "Track your small wins to reach your future you",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${manropeSans} antialiased bg-gradient-to-br from-[#A8D5BA] to-[#D9F1E5] min-h-screen`}
      >
        <main className="pb-20">
          <WinProvider>
            <FutureProvider>
              <Header />
              {children}
              </FutureProvider>
          </WinProvider>
        </main>
      </body>
    </html>
  );
}
