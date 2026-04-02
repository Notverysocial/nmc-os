"use client";

import { usePathname } from "next/navigation";
import NavSPA from "./NavSPA";
import Footer from "./Footer";

export default function RootLayoutShell({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  const isAdmin = pathname?.startsWith("/admin");

  return (
    <>
      {!isAdmin && <NavSPA />}
      <main>{children}</main>
      {!isAdmin && <Footer />}
    </>
  );
}
