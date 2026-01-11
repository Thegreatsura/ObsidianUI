"use client";

import React, { useEffect, useRef } from "react";
import { cn } from "@/lib/utils";
import { useMotionValue, useSpring, motion } from "framer-motion";

export const RareHeroBackground = ({ className }: { className?: string }) => {
    const mouseX = useMotionValue(0);
    const mouseY = useMotionValue(0);

    const springConfig = { damping: 30, stiffness: 200 };
    const springX = useSpring(mouseX, springConfig);
    const springY = useSpring(mouseY, springConfig);

    useEffect(() => {
        const handleMouseMove = (e: MouseEvent) => {
            mouseX.set(e.clientX);
            mouseY.set(e.clientY);
        };

        window.addEventListener("mousemove", handleMouseMove);
        return () => window.removeEventListener("mousemove", handleMouseMove);
    }, [mouseX, mouseY]);

    return (
        <div className={cn("absolute inset-0 overflow-hidden pointer-events-none select-none bg-[#020408]", className)}>
            {/* Deep Layered Blue Gradient Background */}
            <div className="absolute inset-0 z-0">
                {/* Base Deep Blue/Black */}
                <div className="absolute inset-0 bg-[#020408]" />
                
                {/* Top Muted Blue-Gray */}
                <div className="absolute top-0 left-0 right-0 h-[40vh] bg-gradient-to-b from-[#1a2333] to-transparent opacity-60" />
                
                {/* Middle Cool Slate Blue */}
                <div className="absolute top-[20%] left-0 right-0 h-[60vh] bg-gradient-to-b from-transparent via-[#0f1729] to-transparent opacity-80" />
                
                {/* Bottom Deep Blue */}
                <div className="absolute bottom-0 left-0 right-0 h-[40vh] bg-gradient-to-t from-[#020408] via-[#050a14] to-transparent" />
                
                {/* Subtle Radial Glow for Depth */}
                <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,_var(--tw-gradient-stops))] from-[#1e293b]/20 via-transparent to-transparent" />
            </div>

            {/* Material Texture - Fine Grain */}
            <div className="absolute inset-0 z-[1] opacity-[0.03] mix-blend-overlay pointer-events-none"
                style={{
                    backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 200 200' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noiseFilter'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.65' numOctaves='3' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noiseFilter)'/%3E%3C/svg%3E")`,
                }}
            />

            {/* Vertical Micro-lines Texture */}
            <div className="absolute inset-0 z-[1] opacity-[0.05] pointer-events-none"
                style={{
                    backgroundImage: "linear-gradient(90deg, transparent 0%, transparent 49%, rgba(255,255,255,0.05) 50%, transparent 51%, transparent 100%)",
                    backgroundSize: "60px 100%"
                }}
            />

            {/* Soft Cursor-Following Light */}
            <motion.div
                className="absolute z-[2] w-[600px] h-[600px] rounded-full pointer-events-none"
                style={{
                    background: "radial-gradient(circle, rgba(56, 189, 248, 0.08) 0%, rgba(56, 189, 248, 0) 70%)",
                    x: springX,
                    y: springY,
                    translateX: "-50%",
                    translateY: "-50%",
                }}
            />

            {/* Vignette */}
            <div className="absolute inset-0 z-[3] bg-[radial-gradient(circle_at_center,transparent_0%,rgba(2,4,8,0.4)_100%)] pointer-events-none" />
            
            {/* Bottom Fade to integrate with content below if needed */}
            <div className="absolute bottom-0 left-0 right-0 h-32 bg-gradient-to-t from-[#020408] to-transparent z-[4]" />
        </div>
    );
};
