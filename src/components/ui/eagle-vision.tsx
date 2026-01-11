'use client';

import { useSpring, useTransform, MotionValue, motion, useMotionValue } from 'framer-motion';
import React, { useEffect } from 'react';
import { createPortal } from 'react-dom';

interface RingProps {
    x: MotionValue<number>;
    y: MotionValue<number>;
    size: MotionValue<number>;
    borderRadius: MotionValue<number>;
    distanceBetweenRings: MotionValue<number>;
}

const MAX_DISTANCE = 1440;
const MIN_DISTANCE = 100;
const CORRECT_DISTANCE = 76;

const Ring = ({ x, y, size, borderRadius, distanceBetweenRings }: RingProps) => (
    <motion.span
        className="fixed z-10"
        style={{
            transform: useTransform([x, y], ([x, y]: number[]) => `translate(${x}px, ${y}px)`),
            height: size,
            width: size
        }}
    >
        <span className="absolute inset-0 flex items-center justify-center">
            <motion.span
                style={{
                    width: size,
                    height: size,
                    borderColor: useTransform(size, (value) => (value < CORRECT_DISTANCE ? '#00ff00' : 'white')),
                    borderRadius: useTransform(borderRadius, (value) => `${value}px`)
                }}
                className="absolute border animate-spin-reverse"
            />
            <motion.span
                style={{
                    width: useTransform([size, distanceBetweenRings], ([s, d]: number[]) => s - d + 3),
                    height: useTransform([size, distanceBetweenRings], ([s, d]: number[]) => s - d + 3),
                    borderColor: useTransform(size, (value) => (value < CORRECT_DISTANCE ? '#00ff00' : 'white')),
                    borderRadius: useTransform(borderRadius, (value) => `${value}px`)
                }}
                className="absolute border animate-spin-reverse"
            />
            <motion.span
                style={{
                    width: useTransform([size, distanceBetweenRings], ([s, d]: number[]) => s - d - 10),
                    height: useTransform([size, distanceBetweenRings], ([s, d]: number[]) => s - d - 10),
                    borderColor: useTransform(size, (value) => (value < CORRECT_DISTANCE ? '#00ff00' : 'white')),
                    borderRadius: useTransform(borderRadius, (value) => `${value}px`)
                }}
                className="absolute border border-dashed animate-spin"
            />
            <motion.span
                style={{
                    width: useTransform([size, distanceBetweenRings], ([s, d]: number[]) => s + d - 7),
                    height: useTransform([size, distanceBetweenRings], ([s, d]: number[]) => s + d - 7),
                    borderColor: useTransform(size, (value) => (value < CORRECT_DISTANCE ? '#00ff00' : 'white')),
                    borderRadius: useTransform(borderRadius, (value) => `${value}px`)
                }}
                className="absolute border border-dashed animate-spin"
            />
        </span>
    </motion.span>
);

export function EagleVision() {
    const mouseX = useSpring(0, { duration: 0.1 });
    const mouseY = useSpring(0, { duration: 0.1 });

    const distanceFromTarget = useMotionValue(MAX_DISTANCE);
    const size = useTransform(distanceFromTarget, [MIN_DISTANCE, MAX_DISTANCE], [75, 400]);
    const borderRadius = useTransform(distanceFromTarget, [MIN_DISTANCE, MAX_DISTANCE], [40, 150]);
    const distanceBetweenRings = useTransform(distanceFromTarget, [0, MIN_DISTANCE + 100], [0, 15]);

    useEffect(() => {
        const handleMouseMove = (e: MouseEvent) => {
            const target = document.getElementById('eagle-vision-target');
            if (target) {
                const targetRect = target.getBoundingClientRect();
                const calculatedDistance = Math.sqrt(
                    (e.clientX - targetRect.left - targetRect.width / 2) ** 2 +
                    (e.clientY - targetRect.top - targetRect.height / 2) ** 2
                );
                distanceFromTarget.set(calculatedDistance);
            }
            mouseX.set(e.clientX - size.get() / 2);
            mouseY.set(e.clientY - size.get() / 2);
        };
        window.addEventListener('mousemove', handleMouseMove);
        return () => window.removeEventListener('mousemove', handleMouseMove);
    }, [mouseX, mouseY, size, distanceFromTarget]);

    if (typeof window === 'undefined') return null;

    return createPortal(
        <div className="fixed z-[99999] top-0 left-0 inset-0 pointer-events-none">
            <style>{`
        @keyframes spin-reverse { from { transform: rotate(0deg); } to { transform: rotate(-360deg); } }
        .animate-spin-reverse { animation: spin-reverse 2s linear infinite; }
      `}</style>
            <Ring x={mouseX} y={mouseY} size={size} borderRadius={borderRadius} distanceBetweenRings={distanceBetweenRings} />
        </div>,
        document.body
    );
}

export function EagleVisionTarget({ children }: { children: React.ReactNode }) {
    return <div id="eagle-vision-target">{children}</div>;
}

export default EagleVision;
