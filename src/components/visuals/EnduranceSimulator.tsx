"use client";

import { useState, useEffect, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { X, Battery, Gauge, AlertTriangle, Trophy, Play, RotateCcw, Zap } from "lucide-react";

type GameState = "waiting" | "running" | "dnf" | "finished";
type TrackEvent = "none" | "straight" | "corner" | "thermal";

const TOTAL_DISTANCE = 22.0; // km
const MAX_BATTERY = 100; // %
const TICK_RATE = 50; // ms per update
const SIM_MULTIPLIER = 25; // Speed up the simulation (makes 22km take ~30-40 seconds)

export default function EnduranceSimulator({ isOpen, onClose }: { isOpen: boolean, onClose: () => void }) {
    const [gameState, setGameState] = useState<GameState>("waiting");
    const [distance, setDistance] = useState(0);
    const [battery, setBattery] = useState(MAX_BATTERY);
    const [powerRequest, setPowerRequest] = useState(50); // 0-100%
    const [timeElapsed, setTimeElapsed] = useState(0);
    const [finalMessage, setFinalMessage] = useState("");

    // Dynamic Events
    const [currentEvent, setCurrentEvent] = useState<TrackEvent>("none");
    const [eventWarning, setEventWarning] = useState("");

    const gameInterval = useRef<NodeJS.Timeout | null>(null);
    const eventTimeout = useRef<NodeJS.Timeout | null>(null);

    const endGame = (state: GameState, finalDist: number) => {
        if (gameInterval.current) clearInterval(gameInterval.current);
        if (eventTimeout.current) clearTimeout(eventTimeout.current);
        setGameState(state);
        setCurrentEvent("none");

        if (state === "dnf") {
            setFinalMessage(`DNF: Battery depleted at ${finalDist.toFixed(1)}km.`);
        } else if (state === "finished") {
            if (battery > 20) {
                setFinalMessage(`Too conservative! Finished with ${battery.toFixed(1)}% remaining.`);
            } else if (battery > 5) {
                setFinalMessage(`Good energy management. Solid finish (${battery.toFixed(1)}% left).`);
            } else {
                setFinalMessage("PERFECT STRATEGY. Crossed the line on fumes.");
            }
        }
    };

    // Game Physics Loop
    useEffect(() => {
        if (gameState === "running") {
            gameInterval.current = setInterval(() => {
                setTimeElapsed(prev => prev + (TICK_RATE / 1000));

                const currentPower = powerRequest / 100;

                // Speed: 40km/h (coasting) to 130km/h (max)
                const speedKmph = 40 + (currentPower * 90);
                const distanceDelta = (speedKmph / 3600) * (TICK_RATE / 1000) * SIM_MULTIPLIER;

                // Battery Drain Math (Reduced base drain to make it more winnable)
                let baseDrain = 0.03 * SIM_MULTIPLIER; // Was 0.05
                let powerDrainFactor = Math.pow(currentPower, 2) * 0.35 * SIM_MULTIPLIER; // Was 0.4

                // Event Penalties / Bonuses
                if (currentEvent === "straight" && powerRequest < 80) {
                    // Penalty for being too slow on a straight
                    baseDrain += 0.15; // Reduced penalty
                } else if (currentEvent === "corner" && powerRequest > 40) {
                    // Massive penalty for pushing in a corner (tire slip / inefficiency)
                    powerDrainFactor += 0.6; // Reduced penalty
                } else if (currentEvent === "thermal" && powerRequest > 20) {
                    // Critical thermal penalty
                    powerDrainFactor += 1.0; // Reduced penalty
                } else if (currentEvent === "corner" && powerRequest <= 40) {
                    // Regen bonus
                    baseDrain -= 0.15; // Increased reward
                }

                const drainDelta = baseDrain + powerDrainFactor;

                setDistance(prev => {
                    const newDist = prev + distanceDelta;
                    if (newDist >= TOTAL_DISTANCE) {
                        endGame("finished", newDist);
                        return TOTAL_DISTANCE;
                    }
                    return newDist;
                });

                setBattery(prev => {
                    const newBatt = prev - drainDelta * (TICK_RATE / 1000);
                    if (newBatt <= 0 && distance < TOTAL_DISTANCE) {
                        endGame("dnf", distance);
                        return 0;
                    }
                    return Math.max(0, newBatt);
                });

            }, TICK_RATE);
        }

        return () => {
            if (gameInterval.current) clearInterval(gameInterval.current);
        };
    }, [gameState, powerRequest, distance, currentEvent]);

    // Random Event Generator Loop
    useEffect(() => {
        if (gameState === "running") {
            const triggerRandomEvent = () => {
                const rand = Math.random();
                if (rand < 0.3) {
                    setCurrentEvent("straight");
                    setEventWarning("LONG STRAIGHT: Push Power > 80%!");
                } else if (rand < 0.6) {
                    setCurrentEvent("corner");
                    setEventWarning("TECHNICAL SECTOR: Drop Power < 40%!");
                } else if (rand < 0.8) {
                    setCurrentEvent("thermal");
                    setEventWarning("THERMAL WARNING: Coast Power < 20%!");
                } else {
                    setCurrentEvent("none");
                    setEventWarning("");
                }

                // Event lasts 3-5 seconds
                eventTimeout.current = setTimeout(triggerRandomEvent, Math.random() * 2000 + 3000);
            };

            eventTimeout.current = setTimeout(triggerRandomEvent, 4000);
        }

        return () => {
            if (eventTimeout.current) clearTimeout(eventTimeout.current);
        };
    }, [gameState]);

    const startGame = () => {
        setDistance(0);
        setBattery(MAX_BATTERY);
        setPowerRequest(50);
        setCurrentEvent("none");
        setEventWarning("");
        setGameState("running");
    };

    if (!isOpen) return null;

    return (
        <AnimatePresence>
            <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                className="fixed inset-0 z-[100] bg-black/95 flex flex-col items-center justify-center p-6"
            >
                {/* Close Button */}
                <button onClick={onClose} className="absolute top-8 right-8 text-white/50 hover:text-white transition-colors">
                    <X size={32} />
                </button>

                <div className="w-full max-w-2xl bg-secondary/30 border border-white/10 rounded-2xl p-8 relative overflow-hidden">
                    {/* Background UI Effects */}
                    <div className="absolute inset-0 bg-[url('/images/grid.png')] opacity-10 pointer-events-none" />

                    {/* Event Flash Overlay */}
                    <AnimatePresence>
                        {currentEvent !== "none" && (
                            <motion.div
                                initial={{ opacity: 0 }}
                                animate={{ opacity: 0.1 }}
                                exit={{ opacity: 0 }}
                                className={`absolute inset-0 pointer-events-none ${currentEvent === "straight" ? "bg-green-500" :
                                    currentEvent === "corner" ? "bg-blue-500" : "bg-red-500"
                                    }`}
                            />
                        )}
                    </AnimatePresence>

                    <header className="mb-8 text-center relative z-10">
                        <div className="text-primary font-mono text-xs tracking-widest uppercase items-center justify-center flex gap-2 mb-2">
                            <Gauge size={14} /> telemetry simulation module v2
                        </div>
                        <h2 className="text-4xl font-display font-bold text-white uppercase tracking-wider">Fast-Track Endurance</h2>
                    </header>

                    {/* Dashboard */}
                    <div className="grid grid-cols-2 gap-6 mb-4 relative z-10">
                        {/* Progress */}
                        <div className="bg-black/80 border border-white/5 rounded-xl p-4 shadow-inner">
                            <div className="flex justify-between items-end mb-2">
                                <span className="font-mono text-xs uppercase text-gray-400">Track Progress</span>
                                <span className="font-mono font-bold text-lg">{distance.toFixed(1)} <span className="text-xs">/ {TOTAL_DISTANCE} km</span></span>
                            </div>
                            <div className="w-full h-3 bg-white/10 rounded-full overflow-hidden">
                                <motion.div
                                    className="h-full bg-white relative"
                                    style={{ width: `${(distance / TOTAL_DISTANCE) * 100}%` }}
                                />
                            </div>
                        </div>

                        {/* Battery */}
                        <div className="bg-black/80 border border-white/5 rounded-xl p-4 shadow-inner relative overflow-hidden">
                            <div className={`absolute inset-0 bg-red-500/20 transition-opacity duration-300 ${battery < 15 ? 'opacity-100 animate-pulse' : 'opacity-0'}`} />
                            <div className="flex justify-between items-end mb-2 relative z-10">
                                <span className="font-mono text-xs uppercase text-gray-400 flex items-center gap-1"><Battery size={12} /> HV SoC</span>
                                <span className={`font-mono font-bold text-lg ${battery < 15 ? 'text-red-500' : 'text-primary'}`}>
                                    {battery.toFixed(1)}%
                                </span>
                            </div>
                            <div className="w-full h-3 bg-white/10 rounded-full overflow-hidden relative z-10">
                                <motion.div
                                    className={`h-full ${battery < 15 ? 'bg-red-500' : 'bg-primary'}`}
                                    style={{ width: `${battery}%` }}
                                />
                            </div>
                        </div>
                    </div>

                    {/* Active Event Warning */}
                    <div className="h-12 mb-4 flex items-center justify-center relative z-10">
                        <AnimatePresence mode="wait">
                            {currentEvent !== "none" && (
                                <motion.div
                                    key={currentEvent}
                                    initial={{ opacity: 0, y: 10, scale: 0.95 }}
                                    animate={{ opacity: 1, y: 0, scale: 1 }}
                                    exit={{ opacity: 0, y: -10 }}
                                    className={`px-6 py-2 rounded-full font-mono text-sm uppercase tracking-widest font-bold flex items-center gap-2 shadow-lg border ${currentEvent === "straight" ? "bg-green-500/20 text-green-400 border-green-500/50" :
                                        currentEvent === "corner" ? "bg-blue-500/20 text-blue-400 border-blue-500/50" :
                                            "bg-red-500/20 text-red-500 border-red-500/50 animate-pulse"
                                        }`}
                                >
                                    {currentEvent === "thermal" ? <AlertTriangle size={16} /> : <Zap size={16} />}
                                    {eventWarning}
                                </motion.div>
                            )}
                        </AnimatePresence>
                    </div>

                    {/* Central Area: Controls / Results */}
                    <div className="h-48 flex flex-col items-center justify-center border border-white/5 rounded-xl bg-black/50 relative z-10 shadow-2xl">

                        {gameState === "waiting" && (
                            <button
                                onClick={startGame}
                                className="flex items-center gap-2 bg-primary hover:bg-white text-black px-8 py-4 rounded-full font-bold uppercase tracking-widest transition-all hover:scale-105 shadow-[0_0_20px_rgba(255,165,31,0.3)]"
                            >
                                <Play size={18} fill="currentColor" /> Initiate Sequence
                            </button>
                        )}

                        {gameState === "running" && (
                            <div className="w-full px-12 text-center">
                                <div className="font-mono text-6xl font-bold mb-4 tabular-nums tracking-tighter drop-shadow-md">
                                    {(40 + (powerRequest / 100) * 90).toFixed(0)} <span className="text-xl text-white/50">km/h</span>
                                </div>

                                <input
                                    type="range"
                                    min="0"
                                    max="100"
                                    value={powerRequest}
                                    onChange={(e) => setPowerRequest(parseInt(e.target.value))}
                                    className="w-full accent-primary h-2 bg-white/10 rounded-lg appearance-none cursor-pointer focus:outline-none focus:ring-2 focus:ring-primary/50"
                                    style={{
                                        background: `linear-gradient(to right, #ffa51f ${powerRequest}%, rgba(255,255,255,0.1) ${powerRequest}%)`
                                    }}
                                />
                                <div className="flex justify-between font-mono text-xs text-muted-foreground uppercase mt-3">
                                    <span>Regen / Coast</span>
                                    <span className="text-primary font-bold">{powerRequest}% POWER</span>
                                    <span>Push</span>
                                </div>
                            </div>
                        )}

                        {(gameState === "dnf" || gameState === "finished") && (
                            <div className="text-center">
                                {gameState === "dnf" ? (
                                    <AlertTriangle className="mx-auto text-red-500 mb-2 drop-shadow-[0_0_10px_rgba(239,68,68,0.5)]" size={40} />
                                ) : (
                                    <Trophy className="mx-auto text-primary mb-2 drop-shadow-[0_0_10px_rgba(255,165,31,0.5)]" size={40} />
                                )}
                                <h3 className={`text-4xl font-display font-bold mb-1 uppercase tracking-widest ${gameState === "dnf" ? "text-red-500" : "text-white"}`}>
                                    {gameState === "dnf" ? "CRITICAL FAILURE" : "CHECKERED FLAG"}
                                </h3>
                                <p className="font-mono text-muted-foreground mb-4">{finalMessage}</p>

                                <button
                                    onClick={startGame}
                                    className="flex items-center gap-2 mx-auto text-sm border-2 border-white/20 hover:bg-white hover:text-black hover:border-white px-6 py-2 rounded-full uppercase font-mono transition-all font-bold"
                                >
                                    <RotateCcw size={14} /> Retry Simulation
                                </button>
                            </div>
                        )}

                    </div>
                </div>
            </motion.div>
        </AnimatePresence>
    );
}
