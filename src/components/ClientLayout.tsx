"use client";

import { useEffect, useState } from "react";
import Cursor from "@/components/Cursor";
import Loading from "@/components/Loading";

export default function ClientLayout({ children }: { children: React.ReactNode }) {
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => setLoading(false), 500);
    return () => clearTimeout(timer);
  }, []);

  return (
    <>
      <Cursor />
      {loading ? <Loading /> : children}
    </>
  )
}