import type { Metadata } from "next";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { ArrowLeft } from "lucide-react";
import { NavbarContent } from "@/components/navbar-content";

export const metadata: Metadata = {
    title: "Templates | ObsidianUI",
    description: "Production-ready templates built with ObsidianUI components. Coming soon - beautiful, responsive templates for your next project.",
    openGraph: {
        title: "Templates | ObsidianUI",
        description: "Production-ready templates built with ObsidianUI components.",
        url: "https://www.obsidianui.dev/templates",
        type: "website",
    },
    alternates: {
        canonical: "https://www.obsidianui.dev/templates",
    },
};

export default function TemplatesPage() {
    return (
        <div className="min-h-screen bg-background text-foreground">
            <NavbarContent activeIndex={3} />
            <main className="flex flex-col items-center justify-center min-h-screen text-center px-4">
                <article className="space-y-6 max-w-lg">
                    <h1 className="text-4xl md:text-6xl font-bold tracking-tighter">
                        Templates <br />
                        <span className="text-muted-foreground">Coming Soon</span>
                    </h1>
                    <p className="text-lg text-muted-foreground">
                        We are crafting high-quality templates to help you build even faster.
                        Stay tuned for updates.
                    </p>
                    <nav className="flex gap-4 justify-center" aria-label="Page navigation">
                        <Link href="/">
                            <Button variant="outline" className="gap-2">
                                <ArrowLeft className="w-4 h-4" aria-hidden="true" />
                                Back to Home
                            </Button>
                        </Link>
                    </nav>
                </article>
            </main>
        </div>
    );
}
