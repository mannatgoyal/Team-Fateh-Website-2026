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
    { name: "Archive", href: "/gallery" },
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
                <div className="hidden md:flex gap-8 items-center">
                    {navLinks.map((link) => (
                        <Link
                            key={link.name}
                            href={link.href}
                            className="text-sm font-mono tracking-widest hover:text-primary transition-colors uppercase text-foreground"
                        >
                            {link.name}
                        </Link>
                    ))}
                    <Link
                        href="/join"
                        className="px-6 py-2 border border-foreground/20 hover:bg-foreground hover:text-background transition-all font-mono text-xs uppercase tracking-widest text-foreground"
                    >
                        Join Us
                    </Link>
                </div>

                {/* Mobile Toggle */}
                <button
                    className="md:hidden text-foreground"
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
                    className="absolute top-full left-0 w-full bg-background border-b border-foreground/10 flex flex-col items-center py-8 gap-6 md:hidden shadow-lg"
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
                </motion.div>
            )}
        </nav>
    );
}
