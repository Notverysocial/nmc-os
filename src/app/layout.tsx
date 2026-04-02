import type { Metadata } from "next";
import { DM_Sans, Syne } from "next/font/google";
import "./globals.css";
import NavSPA from "@/components/NavSPA";
import Footer from "@/components/Footer";

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
    <html lang="en" className={`${dmSans.variable} ${syne.variable}`}>
      <body>
        <NavSPA />
        <main>{children}</main>
        <Footer />
      </body>
    </html>
  );
}
