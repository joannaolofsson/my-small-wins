import type { Metadata } from "next";
import { Manrope } from "next/font/google";
import './globals.css'

import {
  ClerkProvider,
  SignInButton,
  SignUpButton,
  SignedIn,
  SignedOut,
  UserButton,
} from '@clerk/nextjs'

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
  children: React.ReactNode
}>) {
  return (
    <ClerkProvider>
      <html lang="en">
        className={`${manropeSans} antialiased bg-gradient-to-br from-[#A8D5BA] to-[#D9F1E5] min-h-screen`}
        <body>
          <header className="flex justify-end items-center p-4 gap-4 h-16">
            <SignedOut>
              <SignInButton />
              <SignUpButton />
            </SignedOut>
            <SignedIn>
              <UserButton />
            </SignedIn>
          </header>
          {children}
  
        </body>
      </html>
    </ClerkProvider>
  )
}


