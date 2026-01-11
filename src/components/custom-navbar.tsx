"use client";

import React, { useMemo } from "react";
import { useRouter } from "next/router";
import { SpotlightNavbar } from "@/components/ui/spotlight-navbar";
import { CommandMenu } from "@/components/command-menu";
import { ModeToggle } from "@/components/mode-toggle";
import { GitHubStarCounter } from "@/components/github-star-counter";

const navItems = [
    { label: "Home", href: "/" },
    { label: "Components", href: "/components" },
    { label: "Docs", href: "/docs/installation" },
    { label: "Templates", href: "/templates" },
];

export function CustomNavbar() {
    const router = useRouter();
    const currentPath = router.asPath;

    // Determine active index based on current path
    const activeIndex = useMemo(() => {
        if (currentPath === "/") return 0;
        if (currentPath === "/components" || currentPath.startsWith("/components")) return 1;
        if (currentPath.startsWith("/docs")) return 2;
        if (currentPath.startsWith("/templates")) return 3;
        return 0;
    }, [currentPath]);

    return (
        <div className="w-full sticky top-0 z-50">
            {/* Centered SpotlightNavbar - matching landing page style */}
            <div className="flex justify-center pt-4">
                <SpotlightNavbar
                    items={navItems}
                    defaultActiveIndex={activeIndex}
                    className="!pt-0"
                    logo={
                        <a href="/" className="flex items-center">
                            <img src="/logo/bg-less.png" alt="ObsidianUI" className="h-7 w-7 object-contain" />
                        </a>
                    }
                />
            </div>

            {/* Search, GitHub Stars & Theme Toggle - fixed top right */}
            <div className="fixed top-4 right-4 flex items-center gap-2 z-50">
                <GitHubStarCounter />
                <CommandMenu />
                <ModeToggle />
            </div>
        </div>
    );
}

export default CustomNavbar;

