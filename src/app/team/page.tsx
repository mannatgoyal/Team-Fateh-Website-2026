"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import TeamCard from "@/components/ui/TeamCard";
import teamCurrentRaw from "@/data/team_current.json";
import teamArchiveRaw from "@/data/team_archive.json";

// Type definition for members
type TeamMember = { name: string; role: string; image: string; linkedin?: string; };
type DepartmentMap = Record<string, TeamMember[]>;
type YearMap = Record<string, DepartmentMap>;

// Parse JSON Databases
const teamData = teamArchiveRaw as unknown as YearMap;
const previousYears = Object.keys(teamData).sort().reverse();

const currentTeamData = teamCurrentRaw as unknown as YearMap;
const currentSeasons = Object.keys(currentTeamData);
const activeSeasonId = currentSeasons[0] || "Season 2026-27";

export default function TeamPage() {
    const [selectedYear, setSelectedYear] = useState<string>(activeSeasonId);

    const isShowingCurrent = currentSeasons.includes(selectedYear);
    const displayedData = isShowingCurrent ? currentTeamData[selectedYear] : teamData[selectedYear];

    return (
        <div className="min-h-screen bg-background pt-32 pb-24 px-6 md:px-12 selection:bg-primary selection:text-background">

            {/* Header Section */}
            <div className="max-w-7xl mx-auto mb-20 relative">
                <motion.h1
                    initial={{ opacity: 0, y: 30 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.8, ease: "easeOut" }}
                    className="text-6xl md:text-[8rem] font-display font-bold uppercase leading-none tracking-tight mb-6"
                >
                    THE <span className="text-primary italic">ROSTER</span>
                </motion.h1>

                <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: 0.5, duration: 1 }}
                    className="flex items-center gap-4 text-primary font-mono text-sm tracking-widest uppercase"
                >
                    <span>2026 // The Engineering Core</span>
                    <div className="h-[1px] flex-1 bg-gradient-to-r from-primary to-transparent" />
                </motion.div>
            </div>

            {/* THE FATEH STANDARD Section */}
            <div className="max-w-7xl mx-auto mb-32 relative">
                <div className="flex flex-col md:flex-row gap-12">
                    {/* Title Column */}
                    <div className="md:w-1/3 shrink-0">
                        <motion.div
                            initial={{ opacity: 0, x: -20 }}
                            whileInView={{ opacity: 1, x: 0 }}
                            viewport={{ once: true }}
                            className="sticky top-32"
                        >
                            <h2 className="text-4xl md:text-5xl font-display font-bold uppercase leading-tight mb-4">
                                THE FATEH<br />
                                <span className="text-primary italic">STANDARD</span>
                            </h2>
                            <div className="w-12 h-1 bg-primary mb-6" />
                            <p className="text-muted-foreground font-mono text-sm leading-relaxed max-w-sm">
                                These are the core tenets that drive our engineering and culture. We don't just build cars; we build a legacy.
                            </p>
                        </motion.div>
                    </div>

                    {/* Values Column */}
                    <div className="md:w-2/3 grid grid-cols-1 sm:grid-cols-2 gap-8">
                        {[
                            { title: "Aggressive in Ambition", desc: "We pursue performance with intent. We build to compete globally." },
                            { title: "Consistent in Execution", desc: "We deliver repeatable results through disciplined engineering and structured processes." },
                            { title: "Relentless in Effort", desc: "We outwork obstacles. Progress is earned, not given." },
                            { title: "Unified in Purpose", desc: "Every subsystem, every member, every decision serves one machine." },
                            { title: "Focused on the Future", desc: "Electrification, data-driven design, and sustainable innovation define our next chapter." }
                        ].map((value, i) => (
                            <motion.div
                                key={i}
                                initial={{ opacity: 0, y: 20 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                viewport={{ once: true }}
                                transition={{ delay: i * 0.1 }}
                                className="group relative bg-secondary/30 border border-white/5 p-8 hover:border-primary/50 transition-colors"
                            >
                                {/* Decorative Corner */}
                                <div className="absolute top-0 right-0 w-8 h-8 border-t border-r border-primary/0 group-hover:border-primary transition-all duration-300" />

                                <div className="text-primary font-mono text-xl mb-4 opacity-50 font-bold tracking-widest">
                                    0{i + 1} //
                                </div>
                                <h3 className="text-xl font-display font-bold uppercase text-white mb-3">
                                    {value.title}
                                </h3>
                                <p className="text-muted-foreground text-sm leading-relaxed">
                                    {value.desc}
                                </p>
                            </motion.div>
                        ))}
                    </div>
                </div>
            </div>

            {/* Year Selector Tabs */}
            <div className="max-w-7xl mx-auto mb-16">
                <div className="flex flex-wrap gap-2 md:gap-4 pb-4 border-b border-white/10">
                    {currentSeasons.map((season, idx) => (
                        <button
                            key={season}
                            onClick={() => setSelectedYear(season)}
                            className={`px-4 py-2 font-mono text-xs md:text-sm tracking-widest uppercase transition-all duration-300 ${selectedYear === season
                                ? (idx === 0 ? "bg-primary text-background font-bold shadow-[0_0_15px_rgba(230,57,70,0.5)]" : "bg-white text-background font-bold")
                                : "text-muted-foreground hover:text-white border border-transparent hover:border-white/20"
                                }`}
                        >
                            {idx === 0 ? `Active Roster (TUFF 19)` : season}
                        </button>
                    ))}

                    {/* Tiny divider */}
                    <div className="w-px h-8 bg-white/20 mx-2 hidden md:block" />

                    {previousYears.map(year => (
                        <button
                            key={year}
                            onClick={() => setSelectedYear(year)}
                            className={`px-4 py-2 font-mono text-xs md:text-sm tracking-widest uppercase transition-all duration-300 ${selectedYear === year
                                ? "bg-white text-background font-bold"
                                : "text-muted-foreground hover:text-white border border-transparent hover:border-white/20"
                                }`}
                        >
                            {year}
                        </button>
                    ))}
                </div>
            </div>

            {/* Dynamic Roster Display */}
            <div className="max-w-7xl mx-auto min-h-[50vh]">
                <AnimatePresence mode="wait">
                    <motion.div
                        key={selectedYear}
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: -20 }}
                        transition={{ duration: 0.4 }}
                    >
                        {displayedData ? (
                            <div className="space-y-24">
                                {Object.entries(displayedData).map(([department, members]) => {
                                    if (department === 'General') return null; // Skip generic folder artifacts

                                    return (
                                        <div key={department} className="relative">
                                            {/* Department Header */}
                                            <div className="flex items-center gap-6 mb-12">
                                                <h2 className="text-2xl md:text-3xl font-mono font-light tracking-widest uppercase shrink-0">
                                                    {department.replace(/_/g, " ")}
                                                </h2>
                                                <div className="h-[1px] w-full bg-white/10" />
                                            </div>

                                            {/* Member Grid */}
                                            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
                                                {members.map((member, idx) => (
                                                    <TeamCard
                                                        key={`${member.name}-${idx}`}
                                                        member={member}
                                                        department={department}
                                                    />
                                                ))}
                                            </div>
                                        </div>
                                    );
                                })}
                            </div>
                        ) : (
                            <div className="flex flex-col items-center justify-center py-32 text-muted-foreground font-mono">
                                <span className="text-primary mb-4">[404_DATA_NOT_FOUND]</span>
                                <p>No engineering records recovered for {selectedYear}.</p>
                            </div>
                        )}
                    </motion.div>
                </AnimatePresence>
            </div>

        </div >
    );
}
