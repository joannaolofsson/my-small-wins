import type { Metadata } from "next";
import { Manrope } from "next/font/google";
import './globals.css'
import Tabbar from "@/components/tabbar";
import Header from "@/components/Header";
import { FutureProvider } from "@/context/FutureContext";
import { WinProvider } from "@/context/WinContext";
import { AuthProvider } from "@/context/AuthContext";

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
        
        <AuthProvider>
          <WinProvider>
            <FutureProvider>
              <Header />
              <main className="pb-20">
                {children}
              </main>
              <div className="bottom-0 fixed">
                <Tabbar/>
              </div>
            </FutureProvider>
          </WinProvider>
        </AuthProvider>
      </body>
    </html>
  );
}
