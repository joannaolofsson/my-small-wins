import type { Metadata } from "next";
import { Manrope } from "next/font/google";
import "./globals.css";
import Tabbar from "@/components/tabbar";
import { NavigationMenu } from "@/components/ui/navigation-menu";

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
        className={`${manropeSans} antialiased`}
      >
        <NavigationMenu className="" />
        <div className="bottom-0 fixed">
        <Tabbar/>
        </div>
        {children}
      </body>
    </html>
  );
}
