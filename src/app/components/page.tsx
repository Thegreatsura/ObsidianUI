"use client";

import React from "react";
import { NavbarContent } from "@/components/navbar-content";
import { ComponentsGrid } from "@/components/components-grid";

export default function ComponentsPage() {
    return (
        <div className="min-h-screen bg-white dark:bg-black">
            <NavbarContent activeIndex={1} />

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
