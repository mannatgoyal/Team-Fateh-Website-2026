"use client";

import { motion, useScroll, useTransform } from "framer-motion";
import { useRef } from "react";
import Link from "next/link";

export default function Hero() {
    const containerRef = useRef<HTMLDivElement>(null);
    const { scrollYProgress } = useScroll({
        target: containerRef,
        offset: ["start start", "end start"],
    });

    const yText = useTransform(scrollYProgress, [0, 1], [0, 200]);
    const opacityText = useTransform(scrollYProgress, [0, 0.5], [1, 0]);
    const scaleImg = useTransform(scrollYProgress, [0, 1], [1, 1.1]);

    return (
        <div ref={containerRef} className="relative h-screen flex items-center justify-center overflow-hidden bg-background">
            {/* Background Image with Parallax */}
            <motion.div
                style={{ scale: scaleImg }}
                className="absolute inset-0 z-0"
            >
                <div className="absolute inset-0 bg-gradient-to-b from-black/70 via-black/40 to-background z-10" />
                {/* Placeholder for a high-impact team car shot */}
                <img
                    src="/images/pic01.jpg"
                    alt="Team Fateh Car"
                    className="w-full h-full object-cover opacity-80"
                />
            </motion.div>

            {/* Content */}
            <motion.div
                style={{ y: yText, opacity: opacityText }}
                className="relative z-20 text-center px-6 max-w-5xl mx-auto"
            >
                <motion.div
                    initial={{ opacity: 0, y: 50 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 1, ease: "easeOut" }}
                >
                    <h2 className="text-primary font-mono text-sm md:text-base tracking-[0.5em] mb-4 uppercase">
                        Est. 2008 // THAPAR INSTITUTE OF ENGINEERING AND TECHNOLOGY, PATIALA
                    </h2>
                    <h1 className="text-6xl md:text-8xl lg:text-9xl font-display font-bold leading-[0.9] tracking-tighter mb-8 text-white mix-blend-difference">
                        EAT.<br />
                        SLEEP.<br />
                        <span className="text-transparent bg-clip-text bg-gradient-to-r from-primary to-white">RACE.</span><br />
                        REPEAT.
                    </h1>

                    <p className="text-lg md:text-xl text-gray-300 max-w-2xl mx-auto mb-10 font-light leading-relaxed">
                        Pushing the limits of electric mobility.
                        <br />
                        We Build What We Dream.
                    </p>

                    <motion.div
                        initial={{ opacity: 0, scale: 0.9 }}
                        animate={{ opacity: 1, scale: 1 }}
                        transition={{ delay: 0.5, duration: 0.8 }}
                        className="flex flex-col md:flex-row gap-6 justify-center items-center"
                    >
                        <Link
                            href="/team"
                            className="group relative px-8 py-4 bg-primary text-black font-bold uppercase tracking-widest overflow-hidden"
                        >
                            <span className="relative z-10 group-hover:text-white transition-colors duration-300">Meet The Team</span>
                            <div className="absolute inset-0 bg-black transform scale-x-0 group-hover:scale-x-100 transition-transform duration-300 origin-left" />
                        </Link>

                        <Link
                            href="/cars"
                            className="group px-8 py-4 border border-white/20 text-white font-bold uppercase tracking-widest hover:bg-white/10 transition-colors flex items-center gap-3"
                        >
                            <span>View Our Cars</span>
                            <span className="group-hover:translate-x-1 transition-transform">→</span>
                        </Link>
                    </motion.div>
                </motion.div>
            </motion.div>

            {/* Scroll Indicator */}
            <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 1.5, duration: 1 }}
                className="absolute bottom-10 left-1/2 -translate-x-1/2 z-20 flex flex-col items-center gap-2"
            >
                <span className="text-[10px] uppercase tracking-widest text-white/50">Scroll to Explore</span>
                <div className="w-[1px] h-12 bg-gradient-to-b from-primary to-transparent" />
            </motion.div>
        </div>
    );
}
