"use client";
import React, { useState, useRef, useCallback } from "react";
import Link from "next/link";
import { motion } from "framer-motion";
import { Badge } from "@/components/ui/badge";
import { MaskedAvatars } from "@/components/ui/masked-avatars";
import GlassSearchBar from "@/components/mine/landing-page/glass-search-bar";
import { SpotlightNavbar } from "@/components/ui/spotlight-navbar";
import { GithubButton } from "@/components/github-button";

export const HeroSection = () => {
  const containerRef = useRef<HTMLDivElement>(null);
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  const lastUpdateRef = useRef<number>(0);

  // Throttled mouse move handler for better performance
  const handleMouseMove = useCallback((e: React.MouseEvent<HTMLDivElement>) => {
    const now = Date.now();
    if (now - lastUpdateRef.current < 32) return; // Throttle to ~30fps
    lastUpdateRef.current = now;

    if (!containerRef.current) return;
    const rect = containerRef.current.getBoundingClientRect();
    setMousePosition({
      x: e.clientX - rect.left,
      y: e.clientY - rect.top,
    });
  }, []);

  const navItems = [
    { label: "Home", href: "/" },
    { label: "Components", href: "/components" },
    { label: "Docs", href: "/docs/installation" },
    { label: "Templates", href: "/templates" },
  ];

  return (
    <div className="w-full flex justify-center items-center pt-4 pb-12 bg-[#f5f5f5] min-h-screen">
      <div
        ref={containerRef}
        onMouseMove={handleMouseMove}
        className="relative h-[calc(100vh-2rem)] min-h-[600px] max-h-[900px] w-[98%] max-w-[1600px] flex flex-col items-center justify-center overflow-hidden rounded-[40px] transition-all duration-500 bg-white shadow-[0_8px_30px_rgb(0,0,0,0.04)]"
        style={{
          background: `
            radial-gradient(600px circle at ${mousePosition.x}px ${mousePosition.y}px, rgba(0, 0, 0, 0.02), transparent 40%),
            linear-gradient(to bottom, #ffffff 0%, #f9fafb 50%, #f6f7f9 100%)
          `,
        }}
      >
        {/* Vertical Lines Pattern */}
        <div
          className="absolute inset-0 opacity-[0.015] pointer-events-none"
          style={{
            backgroundImage: "linear-gradient(90deg, rgba(0,0,0,0.05) 1px, transparent 1px)",
            backgroundSize: "80px 100%",
          }}
        />

        {/* Subtle Grain Texture */}
        <div
          className="absolute inset-0 opacity-[0.015] pointer-events-none mix-blend-overlay"
          style={{
            backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 200 200' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noiseFilter'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.65' numOctaves='3' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noiseFilter)'/%3E%3C/svg%3E")`,
          }}
        />

        {/* Navbar */}
        <div className="absolute top-0 left-0 right-0 z-50 pt-6 px-6 flex justify-center">
          <SpotlightNavbar
            items={navItems}
            defaultActiveIndex={0}
            logo={
              <a href="/" className="flex items-center">
                <img src="/logo/bg-less.png" alt="ObsidianUI" className="h-7 w-7 object-contain" />
              </a>
            }
          />
        </div>

        {/* GitHub Button - Top Right Inside Hero */}
        <div className="absolute top-6 right-6 z-50">
          <GithubButton />
        </div>

        {/* Hero Content */}
        <div className="w-full max-w-7xl z-10 flex flex-col md:flex-row items-center justify-center mb-12 px-4">
          {/* Left Column */}
          <div className="flex flex-col items-start justify-center w-full md:w-1/2 px-6 py-12 md:p-12 md:pt-0 z-10 text-pretty">
            <div className="mb-6">
              <Badge variant="secondary" className="bg-zinc-100 text-zinc-900 hover:bg-zinc-200 border-zinc-200 px-4 py-1.5 text-sm backdrop-blur-md shadow-sm">
                New Component every week
              </Badge>
            </div>

            <h1 className="text-5xl md:text-7xl lg:text-8xl font-bold tracking-tighter text-transparent bg-clip-text bg-gradient-to-b from-zinc-900 via-zinc-800 to-zinc-600 mb-6 leading-[1.1]">
              Design Less. <br /> Ship Better.
            </h1>

            <h3 className="text-lg md:text-xl font-light tracking-tight md:hidden text-zinc-600 mb-8 leading-relaxed">
              Spend less time designing and tweaking UI, and more time shipping reliable, visually refined interfaces.
            </h3>

            <div className="mb-8 flex flex-col items-start gap-3">
              <div className="flex items-center gap-3">
                <div className="flex items-center -space-x-2">
                  {[
                    { avatar: "https://api.dicebear.com/9.x/notionists/svg?seed=Sophia", name: "Sophia", delay: 0 },
                    { avatar: "https://api.dicebear.com/9.x/notionists/svg?seed=Liliana", name: "Liliana", delay: 0.15 },
                    { avatar: "https://api.dicebear.com/9.x/notionists/svg?seed=Brian", name: "Brian", delay: 0.3 },
                    { avatar: "https://api.dicebear.com/9.x/notionists/svg?seed=Robert", name: "Robert", delay: 0.45 },
                  ].map((user, index) => (
                    <motion.div
                      key={user.name}
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{
                        duration: 0.8,
                        delay: user.delay,
                        ease: [0.16, 1, 0.3, 1],
                      }}
                      className="relative group cursor-pointer"
                    >
                      <motion.img
                        src={user.avatar}
                        alt={user.name}
                        className="w-10 h-10 rounded-full border-2 border-white bg-white shadow-sm transition-all duration-300 group-hover:shadow-lg"
                        whileHover={{
                          y: -8,
                          scale: 1.1,
                          zIndex: 10,
                          transition: { duration: 0.3, ease: [0.23, 1, 0.32, 1] }
                        }}
                        animate={{
                          y: [0, -2, 0],
                        }}
                        transition={{
                          duration: 3,
                          delay: user.delay + 0.8,
                          repeat: Infinity,
                          repeatDelay: 0.5,
                          ease: [0.45, 0, 0.55, 1],
                        }}
                      />
                    </motion.div>
                  ))}
                </div>
                <motion.div
                  initial={{ opacity: 0, x: -10 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.6, delay: 0.5, ease: [0.23, 1, 0.32, 1] }}
                  className="flex flex-col"
                >
                  <div className="flex items-center gap-1">
                    <span className="text-sm font-semibold text-zinc-900">1000+</span>
                    <span className="text-sm text-zinc-600">developers</span>
                  </div>
                  <span className="text-xs text-zinc-500 font-medium">trust ObsidianUI</span>
                </motion.div>
              </div>

              <div className="flex items-center gap-3 text-xs text-zinc-500 font-medium border-t border-zinc-200 pt-3 mt-1">
                <span className="flex items-center gap-1.5">
                  <span className="w-1.5 h-1.5 rounded-full bg-zinc-400"></span>
                  React
                </span>
                <span className="flex items-center gap-1.5">
                  <span className="w-1.5 h-1.5 rounded-full bg-zinc-400"></span>
                  TypeScript
                </span>
                <span className="flex items-center gap-1.5">
                  <span className="w-1.5 h-1.5 rounded-full bg-zinc-400"></span>
                  Tailwind
                </span>
              </div>
            </div>

            <div className="flex flex-col sm:flex-row items-start sm:items-center md:hidden mt-6 gap-6 w-full">
              <Link href="/components">
                <div className="group relative overflow-hidden rounded-xl bg-zinc-900 text-white px-8 py-3.5 transition-all duration-500 hover:scale-[1.02] active:scale-[0.98] cursor-pointer border-none whitespace-nowrap shadow-[0_10px_40px_-15px_rgba(0,0,0,0.5),0_0_0_1px_rgba(0,0,0,0.1)]">
                  <span className="relative z-10 font-bold text-sm tracking-wide">Browse Components</span>
                </div>
              </Link>
              <div className="w-full sm:w-auto max-w-[360px]">
                <GlassSearchBar />
              </div>
            </div>
          </div>

          {/* Right Column (Desktop) */}
          <div className="hidden md:flex flex-col items-start justify-center w-1/2 pl-0 p-12 z-10">
            <h3 className="text-xl font-light tracking-tight text-zinc-600 mb-10 leading-relaxed max-w-lg">
              Spend less time designing and tweaking UI, and more time shipping reliable, visually refined interfaces.
            </h3>
            <div className="flex flex-col gap-8 w-full">
              <div className="flex items-center gap-6">
                <Link href="/components">
                  <div className="group relative overflow-hidden rounded-xl bg-zinc-900 text-white px-8 py-3.5 transition-all duration-500 hover:scale-[1.02] active:scale-[0.98] cursor-pointer border-none whitespace-nowrap shadow-[0_10px_40px_-15px_rgba(0,0,0,0.5),0_0_0_1px_rgba(0,0,0,0.1)]">
                    <span className="relative z-10 font-bold text-sm tracking-wide">Browse Components</span>
                  </div>
                </Link>
                <GlassSearchBar />
              </div>
            </div>
          </div>
        </div>

        {/* Large Background Text */}
        <div className="w-full h-[3vh] absolute md:bottom-12 bottom-4 flex items-center justify-center pointer-events-none">
          <h1 className="text-[80px] sm:text-[120px] md:text-[230px] lg:text-[300px] z-5 tracking-tighter text-center text-transparent bg-clip-text bg-gradient-to-r from-zinc-200/40 via-zinc-300/30 to-transparent select-none">
            ObsidianUI
          </h1>
        </div>
      </div>
    </div>
  );
};
