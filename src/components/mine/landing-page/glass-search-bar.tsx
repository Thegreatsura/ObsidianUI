"use client";

import React, { useState, useEffect, useRef } from "react";
import { Search, Command, CornerUpRight } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { useRouter } from "next/navigation";

const COMPONENTS = [
  { name: "AI Input", href: "/docs/ai-input" },
  { name: "Animated Tab Bar", href: "/docs/animated-tab-bar" },
  { name: "Apple Spotlight", href: "/docs/apple-spotlight" },
  { name: "Circle Menu", href: "/docs/circle-menu" },
  { name: "Creepy Button", href: "/docs/creepy-button" },
  { name: "Dialog Form", href: "/docs/dialog-form" },
  { name: "Eagle Vision", href: "/docs/eagle-vision" },
  { name: "Expandable Bento Grid", href: "/docs/expandable-bento-grid" },
  { name: "Flip Fade Text", href: "/docs/flip-fade-text" },
  { name: "Flip Scroll", href: "/docs/flip-scroll" },
  { name: "Flip Text", href: "/docs/flip-text" },
  { name: "Floating Navigation", href: "/docs/floating-navigation" },
  { name: "Flow Scroll", href: "/docs/flow-scroll" },
  { name: "Folder Preview", href: "/docs/folder-preview" },
  { name: "Glass Dock", href: "/docs/glass-dock" },
  { name: "Glitch Text", href: "/docs/glitch-text" },
  { name: "Glow Border Card", href: "/docs/glow-border-card" },
  { name: "Glowing Effect", href: "/docs/glowing-effect" },
  { name: "Glowing Scroll Indicator", href: "/docs/glowing-scroll-indicator" },
  { name: "Horizontal Scroll", href: "/docs/horizontal-scroll" },
  { name: "Icon Wheel", href: "/docs/icon-wheel" },
  { name: "Image Pile", href: "/docs/image-pile" },
  { name: "Infinite Moving Cards", href: "/docs/infinite-moving-cards" },
  { name: "Interactive Book", href: "/docs/interactive-book" },
  { name: "Interest Picker", href: "/docs/interest-picker" },
  { name: "Jelly Loader", href: "/docs/jelly-loader" },
  { name: "Leave Rating", href: "/docs/leave-rating" },
  { name: "Light Lines", href: "/docs/light-lines" },
  { name: "Liquid Ocean", href: "/docs/liquid-ocean" },
  { name: "3D Displacement Text", href: "/docs/liquid-text" },
  { name: "Magnet Tabs", href: "/docs/magnet-tabs" },
  { name: "Mask Cursor Effect", href: "/docs/mask-cursor-effect" },
  { name: "Masked Avatars", href: "/docs/masked-avatars" },
  { name: "Masonry Grid", href: "/docs/masonry-grid" },
  { name: "Neumorphism 3D Button", href: "/docs/neumorphism-3d-button" },
  { name: "OTP Input", href: "/docs/otp-input" },
  { name: "Perspective Grid", href: "/docs/perspective-grid" },
  { name: "Photo Gallery", href: "/docs/photo-gallery" },
  { name: "Pixelated Carousel", href: "/docs/pixelated-carousel" },
  { name: "Pixelated Image Trail", href: "/docs/pixelated-image-trail" },
  { name: "Retro Pixel Button", href: "/docs/retro-pixel-button" },
  { name: "Rolling Ball Scroll Indicator", href: "/docs/rolling-ball-scroll-indicator" },
  { name: "Rubik Cube", href: "/docs/rubik-cube" },
  { name: "Scroll Effect", href: "/docs/scroll-effect" },
  { name: "Sine Wave", href: "/docs/sine-wave" },
  { name: "Social Flip Button", href: "/docs/social-flip-button" },
  { name: "Spotlight Navbar", href: "/docs/spotlight-navbar" },
  { name: "Stacked Logos", href: "/docs/stacked-logos" },
  { name: "Staggered Grid", href: "/docs/staggered-grid" },
  { name: "Testimonials Card", href: "/docs/testimonials-card" },
  { name: "Trading Card", href: "/docs/trading-card" },
];

export default function GlassSearchBar() {
  const [isFocused, setIsFocused] = useState(false);
  const [query, setQuery] = useState("");
  const [selectedIndex, setSelectedIndex] = useState(0);
  const router = useRouter();
  const inputRef = useRef<HTMLInputElement>(null);

  const filteredComponents = query
    ? COMPONENTS.filter((c) =>
        c.name.toLowerCase().includes(query.toLowerCase())
      ).slice(0, 5)
    : [
        COMPONENTS.find(c => c.name === "Floating Navigation")!,
        COMPONENTS.find(c => c.name === "AI Input")!,
        COMPONENTS.find(c => c.name === "Apple Spotlight")!,
        COMPONENTS.find(c => c.name === "Circle Menu")!,
      ];

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if ((e.metaKey || e.ctrlKey) && e.key === "/") {
        e.preventDefault();
        inputRef.current?.focus();
      }

      if (isFocused) {
        if (e.key === "ArrowDown") {
          e.preventDefault();
          setSelectedIndex((prev) => (prev + 1) % filteredComponents.length);
        } else if (e.key === "ArrowUp") {
          e.preventDefault();
          setSelectedIndex(
            (prev) =>
              (prev - 1 + filteredComponents.length) % filteredComponents.length
          );
        } else if (e.key === "Enter") {
          e.preventDefault();
          if (filteredComponents[selectedIndex]) {
            router.push(filteredComponents[selectedIndex].href);
            setIsFocused(false);
          }
        } else if (e.key === "Escape") {
          setIsFocused(false);
          inputRef.current?.blur();
        }
      }
    };

    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [isFocused, filteredComponents, selectedIndex, router]);

  const handleItemClick = (href: string) => {
    router.push(href);
    setIsFocused(false);
  };

  return (
    <div className="relative z-50 flex flex-col items-center md:items-start w-[90%] md:w-[360px]">
      {/* Search Input - Glass Wrapper */}
      <div
        className={`relative w-full p-2 bg-black/5 backdrop-blur-3xl border border-black/10 rounded-lg shadow-sm overflow-hidden transition-all duration-300 ${isFocused ? "ring-2 ring-black/10 shadow-md" : ""}`}
      >
        {/* Inner Solid Core */}
        <div className="relative flex items-center justify-between gap-3 px-4 py-3 rounded-lg transition-all w-full bg-white shadow-sm">
          <div className="flex items-center gap-3 w-full">
            <Search className="w-5 h-5 text-neutral-500" />
            <input
              ref={inputRef}
              type="text"
              value={query}
              onChange={(e) => {
                setQuery(e.target.value);
                setSelectedIndex(0);
              }}
              placeholder="Search components..."
              className="bg-transparent border-none outline-none text-sm w-full transition-colors text-neutral-800 placeholder:text-neutral-500 font-medium"
              onFocus={() => setIsFocused(true)}
              onBlur={() => {
                // Delay blur to allow clicks on items
                setTimeout(() => setIsFocused(false), 200);
              }}
            />
          </div>

          {/* Keyboard Shortcut Hint */}
          <div className="flex items-center gap-1.5 text-neutral-400">
            <Command className="w-4 h-4" />
            <span className="text-xs font-medium">+</span>
            <span className="text-xs font-medium">/</span>
          </div>
        </div>
      </div>

      {/* Dropdown Suggestions - Separate Island */}
      <AnimatePresence>
        {isFocused && (filteredComponents.length > 0 || query) && (
          <motion.div
            initial={{ opacity: 0, y: 10, scale: 0.98 }}
            animate={{ opacity: 1, y: 16, scale: 1 }}
            exit={{ opacity: 0, y: 10, scale: 0.98 }}
            transition={{ duration: 0.2, ease: "easeOut" }}
            className="absolute top-full left-0 w-full p-2 bg-black/5 backdrop-blur-3xl border border-black/10 rounded-[28px] shadow-2xl mt-1.5"
          >
            {/* Inner List Core with Max Height */}
            <div className="rounded-[20px] overflow-hidden bg-white shadow-sm">
              <div
                className="max-h-[280px] overflow-y-auto p-2 flex flex-col gap-1 custom-scrollbar"
                style={{
                  scrollbarWidth: "none",
                  msOverflowStyle: "none",
                }}
              >
                {filteredComponents.length > 0 ? (
                  filteredComponents.map((item, i) => (
                    <div
                      key={item.href}
                      onClick={() => handleItemClick(item.href)}
                      onMouseEnter={() => setSelectedIndex(i)}
                      className={`group flex items-center justify-between px-4 py-3 rounded-xl cursor-pointer transition-colors ${
                        selectedIndex === i
                          ? "bg-zinc-100 shadow-sm"
                          : "hover:bg-zinc-50"
                      }`}
                    >
                      <span
                        className={`text-sm font-medium transition-colors ${
                          selectedIndex === i
                            ? "text-black"
                            : "text-neutral-700"
                        }`}
                      >
                        {item.name}
                      </span>

                      {/* Actions */}
                      <div className="flex items-center gap-2">
                        <div
                          className={`h-7 w-7 flex items-center justify-center rounded-lg transition-all ${
                            selectedIndex === i
                              ? "bg-white shadow-sm text-black"
                              : "bg-black/5 text-neutral-400"
                          }`}
                        >
                          <CornerUpRight className="w-3.5 h-3.5" />
                        </div>
                      </div>
                    </div>
                  ))
                ) : (
                  <div className="px-4 py-3 text-sm text-neutral-500 text-center font-medium">
                    No components found for "{query}"
                  </div>
                )}
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
