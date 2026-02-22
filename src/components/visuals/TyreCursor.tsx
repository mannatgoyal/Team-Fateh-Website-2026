"use client";

import { useEffect, useState } from "react";
import { motion, useSpring, useMotionValue, useVelocity, useTransform } from "framer-motion";

export default function TyreCursor() {
    const [isHovering, setIsHovering] = useState(false);
    const mouseX = useMotionValue(0);
    const mouseY = useMotionValue(0);

    const smoothX = useSpring(mouseX, { stiffness: 500, damping: 28 });
    const smoothY = useSpring(mouseY, { stiffness: 500, damping: 28 });

    const velocityX = useVelocity(smoothX);
    const velocityY = useVelocity(smoothY);

    // Calculate rotation based on velocity magnitude
    const [rotation, setRotation] = useState(0);

    useEffect(() => {
        const handleMouseMove = (e: MouseEvent) => {
            mouseX.set(e.clientX);
            mouseY.set(e.clientY);

            // Check if hovering interactive elements
            const target = e.target as HTMLElement;
            setIsHovering(
                target.tagName === "BUTTON" ||
                target.tagName === "A" ||
                target.closest("button") !== null ||
                target.closest("a") !== null ||
                target.getAttribute("data-cursor") === "hover"
            );
        };

        window.addEventListener("mousemove", handleMouseMove);
        return () => window.removeEventListener("mousemove", handleMouseMove);
    }, [mouseX, mouseY]);

    // Constant rotation loop that speeds up with movement
    useEffect(() => {
        let frameId: number;
        const updateRotation = () => {
            const vx = velocityX.get();
            const vy = velocityY.get();
            const speed = Math.sqrt(vx * vx + vy * vy);

            // Base rotation + speed bonus
            setRotation(prev => (prev + 2 + speed * 0.05) % 360);
            frameId = requestAnimationFrame(updateRotation);
        };
        frameId = requestAnimationFrame(updateRotation);
        return () => cancelAnimationFrame(frameId);
    }, [velocityX, velocityY]);

    return (
        <motion.div
            className="fixed top-0 left-0 z-[9999] pointer-events-none mix-blend-difference"
            style={{
                x: smoothX,
                y: smoothY,
                translateX: "-50%",
                translateY: "-50%",
            }}
        >
            <motion.div
                animate={{
                    scale: isHovering ? 1.5 : 1,
                }}
                style={{ rotate: rotation }}
                className="relative w-8 h-8 md:w-10 md:h-10"
            >
                {/* Tyre Graphic (CSS/SVG) */}
                <svg viewBox="0 0 100 100" className="w-full h-full fill-current text-primary">
                    {/* Tyre Sidewall */}
                    <circle cx="50" cy="50" r="45" stroke="currentColor" strokeWidth="2" fill="none" />
                    {/* Tread Pattern (Simple dashed ring) */}
                    <circle cx="50" cy="50" r="38" stroke="currentColor" strokeWidth="8" strokeDasharray="10 5" fill="none" opacity="0.8" />
                    {/* Rim */}
                    <circle cx="50" cy="50" r="15" fill="currentColor" />
                    {/* Spokes */}
                    <line x1="50" y1="20" x2="50" y2="80" stroke="currentColor" strokeWidth="2" />
                    <line x1="20" y1="50" x2="80" y2="50" stroke="currentColor" strokeWidth="2" />
                </svg>
            </motion.div>
        </motion.div>
    );
}
