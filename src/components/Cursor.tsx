"use client";

import { motion, useMotionValue, useSpring } from "framer-motion";
import { useState, useEffect } from "react";

export default function Cursor() {
    // const mouseX = useMotionValue(0);
    // const mouseY = useMotionValue(0);

    // const springConfig = { stiffness: 300, damping: 30 };
    // const cursorX = useSpring(mouseX, springConfig);
    // const cursorY = useSpring(mouseY, springConfig);

    const[mousePosition, setMousePosition] = useState({ x: 0, y: 0 });

    const [isHovering, setIsHovering] = useState(false);
    const [isClicking, setIsClicking] = useState(false);

    useEffect(() => {
        const moveCursor = (e: MouseEvent) => {
            setMousePosition({ x: e.clientX, y: e.clientY });
        };
        window.addEventListener("mousemove", moveCursor);
        return () => window.removeEventListener("mousemove", moveCursor);
    }, []);

    useEffect(() => {
        const handleEnter = (e: MouseEvent) => {
            if ((e.target as Element).closest(".cursor-hover")) {
                setIsHovering(true);
            }
        };
        const handleLeave = (e: MouseEvent) => {
            setIsHovering(false);
        };
        document.addEventListener("mouseover", handleEnter);
        document.addEventListener("mouseout", handleLeave);
        return () => {
            document.removeEventListener("mouseover", handleEnter);
            document.removeEventListener("mouseout", handleLeave);
        };
    }, []);

    useEffect(() => {
        const handleDown = () => setIsClicking(true);
        const handleUp = () => setIsClicking(false);

        window.addEventListener("mousedown", handleDown);
        window.addEventListener("mouseup", handleUp);

        return () => {
            window.removeEventListener("mousedown", handleDown);
            window.removeEventListener("mouseup", handleUp);
        };
    }, []);

    return (
        <motion.div 
            className={`fixed top-0 left-0 rounded-full bg-accent pointer-events-none z-100 transition-color transition-opacity ${isHovering ? "bg-accent/30 w-8 h-8" : "bg-accent w-4 h-4"}`}
            style={{
                left: mousePosition.x - (isHovering ? 16 : 8),
                top: mousePosition.y - (isHovering ? 16 : 8),
            }}
            animate={{ scale: isClicking ? 0.6 : 1 }}
            transition={{ type: "spring", stiffness: 1000, damping: 30 }}
        />
    );
}