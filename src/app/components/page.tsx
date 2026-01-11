"use client";

import React from "react";
import { SpotlightNavbar } from "@/components/ui/spotlight-navbar";
import { ComponentsGrid } from "@/components/components-grid";
import { CommandMenu } from "@/components/command-menu";
import { ModeToggle } from "@/components/mode-toggle";

const navItems = [
    { label: "Home", href: "/" },
    { label: "Components", href: "/components" },
    { label: "Docs", href: "/docs/installation" },
    { label: "Templates", href: "/templates" },
];

export default function ComponentsPage() {
    return (
        <div className="min-h-screen bg-white dark:bg-black">
            {/* Header */}
            <div className="sticky top-0 z-50">
                <div className="flex justify-center pt-4">
                    <SpotlightNavbar
                        items={navItems}
                        defaultActiveIndex={1}
                        className="!pt-0"
                        logo={
                            <a href="/" className="flex items-center">
                                <img src="/logo/bg-less.png" alt="ObsidianUI" className="h-7 w-7 object-contain" />
                            </a>
                        }
                    />
                </div>

                {/* Search & Theme Toggle - fixed top right */}
                <div className="fixed top-4 right-4 flex items-center gap-2 z-50">
                    <CommandMenu />
                    <ModeToggle />
                </div>
            </div>

            {/* Main Content */}
            <div className="max-w-7xl mx-auto px-4 py-12">
                {/* Hero Section */}
                <div className="text-center mb-12">
                    <h1 className="text-4xl md:text-5xl font-bold text-black dark:text-white mb-4">
                        Components
                    </h1>
                    <p className="text-lg text-neutral-600 dark:text-neutral-400 max-w-2xl mx-auto">
                        Explore our collection of reusable components.
                    </p>
                </div>

                {/* Components Grid - Same as docs/components-overview */}
                <ComponentsGrid />
            </div>
        </div>
    );
}
