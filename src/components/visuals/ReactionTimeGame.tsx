"use client";

import { useState, useEffect, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { X, Trophy, AlertTriangle } from "lucide-react";
import { useEasterEgg } from "@/lib/EasterEggContext";

type GameState = "waiting" | "ready" | "lights-out" | "result" | "false-start";

export default function ReactionTimeGame() {
    const { isGameActive, closeGame } = useEasterEgg();
    const [gameState, setGameState] = useState<GameState>("waiting");
    const [lights, setLights] = useState(0);
    const [reactionTime, setReactionTime] = useState(0);
    const [ranking, setRanking] = useState("");

    const startTimeRef = useRef<number>(0);
    const timeoutRef = useRef<NodeJS.Timeout | null>(null);

    useEffect(() => {
        if (isGameActive) {
            resetGame();
        } else {
            if (timeoutRef.current) clearTimeout(timeoutRef.current);
        }
    }, [isGameActive]);

    const resetGame = () => {
        setGameState("waiting");
        setLights(0);
        setReactionTime(0);
        setRanking("");
    };

    const startGame = () => {
        setGameState("ready");
        let currentLight = 0;

        // Sequence: 5 Red Lights, 1 second apart
        const interval = setInterval(() => {
            currentLight++;
            setLights(currentLight);

            if (currentLight === 5) {
                clearInterval(interval);
                // Random delay between 1-3 seconds before lights out
                const randomDelay = Math.random() * 2000 + 1000;

                timeoutRef.current = setTimeout(() => {
                    setLights(0);
                    setGameState("lights-out");
                    startTimeRef.current = Date.now();
                }, randomDelay);
            }
        }, 1000);
    };

    const handleClick = () => {
        if (gameState === "waiting") {
            startGame();
            return;
        }

        if (gameState === "ready" && lights > 0) {
            // Jump start!
            if (timeoutRef.current) clearTimeout(timeoutRef.current);
            setGameState("false-start");
            return;
        }

        if (gameState === "lights-out") {
            const time = Date.now() - startTimeRef.current;
            setReactionTime(time);
            setGameState("result");
            rankDriver(time);
        }
    };

    const rankDriver = (time: number) => {
        if (time < 150) setRanking("F1 DRIVER (MAX VERSTAPPEN)");
        else if (time < 200) setRanking("F2 ROOKIE");
        else if (time < 250) setRanking("GENTLEMAN DRIVER");
        else if (time < 300) setRanking("AVERAGE DRIVER");
        else if (time < 400) setRanking("GRANDMA IN A PRIUS");
        else setRanking("ARE YOU SLEEPING?");
    };

    if (!isGameActive) return null;

    return (
        <AnimatePresence>
            <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                className="fixed inset-0 z-[100] bg-black/95 flex flex-col items-center justify-center cursor-pointer select-none"
                onClick={handleClick}
            >
                {/* Close Button */}
                <button
                    onClick={(e) => { e.stopPropagation(); closeGame(); }}
                    className="absolute top-8 right-8 text-white/50 hover:text-white"
                >
                    <X size={32} />
                </button>

                {/* Game Container */}
                <div className="text-center w-full max-w-4xl px-6">

                    {/* F1 Lights Container */}
                    <div className="bg-gray-900 p-8 rounded-3xl border border-gray-700 flex justify-between gap-4 mb-12 shadow-2xl relative">
                        {/* Visor Strip Decor */}
                        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-32 h-2 bg-gray-700 rounded-b-lg" />

                        {[...Array(5)].map((_, i) => (
                            <div key={i} className="flex flex-col gap-4">
                                {/* Light Housing */}
                                <div className={`w-16 h-16 md:w-24 md:h-24 rounded-full border-4 border-black shadow-inner transition-colors duration-75 
                                     ${lights > i ? "bg-red-600 shadow-[0_0_50px_red]" : "bg-gray-800"}`}
                                />
                                <div className={`w-16 h-16 md:w-24 md:h-24 rounded-full border-4 border-black shadow-inner bg-gray-800 opacity-20`} />
                            </div>
                        ))}
                    </div>

                    {/* Status Text */}
                    <div className="h-32 mb-8">
                        {gameState === "waiting" && (
                            <div className="text-white animate-pulse">
                                <h2 className="text-4xl font-display font-bold mb-2">REACTION TEST</h2>
                                <p className="font-mono text-primary text-xl">CLICK ANYWHERE TO START SEQUENCE</p>
                            </div>
                        )}

                        {gameState === "ready" && (
                            <h2 className="text-4xl font-display font-bold text-white">WAIT FOR LIGHTS OUT...</h2>
                        )}

                        {gameState === "false-start" && (
                            <div className="text-red-500">
                                <AlertTriangle className="mx-auto mb-4" size={48} />
                                <h2 className="text-5xl font-display font-bold uppercase">JUMP START!</h2>
                                <p className="font-mono mt-2">PENALTY: DRIVE THROUGH</p>
                                <p className="text-white/50 mt-4 text-sm">Click to restart</p>
                            </div>
                        )}

                        {gameState === "result" && (
                            <div className="text-primary">
                                <div className="text-8xl font-mono font-bold tabular-nums mb-4 drop-shadow-[0_0_15px_rgba(255,165,31,0.5)]">
                                    {reactionTime}<span className="text-4xl">ms</span>
                                </div>
                                <div className="inline-block border border-white/20 bg-white/5 px-6 py-2 rounded-full text-white font-display text-xl tracking-widest uppercase">
                                    {ranking}
                                </div>
                                <p className="text-white/50 mt-8 text-sm animate-pulse">Click to try again</p>
                            </div>
                        )}
                    </div>

                    <div className="text-white/20 font-mono text-xs uppercase tracking-[0.5em]">
                        Team Fateh Telemetry System v3.0
                    </div>

                </div>
            </motion.div>
        </AnimatePresence>
    );
}
