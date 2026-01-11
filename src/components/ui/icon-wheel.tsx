'use client';

import React from 'react';
import { motion } from 'framer-motion';
import Image from 'next/image';
import { cn } from '@/lib/utils';

type IconWheelProps = {
    icons: Array<string>;
    radius?: number;
    iconSize?: number;
    duration?: number;
    className?: string;
};

export function IconWheel({
    icons,
    radius = 120,
    iconSize = 40,
    duration = 20,
    className
}: IconWheelProps) {
    const angleStep = (2 * Math.PI) / icons.length;
    const containerSize = radius * 2 + iconSize + 60;
    const center = containerSize / 2;

    return (
        <div
            className={cn(
                'relative',
                className
            )}
            style={{
                width: containerSize,
                height: containerSize,
            }}
        >
            {/* Subtle orbit path - monochrome */}
            <div
                className="absolute rounded-full border border-neutral-300 dark:border-zinc-700"
                style={{
                    width: radius * 2,
                    height: radius * 2,
                    left: center - radius,
                    top: center - radius,
                }}
            />

            {/* Center Logo - ObsidianUI Crystal */}
            <div
                className="absolute z-10 flex items-center justify-center"
                style={{
                    left: center - 24,
                    top: center - 28,
                    width: 48,
                    height: 56,
                }}
            >
                <Image
                    src="/logo/bg-less.png"
                    alt="ObsidianUI"
                    width={48}
                    height={56}
                    className="object-contain drop-shadow-lg"
                />
            </div>

            {/* Rotating container */}
            <motion.div
                className="absolute inset-0"
                animate={{ rotate: 360 }}
                transition={{
                    duration: duration,
                    ease: 'linear',
                    repeat: Infinity
                }}
            >
                {icons.map((url, i) => {
                    const angle = i * angleStep - Math.PI / 2; // Start from top
                    const x = center + Math.cos(angle) * radius - (iconSize + 16) / 2;
                    const y = center + Math.sin(angle) * radius - (iconSize + 16) / 2;

                    return (
                        <motion.div
                            key={`iconwheel-${i}`}
                            className="absolute rounded-xl bg-white dark:bg-zinc-800 shadow-md shadow-black/5 dark:shadow-black/30 border border-neutral-200 dark:border-zinc-700 flex items-center justify-center cursor-pointer hover:shadow-lg transition-shadow"
                            style={{
                                left: x,
                                top: y,
                                width: iconSize + 16,
                                height: iconSize + 16,
                            }}
                            animate={{ rotate: -360 }}
                            transition={{
                                duration: duration,
                                ease: 'linear',
                                repeat: Infinity
                            }}
                            whileHover={{ scale: 1.15, zIndex: 20 }}
                        >
                            <Image
                                src={url}
                                height={iconSize}
                                width={iconSize}
                                alt="icon"
                                className="object-contain"
                            />
                        </motion.div>
                    );
                })}
            </motion.div>
        </div>
    );
}

export default IconWheel;
