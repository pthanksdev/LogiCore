'use client'

import React from 'react'

import { Layers, ShieldCheck, Crown, Code2, Award } from 'lucide-react'

export default function AboutPage() {
    const stats = [
        { label: 'Platform SLA Uptime', value: '99.99%' },
        { label: 'Annual Packages Tracked', value: '50M+' },
        { label: 'Connected Logistics Nodes', value: '120+' },
        { label: 'Avg DB Query Latency', value: '< 10ms' },
    ]

    const principles = [
        {
            title: 'Modular Compartmentalization',
            desc: 'We believe enterprises should never pay for monolithic software bloat. Every capability is an isolated, autonomous module.',
            icon: Layers,
        },
        {
            title: 'Zero-Trust Engine Security',
            desc: 'Database security is non-negotiable. We enforce multi-tenant isolation directly inside PostgreSQL RLS policies.',
            icon: ShieldCheck,
        },
        {
            title: 'Supreme Governance Control',
            desc: 'Provide internal administrators with full visibility while ensuring tenant operational boundaries remain immutable.',
            icon: Crown,
        },
        {
            title: 'Developer & API First',
            desc: 'Built on Next.js 16, TypeScript, and modern REST/GraphQL APIs so developer teams can extend the platform effortlessly.',
            icon: Code2,
        },
    ]

    return (
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
            {/* Hero */}
            <div className="text-center max-w-3xl mx-auto mb-20">
                <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-blue-500/10 border border-blue-500/20 text-blue-400 text-sm font-semibold mb-6">
                    Our Mission
                </div>
                <h1 className="text-4xl md:text-6xl font-extrabold tracking-tight text-white mb-6">
                    Re-imagining Enterprise Supply Chains for the Modern Era.
                </h1>
                <p className="text-lg text-zinc-400 leading-relaxed">
                    LogiCore was created to solve the rigidity of legacy ERP systems. We provide global businesses with a high-speed, modular platform that adapts instantly to market demands.
                </p>
            </div>

            {/* Global Telemetry Metrics */}
            <div className="grid grid-cols-2 md:grid-cols-4 gap-6 mb-24">
                {stats.map((stat, idx) => (
                    <div key={idx} className="p-6 rounded-2xl bg-zinc-900/60 border border-zinc-800/80 text-center backdrop-blur-xl">
                        <div className="text-3xl md:text-4xl font-extrabold text-white mb-2">{stat.value}</div>
                        <div className="text-xs text-zinc-400 font-medium uppercase tracking-wider">{stat.label}</div>
                    </div>
                ))}
            </div>

            {/* Core Architectural Principles */}
            <div className="mb-24">
                <div className="text-center max-w-2xl mx-auto mb-14">
                    <h2 className="text-3xl font-extrabold text-white mb-3">Our Architectural Principles</h2>
                    <p className="text-zinc-400 text-sm">How we design and build every single component in our platform stack.</p>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                    {principles.map((p, idx) => {
                        const IconComp = p.icon
                        return (
                            <div key={idx} className="p-8 rounded-3xl bg-zinc-900/40 border border-zinc-800 flex gap-6 backdrop-blur-xl">
                                <div className="w-12 h-12 rounded-2xl bg-blue-500/10 text-blue-400 flex items-center justify-center shrink-0">
                                    <IconComp className="w-6 h-6" />
                                </div>
                                <div>
                                    <h3 className="text-xl font-bold text-white mb-2">{p.title}</h3>
                                    <p className="text-zinc-400 text-sm leading-relaxed">{p.desc}</p>
                                </div>
                            </div>
                        )
                    })}
                </div>
            </div>

            {/* Enterprise Security & Compliance Section */}
            <div className="p-10 md:p-14 rounded-3xl bg-gradient-to-r from-zinc-900 via-zinc-950 to-zinc-900 border border-zinc-800 text-center max-w-4xl mx-auto mb-16 backdrop-blur-xl">
                <div className="w-12 h-12 rounded-2xl bg-emerald-500/10 text-emerald-400 flex items-center justify-center mx-auto mb-4">
                    <Award className="w-6 h-6" />
                </div>
                <h2 className="text-3xl font-extrabold text-white mb-4">Enterprise Grade Security & Compliance</h2>
                <p className="text-zinc-400 text-sm leading-relaxed max-w-2xl mx-auto mb-8">
                    Tested by third-party security auditors. Verified multi-tenant RLS isolation, encrypted data transmission, and SOC 2 Type II compliance.
                </p>
                <div className="flex flex-wrap justify-center gap-4 text-sm font-semibold">
                    <span className="px-4 py-2 bg-zinc-800/80 rounded-xl text-zinc-200 border border-zinc-700">SOC 2 Type II Certified</span>
                    <span className="px-4 py-2 bg-zinc-800/80 rounded-xl text-zinc-200 border border-zinc-700">ISO 27001 Certified</span>
                    <span className="px-4 py-2 bg-zinc-800/80 rounded-xl text-zinc-200 border border-zinc-700">GDPR Data Privacy Compliant</span>
                    <span className="px-4 py-2 bg-zinc-800/80 rounded-xl text-zinc-200 border border-zinc-700">HIPAA Compliant (Cold Chain)</span>
                </div>
            </div>
        </div>
    )
}
