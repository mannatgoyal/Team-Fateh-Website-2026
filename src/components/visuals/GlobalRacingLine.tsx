"use client";

import { motion, useScroll, useSpring } from "framer-motion";

export default function GlobalRacingLine() {
    const { scrollYProgress } = useScroll();
    const scaleY = useSpring(scrollYProgress, {
        stiffness: 100,
        damping: 30,
        restDelta: 0.001
    });

    return (
        <>
            {/* Fixed Decorator Line (Left) */}
            <div className="fixed top-0 left-0 bottom-0 w-[1px] bg-white/5 z-40 hidden md:block ml-6 md:ml-12 pointer-events-none">
                {/* Dynamic Progress Indicator */}
                <motion.div
                    className="absolute top-0 left-0 w-full bg-primary origin-top"
                    style={{ scaleY, height: "100%" }}
                />

                {/* Decorative Top Marker */}
                <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[3px] h-8 bg-primary shadow-[0_0_10px_#ffa51f]" />
            </div>

            {/* Horizontal Top Line (Mobile/Desktop) */}
            <div className="fixed top-20 left-0 w-full h-[1px] bg-white/5 z-30 pointer-events-none opacity-50" />
        </>
    );
}
