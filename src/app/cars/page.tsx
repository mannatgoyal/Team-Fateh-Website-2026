"use client";

import { motion, useScroll, useTransform } from "framer-motion";
import { useRef } from "react";
import { ArrowRight, Zap, Wind, Cpu, Trophy } from "lucide-react";

const cars = [
    {
        season: "2008",
        name: "TUFF 01",
        innovation: "Royal Enfield 350",
        outcome: "FS UK Debut",
        description: "The first Formula Student car from Team Fateh. A 350cc Royal Enfield powered platform that began our international journey.",
        image: "/images/History/tuff_1.png",
        stats: { weight: "N/A", power: "25 BHP", accel: "N/A" }
    },
    {
        season: "2009",
        name: "TUFF 02",
        innovation: "Double Wishbone + Anti-Ackerman",
        outcome: "FS UK Competitor",
        description: "Refined suspension geometry and adjustable pedal assembly marked early vehicle dynamics focus.",
        image: "/images/History/tuff_2.png",
        stats: { weight: "252kg", power: "N/A", accel: "N/A" }
    },
    {
        season: "2010",
        name: "FALCON",
        innovation: "Kawasaki ZX600",
        outcome: "600cc Power Leap",
        description: "Major performance jump with a 90 BHP ZX600 engine.",
        image: "/images/History/Falcon.png",
        stats: { weight: "237kg", power: "90 BHP", accel: "N/A" }
    },
    {
        season: "2011",
        name: "TARKSHYA",
        innovation: "CF Aero Package",
        outcome: "Lightweight Tubular Spaceframe",
        description: "Honda CBR600 powered chassis with carbon fibre aero integration.",
        image: "/images/History/tarkshya.png",
        stats: { weight: "215kg", power: "CBR600", accel: "N/A" }
    },
    {
        season: "2012",
        name: "ASTRA",
        innovation: "Subframe Chassis",
        outcome: "Torque Optimization",
        description: "CBR600 inline-4 platform with improved subframe structure and cooling.",
        image: "/images/History/astra.png",
        stats: { weight: "N/A", power: "63 Nm", accel: "N/A" }
    },
    {
        season: "2013",
        name: "GARUDA",
        innovation: "KTM 510 Platform",
        outcome: "Major Weight Reduction",
        description: "Achieved 180kg kerb weight with KTM 510 and glass fibre bodywork.",
        image: "/images/History/Garuda.png",
        stats: { weight: "180kg", power: "KTM 510", accel: "N/A" }
    },
    {
        season: "2014",
        name: "JAEGER",
        innovation: "CF Wishbones",
        outcome: "FS Germany Competitor",
        description: "Carbon fibre wishbones and half shafts improved stiffness and response.",
        image: "/images/History/jaeger.png",
        stats: { weight: "220kg", power: "KTM 510", accel: "N/A" }
    },
    {
        season: "2015",
        name: "TUFF 08",
        innovation: "Aluminium Honeycomb Chassis",
        outcome: "FS UK Competitor",
        description: "Improved stiffness-to-weight ratio with honeycomb chassis integration.",
        image: "/images/History/tuff_8.png",
        stats: { weight: "217kg", power: "KTM 510", accel: "N/A" }
    },
    {
        season: "2017",
        name: "TUFF 10",
        innovation: "Self Designed Exhaust",
        outcome: "Formula Bharat Competitor",
        description: "Refined combustion tuning and in-house exhaust system development.",
        image: "/images/History/tuff_10.png",
        stats: { weight: "208kg", power: "KTM 510", accel: "N/A" }
    },
    {
        season: "2018",
        name: "TUFF 11",
        innovation: "Tubular Spaceframe Refinement",
        outcome: "FS Italy Competitor",
        description: "Further structural refinement and performance balancing.",
        image: "/images/History/tuff_11.png",
        stats: { weight: "215kg", power: "KTM 510", accel: "N/A" }
    },
    {
        season: "2019",
        name: "TUFF 12",
        innovation: "Self Designed Intake Manifold",
        outcome: "Formula Bharat & Formula Lincoln",
        description: "KTM 390 powered car with optimized intake and packaging before electric transition.",
        image: "/images/History/tuff_12.png",
        stats: { weight: "234kg", power: "KTM 390", accel: "N/A" }
    },
    {
        season: "2022",
        name: "TUFF 14",
        innovation: "Custom ECU + CF Aero",
        outcome: "Overall Runner Up – SUPRA SAE",
        description: "Peak combustion performance. Custom ECU integration and advanced carbon aero package.",
        image: "/images/History/tuff_14.png",
        stats: { weight: "226kg", power: "KTM 390", accel: "N/A" }
    },
    {
        season: "2023",
        name: "TUFF 15",
        innovation: "10” Rims + 40% Anti-Dive",
        outcome: "Overall Runner Up – SUPRA SAE",
        description: "Aggressive weight reduction to 190kg with advanced suspension geometry.",
        image: "/images/History/tuff_15.png",
        stats: { weight: "190kg", power: "KTM 390", accel: "N/A" }
    },
    {
        season: "2024",
        name: "TUFF 16",
        innovation: "5-Axis Machined Uprights",
        outcome: "Final Combustion Evolution",
        description: "Ultimate IC refinement. Custom carbon sheets and precision-machined uprights.",
        image: "/images/History/tuff_16.png",
        stats: { weight: "185kg", power: "42 BHP", accel: "N/A" }
    },
    {
        season: "2025",
        name: "TUFF 17",
        innovation: "First EV – Emrax 228 (285.6V)",
        outcome: "Formula Bharat 2025 & SUPRA SAE 2025",
        description: "Team Fateh’s first electric vehicle. Powered by Emrax 228 motor with 285.6V accumulator — the official EV transition.",
        image: "/images/History/tuff_17.png",
        stats: { weight: "EV Platform", power: "Emrax 228", accel: "N/A" }
    },
    {
        season: "2026",
        name: "TUFF 18",
        innovation: "Accumulator TI & Mechanical TI Cleared",
        outcome: "Formula Bharat 2026 & SUPRA SAE 2026",
        description: "Refined EV platform retaining Emrax 228 architecture. Achieved Accumulator and Mechanical Technical Inspection clearance.",
        image: "/images/History/tuff_18.png",
        stats: { weight: "EV Platform", power: "Emrax 228", accel: "N/A" }
    }
];

export default function CarsPage() {
    const targetRef = useRef<HTMLDivElement>(null);
    const { scrollYProgress } = useScroll({
        target: targetRef,
    });

    const x = useTransform(scrollYProgress, [0, 1], ["1%", "-90%"]);

    return (
        <section ref={targetRef} className="relative h-[600vh] bg-background text-foreground">
            <div className="sticky top-0 flex h-screen items-center overflow-hidden">

                {/* Visual Identity: The Racing Line */}
                <div className="absolute top-24 left-0 w-full h-[1px] bg-white/10 z-0">
                    <div className="absolute top-0 left-0 h-full w-1/3 bg-primary" />
                </div>

                <motion.div style={{ x }} className="flex gap-24 px-12 md:px-24">

                    {/* Intro Slide */}
                    <div className="min-w-[80vw] md:min-w-[40vw] flex flex-col justify-center">
                        <h1 className="text-6xl md:text-8xl font-display font-bold leading-none">
                            THE <span className="text-primary">EVOLUTION</span><br />WALL.
                        </h1>
                        <p className="mt-8 text-xl text-muted-foreground max-w-md font-light">
                            Motorsport is iterative. We don&apos;t just build cars; we build on the lessons of the machine before it.
                        </p>
                        <div className="mt-12 flex items-center gap-4 text-sm font-mono uppercase tracking-widest text-primary">
                            <ArrowRight className="animate-pulse" /> Scroll to Explore
                        </div>

                        {/* Hidden Trigger for Simulator */}
                        <div className="mt-24 opacity-0 hover:opacity-100 transition-opacity">
                            <button
                                onClick={() => window.dispatchEvent(new CustomEvent('open-endurance-sim'))}
                                className="text-xs font-mono text-white/20 hover:text-primary transition-colors flex items-center gap-2"
                            >
                                <Zap size={10} /> [SYS_OVERRIDE: INITIATE_ENDURANCE_SIM]
                            </button>
                        </div>
                    </div>

                    {/* Car Cards */}
                    {cars.map((car, i) => (
                        <div key={i} className="group relative min-w-[85vw] md:min-w-[60vw] h-[70vh] bg-secondary/10 border border-white/5 rounded-none overflow-hidden flex flex-col md:flex-row">

                            {/* Image Side */}
                            <div className="flex-1 relative bg-secondary/20 overflow-hidden">
                                <div className="absolute inset-0 bg-secondary flex items-center justify-center">
                                    {car.image ? (
                                        <img src={car.image} alt={car.name} className="w-full h-full object-cover z-10" />
                                    ) : (
                                        <span className="text-muted-foreground font-mono z-10">[ Chassis Image: {car.name} ]</span>
                                    )}
                                </div>
                                {/* Technical Grid Overlay */}
                                <div className="absolute inset-0 bg-[url('/images/grid.png')] opacity-10 pointer-events-none" />
                                <div className="absolute bottom-0 left-0 p-6">
                                    <div className="text-9xl font-display font-bold text-white/5 absolute -top-20 -left-6">{car.season}</div>
                                </div>
                            </div>

                            {/* Spec Side */}
                            <div className="flex-1 p-8 md:p-12 flex flex-col justify-between border-l border-white/5">
                                <div>
                                    <div className="flex items-center gap-3 text-primary font-mono text-sm uppercase tracking-widest mb-4">
                                        <div className="w-2 h-2 bg-primary rounded-full" />
                                        Season {car.season}
                                    </div>
                                    <h2 className="text-4xl md:text-5xl font-display font-bold uppercase mb-2">{car.name}</h2>
                                    <p className="text-muted-foreground leading-relaxed mb-8">{car.description}</p>

                                    <div className="grid grid-cols-2 gap-y-8 gap-x-4">
                                        <div>
                                            <div className="flex items-center gap-2 text-xs text-gray-500 uppercase tracking-widest mb-1"><Zap size={14} /> Innovation</div>
                                            <div className="text-xl font-bold">{car.innovation}</div>
                                        </div>
                                        <div>
                                            <div className="flex items-center gap-2 text-xs text-gray-500 uppercase tracking-widest mb-1"><Trophy size={14} /> Outcome</div>
                                            <div className="text-xl font-bold">{car.outcome}</div>
                                        </div>
                                    </div>
                                </div>

                                <div className="border-t border-white/10 pt-8 grid grid-cols-3 gap-4">
                                    <div>
                                        <div className="text-xs text-gray-500 uppercase">Weight</div>
                                        <div className="font-mono text-lg">{car.stats.weight}</div>
                                    </div>
                                    <div>
                                        <div className="text-xs text-gray-500 uppercase">Power</div>
                                        <div className="font-mono text-lg">{car.stats.power}</div>
                                    </div>
                                    <div>
                                        <div className="text-xs text-gray-500 uppercase">0-100</div>
                                        <div className="font-mono text-lg text-primary">{car.stats.accel}</div>
                                    </div>
                                </div>
                            </div>

                        </div>
                    ))}

                    <div className="min-w-[20vw]" /> {/* Spacer */}
                </motion.div>
            </div>
        </section>
    );
}
