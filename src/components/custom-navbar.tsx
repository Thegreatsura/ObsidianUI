"use client";

import React, { useMemo } from "react";
import { useRouter } from "next/router";
import { NavbarContent } from "@/components/navbar-content";

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

    return <NavbarContent activeIndex={activeIndex} />;
}

export default CustomNavbar;

