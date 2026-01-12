"use client";
import { usePathname } from "next/navigation";
import Footer from "./Footer";

export default function ConditionalFooter() {
  const pathname = usePathname();

  // Если мы на странице генератора, не рендерим ничего
  if (pathname === "/palette-generator") return null;

  return <Footer />;
}
