'use client'

import React, { useId, useRef, useState } from 'react'
import { AnimatePresence, motion } from 'framer-motion'
import { X } from 'lucide-react'

export interface BentoGridDemoProps {
    items: {
        id: string | number
        title: string
        subtitle?: string
        description?: string
        content: React.ReactNode
        icon?: React.ReactNode
        className?: string
    }[]
}

// Demo version that stays contained within preview box
export function ExpandableBentoGridDemo({ items }: BentoGridDemoProps) {
    const [active, setActive] = useState<(typeof items)[number] | boolean | null>(null)
    const ref = useRef<HTMLDivElement>(null)
    const id = useId()

    return (
        <div className="relative w-full h-full">
            <AnimatePresence>
                {active && typeof active === 'object' && (
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        className="absolute inset-0 bg-black/20 z-40 rounded-lg"
                        onClick={() => setActive(null)}
                    />
                )}
            </AnimatePresence>
            <AnimatePresence>
                {active && typeof active === 'object' ? (
                    <div className="absolute inset-0 grid place-items-center z-50 p-4">
                        <motion.div
                            layoutId={`card-${active.title}-${id}`}
                            ref={ref}
                            className="w-full max-w-[320px] flex flex-col bg-white dark:bg-neutral-900 rounded-2xl overflow-hidden shadow-2xl"
                        >
                            <motion.div layoutId={`image-${active.title}-${id}`}>
                                <div className="w-full h-24 bg-blue-100 dark:bg-blue-900/20 flex items-center justify-center">
                                    {active.icon ? (
                                        <div className="scale-150 text-blue-500">{active.icon}</div>
                                    ) : (
                                        <div className="w-full h-full bg-gray-200" />
                                    )}
                                </div>
                            </motion.div>

                            <div className="p-4">
                                <div className="flex justify-between items-start mb-3">
                                    <div>
                                        <motion.h3
                                            layoutId={`title-${active.title}-${id}`}
                                            className="font-bold text-neutral-700 dark:text-neutral-200 text-sm"
                                        >
                                            {active.title}
                                        </motion.h3>
                                        <motion.p
                                            layoutId={`description-${active.title}-${id}`}
                                            className="text-neutral-600 dark:text-neutral-400 text-xs mt-1"
                                        >
                                            {active.description}
                                        </motion.p>
                                    </div>
                                    <button
                                        onClick={() => setActive(null)}
                                        className="p-1 hover:bg-neutral-100 dark:hover:bg-neutral-800 rounded-full transition-colors"
                                    >
                                        <X className="h-4 w-4 text-neutral-500" />
                                    </button>
                                </div>

                                <motion.div
                                    initial={{ opacity: 0 }}
                                    animate={{ opacity: 1 }}
                                    exit={{ opacity: 0 }}
                                    className="text-neutral-600 dark:text-neutral-400 text-xs"
                                >
                                    {active.content}
                                </motion.div>

                                <motion.button
                                    layoutId={`button-${active.title}-${id}`}
                                    className="mt-3 px-4 py-2 text-xs rounded-xl font-bold bg-blue-500 text-white w-full"
                                >
                                    Visit
                                </motion.button>
                            </div>
                        </motion.div>
                    </div>
                ) : null}
            </AnimatePresence>
            <ul className="w-full gap-2 grid grid-cols-2 md:grid-cols-3 items-start">
                {items.map((item) => (
                    <motion.div
                        layoutId={`card-${item.title}-${id}`}
                        key={item.id}
                        onClick={() => setActive(item)}
                        className="p-3 flex flex-col items-center hover:bg-neutral-50 dark:hover:bg-neutral-800 rounded-xl cursor-pointer bg-blue-50/60 dark:bg-blue-900/10 border border-blue-100 dark:border-blue-800 transition-colors"
                    >
                        <motion.div layoutId={`image-${item.title}-${id}`}>
                            <div className="h-10 w-10 rounded-lg bg-blue-100 dark:bg-blue-900/30 flex items-center justify-center text-blue-500 mb-2">
                                {item.icon}
                            </div>
                        </motion.div>
                        <motion.h3
                            layoutId={`title-${item.title}-${id}`}
                            className="font-medium text-neutral-800 dark:text-neutral-200 text-xs text-center"
                        >
                            {item.title}
                        </motion.h3>
                        <motion.p
                            layoutId={`description-${item.title}-${id}`}
                            className="text-neutral-600 dark:text-neutral-400 text-[10px] text-center"
                        >
                            {item.subtitle}
                        </motion.p>
                        <motion.div layoutId={`button-${item.title}-${id}`} className="hidden" />
                    </motion.div>
                ))}
            </ul>
        </div>
    )
}
