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
  const [hasMouse, setHasMouse] = useState(false);

  // Detect if device has a mouse/trackpad
  useEffect(() => {
    const checkForMouse = () => {
      if (window.matchMedia) {
        const hasFinePointer = window.matchMedia("(pointer: fine)").matches;
        const canHover = window.matchMedia("(hover: hover)").matches;
        setHasMouse(hasFinePointer && canHover);
      } else {
        setHasMouse(true);
      }
    };

    checkForMouse();

    const finePointerQuery = window.matchMedia("(pointer: fine)");
    const hoverQuery = window.matchMedia("(hover: hover)");

    finePointerQuery.addEventListener("change", checkForMouse);
    hoverQuery.addEventListener("change", checkForMouse);

    return () => {
      finePointerQuery.removeEventListener("change", checkForMouse);
      hoverQuery.removeEventListener("change", checkForMouse);
    };
  }, []);

  // Apply cursor-none class to html element when mouse is detected
  useEffect(() => {
    if (hasMouse) {
      document.documentElement.classList.add("cursor-none");
    } else {
      document.documentElement.classList.remove("cursor-none");
    }
  }, [hasMouse]);

  // Simulate a loading delay
  useEffect(() => {
    const timer = setTimeout(() => setLoading(false), 500);
    return () => clearTimeout(timer);
  }, []);

  return (
    <>
      {hasMouse && <Cursor />}
      <ThemeToggle />
      <SocialSidebar />
      <EmailSidebar />
      {loading ? <Loading /> : children}
    </>
  )
}