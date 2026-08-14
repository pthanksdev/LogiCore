'use client'

import React, { useState, useEffect } from 'react'
import { motion, useAnimation } from 'framer-motion'

/**
 * TextReveal Component
 * Animates text words in sequence with a staggered spring entrance.
 */
export function TextReveal({
    text,
    className = '',
    delay = 0,
}: {
    text: string
    className?: string
    delay?: number
}) {
    const words = text.split(' ')

    const container = {
        hidden: { opacity: 0 },
        visible: (i = 1) => ({
            opacity: 1,
            transition: { staggerChildren: 0.08, delayChildren: delay },
        }),
    }

    const child = {
        visible: {
            opacity: 1,
            y: 0,
            transition: {
                type: 'spring' as const,
                damping: 12,
                stiffness: 100,
            },
        },
        hidden: {
            opacity: 0,
            y: 20,
            transition: {
                type: 'spring' as const,
                damping: 12,
                stiffness: 100,
            },
        },
    }

    return (
        <motion.div
            className={`inline-flex flex-wrap gap-x-[0.3em] ${className}`}
            variants={container}
            initial="hidden"
            animate="visible"
        >
            {words.map((word, index) => (
                <motion.span variants={child} key={index} className="inline-block">
                    {word}
                </motion.span>
            ))}
        </motion.div>
    )
}

/**
 * HoverCard Component
 * Modern glassmorphism card with spring scale feedback, 3D lift, and dynamic border lighting.
 */
export function HoverCard({
    children,
    className = '',
    onClick,
}: {
    children: React.ReactNode
    className?: string
    onClick?: () => void
}) {
    return (
        <motion.div
            whileHover={{
                scale: 1.025,
                y: -5,
                transition: { duration: 0.2, ease: [0.23, 1, 0.32, 1] },
            }}
            whileTap={{ scale: 0.98 }}
            onClick={onClick}
            className={`relative group bg-zinc-900/70 backdrop-blur-xl border border-zinc-800 hover:border-blue-500/40 rounded-3xl transition-all duration-300 shadow-xl hover:shadow-2xl hover:shadow-blue-500/10 cursor-pointer overflow-hidden ${className}`}
        >
            {/* Dynamic Hover Ambient Glow */}
            <div className="absolute -inset-px rounded-3xl bg-gradient-to-r from-blue-500/0 via-blue-500/10 to-indigo-500/0 opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none" />
            <div className="relative z-10">{children}</div>
        </motion.div>
    )
}

/**
 * SwipeableCarousel Component
 * Interactive drag & swipe card showcase with touch gestures and navigation indicators.
 */
export function SwipeableCarousel({
    children,
    className = '',
}: {
    children: React.ReactNode[]
    className?: string
}) {
    const [activeIndex, setActiveIndex] = useState(0)

    const handleNext = () => {
        if (activeIndex < children.length - 1) setActiveIndex(activeIndex + 1)
    }

    const handlePrev = () => {
        if (activeIndex > 0) setActiveIndex(activeIndex - 1)
    }

    return (
        <div className={`relative overflow-hidden w-full ${className}`}>
            <motion.div
                className="flex gap-6 cursor-grab active:cursor-grabbing"
                drag="x"
                dragConstraints={{ left: -300 * (children.length - 1), right: 0 }}
                animate={{ x: -activeIndex * 320 }}
                transition={{ type: 'spring', stiffness: 300, damping: 30 }}
            >
                {children.map((child, idx) => (
                    <motion.div
                        key={idx}
                        className="min-w-[300px] md:min-w-[360px] flex-shrink-0"
                        whileHover={{ scale: 1.01 }}
                    >
                        {child}
                    </motion.div>
                ))}
            </motion.div>

            {/* Pagination controls */}
            <div className="flex items-center justify-between mt-8">
                <div className="flex gap-2">
                    {children.map((_, idx) => (
                        <button
                            key={idx}
                            onClick={() => setActiveIndex(idx)}
                            className={`h-2 rounded-full transition-all duration-300 ${
                                activeIndex === idx ? 'w-8 bg-blue-500' : 'w-2 bg-zinc-800'
                            }`}
                            aria-label={`Go to slide ${idx + 1}`}
                        />
                    ))}
                </div>

                <div className="flex gap-2">
                    <button
                        onClick={handlePrev}
                        disabled={activeIndex === 0}
                        className="p-2 rounded-xl bg-zinc-900 border border-zinc-800 text-zinc-400 disabled:opacity-40 hover:text-white transition-colors"
                    >
                        ←
                    </button>
                    <button
                        onClick={handleNext}
                        disabled={activeIndex === children.length - 1}
                        className="p-2 rounded-xl bg-zinc-900 border border-zinc-800 text-zinc-400 disabled:opacity-40 hover:text-white transition-colors"
                    >
                        →
                    </button>
                </div>
            </div>
        </div>
    )
}

/**
 * AnimatedCounter Component
 * Animates numerical stats on load.
 */
export function AnimatedCounter({
    value,
    duration = 1.5,
    prefix = '',
    suffix = '',
}: {
    value: number
    duration?: number
    prefix?: string
    suffix?: string
}) {
    const [count, setCount] = useState(0)

    useEffect(() => {
        let start = 0
        const end = value
        if (start === end) return

        const totalSteps = 60
        const stepTime = (duration * 1000) / totalSteps
        const increment = (end - start) / totalSteps

        const timer = setInterval(() => {
            start += increment
            if (start >= end) {
                setCount(end)
                clearInterval(timer)
            } else {
                setCount(Math.floor(start))
            }
        }, stepTime)

        return () => clearInterval(timer)
    }, [value, duration])

    return (
        <span>
            {prefix}
            {count.toLocaleString()}
            {suffix}
        </span>
    )
}

/**
 * Marquee Component
 * Continuous smooth horizontal loop.
 */
export function Marquee({
    items,
    speed = 25,
}: {
    items: string[]
    speed?: number
}) {
    return (
        <div className="overflow-hidden whitespace-nowrap flex w-full relative">
            <motion.div
                className="flex gap-12 items-center min-w-full"
                animate={{ x: ['0%', '-50%'] }}
                transition={{
                    repeat: Infinity,
                    ease: 'linear',
                    duration: speed,
                }}
            >
                {[...items, ...items].map((item, idx) => (
                    <span
                        key={idx}
                        className="text-zinc-500 font-mono text-sm font-semibold tracking-wider uppercase opacity-75 hover:opacity-100 transition-opacity"
                    >
                        {item}
                    </span>
                ))}
            </motion.div>
        </div>
    )
}
