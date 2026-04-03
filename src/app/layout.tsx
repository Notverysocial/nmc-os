import type { Metadata } from "next";
import { Playfair_Display, Inter, JetBrains_Mono } from "next/font/google";
import "./globals.css";
import RootLayoutShell from "@/components/RootLayoutShell";
import PixelLife from "@/components/PixelLife";
import GrainOverlay from "@/components/GrainOverlay";
import ScanLines from "@/components/ScanLines";
import CursorGlow from "@/components/CursorGlow";

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
  weight: ["300", "400", "500", "600", "700"],
});

const jetbrainsMono = JetBrains_Mono({
  subsets: ["latin"],
  variable: "--font-jetbrains",
  weight: ["300", "400", "500", "600", "700"],
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
    <html lang="en" className={`${inter.variable} ${jetbrainsMono.variable} ${playfair.variable}`}>
      <body style={{ backgroundColor: "#000000" }}>
        <PixelLife />
        <GrainOverlay />
        <ScanLines />
        <CursorGlow />
        <RootLayoutShell>{children}</RootLayoutShell>
      </body>
    </html>
  );
}
