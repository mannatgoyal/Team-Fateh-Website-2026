"use client";

import React, { createContext, useContext, useEffect, useState } from "react";

interface EasterEggContextType {
    isRedlineMode: boolean;
    toggleRedlineMode: () => void;
    logoClicks: number;
    handleLogoClick: () => void;
    isGameActive: boolean;
    closeGame: () => void;
}

const EasterEggContext = createContext<EasterEggContextType | undefined>(undefined);

export function EasterEggProvider({ children }: { children: React.ReactNode }) {
    const [isRedlineMode, setIsRedlineMode] = useState(false);
    const [logoClicks, setLogoClicks] = useState(0);
    const [keySequence, setKeySequence] = useState<string[]>([]);
    const [isGameActive, setIsGameActive] = useState(false);

    // Secret Code: FATEH
    const SECRET_CODE = ["f", "a", "t", "e", "h"];

    useEffect(() => {
        const handleKeyDown = (e: KeyboardEvent) => {
            const key = e.key.toLowerCase();

            setKeySequence((prev) => {
                const updated = [...prev, key];
                if (updated.length > SECRET_CODE.length) {
                    return updated.slice(updated.length - SECRET_CODE.length);
                }
                return updated;
            });
        };

        window.addEventListener("keydown", handleKeyDown);
        return () => window.removeEventListener("keydown", handleKeyDown);
    }, []);

    const toggleRedlineMode = () => {
        setIsRedlineMode((prev) => !prev);
        // Apply data attribute to body/html for CSS targeting
        if (!isRedlineMode) {
            document.documentElement.setAttribute("data-mode", "redline");
            playSound("/sounds/redline_engage.mp3"); // Placeholder for now
        } else {
            document.documentElement.removeAttribute("data-mode");
        }
    };

    useEffect(() => {
        if (keySequence.join("") === SECRET_CODE.join("")) {
            toggleRedlineMode();
            setKeySequence([]); // Reset
        }
    }, [keySequence, isRedlineMode]);

    const handleLogoClick = () => {
        setLogoClicks((prev) => {
            const newCount = prev + 1;
            if (newCount === 3) {
                setIsGameActive(true);
                return 0;
            }
            return newCount;
        });
    };

    const closeGame = () => {
        setIsGameActive(false);
    };

    // Helper for sound (safely)
    const playSound = (path: string) => {
        try {
            const audio = new Audio(path);
            audio.volume = 0.5;
            // audio.play().catch(e => console.log("Audio play failed interaction", e)); 
            // Commented out to avoid errors if file missing
        } catch (e) {
            // ignore
        }
    }

    return (
        <EasterEggContext.Provider value={{ isRedlineMode, toggleRedlineMode, logoClicks, handleLogoClick, isGameActive, closeGame }}>
            {children}

            {/* Visual Overlay for Redline Mode */}
            {isRedlineMode && (
                <div className="fixed inset-0 pointer-events-none z-50 mix-blend-overlay opacity-20 bg-red-900 animate-pulse"></div>
            )}

        </EasterEggContext.Provider>
    );
}

export function useEasterEgg() {
    const context = useContext(EasterEggContext);
    if (context === undefined) {
        throw new Error("useEasterEgg must be used within an EasterEggProvider");
    }
    return context;
}
