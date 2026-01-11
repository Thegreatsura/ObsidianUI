"use client";

import React, { useEffect, useRef } from "react";
import { cn } from "@/lib/utils";
import { useMotionValue, useSpring, motion } from "framer-motion";

export const PremiumWhiteHeroBackground = ({ className }: { className?: string }) => {
    const mouseX = useMotionValue(0);
    const mouseY = useMotionValue(0);
    const canvasRef = useRef<HTMLCanvasElement>(null);

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

    // Floating Particles Effect
    useEffect(() => {
        const canvas = canvasRef.current;
        if (!canvas) return;
        const ctx = canvas.getContext("2d");
        if (!ctx) return;

        let animationFrameId: number;
        let particles: Particle[] = [];
        const particleCount = 40; // Low count for "dust" feel

        class Particle {
            x: number;
            y: number;
            size: number;
            speedX: number;
            speedY: number;
            opacity: number;

            constructor() {
                this.x = Math.random() * canvas!.width;
                this.y = Math.random() * canvas!.height;
                this.size = Math.random() * 2 + 0.5; // Small dots
                this.speedX = (Math.random() - 0.5) * 0.2; // Very slow
                this.speedY = (Math.random() - 0.5) * 0.2;
                this.opacity = Math.random() * 0.3 + 0.1; // Low opacity
            }

            update() {
                this.x += this.speedX;
                this.y += this.speedY;

                if (this.x < 0) this.x = canvas!.width;
                if (this.x > canvas!.width) this.x = 0;
                if (this.y < 0) this.y = canvas!.height;
                if (this.y > canvas!.height) this.y = 0;
            }

            draw() {
                if (!ctx) return;
                ctx.fillStyle = `rgba(30, 30, 30, ${this.opacity})`; // Charcoal/Black
                ctx.beginPath();
                ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2);
                ctx.fill();
            }
        }

        const init = () => {
            canvas.width = window.innerWidth;
            canvas.height = window.innerHeight;
            particles = [];
            for (let i = 0; i < particleCount; i++) {
                particles.push(new Particle());
            }
        };

        const animate = () => {
            ctx.clearRect(0, 0, canvas.width, canvas.height);
            particles.forEach(p => {
                p.update();
                p.draw();
            });
            animationFrameId = requestAnimationFrame(animate);
        };

        init();
        animate();

        const handleResize = () => init();
        window.addEventListener("resize", handleResize);

        return () => {
            window.removeEventListener("resize", handleResize);
            cancelAnimationFrame(animationFrameId);
        };
    }, []);

    return (
        <div className={cn("absolute inset-0 overflow-hidden pointer-events-none select-none bg-[#fafafa]", className)}>
            {/* Premium White Gradient Background */}
            <div className="absolute inset-0 z-0">
                {/* Base Off-White */}
                <div className="absolute inset-0 bg-[#fafafa]" />
                
                {/* Center Light Bloom (Studio Style) */}
                <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(255,255,255,1)_0%,rgba(250,250,250,0)_60%)] opacity-80" />
                
                {/* Gentle Darkening Edges */}
                <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,transparent_40%,rgba(0,0,0,0.03)_100%)]" />
            </div>

            {/* RareUI Line Surface - Architectural Vertical Lines */}
            <div className="absolute inset-0 z-[1] opacity-[0.03] pointer-events-none"
                style={{
                    backgroundImage: "linear-gradient(90deg, #000 1px, transparent 1px)",
                    backgroundSize: "80px 100%"
                }}
            />

            {/* Floating Particles (Dust in Light) */}
            <canvas ref={canvasRef} className="absolute inset-0 z-[1] pointer-events-none opacity-60 blur-[0.5px]" />

            {/* Glow System - Soft Ambient Glow behind Headline */}
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[600px] bg-white rounded-full blur-[120px] opacity-60 z-[1]" />

            {/* Soft Cursor-Following Light (Lift) */}
            <motion.div
                className="absolute z-[2] w-[800px] h-[800px] rounded-full pointer-events-none mix-blend-overlay"
                style={{
                    background: "radial-gradient(circle, rgba(255, 255, 255, 1) 0%, rgba(255, 255, 255, 0) 60%)",
                    x: springX,
                    y: springY,
                    translateX: "-50%",
                    translateY: "-50%",
                }}
            />

            {/* Bottom Fade */}
            <div className="absolute bottom-0 left-0 right-0 h-32 bg-gradient-to-t from-[#f0f0f0] to-transparent z-[4] opacity-60" />
        </div>
    );
};
