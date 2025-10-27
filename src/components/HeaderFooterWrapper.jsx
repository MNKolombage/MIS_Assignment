"use client";

import { usePathname } from "next/navigation";
import Header from "./Header";
import Footer from "./Footer";

export default function HeaderFooterWrapper({ children }) {
  const pathname = usePathname();

  // Hide Header/Footer only on admin pages
  const hideHeaderFooter = pathname?.startsWith("/admin");

  return (
    <>
      {!hideHeaderFooter && <Header />}
      <main className="flex-1">{children}</main>
      {!hideHeaderFooter && <Footer />}
    </>
  );
}
