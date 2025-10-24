"use client"

import { usePathname } from "next/navigation"
import Header from "./Header"
import Footer from "./Footer"

export default function HeaderFooterWrapper({ children }) {
  const pathname = usePathname()
  const hideHeaderFooter = pathname.startsWith("/admin")

  return (
    <>
      {!hideHeaderFooter && <Header />}
      <main>{children}</main>
      {!hideHeaderFooter && <Footer />}
    </>
  )
}
