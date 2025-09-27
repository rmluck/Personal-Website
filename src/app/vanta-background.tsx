"use client";

import { useEffect, useRef } from "react";
import Script from "next/script";

export default function VantaBackground() {
    const vantaRef = useRef<any>(null);

    const getColors = (isDark: boolean) => ({
        highlightColor: isDark ? "#000000" : "#FFFFFF",
        midtoneColor: isDark ? "#333333" : "#CCCCCC",
        lowlightColor: isDark ? "#666666" : "#999999",
        baseColor: isDark ? "#1A1A1A" : "#F0F0F0",
    });

    useEffect(() => {
        const initVanta = () => {
            const isDark = document.documentElement.classList.contains("dark");

            if (vantaRef.current) vantaRef.current.destroy();

            vantaRef.current = (window as any).VANTA.FOG({
                el: "#background",
                mouseControls: false,
                touchControls: false,
                gyroControls: false,
                minHeight: 200,
                minWidth: 200,
                blurFactor: 0.3,
                speed: 1.0,
                zoom: 1.0,
                ...getColors(isDark),
            });
        };

        initVanta();

        const observer = new MutationObserver(() => initVanta());
        observer.observe(document.documentElement, { attributes: true, attributeFilter: ["class"] });

        return () => {
            observer.disconnect();
            if (vantaRef.current) vantaRef.current.destroy();
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