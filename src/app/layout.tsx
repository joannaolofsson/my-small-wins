import type { Metadata } from "next";
import { Manrope } from "next/font/google";
import './globals.css'
import { WinProvider } from "@/context/WinContext";
import { FutureProvider } from "@/context/FutureContext";
import Header from "@/components/Header";
import TabBar from "@/components/Tabbar";

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
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en">
      <body
        className={`${manropeSans} antialiased bg-gradient-to-br from-[#A8D5BA] to-[#D9F1E5] min-h-screen`}
      >
        <WinProvider>
          <FutureProvider>
            <div className="hidden md:block">
            <Header />
            </div>
            <div className="block sm:hidden">
            <TabBar />
            </div>
            {children}
          </FutureProvider>
        </WinProvider>
      </body>
    </html>
  );
}

