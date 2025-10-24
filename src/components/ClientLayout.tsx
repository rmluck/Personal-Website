"use client";

import Loading from "@/components/Loading";
import Cursor from "@/components/Cursor";
import ThemeToggle from "@/components/ThemeToggle";
import SocialSidebar from "@/components/SocialSidebar";
import EmailSidebar from "@/components/EmailSidebar";
import { useEffect, useState } from "react";

export default function ClientLayout(
  { children } : { children: React.ReactNode }
) {
  const [loading, setLoading] = useState(true);

  // Simulate a loading delay
  useEffect(() => {
    const timer = setTimeout(() => setLoading(false), 500);
    return () => clearTimeout(timer);
  }, []);

  return (
    <>
      <Cursor />
      <ThemeToggle />
      <SocialSidebar />
      <EmailSidebar />
      {loading ? <Loading /> : children}
    </>
  )
}