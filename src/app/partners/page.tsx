"use client";

import { motion } from "framer-motion";
import Image from "next/image";
import sponsorsData from "@/data/sponsors.json";
import { Shield, ExternalLink, ArrowRight, Hexagon } from "lucide-react";

export default function PartnersPage() {
    return (
        <div className="min-h-screen bg-background pb-32 pt-32 px-6 md:px-12 selection:bg-primary selection:text-background text-white">
            <header className="mb-24 text-center max-w-4xl mx-auto">
                <motion.div
                    initial={{ opacity: 0, y: -20 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="inline-flex flex-col items-center justify-center gap-2 mb-8"
                >
                    <div className="border border-primary/30 bg-primary/5 px-6 py-2 rounded-full text-primary font-mono text-sm tracking-widest uppercase">
                        Official Partner Grid
                    </div>
                </motion.div>
                <motion.h1
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.1 }}
                    className="text-5xl md:text-8xl font-display font-bold uppercase tracking-tight leading-none mb-8"
                >
                    STRATEGY <span className="text-primary italic">PARTNERS</span>
                </motion.h1>
                <motion.p
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: 0.2 }}
                    className="text-lg text-muted-foreground font-mono leading-relaxed"
                >
                    The engineering giants and industry leaders driving TUFF 19. They provide the highly-specialized components, software, and capital that push our EV platform beyond theoretical limits.
                </motion.p>
            </header>

            <div className="max-w-7xl mx-auto space-y-32">

                {/* --- 1. TITLE SPONSOR --- */}
                {sponsorsData.title && sponsorsData.title.length > 0 && (
                    <section>
                        <div className="flex items-center gap-4 mb-12">
                            <h2 className="text-2xl md:text-3xl font-mono font-light tracking-widest text-primary uppercase shrink-0">
                                TITLE SPONSOR
                            </h2>
                            <div className="h-[1px] w-full bg-gradient-to-r from-primary/50 to-transparent" />
                        </div>

                        <div className="grid grid-cols-1 gap-8">
                            {sponsorsData.title.map((sponsor, idx) => (
                                <motion.a
                                    key={idx}
                                    href={sponsor.website !== "#" ? sponsor.website : undefined}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    initial={{ opacity: 0, y: 20 }}
                                    whileInView={{ opacity: 1, y: 0 }}
                                    viewport={{ once: true }}
                                    className="group relative bg-secondary/30 border border-white/10 rounded-none hover:border-primary/50 transition-all duration-500 overflow-hidden flex flex-col md:flex-row items-center p-8 md:p-16 gap-12"
                                >
                                    {/* Abstract Grid Background */}
                                    <div className="absolute inset-0 opacity-5 pointer-events-none mix-blend-overlay flex flex-wrap gap-1 justify-center content-center overflow-hidden">
                                        {[...Array(60)].map((_, i) => (
                                            <Hexagon key={i} size={48} className="text-primary" />
                                        ))}
                                    </div>

                                    {/* High Contrast Logo Box */}
                                    <div className="relative w-full md:w-1/3 aspect-video shrink-0 bg-white/5 border border-white/10 flex items-center justify-center p-8 group-hover:bg-white/10 transition-colors duration-500">
                                        <div className="relative w-full h-full">
                                            <Image
                                                src={sponsor.logo}
                                                alt={sponsor.name}
                                                fill
                                                className="object-contain filter grayscale group-hover:grayscale-0 transition-all duration-500"
                                            />
                                        </div>
                                    </div>

                                    <div className="relative z-10 flex-1 text-center md:text-left">
                                        <div className="text-primary font-mono text-xs tracking-widest uppercase mb-4">Tier 0 // Flagship Partner</div>
                                        <h3 className="text-4xl md:text-6xl font-display font-bold text-white mb-6 uppercase tracking-wide">
                                            {sponsor.name}
                                        </h3>
                                        <p className="text-lg text-muted-foreground font-mono mb-8 max-w-2xl leading-relaxed">
                                            {sponsor.description}
                                        </p>

                                        {sponsor.website !== "#" && (
                                            <div className="inline-flex items-center gap-3 text-primary hover:text-white transition-colors font-bold tracking-widest uppercase border-b border-primary/30 pb-1 group-hover:border-primary">
                                                <span>Visit Website</span>
                                                <ExternalLink size={18} />
                                            </div>
                                        )}
                                    </div>
                                </motion.a>
                            ))}
                        </div>
                    </section>
                )}

                {/* --- 2. PLATINUM SPONSORS --- */}
                {sponsorsData.platinum && sponsorsData.platinum.length > 0 && (
                    <section>
                        <div className="flex items-center gap-4 mb-12">
                            <h2 className="text-xl md:text-2xl font-mono font-light tracking-widest text-white uppercase shrink-0">
                                PLATINUM
                            </h2>
                            <div className="h-[1px] w-full bg-gradient-to-r from-white/20 to-transparent" />
                        </div>

                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                            {sponsorsData.platinum.map((sponsor, idx) => (
                                <motion.a
                                    key={idx}
                                    href={sponsor.website !== "#" ? sponsor.website : undefined}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    initial={{ opacity: 0, y: 20 }}
                                    whileInView={{ opacity: 1, y: 0 }}
                                    viewport={{ once: true }}
                                    transition={{ delay: idx * 0.1 }}
                                    className="group relative bg-secondary/20 border border-white/5 hover:border-white/30 transition-all duration-300 flex flex-col p-8"
                                >
                                    <div className="relative w-full h-48 mb-8 flex items-center justify-center opacity-70 group-hover:opacity-100 transition-opacity">
                                        <Image
                                            src={sponsor.logo}
                                            alt={sponsor.name}
                                            fill
                                            className="object-contain filter grayscale group-hover:grayscale-0 transition-all duration-500"
                                        />
                                    </div>
                                    <div className="mt-auto border-t border-white/10 pt-6">
                                        <h3 className="text-2xl font-display font-bold text-white mb-3 uppercase">{sponsor.name}</h3>
                                        <p className="text-sm text-muted-foreground font-mono leading-relaxed line-clamp-2 mb-6">
                                            {sponsor.description}
                                        </p>
                                        {sponsor.website !== "#" && (
                                            <div className="flex items-center gap-2 text-primary font-mono text-xs uppercase tracking-widest">
                                                <span>Explore</span> <ArrowRight size={14} className="group-hover:translate-x-1 transition-transform" />
                                            </div>
                                        )}
                                    </div>
                                </motion.a>
                            ))}
                        </div>
                    </section>
                )}

                {/* --- 3. GOLD SPONSORS --- */}
                {sponsorsData.gold && sponsorsData.gold.length > 0 && (
                    <section>
                        <div className="flex items-center gap-4 mb-12">
                            <h2 className="text-lg md:text-xl font-mono font-light tracking-widest text-white/70 uppercase shrink-0">
                                GOLD
                            </h2>
                            <div className="h-[1px] w-full bg-gradient-to-r from-white/10 to-transparent" />
                        </div>

                        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                            {sponsorsData.gold.map((sponsor, idx) => (
                                <motion.a
                                    key={idx}
                                    href={sponsor.website !== "#" ? sponsor.website : undefined}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    initial={{ opacity: 0, scale: 0.95 }}
                                    whileInView={{ opacity: 1, scale: 1 }}
                                    viewport={{ once: true }}
                                    transition={{ delay: idx * 0.05 }}
                                    className="group relative bg-secondary/10 border border-white/5 hover:border-white/20 transition-all duration-300 flex flex-col p-6"
                                >
                                    <div className="relative w-full h-24 mb-6 flex items-center justify-center opacity-50 group-hover:opacity-100 transition-opacity">
                                        <Image
                                            src={sponsor.logo}
                                            alt={sponsor.name}
                                            fill
                                            className="object-contain filter grayscale transition-all duration-300"
                                        />
                                    </div>
                                    <div className="mt-auto">
                                        <h3 className="text-lg font-bold text-white mb-2 uppercase tracking-wide">{sponsor.name}</h3>
                                        <p className="text-xs text-muted-foreground font-mono line-clamp-2">{sponsor.description}</p>
                                    </div>
                                </motion.a>
                            ))}
                        </div>
                    </section>
                )}

                {/* --- 4. SILVER SPONSORS --- */}
                {sponsorsData.silver && sponsorsData.silver.length > 0 && (
                    <section>
                        <div className="flex items-center gap-4 mb-12">
                            <h2 className="text-sm md:text-base font-mono font-light tracking-widest text-white/50 uppercase shrink-0">
                                SILVER
                            </h2>
                            <div className="h-[1px] w-full bg-gradient-to-r from-white/5 to-transparent" />
                        </div>

                        <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-5 gap-px bg-white/5 border border-white/5">
                            {sponsorsData.silver.map((sponsor, idx) => (
                                <motion.a
                                    key={idx}
                                    href={sponsor.website !== "#" ? sponsor.website : undefined}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    initial={{ opacity: 0 }}
                                    whileInView={{ opacity: 1 }}
                                    viewport={{ once: true }}
                                    className="group relative bg-background hover:bg-secondary/30 transition-colors duration-300 flex flex-col items-center justify-center p-8 aspect-square"
                                >
                                    <div className="relative w-full h-1/2 mb-4">
                                        <Image
                                            src={sponsor.logo}
                                            alt={sponsor.name}
                                            fill
                                            className="object-contain filter grayscale opacity-30 group-hover:opacity-100 transition-opacity duration-300"
                                        />
                                    </div>
                                    <h3 className="text-[10px] font-mono text-muted-foreground group-hover:text-white text-center uppercase tracking-wider">{sponsor.name}</h3>
                                </motion.a>
                            ))}
                        </div>
                    </section>
                )}

                {/* Become a Partner - Epic Full Width CTA */}
                <motion.section
                    initial={{ opacity: 0 }}
                    whileInView={{ opacity: 1 }}
                    viewport={{ once: true }}
                    className="mt-32"
                >
                    <a
                        href="/contact"
                        className="group relative block w-full bg-primary overflow-hidden py-24 px-8 text-center cursor-pointer"
                    >
                        <div className="absolute inset-0 bg-[url('/images/grid.png')] opacity-10 group-hover:scale-110 transition-transform duration-1000 mix-blend-overlay pointer-events-none" />
                        <div className="absolute top-0 left-0 w-full h-full bg-gradient-to-t from-black/50 to-transparent pointer-events-none" />

                        <div className="relative z-10 flex flex-col items-center">
                            <Shield size={48} className="text-black mb-6 group-hover:-translate-y-2 transition-transform duration-300" />
                            <h3 className="font-display font-bold text-4xl md:text-6xl text-black mb-6 leading-tight uppercase tracking-tighter max-w-2xl mx-auto">
                                FORCE MULTIPLY<br />OUR PROJECT
                            </h3>
                            <div className="inline-flex items-center gap-4 bg-black text-white px-8 py-4 font-mono font-bold tracking-widest uppercase text-sm hover:bg-white hover:text-black transition-colors">
                                <span>Join the Pit Wall</span>
                                <ArrowRight size={18} />
                            </div>
                        </div>
                    </a>
                </motion.section>

            </div>
        </div>
    );
}
