"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Image from "next/image";
import { X, Maximize2 } from "lucide-react";

// Placeholder data - ideally this would come from a CMS or JSON
const galleryImages = [
    { src: "/images/Gallery/action_1.jpg", alt: "Pit Stop Edit", width: 800, height: 600, category: "Action" },
    { src: "/images/Gallery/design_1.jpg", alt: "Late Night Build", width: 800, height: 450, category: "Design" },
    { src: "/images/Gallery/testing_1.jpg", alt: "E04 SkyWalk Testing", width: 600, height: 800, category: "Testing" },
    { src: "/images/Gallery/design_2.jpg", alt: "E02 C Cabin", width: 1200, height: 800, category: "Design" },
    // Add more placeholder objects to fill the grid
    { src: "/images/Gallery/team_1.jpg", alt: "Formula Bharat 2026", width: 600, height: 800, category: "Team" },
    { src: "/images/Gallery/team_2.jpg", alt: "With the National Champions'26", width: 800, height: 600, category: "Team" },
];

export default function GalleryPage() {
    const [selectedImage, setSelectedImage] = useState<string | null>(null);
    const [filter, setFilter] = useState("All");

    const categories = ["All", ...Array.from(new Set(galleryImages.map(img => img.category)))];

    const filteredImages = filter === "All"
        ? galleryImages
        : galleryImages.filter(img => img.category === filter);

    return (
        <div className="min-h-screen bg-background pb-20 pt-32 px-6 md:px-12">

            {/* Header */}
            <div className="max-w-7xl mx-auto mb-16">
                <motion.h1
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="text-6xl md:text-8xl font-display font-bold mb-8"
                >
                    THE <span className="text-primary">ARCHIVE</span>
                </motion.h1>

                {/* Filters */}
                <div className="flex gap-4 overflow-x-auto pb-4 no-scrollbar border-b border-white/10">
                    {categories.map(cat => (
                        <button
                            key={cat}
                            onClick={() => setFilter(cat)}
                            className={`px-4 py-2 font-mono text-sm uppercase tracking-widest transition-colors whitespace-nowrap ${filter === cat ? "text-primary border-b-2 border-primary" : "text-muted-foreground hover:text-white"
                                }`}
                        >
                            {cat}
                        </button>
                    ))}
                </div>
            </div>

            {/* Masonry Grid Simulation */}
            <div className="max-w-7xl mx-auto columns-1 md:columns-2 lg:columns-3 gap-6 space-y-6">
                <AnimatePresence>
                    {filteredImages.map((img, idx) => (
                        <motion.div
                            key={idx}
                            layout
                            initial={{ opacity: 0, scale: 0.9 }}
                            animate={{ opacity: 1, scale: 1 }}
                            exit={{ opacity: 0, scale: 0.9 }}
                            transition={{ duration: 0.3 }}
                            className="relative group overflow-hidden bg-secondary border border-white/5 break-inside-avoid shadow-lg cursor-pointer"
                            onClick={() => setSelectedImage(img.src)}
                        >
                            {/* Maintain aspect ratio trick for fake masonry */}
                            <div style={{ paddingBottom: `${(img.height / img.width) * 100}%` }} />

                            <Image
                                src={img.src}
                                alt={img.alt}
                                fill
                                className="object-cover transition-transform duration-700 group-hover:scale-105"
                                sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                            />

                            {/* Hover Overlay */}
                            <div className="absolute inset-0 bg-black/60 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex flex-col justify-end p-6">
                                <div className="translate-y-4 group-hover:translate-y-0 transition-transform duration-300">
                                    <div className="text-primary font-mono text-xs uppercase tracking-widest mb-2">{img.category}</div>
                                    <h3 className="text-xl font-display text-white">{img.alt}</h3>
                                </div>
                                <Maximize2 className="absolute top-6 right-6 text-white/50 group-hover:text-white transition-colors" />
                            </div>
                        </motion.div>
                    ))}
                </AnimatePresence>
            </div>

            {/* Lightbox Modal */}
            <AnimatePresence>
                {selectedImage && (
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        onClick={() => setSelectedImage(null)}
                        className="fixed inset-0 z-[200] bg-black/95 flex items-center justify-center p-4 md:p-12 cursor-zoom-out backdrop-blur-md"
                    >
                        <button
                            className="absolute top-8 right-8 text-white/50 hover:text-white transition-colors z-50"
                            onClick={() => setSelectedImage(null)}
                        >
                            <X size={32} />
                        </button>

                        <motion.div
                            initial={{ scale: 0.9, y: 20 }}
                            animate={{ scale: 1, y: 0 }}
                            exit={{ scale: 0.9, y: 20 }}
                            className="relative w-full h-full max-w-7xl max-h-screen"
                        >
                            <Image
                                src={selectedImage}
                                alt="Fullscreen view"
                                fill
                                className="object-contain"
                                quality={100}
                                priority
                            />
                        </motion.div>
                    </motion.div>
                )}
            </AnimatePresence>

        </div>
    );
}
