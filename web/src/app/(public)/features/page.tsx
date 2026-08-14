'use client'

import React, { useState } from 'react'
import Link from 'next/link'
import { Zap, ShieldCheck, Activity, ArrowRight, Check, Layers, Lock, BarChart3 } from 'lucide-react'
import { TextReveal, HoverCard } from '@/components/MotionComponents'

export default function FeaturesPage() {
    const [activeTab, setActiveTab] = useState<'modular' | 'security' | 'inventory' | 'procurement' | 'supreme'>('modular')

    const tabs = [
        { id: 'modular', label: 'Modular Architecture' },
        { id: 'security', label: 'Multi-Tenant RLS Security' },
        { id: 'inventory', label: 'Real-Time Inventory' },
        { id: 'procurement', label: 'Procurement & PO Engine' },
        { id: 'supreme', label: 'Supreme Governance' },
    ]

    return (
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
            {/* Header */}
            <div className="text-center max-w-3xl mx-auto mb-16">
                <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-blue-500/10 border border-blue-500/20 text-blue-400 text-sm font-semibold mb-6">
                    Enterprise Capability Matrix
                </div>
                <h1 className="text-4xl md:text-6xl font-extrabold tracking-tight text-white mb-6">
                    <TextReveal text="Engineered for Absolute Reliability and Scale." />
                </h1>
                <p className="text-lg text-zinc-400 leading-relaxed">
                    Explore the modular components powering modern enterprise supply chains. Built on Next.js 16 App Router, Turbopack, and PostgreSQL Row-Level Security.
                </p>
            </div>

            {/* Interactive Tabbed Feature Showcase */}
            <div className="mb-24">
                <div className="flex overflow-x-auto no-scrollbar justify-start md:justify-center gap-2 pb-4 mb-8">
                    {tabs.map((tab) => (
                        <button
                            key={tab.id}
                            onClick={() => setActiveTab(tab.id as any)}
                            className={`px-5 py-3 rounded-2xl text-sm font-semibold whitespace-nowrap transition-all ${
                                activeTab === tab.id
                                    ? 'bg-blue-600 text-white shadow-lg shadow-blue-600/30'
                                    : 'bg-zinc-900/60 text-zinc-400 hover:text-white hover:bg-zinc-800'
                            }`}
                        >
                            {tab.label}
                        </button>
                    ))}
                </div>

                {/* Tab Content Cards */}
                <div className="p-8 md:p-12 rounded-3xl bg-zinc-900/40 border border-zinc-800 backdrop-blur-xl">
                    {activeTab === 'modular' && (
                        <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 items-center">
                            <div className="space-y-6">
                                <div className="inline-flex items-center gap-2 text-xs font-bold text-blue-400 uppercase tracking-wider">
                                    Dynamic Provisioning Engine
                                </div>
                                <h2 className="text-3xl font-extrabold text-white">
                                    Compartmentalized Modules that Scale on Demand.
                                </h2>
                                <p className="text-zinc-400 leading-relaxed">
                                    Unlike traditional legacy ERP monolithic software, LogiCore isolates capabilities into autonomous modules. Turn on advanced inventory control or global carrier routing with a single click.
                                </p>
                                <ul className="space-y-3 text-sm text-zinc-300">
                                    <li className="flex items-center gap-3">
                                        <div className="w-6 h-6 rounded-full bg-blue-500/20 text-blue-400 flex items-center justify-center font-bold text-xs">1</div>
                                        Zero downtime module activation
                                    </li>
                                    <li className="flex items-center gap-3">
                                        <div className="w-6 h-6 rounded-full bg-blue-500/20 text-blue-400 flex items-center justify-center font-bold text-xs">2</div>
                                        Pay strictly for active operational features
                                    </li>
                                    <li className="flex items-center gap-3">
                                        <div className="w-6 h-6 rounded-full bg-blue-500/20 text-blue-400 flex items-center justify-center font-bold text-xs">3</div>
                                        Custom developer SDK for third-party extensions
                                    </li>
                                </ul>
                            </div>
                            <div className="p-6 rounded-2xl bg-zinc-950 border border-zinc-800 font-mono text-xs text-zinc-300">
                                <div className="flex items-center justify-between pb-4 mb-4 border-b border-zinc-800 text-zinc-500">
                                    <span>module-manifest.json</span>
                                    <span className="text-emerald-400">LIVE STATUS</span>
                                </div>
                                <pre className="overflow-x-auto text-blue-300 leading-relaxed">
{`{
  "tenant_id": "t_9921_apex",
  "modules": [
    { "name": "INVENTORY_PRO", "status": "ACTIVE" },
    { "name": "GLOBAL_LOGISTICS", "status": "ACTIVE" },
    { "name": "PO_PROCUREMENT", "status": "ACTIVE" },
    { "name": "AI_DEMAND_FORECAST", "status": "PENDING" }
  ],
  "rls_policy": "STRICT_TENANT_ISOLATION"
}`}
                                </pre>
                            </div>
                        </div>
                    )}

                    {activeTab === 'security' && (
                        <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 items-center">
                            <div className="space-y-6">
                                <div className="inline-flex items-center gap-2 text-xs font-bold text-emerald-400 uppercase tracking-wider">
                                    PostgreSQL Row Level Security
                                </div>
                                <h2 className="text-3xl font-extrabold text-white">
                                    Hardware-Grade Multi-Tenant Data Isolation.
                                </h2>
                                <p className="text-zinc-400 leading-relaxed">
                                    Every database request passes through strict RLS policies bound to user claims (`auth.uid()`). Multi-tenancy is enforced directly inside PostgreSQL, eliminating cross-tenant data leaks.
                                </p>
                                <ul className="space-y-3 text-sm text-zinc-300">
                                    <li className="flex items-center gap-3">
                                        <Check className="w-5 h-5 text-emerald-400 shrink-0" />
                                        Engine-enforced RLS policies on all tables
                                    </li>
                                    <li className="flex items-center gap-3">
                                        <Check className="w-5 h-5 text-emerald-400 shrink-0" />
                                        Cryptographic JWT authentication hooks
                                    </li>
                                    <li className="flex items-center gap-3">
                                        <Check className="w-5 h-5 text-emerald-400 shrink-0" />
                                        Immutable audit logs for compliance requirements
                                    </li>
                                </ul>
                            </div>
                            <div className="p-6 rounded-2xl bg-zinc-950 border border-zinc-800 font-mono text-xs text-zinc-300">
                                <div className="flex items-center justify-between pb-4 mb-4 border-b border-zinc-800 text-zinc-500">
                                    <span>postgres-rls-policy.sql</span>
                                    <span className="text-emerald-400">ENFORCED</span>
                                </div>
                                <pre className="overflow-x-auto text-emerald-300 leading-relaxed">
{`CREATE POLICY "Tenant orders access" 
ON public.orders 
FOR ALL 
USING (
  tenant_id = (SELECT tenant_id FROM public.users WHERE id = auth.uid())
);`}
                                </pre>
                            </div>
                        </div>
                    )}

                    {activeTab === 'inventory' && (
                        <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 items-center">
                            <div className="space-y-6">
                                <div className="inline-flex items-center gap-2 text-xs font-bold text-purple-400 uppercase tracking-wider">
                                    Sub-Second Stock Sync
                                </div>
                                <h2 className="text-3xl font-extrabold text-white">
                                    Real-Time SKU Tracking & Automated Reorder Alerting.
                                </h2>
                                <p className="text-zinc-400 leading-relaxed">
                                    Monitor warehouse stock levels across multiple fulfillment centers instantly. Set automated reorder trigger points to prevent stockouts before sales are impacted.
                                </p>
                                <ul className="space-y-3 text-sm text-zinc-300">
                                    <li className="flex items-center gap-3">
                                        <Check className="w-5 h-5 text-purple-400 shrink-0" />
                                        Multi-location inventory aggregation
                                    </li>
                                    <li className="flex items-center gap-3">
                                        <Check className="w-5 h-5 text-purple-400 shrink-0" />
                                        Low-stock push notifications & webhook events
                                    </li>
                                </ul>
                            </div>
                            <div className="p-6 rounded-2xl bg-zinc-950 border border-zinc-800 space-y-3">
                                <div className="p-4 bg-zinc-900/80 rounded-xl border border-zinc-800 flex items-center justify-between">
                                    <div>
                                        <div className="text-xs font-bold text-white">SKU-9921-PALLET</div>
                                        <div className="text-xs text-zinc-400">Warehouse Node Alpha (LAX)</div>
                                    </div>
                                    <span className="px-2.5 py-1 bg-emerald-500/10 border border-emerald-500/20 text-emerald-400 font-bold text-xs rounded-full">1,420 in Stock</span>
                                </div>
                                <div className="p-4 bg-zinc-900/80 rounded-xl border border-zinc-800 flex items-center justify-between">
                                    <div>
                                        <div className="text-xs font-bold text-white">SKU-4412-CONTAINER</div>
                                        <div className="text-xs text-zinc-400">Warehouse Node Delta (ORD)</div>
                                    </div>
                                    <span className="px-2.5 py-1 bg-amber-500/10 border border-amber-500/20 text-amber-400 font-bold text-xs rounded-full">12 Left (Low Stock)</span>
                                </div>
                            </div>
                        </div>
                    )}

                    {activeTab === 'procurement' && (
                        <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 items-center">
                            <div className="space-y-6">
                                <div className="inline-flex items-center gap-2 text-xs font-bold text-amber-400 uppercase tracking-wider">
                                    Supplier Bidding & Approvals
                                </div>
                                <h2 className="text-3xl font-extrabold text-white">
                                    Streamlined Purchase Orders and Approval Chains.
                                </h2>
                                <p className="text-zinc-400 leading-relaxed">
                                    Automate supplier quotes, generate purchase orders, and route approvals directly to Company Admins with clear audit trails.
                                </p>
                            </div>
                            <div className="p-6 rounded-2xl bg-zinc-950 border border-zinc-800 space-y-3">
                                <div className="p-4 bg-zinc-900/80 rounded-xl border border-zinc-800 flex items-center justify-between">
                                    <div>
                                        <div className="text-xs font-bold text-white">PO-2026-8812</div>
                                        <div className="text-xs text-zinc-400">Supplier: Apex Global Tech</div>
                                    </div>
                                    <span className="px-2.5 py-1 bg-blue-500/10 border border-blue-500/20 text-blue-400 font-bold text-xs rounded-full">APPROVED ($42,000)</span>
                                </div>
                            </div>
                        </div>
                    )}

                    {activeTab === 'supreme' && (
                        <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 items-center">
                            <div className="space-y-6">
                                <div className="inline-flex items-center gap-2 text-xs font-bold text-rose-400 uppercase tracking-wider">
                                    Platform Oversight
                                </div>
                                <h2 className="text-3xl font-extrabold text-white">
                                    Supreme Tier Controls for Complete Platform Governance.
                                </h2>
                                <p className="text-zinc-400 leading-relaxed">
                                    Platform Supreme Admins can audit tenant health, handle escalated order disputes, provision staff roles, and deploy migrations without breaking tenant boundaries.
                                </p>
                            </div>
                            <div className="p-6 rounded-2xl bg-zinc-950 border border-zinc-800">
                                <div className="text-xs font-bold text-rose-400 uppercase mb-2">Supreme Governance Console</div>
                                <div className="text-sm text-zinc-300 mb-4">Total Active Tenants: <span className="text-white font-bold">142</span></div>
                                <div className="text-sm text-zinc-300">Escalated Dispute Queue: <span className="text-emerald-400 font-bold">0 Pending</span></div>
                            </div>
                        </div>
                    )}
                </div>
            </div>

            {/* Architecture Highlights Grid */}
            <div className="mb-24">
                <div className="text-center max-w-2xl mx-auto mb-12">
                    <h2 className="text-3xl font-extrabold text-white mb-3">Built for High-Throughput Enterprises</h2>
                    <p className="text-zinc-400 text-sm">Engineered with low-latency server components and edge rendering capabilities.</p>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                    <HoverCard className="p-6 rounded-2xl">
                        <div className="w-10 h-10 rounded-xl bg-blue-500/10 text-blue-400 flex items-center justify-center font-bold mb-4">
                            <Zap className="w-5 h-5" />
                        </div>
                        <h3 className="font-bold text-white text-lg mb-2">Next.js 16 Turbopack</h3>
                        <p className="text-zinc-400 text-sm leading-relaxed">Sub-10ms Server-Side Rendering with dynamic server actions and streaming UI.</p>
                    </HoverCard>

                    <HoverCard className="p-6 rounded-2xl">
                        <div className="w-10 h-10 rounded-xl bg-emerald-500/10 text-emerald-400 flex items-center justify-center font-bold mb-4">
                            <Lock className="w-5 h-5" />
                        </div>
                        <h3 className="font-bold text-white text-lg mb-2">Multi-Tenant Isolation</h3>
                        <p className="text-zinc-400 text-sm leading-relaxed">Native PostgreSQL RLS policies guarantee total tenant separation.</p>
                    </HoverCard>

                    <HoverCard className="p-6 rounded-2xl">
                        <div className="w-10 h-10 rounded-xl bg-purple-500/10 text-purple-400 flex items-center justify-center font-bold mb-4">
                            <BarChart3 className="w-5 h-5" />
                        </div>
                        <h3 className="font-bold text-white text-lg mb-2">Live Order Streaming</h3>
                        <p className="text-zinc-400 text-sm leading-relaxed">Real-time order status updates & carrier dispatch synchronization.</p>
                    </HoverCard>
                </div>
            </div>

            {/* Bottom Call to Action */}
            <div className="text-center p-12 rounded-3xl bg-gradient-to-r from-blue-900/30 via-indigo-900/20 to-purple-900/30 border border-blue-500/30 backdrop-blur-xl">
                <h2 className="text-3xl font-extrabold text-white mb-4">Ready to test our modular architecture?</h2>
                <p className="text-zinc-400 text-sm max-w-xl mx-auto mb-8">Set up your free tenant account in less than two minutes with full access to core modules.</p>
                <Link
                    href="/register"
                    className="inline-flex items-center gap-2 px-8 py-4 rounded-xl bg-blue-600 hover:bg-blue-500 text-white font-bold text-base transition-all shadow-xl shadow-blue-600/30"
                >
                    Start Free Trial
                    <ArrowRight className="w-4 h-4" />
                </Link>
            </div>
        </div>
    )
}
