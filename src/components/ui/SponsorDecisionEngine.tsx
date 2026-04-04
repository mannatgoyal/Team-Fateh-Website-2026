"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ArrowRight, CheckCircle2 } from "lucide-react";
import Link from "next/link";
import Image from "next/image";

type StepDef = {
    id: string;
    type: "intro" | "question" | "reveal" | "final" | "end";
    headline?: string;
    subtext?: string;
    bullets?: string[];
    image?: string;
    onNo?: string;
    progress?: number;
};

const STEPS: StepDef[] = [
    {
        id: "intro",
        type: "intro",
        headline: "Should You Sponsor Team Fateh?",
        subtext: "This will only take 60 seconds. Probably.",
        progress: 0,
    },
    {
        id: "step1",
        type: "question",
        headline: "Do you like visibility?",
        onNo: "We admire your commitment to staying unnoticed.",
        progress: 10,
    },
    {
        id: "step2",
        type: "question",
        headline: "Do you like your brand on a race car?",
        image: "/images/Sponsorship/car_decal.png",
        onNo: "We can put it on a spreadsheet instead?",
        progress: 20,
    },
    {
        id: "step3",
        type: "reveal",
        headline: "Deploying your brand...",
        bullets: [
            "Logo on high-performance EV",
            "Seen at national & international competitions",
            "Photographed. A lot.",
        ],
        progress: 30,
    },
    {
        id: "step4",
        type: "question",
        headline: "Do you like innovation?",
        onNo: "Ah. A fan of tradition. Like fax machines.",
        progress: 40,
    },
    {
        id: "step5",
        type: "reveal",
        headline: "What you're actually sponsoring",
        bullets: [
            "Electric race car built from scratch",
            "Data-driven engineering",
            "Battery systems, aerodynamics, embedded systems",
            "Built by a team that runs on caffeine and deadlines",
        ],
        progress: 50,
    },
    {
        id: "step6",
        type: "question",
        headline: "Do you like hiring top engineers before your competitors do?",
        onNo: "We’ll forward their resumes elsewhere.",
        progress: 60,
    },
    {
        id: "step7",
        type: "reveal",
        headline: "Talent Profile",
        bullets: [
            "Engineers who debug at 3 AM",
            "Developers who turn chaos into telemetry",
            "Designers who argue with physics",
        ],
        progress: 70,
    },
    {
        id: "step8",
        type: "question",
        headline: "Do you like ROI?",
        onNo: "Bold strategy.",
        progress: 80,
    },
    {
        id: "step9",
        type: "reveal",
        headline: "Benefits Reveal",
        bullets: [
            "Brand visibility",
            "Recruitment pipeline",
            "Association with EV innovation",
            "Presence at competitive engineering events",
        ],
        progress: 90,
    },
    {
        id: "final-question",
        type: "question",
        headline: "Do you want to be the company that said YES...\nOr the one we joke about next year?",
        onNo: "We’ll remember this.",
        progress: 100,
    },
    {
        id: "final",
        type: "final",
        headline: "Welcome to Team Fateh.",
        subtext: "You’re not just sponsoring a team. You’re investing in the future of engineering.",
        progress: 100,
    },
];

export default function SponsorDecisionEngine() {
    const [currentIndex, setCurrentIndex] = useState(0);
    const [noResponse, setNoResponse] = useState<string | null>(null);

    const step = STEPS[currentIndex];

    const advance = () => {
        setNoResponse(null);
        if (currentIndex < STEPS.length - 1) {
            setCurrentIndex(currentIndex + 1);
        }
    };

    const handleNo = () => {
        if (step.onNo) {
            setNoResponse(step.onNo);
        }
    };

    const reset = () => {
        setNoResponse(null);
        setCurrentIndex(0);
    };

    return (
        <div className="w-full max-w-4xl mx-auto rounded-3xl overflow-hidden border border-white/10 bg-[#0a0a0a] shadow-2xl shadow-primary/5 min-h-[500px] flex flex-col relative font-sans">
            {/* Ambient Background Glow */}
            <div className="absolute top-0 right-0 w-96 h-96 bg-primary/10 blur-[100px] rounded-full pointer-events-none" />
            <div className="absolute bottom-0 left-0 w-96 h-96 bg-blue-500/10 blur-[100px] rounded-full pointer-events-none" />

            {/* Progress Bar Header */}
            {step.type !== "intro" && step.type !== "final" && (
                <div className="absolute top-0 left-0 right-0 h-1.5 bg-white/5 z-20">
                    <motion.div
                        className="h-full bg-primary"
                        initial={{ width: 0 }}
                        animate={{ width: `${step.progress || 0}%` }}
                        transition={{ duration: 0.5, ease: "easeInOut" }}
                    />
                </div>
            )}

            <div className="flex-1 flex items-center justify-center p-8 md:p-16 relative z-10 w-full min-h-[400px]">
                <AnimatePresence mode="wait">
                    {/* NO RESPONSE STATE (Convince them anyway flow) */}
                    {noResponse ? (
                        <motion.div
                            key="no-response"
                            initial={{ opacity: 0, scale: 0.95, filter: "blur(4px)" }}
                            animate={{ opacity: 1, scale: 1, filter: "blur(0px)" }}
                            exit={{ opacity: 0, scale: 1.05, filter: "blur(4px)" }}
                            className="text-center w-full max-w-2xl"
                        >
                            <h3 className="text-3xl md:text-5xl font-display font-bold uppercase tracking-tight text-primary/90 mb-8 whitespace-pre-wrap">
                                {noResponse}
                            </h3>
                            
                            <div className="flex flex-col gap-4 items-center mt-12 justify-center w-full">
                                {step.id === "final-question" ? (
                                    <>
                                        <button
                                            onClick={advance}
                                            className="bg-white hover:bg-gray-200 text-black px-8 py-4 w-full sm:w-auto font-bold uppercase tracking-widest transition-all mb-2 shadow-[0_0_20px_rgba(255,255,255,0.2)] hover:scale-105 active:scale-95"
                                        >
                                            Okay, show me the details
                                        </button>
                                        <button
                                            onClick={() => setNoResponse(null)}
                                            className="text-white/50 hover:text-white font-mono text-sm uppercase tracking-widest transition-colors flex items-center justify-center gap-2"
                                        >
                                            Rethink that 'NO'
                                        </button>
                                    </>
                                ) : (
                                    <>
                                        <button
                                            onClick={advance}
                                            className="bg-primary hover:bg-primary/80 text-black px-8 py-4 w-full sm:w-auto font-mono font-bold uppercase tracking-widest transition-all mb-2 shadow-[0_0_20px_rgba(255,165,0,0.3)] hover:scale-105 active:scale-95"
                                        >
                                            Hear us out anyway
                                        </button>
                                        <button
                                            onClick={() => setNoResponse(null)}
                                            className="text-white/50 hover:text-white font-mono text-sm uppercase tracking-widest transition-colors flex items-center justify-center gap-2"
                                        >
                                            Go back to question
                                        </button>
                                    </>
                                )}
                            </div>
                        </motion.div>
                    ) : (
                        <motion.div
                            key={step.id}
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            exit={{ opacity: 0, y: -20 }}
                            transition={{ duration: 0.4 }}
                            className="w-full text-center flex flex-col items-center max-w-2xl"
                        >
                            {/* INTRO STEP */}
                            {step.type === "intro" && (
                                <>
                                    <h2 className="text-4xl md:text-6xl font-display font-bold uppercase tracking-tight text-white mb-4">
                                        {step.headline}
                                    </h2>
                                    <p className="text-slate-400 font-mono uppercase tracking-widest text-sm mb-12 border-l-2 border-primary pl-4 mx-auto w-fit">
                                        {step.subtext}
                                    </p>
                                    <button
                                        onClick={advance}
                                        className="bg-primary hover:bg-primary/80 text-black font-bold uppercase tracking-[0.2em] px-12 py-5 rounded-sm transition-all hover:scale-105 active:scale-95 shadow-[0_0_30px_rgba(255,165,0,0.3)]"
                                    >
                                        Start
                                    </button>
                                </>
                            )}

                            {/* QUESTION STEP */}
                            {step.type === "question" && (
                                <>
                                    {step.image && (
                                        <div className="mb-8 relative w-full h-40 max-w-md mx-auto">
                                            <Image
                                                src={step.image}
                                                alt="Reference"
                                                fill
                                                className="object-contain drop-shadow-2xl"
                                            />
                                        </div>
                                    )}
                                    <h3 className="text-3xl md:text-5xl font-display font-bold uppercase tracking-tight text-white mb-12 whitespace-pre-line leading-tight">
                                        {step.headline}
                                    </h3>
                                    <div className="flex flex-col sm:flex-row gap-6 justify-center w-full">
                                        <button
                                            onClick={advance}
                                            className="bg-gradient-to-r from-green-500/20 to-green-500/10 hover:from-green-500 hover:to-green-400 border border-green-500/30 text-green-400 hover:text-black font-bold uppercase tracking-widest px-10 py-5 rounded-xl transition-all duration-300 w-full sm:w-48 shadow-[0_0_20px_rgba(34,197,94,0.1)] hover:shadow-[0_0_40px_rgba(34,197,94,0.4)]"
                                        >
                                            YES
                                        </button>
                                        <button
                                            onClick={handleNo}
                                            className="bg-red-500/5 hover:bg-red-500/20 border border-red-500/20 text-red-400/80 hover:text-red-400 font-bold uppercase tracking-widest px-10 py-5 rounded-xl transition-colors duration-300 w-full sm:w-48"
                                        >
                                            NO
                                        </button>
                                    </div>
                                </>
                            )}

                            {/* REVEAL STEP */}
                            {step.type === "reveal" && (
                                <>
                                    <h3 className="text-2xl md:text-3xl font-mono uppercase tracking-widest text-primary mb-8 animate-pulse text-center w-full">
                                        {step.headline}
                                    </h3>
                                    <div className="flex flex-col gap-4 items-start w-full max-w-md mx-auto text-left mb-12">
                                        {step.bullets?.map((bullet, i) => (
                                            <motion.div
                                                key={i}
                                                initial={{ opacity: 0, x: -20 }}
                                                animate={{ opacity: 1, x: 0 }}
                                                transition={{ delay: i * 0.15 }}
                                                className="flex items-start gap-4 text-slate-200 text-lg md:text-xl font-sans"
                                            >
                                                <CheckCircle2 className="text-primary mt-1 shrink-0" size={24} />
                                                <span>{bullet}</span>
                                            </motion.div>
                                        ))}
                                    </div>
                                    <button
                                        onClick={advance}
                                        className="text-white/70 hover:text-white flex items-center justify-center gap-2 uppercase tracking-widest font-mono text-sm border border-white/20 hover:border-white/50 px-8 py-3 rounded-full transition-all"
                                    >
                                        Continue <ArrowRight size={16} />
                                    </button>
                                </>
                            )}

                            {/* FINAL STEP */}
                            {step.type === "final" && (
                                <>
                                    <h2 className="text-5xl md:text-7xl font-display font-bold uppercase tracking-tight text-white mb-6 bg-gradient-to-r from-primary to-white bg-clip-text text-transparent">
                                        {step.headline}
                                    </h2>
                                    <p className="text-slate-300 text-lg md:text-xl max-w-lg mx-auto mb-12 leading-relaxed">
                                        {step.subtext}
                                    </p>
                                    <div className="flex flex-col sm:flex-row gap-4 justify-center w-full">
                                        <Link
                                            href="/contact-sponsor"
                                            className="bg-primary hover:bg-primary/80 text-black font-bold uppercase tracking-widest px-10 py-5 rounded-xl transition-all shadow-[0_0_30px_rgba(255,165,0,0.3)] flex items-center justify-center w-full sm:w-auto"
                                        >
                                            Become a Sponsor
                                        </Link>
                                        <button
                                            onClick={() => document.getElementById('types')?.scrollIntoView({ behavior: 'smooth' })}
                                            className="bg-transparent border border-white/20 hover:bg-white/10 text-white font-bold uppercase tracking-widest px-10 py-5 rounded-xl transition-all flex items-center justify-center w-full sm:w-auto cursor-pointer"
                                        >
                                            Learn More
                                        </button>
                                    </div>
                                </>
                            )}
                        </motion.div>
                    )}
                </AnimatePresence>
            </div>
            
            {/* Status Footer */}
            {step.type !== "intro" && step.type !== "final" && (
                <div className="absolute bottom-6 w-full flex justify-center z-20 pointer-events-none">
                    <span className="text-[10px] font-mono uppercase tracking-[0.2em] text-white/30 bg-black/40 px-3 py-1 rounded-full backdrop-blur-sm">
                        Decision Matrix Active // Step {currentIndex} of {STEPS.length - 2}
                    </span>
                </div>
            )}
        </div>
    );
}
