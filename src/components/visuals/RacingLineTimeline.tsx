"use client";

import { motion, useScroll, useTransform } from "framer-motion";
import { useRef } from "react";
import { Flag, CheckCircle, Zap, Flame, Gauge, BatteryCharging, TrendingUp } from "lucide-react";

interface TimelineEvent {
    year: string;
    title: string;
    description: string;
    icon?: React.ReactNode;
}

const timelineData: TimelineEvent[] = [
    {
        year: "2008",
        title: "The First Machine",
        description:
            "Team Fateh built its first combustion race car in North India — laying the foundation of aggressive ambition and hands-on engineering excellence.",
        icon: <Flag className="text-muted-foreground" />,
    },
    {
        year: "2010–2014",
        title: "Engineering Maturity",
        description:
            "From rapid engine prototyping to advanced chassis evolution, the team strengthened its technical backbone. Data acquisition, structural refinement, and testing became core pillars.",
        icon: <Gauge className="text-muted-foreground" />,
    },
    {
        year: "2015–2019",
        title: "Performance Defined",
        description:
            "Carbon fibre integration, aero packages, simulation tools, and optimized suspension systems elevated performance. Aggression on track matched discipline in design.",
        icon: <Gauge className="text-muted-foreground" />,
    },
    {
        year: "2020–2023",
        title: "Consistency & Podiums",
        description:
            "Structured processes and relentless hard work translated into consistent podium finishes across national competitions. Team Fateh became known for reliability and engineering precision.",
        icon: <Gauge className="text-muted-foreground" />,
    },
    {
        year: "2024",
        title: "The Electric Shift",
        description:
            "A defining transition. High-voltage systems, accumulator development, and Emrax 228 integration marked the beginning of our electric era — blending legacy experience with future technology.",
        icon: <Zap className="text-muted-foreground" />,
    },
    {
        year: "2025",
        title: "Electric Performance",
        description:
            "Our first fully competitive EV platform delivered strong national results. Refined control systems, upgraded uprights, and optimized accumulator architecture strengthened our electric identity.",
        icon: <BatteryCharging className="text-muted-foreground" />,
    },
    {
        year: "Future",
        title: "Relentless Evolution",
        description:
            "Refining EV architecture, suspension systems, and data-driven optimization. Aggressive in ambition. Consistent in execution. Hardworking by standard.",
        icon: <TrendingUp className="text-muted-foreground" />,
    },
];

export default function RacingLineTimeline() {
    const containerRef = useRef<HTMLDivElement>(null);
    const { scrollYProgress } = useScroll({
        target: containerRef,
        offset: ["start end", "end start"],
    });

    const scaleY = useTransform(scrollYProgress, [0, 1], [0, 1]);

    return (
        <div ref={containerRef} className="relative py-20 min-h-[150vh] flex flex-col items-center">
            {/* The Track (Racing Line) */}
            <div className="absolute top-0 bottom-0 w-1 bg-white/5 left-[20px] md:left-1/2 -translate-x-1/2">
                <motion.div
                    style={{ scaleY, transformOrigin: "top" }}
                    className="absolute top-0 w-full bg-gradient-to-b from-primary via-primary to-transparent"
                />
            </div>

            <div className="space-y-32 md:space-y-48 w-full max-w-4xl relative z-10">
                {timelineData.map((event, index) => (
                    <motion.div
                        key={event.year}
                        initial={{ opacity: 0, x: index % 2 === 0 ? -50 : 50 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        transition={{ duration: 0.6, delay: 0.2 }}
                        viewport={{ once: true, margin: "-100px" }}
                        className={`flex flex-col md:flex-row items-center gap-8 ${index % 2 === 0 ? "md:flex-row-reverse" : ""
                            }`}
                    >
                        {/* Content Card */}
                        <div className="flex-1 md:text-right p-6 rounded-2xl border border-white/5 bg-secondary/50 backdrop-blur-sm hover:border-primary/50 transition-colors w-full md:w-auto ml-12 md:ml-0 md:mr-0">
                            <div className={`text-6xl font-display font-bold text-white/5 absolute -top-10 ${index % 2 === 0 ? "md:right-0" : "md:left-0"} select-none`}>
                                {event.year}
                            </div>
                            <div className="flex items-center gap-3 mb-2 text-primary font-mono text-xl">
                                {index % 2 !== 0 && event.icon}
                                <span className="font-bold">{event.year}</span>
                                {index % 2 === 0 && event.icon}
                            </div>
                            <h3 className="text-2xl font-bold text-white mb-2">{event.title}</h3>
                            <p className="text-muted-foreground leading-relaxed">
                                {event.description}
                            </p>
                        </div>

                        {/* Checkpoint Node */}
                        <div className="absolute left-[20px] md:left-1/2 -translate-x-1/2 w-4 h-4 rounded-full bg-black border-2 border-primary z-20">
                            <div className="absolute inset-0 bg-primary opacity-50 animate-ping rounded-full" />
                        </div>

                        {/* Spacer for Flex Layout */}
                        <div className="flex-1 hidden md:block"></div>
                    </motion.div>
                ))}
            </div>
        </div>
    );
}
