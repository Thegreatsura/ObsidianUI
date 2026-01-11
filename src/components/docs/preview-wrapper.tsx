"use client";

import React from 'react';
import { cn } from '@/lib/utils';

interface PreviewWrapperProps {
  children: React.ReactNode;
  className?: string;
  minHeight?: string;
  centered?: boolean;
}

export function PreviewWrapper({
  children,
  className,
  minHeight = "400px",
  centered = true,
}: PreviewWrapperProps) {
  return (
    <div
      className={cn(
        "relative w-full overflow-hidden rounded-lg",
        "bg-gradient-to-br from-zinc-50 to-zinc-100 dark:from-zinc-900 dark:to-zinc-950",
        "border border-zinc-200 dark:border-zinc-800",
        "p-8 md:p-12",
        centered && "flex items-center justify-center",
        className
      )}
      style={{ minHeight }}
    >
      {/* Isolated container for components */}
      <div className="relative z-10 w-full max-w-full">
        {children}
      </div>
    </div>
  );
}
