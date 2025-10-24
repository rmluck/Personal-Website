"use client";

import { motion } from "framer-motion";

export default function Loading() {
    return (
        <div
            className={`
                flex items-center justify-center
                fixed inset-0 z-[9999]
                bg-transparent backdrop-blur-md
            `}
        >
            <motion.div
                className={`
                    w-16 h-16
                    border-4 border-accent
                    border-t-transparent
                    rounded-full
                `}
                animate={{ rotate: 360 }}
                transition={{ repeat: Infinity, duration: 1, ease: "linear" }}
            />
        </div>
    );
}