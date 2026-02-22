"use client";

import Image from "next/image";
import sponsorsData from "@/data/sponsors.json";

// Flatten all sponsors from the JSON for the infinite marquee
const allSponsors = [
    ...(sponsorsData.title || []),
    ...(sponsorsData.platinum || []),
    ...(sponsorsData.gold || []),
    ...(sponsorsData.silver || []),
];

export default function SponsorBelt() {
    if (allSponsors.length === 0) return null;

    // We duplicate the array to ensure seamless infinite scrolling
    const marqueeSponsors = [...allSponsors, ...allSponsors];

    return (
        <div className="w-full bg-secondary/10 border-t border-b border-white/5 py-3 overflow-hidden relative z-40 mt-auto">
            {/* The Wholesome Title */}
            <div className="text-center mb-3">
                <span className="text-[10px] md:text-xs font-mono tracking-[0.2em] text-muted-foreground uppercase">
                    POWERED BY THE PARTNERS WHO BELIEVE IN OUR FUTURE
                </span>
            </div>

            {/* Fade Gradients for smooth entrance/exit */}
            <div className="absolute inset-y-0 left-0 w-16 md:w-32 bg-gradient-to-r from-background to-transparent z-10 pointer-events-none" />
            <div className="absolute inset-y-0 right-0 w-16 md:w-32 bg-gradient-to-l from-background to-transparent z-10 pointer-events-none" />

            <div className="flex w-max animate-marquee hover:[animation-play-state:paused] items-center">
                {marqueeSponsors.map((sponsor, idx) => (
                    <div
                        key={`${sponsor.name}-${idx}`}
                        className="flex items-center justify-center px-8 md:px-16 opacity-50 hover:opacity-100 transition-opacity grayscale hover:grayscale-0 cursor-default"
                        title={sponsor.name}
                    >
                        <div className="relative h-6 md:h-8 w-24 md:w-32 flex items-center justify-center">
                            <Image
                                src={sponsor.logo}
                                alt={sponsor.name}
                                fill
                                className="object-contain"
                            />
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
}
