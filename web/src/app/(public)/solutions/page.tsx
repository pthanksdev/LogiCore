'use client'

import React from 'react'
import Link from 'next/link'
import { Truck, Cpu, Globe, Thermometer, Check, ArrowRight } from 'lucide-react'
import { TextReveal, HoverCard } from '@/components/MotionComponents'

export default function SolutionsPage() {
    const solutions = [
        {
            tag: '3PL & Freight Management',
            title: 'Global 3PL & Multi-Carrier Dispatch',
            desc: 'Unify freight routing, carrier API integrations, and ocean/air shipment manifests into a single modular portal.',
            icon: Truck,
            metrics: ['-40% Carrier Processing Time', '100% Tracking Visibility'],
            highlights: [
                'Automated rate shopping across carriers',
                'Custom bill of lading & manifest generation',
                'GPS container tracking updates',
            ],
            color: 'from-blue-500/10 to-indigo-500/10 border-blue-500/30',
        },
        {
            tag: 'Manufacturing & Industrial',
            title: 'Raw Material ERP Integration',
            desc: 'Synchronize raw material procurement with assembly production lines to eliminate stockout downtime.',
            icon: Cpu,
            metrics: ['99.4% On-Time Material Arrival', 'Zero Line Halts'],
            highlights: [
                'Automated reorder thresholds for raw components',
                'Supplier bidding & PO approval workflows',
                'Batch lot number & serial tracking',
            ],
            color: 'from-purple-500/10 to-pink-500/10 border-purple-500/30',
        },
        {
            tag: 'Omnichannel Commerce',
            title: 'E-Commerce Multi-Warehouse Fulfillment',
            desc: 'Route customer orders dynamically to the nearest fulfillment center to reduce shipping distance and transit times.',
            icon: Globe,
            metrics: ['2-Day Ground Delivery Nationwide', '-25% Freight Costs'],
            highlights: [
                'Smart order routing based on stock proximity',
                'Real-time inventory sync across storefronts',
                'Automated customer order status portal',
            ],
            color: 'from-emerald-500/10 to-teal-500/10 border-emerald-500/30',
        },
        {
            tag: 'Biotech & Cold Storage',
            title: 'Cold Chain & Pharma Chain-of-Custody',
            desc: 'Maintain strict environmental telemetry compliance and audit-ready chain-of-custody logs for sensitive goods.',
            icon: Thermometer,
            metrics: ['SOC2 & FDA Compliance Ready', 'Sub-Second Temperature Alerts'],
            highlights: [
                'Real-time sensor telemetry integration',
                'PostgreSQL RLS tamper-proof audit trails',
                'Escalation alerts to Supreme Admins for breaches',
            ],
            color: 'from-cyan-500/10 to-blue-500/10 border-cyan-500/30',
        },
    ]

    return (
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
            {/* Header */}
            <div className="text-center max-w-3xl mx-auto mb-16">
                <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-blue-500/10 border border-blue-500/20 text-blue-400 text-sm font-semibold mb-6">
                    Tailored Industry Workflows
                </div>
                <h1 className="text-4xl md:text-6xl font-extrabold tracking-tight text-white mb-6">
                    <TextReveal text="Built for Your Specific Supply Chain Model." />
                </h1>
                <p className="text-lg text-zinc-400 leading-relaxed">
                    Whether managing 3PL multi-carrier freight or high-precision biotech cold storage, LogiCore configures to your operational requirements.
                </p>
            </div>

            {/* Solutions Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-24">
                {solutions.map((item, idx) => {
                    const IconComp = item.icon
                    return (
                        <HoverCard
                            key={idx}
                            className={`p-8 rounded-3xl bg-gradient-to-br ${item.color} bg-zinc-900/60 border backdrop-blur-xl flex flex-col justify-between`}
                        >
                            <div>
                                <div className="flex items-center justify-between mb-6">
                                    <span className="text-xs font-bold uppercase tracking-wider text-blue-400 px-3 py-1 bg-zinc-950/80 rounded-full border border-zinc-800">
                                        {item.tag}
                                    </span>
                                    <div className="w-10 h-10 rounded-xl bg-zinc-900 border border-zinc-800 flex items-center justify-center text-blue-400">
                                        <IconComp className="w-5 h-5" />
                                    </div>
                                </div>
                                <h2 className="text-2xl font-extrabold text-white mb-3">{item.title}</h2>
                                <p className="text-zinc-400 text-sm leading-relaxed mb-6">{item.desc}</p>

                                {/* Impact Metrics */}
                                <div className="grid grid-cols-2 gap-3 mb-6">
                                    {item.metrics.map((m, i) => (
                                        <div key={i} className="p-3 rounded-xl bg-zinc-950/70 border border-zinc-800/80 text-xs font-bold text-white text-center">
                                            {m}
                                        </div>
                                    ))}
                                </div>

                                {/* Highlights */}
                                <ul className="space-y-2.5 text-sm text-zinc-300 mb-8">
                                    {item.highlights.map((h, i) => (
                                        <li key={i} className="flex items-center gap-2.5">
                                            <Check className="w-4 h-4 text-blue-400 shrink-0" />
                                            {h}
                                        </li>
                                    ))}
                                </ul>
                            </div>

                            <Link
                                href={`/contact?solution=${encodeURIComponent(item.title)}`}
                                className="inline-flex items-center justify-center gap-2 w-full py-3.5 rounded-xl bg-zinc-900 hover:bg-zinc-800 border border-zinc-700 text-white font-semibold text-sm transition-all"
                            >
                                Request Solution Demo
                                <ArrowRight className="w-4 h-4" />
                            </Link>
                        </HoverCard>
                    )
                })}
            </div>

            {/* Custom Solution Enterprise Banner */}
            <div className="p-10 md:p-14 rounded-3xl bg-zinc-900/60 border border-zinc-800 text-center max-w-4xl mx-auto backdrop-blur-xl">
                <h2 className="text-3xl font-extrabold text-white mb-4">Have a unique complex logistics architecture?</h2>
                <p className="text-zinc-400 text-sm leading-relaxed max-w-xl mx-auto mb-8">
                    Our Supreme Solutions Engineering team designs bespoke schema migrations, legacy ERP connectors, and custom multi-tenant API pipelines.
                </p>
                <Link
                    href="/contact"
                    className="inline-flex items-center gap-2 px-8 py-4 rounded-xl bg-white text-zinc-950 font-bold hover:bg-zinc-200 transition-all shadow-xl"
                >
                    Speak with a Solutions Architect
                </Link>
            </div>
        </div>
    )
}
