"use client";

import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Flag } from "lucide-react";

type TeamType = "mclaren" | "ferrari" | "mercedes" | "williams" | "redbull" | null;

export default function EasterEggController() {
    const [activeTeam, setActiveTeam] = useState<TeamType>(null);

    useEffect(() => {
        let keyBuffer = "";

        const handleKeyDown = (e: KeyboardEvent) => {
            // Ignore keystrokes if the user is typing in an input or textarea
            if (e.target instanceof HTMLInputElement || e.target instanceof HTMLTextAreaElement) {
                return;
            }

            keyBuffer += e.key.toLowerCase();
            if (keyBuffer.length > 20) {
                keyBuffer = keyBuffer.slice(-20);
            }

            if (keyBuffer.includes("lando") || keyBuffer.includes("piastri") || keyBuffer.includes("mclaren")) {
                setActiveTeam("mclaren");
                keyBuffer = "";
            } else if (keyBuffer.includes("leclerc") || keyBuffer.includes("hamilton") || keyBuffer.includes("ferrari")) {
                setActiveTeam("ferrari");
                keyBuffer = "";
            } else if (keyBuffer.includes("russell") || keyBuffer.includes("russel") || keyBuffer.includes("mercedes")) {
                setActiveTeam("mercedes");
                keyBuffer = "";
            } else if (keyBuffer.includes("albon") || keyBuffer.includes("sainz") || keyBuffer.includes("williams")) {
                setActiveTeam("williams");
                keyBuffer = "";
            } else if (keyBuffer.includes("max") || keyBuffer.includes("redbull")) {
                setActiveTeam("redbull");
                keyBuffer = "";
            }
        };

        window.addEventListener("keydown", handleKeyDown);
        return () => window.removeEventListener("keydown", handleKeyDown);
    }, []);

    // Auto-dismiss after 4 seconds
    useEffect(() => {
        if (activeTeam) {
            const timer = setTimeout(() => setActiveTeam(null), 4000);
            return () => clearTimeout(timer);
        }
    }, [activeTeam]);

    if (!activeTeam) return null;

    const teamConfig = {
        mclaren: { color: "#FF8000", msg: "PIASTRI IS FASTER. 🏎️💨", tagline: "PAPAYA RULES" },
        ferrari: { color: "#EF1A2D", msg: "WE ARE CHECKING... 🏎️💨", tagline: "FORZA FERRARI" },
        mercedes: { color: "#00A19B", msg: "BONO MY TYRES ARE GONE. 🏎️💨", tagline: "STILL WE RISE" },
        williams: { color: "#00A3E0", msg: "ALBONO TO THE RESCUE. 🏎️💨", tagline: "WILLIAMS RACING" },
        redbull: { color: "#0600EF", msg: "MAX MAX MAX SUPER MAX. 🏎️💨", tagline: "SIMPLY LOVELY" }
    };

    const config = teamConfig[activeTeam];

    return (
        <AnimatePresence>
            <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                className="fixed inset-0 pointer-events-none z-[9999] flex flex-col items-center justify-center overflow-hidden"
            >
                <div className="absolute inset-0 opacity-[0.15] mix-blend-screen transition-colors duration-1000" style={{ backgroundColor: config.color }} />

                {/* Confetti Particles */}
                {[...Array(60)].map((_, i) => (
                    <motion.div
                        key={i}
                        initial={{ y: "-10vh", x: Math.random() * window.innerWidth, rotate: 0 }}
                        animate={{ y: "110vh", x: Math.random() * window.innerWidth, rotate: 360 }}
                        transition={{ duration: 1.5 + Math.random() * 2, ease: "linear" }}
                        className="absolute w-3 h-3 rounded-sm"
                        style={{ backgroundColor: config.color, left: 0, opacity: Math.random() * 0.8 + 0.2 }}
                    />
                ))}

                <motion.div
                    initial={{ scale: 0.5, y: 50, opacity: 0 }}
                    animate={{ scale: 1, y: 0, opacity: 1 }}
                    exit={{ scale: 1.5, opacity: 0 }}
                    transition={{ type: "spring", damping: 12, stiffness: 100 }}
                    className="relative z-10 bg-black/90 backdrop-blur-xl border border-white/10 px-12 py-8 rounded-2xl text-center shadow-2xl"
                    style={{ borderBottomWidth: 4, borderBottomColor: config.color }}
                >
                    <div className="flex justify-center mb-4">
                        <Flag size={56} style={{ color: config.color }} className="animate-pulse drop-shadow-lg" />
                    </div>
                    <h2 className="text-4xl md:text-6xl font-display font-bold text-white mb-2 tracking-wider">
                        {config.tagline}
                    </h2>
                    <p className="text-xl font-mono tracking-widest uppercase" style={{ color: config.color }}>
                        {config.msg}
                    </p>
                </motion.div>
            </motion.div>
        </AnimatePresence>
    );
}
