"use client";

import Link from "next/link";
import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { Menu, X } from "lucide-react";
import { useEasterEgg } from "@/lib/EasterEggContext";

const navLinks = [
    { name: "Home", href: "/" },
    { name: "Our Story", href: "/about" },
    { name: "The Car", href: "/cars" },
    { name: "Team", href: "/team" },
    { name: "Highlights", href: "/gallery" },
    { name: "Blogs", href: "/blog" },
    { name: "Partners", href: "/partners" },
    { name: "Contact", href: "/contact" },
];

export default function Navbar() {
    const [isScrolled, setIsScrolled] = useState(false);
    const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
    const { handleLogoClick } = useEasterEgg();

    useEffect(() => {
        const handleScroll = () => {
            setIsScrolled(window.scrollY > 50);
        };
        window.addEventListener("scroll", handleScroll);
        return () => window.removeEventListener("scroll", handleScroll);
    }, []);

    return (
        <nav
            className={`fixed top-0 left-0 right-0 z-40 transition-all duration-300 ${isScrolled ? "bg-background/80 backdrop-blur-md py-4 shadow-sm" : "bg-transparent py-6"
                }`}
        >
            <div className="container mx-auto px-6 flex justify-between items-center">
                {/* Logo */}
                <Link href="/" className="transition-opacity hover:opacity-80" onClick={handleLogoClick}>
                    <img src="/images/logoW.png" alt="Team Fateh" className="h-10 w-auto" />
                </Link>

                {/* Desktop Menu */}
                <div className="hidden lg:flex gap-6 items-center">
                    {navLinks.map((link) => (
                        <Link
                            key={link.name}
                            href={link.href}
                            className="text-[10px] xl:text-xs font-mono tracking-widest hover:text-primary transition-colors uppercase text-foreground whitespace-nowrap"
                        >
                            {link.name}
                        </Link>
                    ))}
                    <div className="flex items-center gap-3 border-l border-foreground/10 pl-6 ml-2">
                        <Link
                            href="/join"
                            className="px-4 py-2 border border-foreground/20 hover:bg-foreground hover:text-background transition-all font-mono text-[10px] xl:text-xs uppercase tracking-widest text-foreground whitespace-nowrap"
                        >
                            Join
                        </Link>
                        <Link
                            href="/explore-sponsorship"
                            className="px-4 py-2 bg-primary text-black hover:bg-primary/80 transition-all font-mono text-[10px] xl:text-xs uppercase tracking-widest font-bold whitespace-nowrap"
                        >
                            Explore Partnership
                        </Link>
                    </div>
                </div>

                {/* Mobile Toggle */}
                <button
                    className="lg:hidden text-foreground"
                    onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
                >
                    {isMobileMenuOpen ? <X /> : <Menu />}
                </button>
            </div>

            {/* Mobile Menu */}
            {isMobileMenuOpen && (
                <motion.div
                    initial={{ opacity: 0, y: -20 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="absolute top-full left-0 w-full bg-background border-b border-foreground/10 flex flex-col items-center py-8 gap-6 lg:hidden shadow-lg"
                >
                    {navLinks.map((link) => (
                        <Link
                            key={link.name}
                            href={link.href}
                            className="text-lg font-mono tracking-widest hover:text-primary uppercase text-foreground"
                            onClick={() => setIsMobileMenuOpen(false)}
                        >
                            {link.name}
                        </Link>
                    ))}
                    <div className="flex flex-col gap-4 mt-6 w-full px-12">
                        <Link
                            href="/explore-sponsorship"
                            className="w-full text-center px-6 py-4 bg-primary text-black font-mono tracking-widest font-bold uppercase rounded-sm"
                            onClick={() => setIsMobileMenuOpen(false)}
                        >
                            Explore Partnership
                        </Link>
                        <Link
                            href="/join"
                            className="w-full text-center px-6 py-4 border border-foreground/20 text-foreground font-mono tracking-widest uppercase rounded-sm"
                            onClick={() => setIsMobileMenuOpen(false)}
                        >
                            Join Us
                        </Link>
                    </div>
                </motion.div>
            )}
        </nav>
    );
}
