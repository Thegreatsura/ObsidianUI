import type { Metadata } from "next";
import { NavbarContent } from "@/components/navbar-content";
import { ComponentsGrid } from "@/components/components-grid";

export const metadata: Metadata = {
    title: "React UI Components | ObsidianUI",
    description: "Browse 50+ premium React components with Tailwind CSS and Framer Motion. Copy-paste ready, fully customizable UI components for your next project.",
    openGraph: {
        title: "React UI Components | ObsidianUI",
        description: "Browse 50+ premium React components with Tailwind CSS and Framer Motion.",
        url: "https://www.obsidianui.dev/components",
        type: "website",
    },
    alternates: {
        canonical: "https://www.obsidianui.dev/components",
    },
};

export default function ComponentsPage() {
    return (
        <div className="min-h-screen bg-white dark:bg-black">
            <NavbarContent activeIndex={1} />

            {/* Main Content */}
            <main className="max-w-7xl mx-auto px-4 py-12">
                {/* Hero Section */}
                <header className="text-center mb-12">
                    <h1 className="text-4xl md:text-5xl font-bold text-black dark:text-white mb-4">
                        Components
                    </h1>
                    <p className="text-lg text-neutral-600 dark:text-neutral-400 max-w-2xl mx-auto">
                        Explore our collection of reusable components.
                    </p>
                </header>

                {/* Components Grid - Same as docs/components-overview */}
                <section aria-label="Components gallery">
                    <ComponentsGrid />
                </section>
            </main>
        </div>
    );
}
