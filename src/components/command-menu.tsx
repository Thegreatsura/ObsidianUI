"use client"

import * as React from "react"
import { useRouter } from "next/navigation"
import { Command as CommandPrimitive } from "cmdk"
import { Search, Moon, Sun, Laptop, FileText, Home, ArrowRight, Sparkles } from "lucide-react"
import { useTheme } from "next-themes"
import { cn } from "@/lib/utils"

// All components list
const components = [
    { name: "Animated Hero", href: "/docs/animated-hero" },
    { name: "Apple Spotlight", href: "/docs/apple-spotlight" },
    { name: "Circle Menu", href: "/docs/circle-menu" },
    { name: "Creepy Button", href: "/docs/creepy-button" },
    { name: "Eagle Vision", href: "/docs/eagle-vision" },
    { name: "Expandable Bento Grid", href: "/docs/expandable-bento-grid" },
    { name: "Flip Fade Text", href: "/docs/flip-fade-text" },
    { name: "Flip Scroll", href: "/docs/flip-scroll" },
    { name: "Flip Text", href: "/docs/flip-text" },
    { name: "Flow Scroll", href: "/docs/flow-scroll" },
    { name: "Folder Preview", href: "/docs/folder-preview" },
    { name: "Glass Button", href: "/docs/glass-button" },
    { name: "Glass Dock", href: "/docs/glass-dock" },
    { name: "Glitch Text", href: "/docs/glitch-text" },
    { name: "Glow Border Card", href: "/docs/glow-border-card" },
    { name: "Glowing Scroll Indicator", href: "/docs/glowing-scroll-indicator" },
    { name: "Horizontal Scroll", href: "/docs/horizontal-scroll" },
    { name: "Icon Wheel", href: "/docs/icon-wheel" },
    { name: "Image Pile", href: "/docs/image-pile" },
    { name: "Infinite Moving Cards", href: "/docs/infinite-moving-cards" },
    { name: "Interactive Book", href: "/docs/interactive-book" },
    { name: "Jelly Loader", href: "/docs/jelly-loader" },
    { name: "Leave Rating", href: "/docs/leave-rating" },
    { name: "Light Lines", href: "/docs/light-lines" },
    { name: "Line Hover Link", href: "/docs/line-hover-link" },
    { name: "Liquid Ocean", href: "/docs/liquid-ocean" },
    { name: "Liquid Text", href: "/docs/liquid-text" },
    { name: "Logo Slider", href: "/docs/logo-slider" },
    { name: "Magnet Tabs", href: "/docs/magnet-tabs" },
    { name: "Mask Cursor Effect", href: "/docs/mask-cursor-effect" },
    { name: "Masked Avatars", href: "/docs/masked-avatars" },
    { name: "Masonry Grid", href: "/docs/masonry-grid" },
    { name: "OTP Input", href: "/docs/otp-input" },
    { name: "Perspective Grid", href: "/docs/perspective-grid" },
    { name: "Pixelated Carousel", href: "/docs/pixelated-carousel" },
    { name: "Pixelated Image Trail", href: "/docs/pixelated-image-trail" },
    { name: "Rainbow Button", href: "/docs/rainbow-button" },
    { name: "Rolling Ball Scroll Indicator", href: "/docs/rolling-ball-scroll-indicator" },
    { name: "Rubik Cube", href: "/docs/rubik-cube" },
    { name: "Scroll Effect", href: "/docs/scroll-effect" },
    { name: "Shine Button", href: "/docs/shine-button" },
    { name: "Social Flip Button", href: "/docs/social-flip-button" },
    { name: "Social Media Card", href: "/docs/social-media-card" },
    { name: "Spotlight Navbar", href: "/docs/spotlight-navbar" },
    { name: "Stacked Logos", href: "/docs/stacked-logos" },
    { name: "Staggered Grid", href: "/docs/staggered-grid" },
    { name: "Testimonials Card", href: "/docs/testimonials-card" },
];

export function CommandMenu() {
    const router = useRouter()
    const [open, setOpen] = React.useState(false)
    const { setTheme } = useTheme()

    React.useEffect(() => {
        const down = (e: KeyboardEvent) => {
            if (e.key === "k" && (e.metaKey || e.ctrlKey)) {
                e.preventDefault()
                setOpen((open) => !open)
            }

            if (e.key === "Escape") {
                setOpen(false)
            }
        }

        document.addEventListener("keydown", down)
        return () => document.removeEventListener("keydown", down)
    }, [])

    const runCommand = React.useCallback((command: () => unknown) => {
        setOpen(false)
        command()
    }, [])

    const itemClass = "relative flex cursor-default select-none items-center rounded-md px-2 py-2 text-sm outline-none aria-selected:bg-neutral-100 aria-selected:text-neutral-900 dark:aria-selected:bg-neutral-800 dark:aria-selected:text-neutral-50"

    return (
        <>
            <button
                onClick={() => setOpen(true)}
                className="flex items-center gap-2 px-3 py-2 text-sm font-medium text-foreground/70 hover:text-foreground transition-colors rounded-md hover:bg-foreground/5"
                aria-label="Open command menu"
            >
                <Search className="w-4 h-4" />
                <span className="hidden sm:inline">Search...</span>
                <kbd className="hidden sm:inline-flex items-center gap-1 px-1.5 py-0.5 text-xs font-mono bg-foreground/10 rounded">
                    <span>⌘</span>
                    <span>K</span>
                </kbd>
            </button>
            <CommandPrimitive.Dialog
                open={open}
                modal={false}
                onOpenChange={setOpen}
                label="Global Command Menu"
                className="fixed inset-0 z-[100] flex items-center justify-center"
            >
                {/* Backdrop - click to close */}
                <div
                    className="fixed inset-0 bg-black/50 backdrop-blur-sm"
                    onClick={() => setOpen(false)}
                />
                {/* Content - prevent click from closing */}
                <div
                    className="relative z-10 w-full max-w-[640px] mx-4 rounded-xl border border-neutral-200 bg-white p-2 shadow-2xl dark:border-neutral-800 dark:bg-neutral-900"
                    onClick={(e) => e.stopPropagation()}
                >
                    <div className="flex items-center border-b border-neutral-100 px-3 pb-2 dark:border-neutral-800">
                        <Search className="mr-2 h-5 w-5 shrink-0 opacity-50" />
                        <CommandPrimitive.Input
                            autoFocus
                            placeholder="Type a command or search..."
                            className="flex h-11 w-full rounded-md bg-transparent py-3 text-base outline-none placeholder:text-neutral-500 disabled:cursor-not-allowed disabled:opacity-50 dark:text-neutral-50"
                        />
                    </div>

                    <CommandPrimitive.List className="max-h-[400px] overflow-y-auto overflow-x-hidden p-2">
                        <CommandPrimitive.Empty className="py-6 text-center text-sm text-neutral-500">
                            No results found.
                        </CommandPrimitive.Empty>

                        <CommandPrimitive.Group heading="General" className="overflow-hidden px-2 py-1.5 text-xs font-medium text-neutral-500 dark:text-neutral-400">
                            <CommandPrimitive.Item
                                onSelect={() => runCommand(() => router.push("/"))}
                                className={itemClass}
                            >
                                <Home className="mr-2 h-4 w-4" />
                                <span>Home</span>
                            </CommandPrimitive.Item>
                            <CommandPrimitive.Item
                                onSelect={() => runCommand(() => router.push("/docs/components-overview"))}
                                className={itemClass}
                            >
                                <FileText className="mr-2 h-4 w-4" />
                                <span>Components Overview</span>
                            </CommandPrimitive.Item>
                            <CommandPrimitive.Item
                                onSelect={() => runCommand(() => router.push("/docs"))}
                                className={itemClass}
                            >
                                <FileText className="mr-2 h-4 w-4" />
                                <span>Documentation</span>
                            </CommandPrimitive.Item>
                            <CommandPrimitive.Item
                                onSelect={() => runCommand(() => router.push("/templates"))}
                                className={itemClass}
                            >
                                <Sparkles className="mr-2 h-4 w-4" />
                                <span>Templates</span>
                            </CommandPrimitive.Item>
                        </CommandPrimitive.Group>

                        <CommandPrimitive.Group heading="Components" className="overflow-hidden px-2 py-1.5 text-xs font-medium text-neutral-500 dark:text-neutral-400">
                            {components.map((component) => (
                                <CommandPrimitive.Item
                                    key={component.href}
                                    onSelect={() => runCommand(() => router.push(component.href))}
                                    className={itemClass}
                                >
                                    <ArrowRight className="mr-2 h-4 w-4" />
                                    <span>{component.name}</span>
                                </CommandPrimitive.Item>
                            ))}
                        </CommandPrimitive.Group>

                        <CommandPrimitive.Group heading="Theme" className="overflow-hidden px-2 py-1.5 text-xs font-medium text-neutral-500 dark:text-neutral-400">
                            <CommandPrimitive.Item
                                onSelect={() => runCommand(() => setTheme("light"))}
                                className={itemClass}
                            >
                                <Sun className="mr-2 h-4 w-4" />
                                <span>Light</span>
                            </CommandPrimitive.Item>
                            <CommandPrimitive.Item
                                onSelect={() => runCommand(() => setTheme("dark"))}
                                className={itemClass}
                            >
                                <Moon className="mr-2 h-4 w-4" />
                                <span>Dark</span>
                            </CommandPrimitive.Item>
                            <CommandPrimitive.Item
                                onSelect={() => runCommand(() => setTheme("system"))}
                                className={itemClass}
                            >
                                <Laptop className="mr-2 h-4 w-4" />
                                <span>System</span>
                            </CommandPrimitive.Item>
                        </CommandPrimitive.Group>
                    </CommandPrimitive.List>
                </div>
            </CommandPrimitive.Dialog>
        </>
    )
}
