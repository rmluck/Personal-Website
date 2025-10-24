"use client";

import { useEffect, useState } from "react";

export default function ScrollHint() {
  const [showScrollHint, setShowScrollHint] = useState(true);
  const [isVisible, setIsVisible] = useState(true);

  // Hide the scroll hint after the user starts scrolling
  useEffect(() => {
    const handleScroll = () => {
        if (window.scrollY > 10) {
            setIsVisible(false);
            setTimeout(() => setShowScrollHint(false), 500);
        }
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  if (!showScrollHint) return null;

  return (
    <div
      className={`
        fixed bottom-6 left-1/2 -translate-x-1/2 z-50
        text-pro600 dark:text-pro400 text-center
        transition-opacity
        ${isVisible ? "opacity-100" : "opacity-0"}
        hover:text-accent hover:-translate-y-1
        transition-transform transform duration-200 ease-out
        cursor-hover cursor-none
      `}
    >
        <p className="text-xm tracking-widest uppercase">Scroll</p>
        <p className="text-xl">↓</p>
    </div>
  );
}