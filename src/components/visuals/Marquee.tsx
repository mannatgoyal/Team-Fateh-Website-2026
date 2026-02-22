"use client";

import { motion } from "framer-motion";

export default function Marquee({ text }: { text: string }) {
    return (
        <div className="relative flex overflow-hidden py-4 bg-primary text-black">
            <motion.div
                className="flex space-x-8 whitespace-nowrap"
                animate={{ x: "-50%" }}
                transition={{ repeat: Infinity, ease: "linear", duration: 20 }}
            >
                <span className="text-4xl font-bold font-display uppercase">{text}</span>
                <span className="text-4xl font-bold font-display uppercase">{text}</span>
                <span className="text-4xl font-bold font-display uppercase">{text}</span>
                <span className="text-4xl font-bold font-display uppercase">{text}</span>
                <span className="text-4xl font-bold font-display uppercase">{text}</span>
                <span className="text-4xl font-bold font-display uppercase">{text}</span>
                <span className="text-4xl font-bold font-display uppercase">{text}</span>
                <span className="text-4xl font-bold font-display uppercase">{text}</span>
            </motion.div>
        </div>
    );
}
