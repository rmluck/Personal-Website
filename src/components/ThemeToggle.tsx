"use client";

import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

export default function ThemeToggle() {
    // State to track current theme
    const [theme, setTheme] = useState<"light" | "dark">("light");

    // Animation variants for the icons
    const iconVariants = {
        initial: { opacity: 0, rotate: -90, scale: 0.5 },
        animate: { opacity: 1, rotate: 0, scale: 1 },
        exit: { opacity: 0, rotate: 90, scale: 0.5 },
    };

    // Function to toggle theme
    const toggleTheme = () => {
        const newTheme = theme === "light" ? "dark" : "light";
        setTheme(newTheme);
        document.documentElement.classList.toggle("dark", newTheme === "dark");
        localStorage.setItem("theme", newTheme);
    };

    // On component mount, set theme based on localStorage or system preference
    useEffect(() => {
        const storedTheme = localStorage.getItem("theme") as "light" | "dark" | null;
        if (storedTheme) {
            setTheme(storedTheme);
            document.documentElement.classList.toggle("dark", storedTheme === "dark");
        } else {
            const prefersDark = window.matchMedia("(prefers-color-scheme: dark)").matches;
            setTheme(prefersDark ? "dark" : "light");
            document.documentElement.classList.toggle("dark", prefersDark);
        }
    }, []);

    return (
        <button
            onClick={toggleTheme}
            className={`
                flex items-center justify-center
                fixed bottom-5 right-5 z-60
                w-12 h-12
                bg-pro800 dark:bg-pro200
                rounded-full shadow-lg
                transition-transform
                hover:scale-110
                cursor-hover cursor-none clickable
                group
            `}
        >
            <AnimatePresence mode="wait">
                {theme === "light" ? (
                    <motion.svg
                        key="moon"
                        className="w-6 h-6 text-pro200 group-hover:text-accent"
                        xmlns="http://www.w3.org/2000/svg"
                        fill="none"
                        viewBox="0 0 24 24"
                        stroke="currentColor"
                        strokeWidth={2}
                        initial="initial"
                        animate="animate"
                        exit="exit"
                        variants={iconVariants}
                        transition={{ duration: 0.3 }}
                    >
                        <path d="M12 3a6 6 0 0 0 9 9 9 9 0 1 1-9-9Z" />
                    </motion.svg>
                ) : (
                    <motion.svg
                        key="sun"
                        className="w-6 h-6 text-pro800 group-hover:text-accent"
                        xmlns="http://www.w3.org/2000/svg"
                        fill="none"
                        viewBox="0 0 24 24"
                        stroke="currentColor"
                        strokeWidth={2}
                        initial="initial"
                        animate="animate"
                        exit="exit"
                        variants={iconVariants}
                        transition={{ duration: 0.3 }}
                    >
                        <circle cx="12" cy="12" r="4" />
                        <path d="M12 2v2" />
                        <path d="M12 20v2" />
                        <path d="m4.93 4.93 1.41 1.41" />
                        <path d="m17.66 17.66 1.41 1.41" />
                        <path d="M2 12h2" />
                        <path d="M20 12h2" />
                        <path d="m6.34 17.66-1.41 1.41" />
                        <path d="m19.07 4.93-1.41 1.41" />
                    </motion.svg>
                )}
            </AnimatePresence>
        </button>
    );
}