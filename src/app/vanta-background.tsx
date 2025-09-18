"use client";

import { useEffect } from "react";
import Script from "next/script";

export default function VantaBackground() {
    useEffect(() => {
        if (typeof window !== "undefined" && (window as any).VANTA) {
            (window as any).VANTA.FOG({
                el: "#background",
                mouseControls: false,
                touchControls: false,
                gyroControls: false,
                minHeight: 200.00,
                minWidth: 200.00,
                highlightColor: "#FFFFFF",
                midtoneColor: "#CCCCCC",
                lowlightColor: "#999999",
                baseColor: "#F0F0F0",
                blurFactor: 0.3,
                speed: 1.0,
                zoom: 1.5,
            });
        }
    }, []);

    useEffect(() => {
        const handleVisibilityChange = () => {
            const vantaEffect = (window as any).vantaEffect;
            if (!vantaEffect) return;
            if (document.hidden) vantaEffect.pause();
            else vantaEffect.resume();
        };

        document.addEventListener("visibilitychange", handleVisibilityChange);
        return () => {
            document.removeEventListener("visibilitychange", handleVisibilityChange);
        };
    }, []);

    return (
        <>
            <Script src="https://cdnjs.cloudflare.com/ajax/libs/three.js/r134/three.min.js" strategy="beforeInteractive" />
            <Script src="https://cdn.jsdelivr.net/npm/vanta/dist/vanta.fog.min.js" strategy="beforeInteractive" />
            <div id="background" className="fixed inset-0 -z-10"></div>
        </>
    );
}