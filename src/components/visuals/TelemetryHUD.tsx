"use client";

import { motion, useScroll, useVelocity, useTransform, useSpring } from "framer-motion";
import { useEffect, useState } from "react";
import { useEasterEgg } from "@/lib/EasterEggContext";
import { Zap } from "lucide-react";

export default function TelemetryHUD() {
    const { isRedlineMode } = useEasterEgg();
    const { scrollY, scrollYProgress } = useScroll();
    const scrollVelocity = useVelocity(scrollY);

    // Smooth out velocity
    const smoothVelocity = useSpring(scrollVelocity, { damping: 50, stiffness: 400 });

    // Map velocity to RPM (0 - 100%)
    const rpm = useTransform(smoothVelocity, [0, 2000], [0, 100]);

    const [currentRpm, setCurrentRpm] = useState(0);
    const [speed, setSpeed] = useState(0);
    const [gear, setGear] = useState("N");

    useEffect(() => {
        return rpm.on("change", (latest) => {
            const absRpm = Math.abs(latest);
            setCurrentRpm(Math.min(absRpm, 100));
            setSpeed(Math.floor(absRpm * 3)); // Fake speed

            // Fake Gear Logic
            if (absRpm === 0) setGear("N");
            else if (absRpm < 20) setGear("1");
            else if (absRpm < 40) setGear("2");
            else if (absRpm < 60) setGear("3");
            else if (absRpm < 80) setGear("4");
            else setGear("5");
        });
    }, [rpm]);

    return (
        <motion.div
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 1 }}
            className={`fixed bottom-6 right-6 z-50 p-4 rounded-xl border backdrop-blur-md transition-all duration-500 font-mono select-none flex flex-col gap-4 min-w-[200px]
        ${isRedlineMode
                    ? "bg-black/90 border-red-600 text-red-500 shadow-[0_0_30px_rgba(220,38,38,0.3)]"
                    : "bg-black/80 border-white/10 text-white shadow-2xl"
                }`}
        >
            {/* RPM Bar (Motec Style) */}
            <div className="flex gap-[2px] h-3 w-full bg-white/5 rounded-sm overflow-hidden relative">
                {/* RPM Segments */}
                {[...Array(20)].map((_, i) => (
                    <div
                        key={i}
                        className={`flex-1 transition-colors duration-75 ${(i / 20) * 100 < currentRpm
                            ? i > 15
                                ? "bg-red-500" // Redline
                                : i > 10
                                    ? "bg-yellow-500"
                                    : "bg-green-500"
                            : "bg-white/5"
                            }`}
                    />
                ))}
            </div>

            <div className="flex justify-between items-end">
                {/* Speed & Gear */}
                <div>
                    <div className="flex items-baseline gap-1">
                        <span className="text-4xl font-bold font-display tabular-nums leading-none">{speed}</span>
                        <span className="text-[10px] uppercase opacity-60">km/h</span>
                    </div>
                    <div className="flex items-center gap-2 mt-1">
                        <span className="text-[10px] uppercase opacity-60">ERS</span>
                        <div className="w-16 h-1.5 bg-white/10 rounded-full overflow-hidden">
                            <motion.div
                                className="h-full bg-primary"
                                style={{ scaleX: scrollYProgress, transformOrigin: "left" }}
                            />
                        </div>
                    </div>
                </div>

                {/* Big Gear Indicator */}
                <div className={`text-5xl font-bold font-display leading-none px-4 py-1 rounded bg-white/5 ${isRedlineMode ? "text-red-500" : "text-primary"}`}>
                    {gear}
                </div>
            </div>

            {/* G-Force Circle (Simulated) */}
            <div className="absolute -left-20 bottom-0 w-16 h-16 rounded-full border border-white/10 bg-black/50 backdrop-blur-sm flex items-center justify-center">
                <div className="absolute inset-0 border border-white/5 rounded-full scale-50" />
                {/* The Dot */}
                <motion.div
                    className="w-2 h-2 bg-primary rounded-full shadow-[0_0_5px_currentColor]"
                    animate={{
                        x: currentRpm > 0 ? [-2, 2, -1, 3, -1, -2] : 0,
                        y: currentRpm > 0 ? [-2, 1, -3, 2, 1, -2] : 0
                    }}
                    transition={{ repeat: Infinity, duration: 0.1, type: "tween" }}
                />
                <span className="absolute -bottom-4 text-[9px] uppercase opacity-50">G-Force</span>
            </div>

            {isRedlineMode && <div className="absolute top-0 right-0 p-1"><Zap size={12} className="animate-pulse text-red-500" /></div>}
        </motion.div>
    );
}
