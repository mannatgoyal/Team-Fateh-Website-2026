"use client";

import Image from "next/image";
import { useState } from "react";
import { motion } from "framer-motion";
import { Linkedin, Zap, Wind, ShieldAlert, FileKey, Cpu, Activity, Hexagon, ScanLine, Compass } from "lucide-react";

interface TeamMember {
    name: string;
    role: string;
    image: string;
    linkedin?: string;
}

interface TeamCardProps {
    member: TeamMember;
    department?: string;
}

export default function TeamCard({ member, department = "" }: TeamCardProps) {
    const [imgSrc, setImgSrc] = useState(member.image || '/images/Team/placeholder.png');
    const dept = department.toLowerCase();

    // The 8 Departments
    const isManagement = member.role.toLowerCase().includes("captain") || member.role.toLowerCase().includes("manager");
    const isStructures = dept.includes("structures");
    const isDynamics = dept.includes("dynamics");
    const isAero = dept.includes("aerodynamics");
    const isPowertrain = dept.includes("powertrain");
    const isElectronics = dept.includes("electronics");
    const isData = dept.includes("data");
    const isAuto = dept.includes("autonomous");
    const isDesign = member.role.toLowerCase().includes("design");

    return (
        <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            whileHover={{ y: -5 }}
            transition={{ duration: 0.4 }}
            className="group relative w-full aspect-[3/4] overflow-hidden bg-secondary border border-white/5 hover:border-primary/50 transition-colors flex flex-col items-center justify-center p-6"
        >
            {/* Round Image Container */}
            <div className="relative w-3/4 aspect-square mb-4 rounded-full overflow-hidden grayscale group-hover:grayscale-0 transition-all duration-500 border border-white/10 group-hover:border-primary/50 shadow-2xl z-20">
                <Image
                    src={imgSrc}
                    alt={member.name}
                    fill
                    className="object-cover"
                    sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                    onError={() => setImgSrc('/images/Team/placeholder.png')}
                />

                {/* Overlay inside image */}
                <div className="absolute inset-0 bg-black/40 group-hover:bg-transparent transition-colors duration-500" />
            </div>

            {/* ---------------- EASTER EGG LAYERS (Full Card) ---------------- */}
            <div className="absolute inset-0 z-10 pointer-events-none">
                {/* 1. Management: Classified Stamp */}
                {isManagement && (
                    <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none">
                        <div className="border-4 border-red-600/80 text-red-600/80 px-4 py-2 font-display font-bold text-3xl -rotate-12 tracking-widest uppercase backdrop-blur-sm">
                            HQ CLEARANCE
                        </div>
                    </div>
                )}

                {/* 2. Structures & Composites: Carbon Hex Grid */}
                {isStructures && (
                    <div className="absolute inset-0 opacity-0 group-hover:opacity-50 transition-opacity duration-500 pointer-events-none mix-blend-overlay flex flex-wrap gap-1 justify-center content-center overflow-hidden">
                        {[...Array(40)].map((_, i) => (
                            <Hexagon key={i} size={48} className="text-gray-400 opacity-20" />
                        ))}
                    </div>
                )}

                {/* 3. Vehicle Dynamics: Cornering G-Force Reticle & Pitch/Roll */}
                {isDynamics && (
                    <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none overflow-hidden bg-black/40">
                        {/* Dynamic Grid Background */}
                        <div className="absolute inset-0 bg-[url('/images/grid.png')] opacity-30 mix-blend-screen" />

                        {/* Rotating Outer Radar */}
                        <motion.div
                            animate={{ rotate: 360 }}
                            transition={{ duration: 4, repeat: Infinity, ease: "linear" }}
                            className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-40 h-40 border border-red-500/20 rounded-full"
                        >
                            <div className="w-[1px] h-20 bg-gradient-to-t from-red-500/0 via-red-500/80 to-red-500/0 absolute top-0 left-1/2 -translate-x-1/2" />
                            <div className="w-20 h-[1px] bg-gradient-to-r from-red-500/0 via-red-500/80 to-red-500/0 absolute top-1/2 left-0 -translate-y-1/2" />
                        </motion.div>

                        {/* Center Target & G-Dot */}
                        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-24 h-24 border-2 border-dashed border-red-500/50 rounded-full shadow-[0_0_15px_rgba(239,68,68,0.3)]">
                            <motion.div
                                initial={{ x: 0, y: 0 }}
                                whileHover={{ x: 15, y: -10, scale: [1, 1.2, 1] }}
                                transition={{ type: "spring", stiffness: 150, repeat: Infinity, repeatType: "reverse", duration: 0.8 }}
                                className="absolute top-1/2 left-1/2 w-3 h-3 rounded-full bg-red-600 shadow-[0_0_15px_rgba(239,68,68,1)] border border-red-300 -translate-x-1/2 -translate-y-1/2"
                            />
                        </div>

                        {/* Top Right Live Stats Box */}
                        <div className="absolute top-4 right-4 border border-red-500/40 bg-black/60 backdrop-blur-sm p-2 text-[10px] font-mono text-red-400">
                            <div className="flex justify-between gap-4 mb-1"><span>STATUS:</span><span className="text-green-400 animate-pulse">NOMINAL</span></div>
                            <div className="flex justify-between gap-4"><span>PITCH:</span><motion.span animate={{ opacity: [1, 0.5, 1] }} transition={{ repeat: Infinity, duration: 0.3 }}>-1.2°</motion.span></div>
                            <div className="flex justify-between gap-4"><span>ROLL:</span><motion.span animate={{ opacity: [1, 0.5, 1] }} transition={{ repeat: Infinity, duration: 0.5 }}>+0.4°</motion.span></div>
                        </div>

                        {/* Bottom Left G-Meter Text */}
                        <div className="absolute bottom-24 left-4 text-red-500 font-mono text-xs font-bold tracking-widest flex items-center gap-2 bg-black/50 px-2 py-1 border-l-2 border-red-500">
                            <Activity size={14} className="animate-pulse" /> LAT: 2.1G
                        </div>

                        {/* Scanning Horizons */}
                        <div className="absolute bottom-0 left-0 w-full h-[1px] bg-red-500/50 shadow-[0_0_8px_rgba(239,68,68,0.8)]" />
                        <motion.div
                            initial={{ y: "100%" }}
                            whileHover={{ y: "-100%" }}
                            transition={{ duration: 2, repeat: Infinity, ease: "linear" }}
                            className="absolute bottom-0 left-0 w-full h-[1px] bg-red-500/80 shadow-[0_0_10px_rgba(239,68,68,1)]"
                        />
                    </div>
                )}

                {/* 4. Aerodynamics: Wind Tunnel Streamlines */}
                {isAero && (
                    <div className="absolute inset-0 opacity-0 group-hover:opacity-40 transition-opacity duration-500 pointer-events-none overflow-hidden">
                        {[...Array(6)].map((_, i) => (
                            <motion.div
                                key={i}
                                className="absolute h-[2px] bg-blue-300 w-full rounded-full shadow-[0_0_8px_rgba(147,197,253,0.8)]"
                                style={{ top: `${15 + i * 15}%` }}
                                initial={{ x: "-100%" }}
                                animate={{ x: "100%" }}
                                transition={{ repeat: Infinity, duration: 1.5 + (i * 0.2), ease: "linear", delay: i * 0.3 }}
                            />
                        ))}
                    </div>
                )}

                {/* 5. Powertrain: Heat/Combustion Element */}
                {isPowertrain && (
                    <div className="absolute inset-0 bg-gradient-to-t from-orange-600/40 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none mix-blend-screen">
                        <Zap className="absolute top-4 right-4 text-orange-400 animate-pulse" size={24} fill="currentColor" />
                    </div>
                )}

                {/* 6. Electronics: PCB Traces */}
                {isElectronics && (
                    <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none bg-[url('/images/grid.png')] bg-cover mix-blend-overlay">
                        <Cpu className="absolute top-4 right-4 text-green-400 animate-pulse" size={24} />
                        <div className="absolute bottom-1/2 left-0 w-full h-[1px] bg-green-500/50 shadow-[0_0_5px_rgba(74,222,128,0.8)]" />
                        <div className="absolute top-0 left-1/3 w-[1px] h-full bg-green-500/50 shadow-[0_0_5px_rgba(74,222,128,0.8)]" />
                    </div>
                )}

                {/* 7. Data Acquisition: Live Telemetry */}
                {isData && (
                    <div className="absolute top-6 left-6 opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none font-mono text-xs text-cyan-400 space-y-1">
                        {[...Array(5)].map((_, i) => (
                            <motion.div
                                key={i}
                                initial={{ opacity: 0, x: -20 }}
                                whileHover={{ opacity: 1, x: 0 }}
                                transition={{ delay: i * 0.1, duration: 0.2 }}
                                className="flex items-center gap-2"
                            >
                                <div className="w-1.5 h-1.5 bg-cyan-400 rounded-full animate-ping" />
                                <div>
                                    <span className="opacity-50">0x{Math.floor(Math.random() * 1000).toString(16)} </span>
                                    <ScanLine size={14} className="inline mr-1" /> ACTIVE FEED
                                </div>
                            </motion.div>
                        ))}
                    </div>
                )}

                {/* 8. Autonomous Systems: LiDAR Scan */}
                {isAuto && (
                    <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none">
                        <ScanLine className="absolute top-4 right-4 text-fuchsia-500 animate-pulse" size={24} />
                        <motion.div
                            initial={{ height: 0 }}
                            whileHover={{ height: "100%" }}
                            transition={{ duration: 1.5, repeat: Infinity, ease: "linear" }}
                            className="w-full border-b-2 border-fuchsia-500 shadow-[0_0_10px_rgba(217,70,239,0.8)] bg-fuchsia-500/10"
                        />
                    </div>
                )}

                {/* 9. Chief Design Engineer: CAD Blueprint */}
                {isDesign && (
                    <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none bg-blue-950/80 mix-blend-hard-light overflow-hidden">
                        {/* Blueprint Grid */}
                        <div className="absolute inset-0"
                            style={{
                                backgroundImage: "linear-gradient(rgba(59, 130, 246, 0.3) 1px, transparent 1px), linear-gradient(90deg, rgba(59, 130, 246, 0.3) 1px, transparent 1px)",
                                backgroundSize: "20px 20px"
                            }}
                        />
                        {/* Rotating Compass / CAD Element */}
                        <motion.div
                            initial={{ rotate: 0 }}
                            animate={{ rotate: 90 }}
                            transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
                            className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2"
                        >
                            <Compass className="text-blue-400 opacity-60 w-32 h-32" />
                        </motion.div>
                        {/* Measurement Lines */}
                        <motion.div
                            initial={{ width: 0 }}
                            whileHover={{ width: "80%" }}
                            transition={{ duration: 1 }}
                            className="absolute top-8 left-4 h-[1px] bg-blue-400/80"
                        />
                        <div className="absolute top-4 left-4 text-blue-300 font-mono text-[10px]">
                            <span className="animate-pulse">DRAWING MODE</span><br />
                            X: 231.42<br />
                            Y: 89.21<br />
                            Z: 14.05<br />
                            SCALE: 1:1
                        </div>
                    </div>
                )}

                {/* Bottom Gradient for text readability */}
                <div className="absolute bottom-0 left-0 w-full h-1/2 bg-gradient-to-t from-background via-background/80 to-transparent" />
            </div>
            {/* ---------------- END EASTER EGGS ---------------- */}

            {/* Content (Text Below Image) */}
            <div className="relative z-20 w-full mt-auto flex flex-col items-center">
                <p className={`font-mono text-[10px] uppercase tracking-widest mb-2 text-center
                    ${isElectronics || isData ? "text-green-400" : isAero ? "text-blue-400" : isAuto ? "text-fuchsia-400" : "text-primary"}
                `}>
                    {member.role}
                </p>
                <h3 className="text-xl font-display font-medium text-white mb-4 text-center">
                    {member.name}
                </h3>

                {member.linkedin && (
                    <a
                        href={member.linkedin}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-flex items-center justify-center gap-2 text-xs font-mono text-muted-foreground hover:text-white transition-colors"
                        data-cursor="hover"
                    >
                        <Linkedin size={14} />
                        <span>CONNECT</span>
                    </a>
                )}
            </div>

            {/* Decorative Corner */}
            <div className="absolute top-0 right-0 w-8 h-8 border-t border-r border-primary/0 group-hover:border-primary transition-all duration-300 z-30" />
        </motion.div>
    );
}
