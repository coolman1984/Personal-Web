"use client";
/** Hides course-site scroll progress on the workshop home page. */
import { usePathname } from "next/navigation";
import { ScrollProgress } from "./scroll-progress";

export function ScrollProgressGate() {
  const pathname = usePathname();
  if (pathname === "/") return null;
  return <ScrollProgress />;
}
