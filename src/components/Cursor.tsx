"use client";

import { useState, useEffect } from "react";
import { motion } from "framer-motion";

export default function Cursor() {
    // State to track mouse position, hovering state, and clicking state
    const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
    const [isHovering, setIsHovering] = useState(false);
    const [isClicking, setIsClicking] = useState(false);

    // Update mouse position on mouse move
    useEffect(() => {
        const moveCursor = (e: MouseEvent) => {
            setMousePosition({ x: e.clientX, y: e.clientY });
        };

        window.addEventListener("mousemove", moveCursor);

        return () => window.removeEventListener("mousemove", moveCursor);
    }, []);

    // Handle hover state for elements with the "cursor-hover" class
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

    // Handle clicking state
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
            className={`
                fixed z-100 top-0 left-0
                bg-accent rounded-full
                transition-color transition-opacity
                pointer-events-none 
                ${isHovering ? "w-8 h-8 bg-accent/30 " : "w-4 h-4 bg-accent"}
            `}
            style={{
                left: mousePosition.x - (isHovering ? 16 : 8),
                top: mousePosition.y - (isHovering ? 16 : 8),
            }}
            animate={{ scale: isClicking ? 0.6 : 1 }}
            transition={{ type: "spring", stiffness: 1000, damping: 30 }}
        />
    );
}