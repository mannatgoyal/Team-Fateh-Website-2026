"use client";

import { useState, useEffect } from "react";
import ReactionTimeGame from "@/components/visuals/ReactionTimeGame";
import EnduranceSimulator from "@/components/visuals/EnduranceSimulator";

export default function GameStateManager() {
    const [isEnduranceSimOpen, setIsEnduranceSimOpen] = useState(false);

    useEffect(() => {
        const handleOpenSim = () => setIsEnduranceSimOpen(true);
        window.addEventListener('open-endurance-sim', handleOpenSim);
        return () => window.removeEventListener('open-endurance-sim', handleOpenSim);
    }, []);

    return (
        <>
            <EnduranceSimulator isOpen={isEnduranceSimOpen} onClose={() => setIsEnduranceSimOpen(false)} />
            <ReactionTimeGame />
        </>
    );
}
