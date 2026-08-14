'use client'

import React, { useState } from 'react'
import Link from 'next/link'
import {
    Package,
    ShieldCheck,
    FileText,
    Crown,
    ArrowRight,
    Check,
    Activity,
    TrendingUp,
    Globe,
    Layers,
    Sparkles,
    Box,
    Shield,
} from 'lucide-react'
import {
    TextReveal,
    HoverCard,
    SwipeableCarousel,
    AnimatedCounter,
    Marquee,
} from '@/components/MotionComponents'

export default function LandingPage() {
    const [selectedModules, setSelectedModules] = useState<string[]>(['inv', 'log'])

    const toggleModule = (id: string) => {
        setSelectedModules((prev) =>
            prev.includes(id) ? prev.filter((m) => m !== id) : [...prev, id]
        )
    }

    const availableModules = [
        { id: 'inv', name: 'Advanced Stock Control', price: 99 },
        { id: 'log', name: 'Global Logistics Dispatch', price: 149 },
        { id: 'proc', name: 'Automated Procurement', price: 129 },
        { id: 'ai', name: 'AI Demand Forecasting', price: 199 },
    ]

    const basePrice = 299
    const calcTotal = basePrice + selectedModules.reduce((sum, mId) => {
        const item = availableModules.find((m) => m.id === mId)
        return sum + (item ? item.price : 0)
    }, 0)

    const logos = [
        'APEX LOGISTICS',
        'GLOBAL FREIGHT',
        'OMNI SUPPLY',
        'TITAN COURIER',
        'NEXUS WAREHOUSE',
        'AERO CARGO GLOBAL',
    ]

    return (
        <div className="space-y-24 pb-12">
            {/* Hero Section */}
            <section className="relative overflow-hidden pt-12 pb-16 md:pt-20 md:pb-24 text-center">
                <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-blue-500/10 rounded-full blur-[140px] pointer-events-none -z-10" />
                <div className="absolute top-1/4 left-1/3 w-[400px] h-[400px] bg-indigo-500/10 rounded-full blur-[120px] pointer-events-none -z-10" />

                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    {/* Live Engine Status Badge */}
                    <div className="inline-flex items-center gap-2.5 px-4 py-2 rounded-full bg-zinc-900/90 border border-zinc-800 text-xs font-semibold text-zinc-300 shadow-xl mb-8">
                        <span className="relative flex h-2 w-2">
                            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-blue-400 opacity-75"></span>
                            <span className="relative inline-flex rounded-full h-2 w-2 bg-blue-500"></span>
                        </span>
                        <span>Phase 1 Enterprise Engine Active</span>
                        <span className="text-zinc-600">|</span>
                        <span className="text-blue-400 font-medium flex items-center gap-1">
                            <Shield className="w-3.5 h-3.5" /> PostgreSQL RLS v17
                        </span>
                    </div>

                    {/* Motion Headline */}
                    <div className="max-w-5xl mx-auto mb-8">
                        <h1 className="text-5xl sm:text-6xl md:text-7xl lg:text-8xl font-black tracking-tight text-white leading-[1.08]">
                            <TextReveal text="Supply Chain Intelligence," /> <br />
                            <span className="bg-gradient-to-r from-blue-400 via-indigo-300 to-cyan-400 bg-clip-text text-transparent inline-block">
                                <TextReveal text="Engineered for Scale." delay={0.2} />
                            </span>
                        </h1>
                    </div>

                    {/* Subtext */}
                    <p className="text-lg sm:text-xl text-zinc-400 max-w-3xl mx-auto mb-10 leading-relaxed font-normal">
                        A modular enterprise SaaS platform powering modern fulfillment. Provision inventory tracking, automated PO bidding, and global freight dispatch on a secure multi-tenant architecture.
                    </p>

                    {/* Dual CTAs */}
                    <div className="flex flex-col sm:flex-row items-center justify-center gap-4 max-w-md mx-auto mb-16">
                        <Link
                            href="/register"
                            className="w-full sm:w-auto px-8 py-4 bg-white hover:bg-zinc-100 text-zinc-950 font-bold rounded-2xl transition-all shadow-xl shadow-white/10 active:scale-[0.98] flex items-center justify-center gap-2"
                        >
                            Start 14-Day Free Trial
                            <ArrowRight className="w-4 h-4" />
                        </Link>
                        <Link
                            href="/features"
                            className="w-full sm:w-auto px-8 py-4 bg-zinc-900/90 hover:bg-zinc-800 text-white font-semibold rounded-2xl border border-zinc-800 transition-all active:scale-[0.98]"
                        >
                            Explore Platform Features
                        </Link>
                    </div>

                    {/* Live Telemetry Dashboard Mockup */}
                    <div className="max-w-5xl mx-auto rounded-3xl bg-zinc-900/80 border border-zinc-800 p-4 sm:p-6 shadow-2xl shadow-black/80 backdrop-blur-xl">
                        <div className="flex items-center justify-between pb-4 mb-4 border-b border-zinc-800/80 text-xs text-zinc-400 font-mono">
                            <div className="flex items-center gap-2">
                                <span className="w-3 h-3 rounded-full bg-rose-500/80 inline-block" />
                                <span className="w-3 h-3 rounded-full bg-amber-500/80 inline-block" />
                                <span className="w-3 h-3 rounded-full bg-emerald-500/80 inline-block" />
                                <span className="ml-2 text-zinc-300 font-semibold flex items-center gap-1.5">
                                    <Activity className="w-3.5 h-3.5 text-blue-400" /> LogiCore Node #402
                                </span>
                            </div>
                            <span className="hidden sm:inline-flex items-center gap-1 text-emerald-400 font-semibold">
                                <ShieldCheck className="w-3.5 h-3.5" /> MULTI-TENANT ISOLATED
                            </span>
                        </div>

                        {/* Live Telemetry Cards with Motion Counters */}
                        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-left">
                            <div className="p-4 rounded-2xl bg-zinc-950/80 border border-zinc-800/60">
                                <div className="text-xs text-zinc-500 font-medium mb-1 uppercase tracking-wider flex items-center gap-1.5">
                                    <Box className="w-3.5 h-3.5 text-blue-400" /> Active Shipments
                                </div>
                                <div className="text-2xl sm:text-3xl font-black text-white font-mono">
                                    <AnimatedCounter value={4821} />
                                </div>
                                <div className="text-xs text-emerald-400 mt-1 font-semibold flex items-center gap-1">
                                    <TrendingUp className="w-3 h-3" /> +14% vs yesterday
                                </div>
                            </div>
                            <div className="p-4 rounded-2xl bg-zinc-950/80 border border-zinc-800/60">
                                <div className="text-xs text-zinc-500 font-medium mb-1 uppercase tracking-wider flex items-center gap-1.5">
                                    <Package className="w-3.5 h-3.5 text-emerald-400" /> SKUs in Stock
                                </div>
                                <div className="text-2xl sm:text-3xl font-black text-white font-mono">
                                    <AnimatedCounter value={128400} />
                                </div>
                                <div className="text-xs text-blue-400 mt-1 font-semibold">99.8% Sync Accuracy</div>
                            </div>
                            <div className="p-4 rounded-2xl bg-zinc-950/80 border border-zinc-800/60">
                                <div className="text-xs text-zinc-500 font-medium mb-1 uppercase tracking-wider flex items-center gap-1.5">
                                    <FileText className="w-3.5 h-3.5 text-indigo-400" /> Procurement POs
                                </div>
                                <div className="text-2xl sm:text-3xl font-black text-white font-mono">
                                    $<AnimatedCounter value={420} suffix="K" />
                                </div>
                                <div className="text-xs text-indigo-400 mt-1 font-semibold">18 POs Pending Approval</div>
                            </div>
                            <div className="p-4 rounded-2xl bg-zinc-950/80 border border-zinc-800/60">
                                <div className="text-xs text-zinc-500 font-medium mb-1 uppercase tracking-wider flex items-center gap-1.5">
                                    <Sparkles className="w-3.5 h-3.5 text-amber-400" /> Engine SLA
                                </div>
                                <div className="text-2xl sm:text-3xl font-black text-emerald-400 font-mono">
                                    99.99%
                                </div>
                                <div className="text-xs text-zinc-400 mt-1 font-semibold">PostgreSQL RLS Active</div>
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            {/* Infinite Marquee Section */}
            <section className="border-y border-zinc-800/60 py-8 bg-zinc-950/60 backdrop-blur-md">
                <div className="max-w-7xl mx-auto px-4 text-center">
                    <p className="text-xs font-bold uppercase tracking-widest text-zinc-500 mb-6">
                        Trusted by High-Velocity Logistics Teams Worldwide
                    </p>
                    <Marquee items={logos} speed={25} />
                </div>
            </section>

            {/* Interactive Swipeable Module Showcase */}
            <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="text-center max-w-3xl mx-auto mb-16">
                    <span className="text-xs font-bold uppercase tracking-wider text-blue-400 mb-2 block">
                        Swipe & Drag Capabilities Matrix
                    </span>
                    <h2 className="text-3xl sm:text-5xl font-extrabold text-white mb-4">
                        Swipe to Explore Modular Capabilities
                    </h2>
                    <p className="text-zinc-400 text-base">
                        Drag or click through our modular logistics sub-systems.
                    </p>
                </div>

                <SwipeableCarousel>
                    <HoverCard className="p-8 flex flex-col justify-between h-72">
                        <div className="space-y-3">
                            <div className="w-10 h-10 rounded-xl bg-blue-500/10 text-blue-400 flex items-center justify-center font-bold">
                                <Package className="w-5 h-5" />
                            </div>
                            <h3 className="text-xl font-bold text-white">Dynamic Stock Control</h3>
                            <p className="text-zinc-400 text-xs leading-relaxed">
                                Real-time barcode scan sync across multi-warehouse regional hubs.
                            </p>
                        </div>
                        <span className="text-xs font-mono text-blue-400">MODULE #01 • WMS</span>
                    </HoverCard>

                    <HoverCard className="p-8 flex flex-col justify-between h-72">
                        <div className="space-y-3">
                            <div className="w-10 h-10 rounded-xl bg-emerald-500/10 text-emerald-400 flex items-center justify-center font-bold">
                                <ShieldCheck className="w-5 h-5" />
                            </div>
                            <h3 className="text-xl font-bold text-white">PostgreSQL RLS Security</h3>
                            <p className="text-zinc-400 text-xs leading-relaxed">
                                DB-level tenant boundaries guaranteeing complete corporate privacy.
                            </p>
                        </div>
                        <span className="text-xs font-mono text-emerald-400">MODULE #02 • RLS</span>
                    </HoverCard>

                    <HoverCard className="p-8 flex flex-col justify-between h-72">
                        <div className="space-y-3">
                            <div className="w-10 h-10 rounded-xl bg-purple-500/10 text-purple-400 flex items-center justify-center font-bold">
                                <FileText className="w-5 h-5" />
                            </div>
                            <h3 className="text-xl font-bold text-white">PO Bidding Engine</h3>
                            <p className="text-zinc-400 text-xs leading-relaxed">
                                Automated procurement bidding cycles with multi-step approval workflows.
                            </p>
                        </div>
                        <span className="text-xs font-mono text-purple-400">MODULE #03 • PO</span>
                    </HoverCard>

                    <HoverCard className="p-8 flex flex-col justify-between h-72">
                        <div className="space-y-3">
                            <div className="w-10 h-10 rounded-xl bg-amber-500/10 text-amber-400 flex items-center justify-center font-bold">
                                <Crown className="w-5 h-5" />
                            </div>
                            <h3 className="text-xl font-bold text-white">Supreme Governance</h3>
                            <p className="text-zinc-400 text-xs leading-relaxed">
                                Root owner portal for 2-step escalation approvals and role control.
                            </p>
                        </div>
                        <span className="text-xs font-mono text-amber-400">MODULE #04 • SUPREME</span>
                    </HoverCard>
                </SwipeableCarousel>
            </section>

            {/* Interactive Calculator Section */}
            <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="p-8 md:p-12 rounded-3xl bg-gradient-to-br from-zinc-900 to-zinc-950 border border-zinc-800 backdrop-blur-xl grid grid-cols-1 lg:grid-cols-2 gap-10 items-center">
                    <div className="space-y-6">
                        <span className="text-xs font-bold uppercase tracking-wider text-blue-400 block">
                            Interactive Calculator
                        </span>
                        <h2 className="text-3xl md:text-4xl font-extrabold text-white">
                            Calculate Your Modular Plan in Seconds.
                        </h2>
                        <p className="text-zinc-400 text-sm leading-relaxed">
                            Select the modules your supply chain currently requires. Add or remove capabilities at any time.
                        </p>

                        <div className="space-y-3">
                            {availableModules.map((mod) => {
                                const isSelected = selectedModules.includes(mod.id)
                                return (
                                    <div
                                        key={mod.id}
                                        onClick={() => toggleModule(mod.id)}
                                        className={`p-4 rounded-xl border transition-all cursor-pointer flex items-center justify-between ${
                                            isSelected
                                                ? 'bg-blue-600/10 border-blue-500/60 text-white shadow-md shadow-blue-500/10'
                                                : 'bg-zinc-950/60 border-zinc-800 text-zinc-400 hover:border-zinc-700'
                                        }`}
                                    >
                                        <div className="flex items-center gap-3">
                                            <div className={`w-4 h-4 rounded flex items-center justify-center border ${isSelected ? 'bg-blue-600 border-blue-600 text-white' : 'border-zinc-700'}`}>
                                                {isSelected && <Check className="w-3 h-3" />}
                                            </div>
                                            <span className="text-sm font-semibold">{mod.name}</span>
                                        </div>
                                        <span className="text-sm font-bold text-white">+${mod.price}/mo</span>
                                    </div>
                                )
                            })}
                        </div>
                    </div>

                    <div className="p-8 rounded-2xl bg-zinc-950 border border-zinc-800 text-center space-y-6">
                        <div className="text-xs text-zinc-500 font-bold uppercase tracking-wider">Estimated Monthly Investment</div>
                        <div className="text-5xl font-black text-white font-mono">${calcTotal}<span className="text-zinc-500 text-base font-normal"> / mo</span></div>
                        <p className="text-xs text-zinc-400">Includes Base Engine ($299/mo) + {selectedModules.length} selected modules.</p>
                        <Link
                            href={`/pricing`}
                            className="block w-full py-4 rounded-xl bg-blue-600 hover:bg-blue-500 text-white font-bold text-sm transition-all shadow-lg shadow-blue-600/30"
                        >
                            View Detailed Pricing Tiers
                        </Link>
                    </div>
                </div>
            </section>

            {/* High Contrast Conclusive CTA Section */}
            <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="p-12 md:p-16 rounded-3xl bg-white text-zinc-950 text-center space-y-6 shadow-2xl shadow-white/5">
                    <h2 className="text-3xl md:text-5xl font-black tracking-tight max-w-2xl mx-auto">
                        Ready to Modernize Your Supply Chain Operations?
                    </h2>
                    <p className="text-zinc-600 text-base max-w-lg mx-auto">
                        Join modern logistics leaders and provision your multi-tenant SCM account today.
                    </p>
                    <div className="pt-2">
                        <Link
                            href="/register"
                            className="inline-flex items-center gap-2 px-8 py-4 rounded-2xl bg-blue-600 hover:bg-blue-700 text-white font-bold text-base transition-all shadow-xl shadow-blue-600/30 active:scale-[0.98]"
                        >
                            Start 14-Day Free Trial
                            <ArrowRight className="w-4 h-4" />
                        </Link>
                    </div>
                    <p className="text-xs text-zinc-400 font-medium">
                        No credit card required. Instant 14-day enterprise evaluation.
                    </p>
                </div>
            </section>
        </div>
    )
}
