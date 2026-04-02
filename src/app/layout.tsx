import type { Metadata } from "next";
import { DM_Sans, Syne, Playfair_Display } from "next/font/google";
import "./globals.css";
import RootLayoutShell from "@/components/RootLayoutShell";
import GrainOverlay from "@/components/GrainOverlay";
import ScanLines from "@/components/ScanLines";
import CursorGlow from "@/components/CursorGlow";

const dmSans = DM_Sans({
  subsets: ["latin"],
  variable: "--font-dm-sans",
  weight: ["300", "400", "500", "600", "700"],
});

const syne = Syne({
  subsets: ["latin"],
  variable: "--font-syne",
  weight: ["400", "500", "600", "700", "800"],
});

const playfair = Playfair_Display({
  subsets: ["latin"],
  variable: "--font-playfair",
  weight: ["400", "500", "600", "700", "800", "900"],
  style: ["normal", "italic"],
});

export const metadata: Metadata = {
  title: "NMC Business OS — AI-Powered Operations Platform",
  description:
    "New Mindset Content's Business OS is an AI-powered operations platform built for growth-stage companies. Automate operations, scale your brand, and own your data.",
  keywords: ["business OS", "AI operations", "marketing automation", "brand journalism", "NMC"],
  openGraph: {
    title: "NMC Business OS",
    description: "Your Business. Supercharged.",
    url: "https://os.newmindsetcontent.com",
    siteName: "NMC Business OS",
    type: "website",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={`${dmSans.variable} ${syne.variable} ${playfair.variable}`}>
      <body style={{ backgroundColor: "#0A0A0B" }}>
        <GrainOverlay />
        <ScanLines />
        <CursorGlow />
        <RootLayoutShell>{children}</RootLayoutShell>
      </body>
    </html>
  );
}
