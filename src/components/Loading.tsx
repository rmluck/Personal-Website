import { motion } from "framer-motion";

export default function Loading() {
    return (
        <div className="fixed inset-0 bg-accent/80 flex items-center justify-center z-[9999]">
            <motion.div
                className="w-16 h-16 border-4 border-accent border-t-transparent rounded-full"
                animate={{ rotate: 360 }}
                transition={{ repeat: Infinity, duration: 1, ease: "linear" }}
            />
        </div>
    );
}