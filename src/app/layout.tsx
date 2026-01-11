import type { Metadata } from "next";
import { Analytics } from "@vercel/analytics/react";
import { Inter_Tight, Pixelify_Sans, Playfair_Display } from "next/font/google";
import "./globals.css";
import { ThemeProvider } from "@/components/providers/theme-provider";
import Footer from "@/components/mine/landing-page/footer";
import { ClickSpark } from "@/components/ui/click-spark";

// Default font
const interTight = Inter_Tight({
  variable: "--font-inter-tight",
  subsets: ["latin"],
  weight: ["400", "500", "700"],
});

// Special font for headings
const pixelify = Pixelify_Sans({
  variable: "--font-pixelify",
  subsets: ["latin"],
  weight: ["400", "700"],
});

// Font for elegant serif headings
const playfair = Playfair_Display({
  variable: "--font-playfair",
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
});

export const metadata: Metadata = {
  title: "ObsidianUI - Premium React Components",
  description:
    "Beautiful, modern, and customizable React components. Build stunning interfaces with ObsidianUI - a premium component library for React and Next.js.",
  keywords: [
    "React",
    "Next.js",
    "UI Components",
    "Component Library",
    "Tailwind CSS",
    "Three.js",
    "Animation",
    "Web Development",
    "Frontend",
    "ObsidianUI",
  ],
  authors: [{ name: "ObsidianUI" }],
  icons: {
    icon: "/logo/bg-less.png",
    apple: "/logo/bg-less.png",
  },
  openGraph: {
    type: "website",
    url: "https://www.obsidianui.com",
    title: "ObsidianUI - Premium React Components",
    description:
      "Beautiful, modern, and customizable React components. Build stunning interfaces with ObsidianUI - a premium component library for React and Next.js.",
    siteName: "ObsidianUI",
    images: [
      {
        url: "https://www.obsidianui.com/og-image.png",
        width: 1200,
        height: 630,
        alt: "ObsidianUI - Premium React Components",
      },
    ],
    locale: "en_US",
  },
  twitter: {
    card: "summary_large_image",
    title: "ObsidianUI - Premium React Components",
    description:
      "Beautiful, modern, and customizable React components. Build stunning interfaces with ObsidianUI.",
    images: ["https://www.obsidianui.com/og-image.png"],
  },
  robots: {
    index: true,
    follow: true,
  },
  metadataBase: new URL("https://www.obsidianui.com"),
};

export const viewport = {
  width: "device-width",
  initialScale: 1,
  maximumScale: 1,
};

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body
        className={`${interTight.variable} ${pixelify.variable} ${playfair.variable} antialiased`}
      >
        <ThemeProvider attribute="class" defaultTheme="system" enableSystem>
          <ClickSpark
            sparkColor={undefined}
            sparkSize={10}
            sparkRadius={15}
            sparkCount={8}
            duration={400}
          />
          {children}
          <Footer />
          <Analytics />
        </ThemeProvider>
      </body>
    </html>
  );
}

