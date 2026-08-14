'use client'

import React, { useState } from 'react'
import Link from 'next/link'
import { Check, HelpCircle, Sparkles, ArrowRight } from 'lucide-react'

export default function PricingPage() {
    const [billingCycle, setBillingCycle] = useState<'monthly' | 'annual'>('annual')
    const [selectedModules, setSelectedModules] = useState<string[]>(['inv', 'log'])

    const discount = billingCycle === 'annual' ? 0.8 : 1.0

    const tiers = [
        {
            name: 'Starter Tenant',
            price: Math.round(99 * discount),
            desc: 'Ideal for single-location fulfillment centers and growing brand operations.',
            features: [
                'Up to 1,000 monthly orders',
                'Single warehouse location',
                'Standard PostgreSQL RLS tenant',
                'Basic email support',
                'Catalog management',
            ],
            popular: false,
            cta: 'Start Free 14-Day Trial',
            href: '/register?tier=starter',
        },
        {
            name: 'Enterprise Growth',
            price: Math.round(299 * discount),
            desc: 'For multi-warehouse operations requiring live dispatch and supplier PO bidding.',
            features: [
                'Up to 25,000 monthly orders',
                'Unlimited warehouse locations',
                'PostgreSQL RLS strict isolation',
                'Automated PO bidding engine',
                '24/7 Priority SLA support',
                'Supreme Admin escalation access',
            ],
            popular: true,
            cta: 'Start Enterprise Trial',
            href: '/register?tier=growth',
        },
        {
            name: 'Custom Enterprise',
            price: 'Custom',
            desc: 'Bespoke logistics architecture for global multi-carrier 3PL networks.',
            features: [
                'Unlimited monthly orders & SKUs',
                'Custom database schema migrations',
                'Dedicated solutions engineer',
                '99.99% Guaranteed SLA uptime',
                'On-premise / private cloud deploy',
                'Custom module development SDK',
            ],
            popular: false,
            cta: 'Contact Sales Team',
            href: '/contact?subject=EnterprisePlan',
        },
    ]

    const modulesList = [
        { id: 'inv', name: 'Advanced Stock Control & SKU Sync', price: 99 },
        { id: 'log', name: 'Global Carrier Dispatch & Rates', price: 149 },
        { id: 'proc', name: 'Automated PO Procurement & Bidding', price: 129 },
        { id: 'ai', name: 'AI Demand Forecasting Engine', price: 199 },
    ]

    const toggleModule = (id: string) => {
        setSelectedModules((prev) =>
            prev.includes(id) ? prev.filter((m) => m !== id) : [...prev, id]
        )
    }

    const calculatedModuleTotal = selectedModules.reduce((acc, mId) => {
        const mod = modulesList.find((m) => m.id === mId)
        return acc + (mod ? mod.price : 0)
    }, 0)

    const baseGrowthPrice = Math.round(299 * discount)
    const customStackTotal = typeof baseGrowthPrice === 'number' ? baseGrowthPrice + Math.round(calculatedModuleTotal * discount) : 0

    const faqs = [
        {
            q: 'Can I add or remove modules after signing up?',
            a: 'Yes! LogiCore uses dynamic modular provisioning. You can toggle capabilities on or off at any time from your Tenant Settings dashboard.',
        },
        {
            q: 'How does multi-tenant data isolation work?',
            a: 'Data separation is strictly enforced at the database level using PostgreSQL Row-Level Security (RLS). Cross-tenant data leaks are mathematically prevented by the DB engine.',
        },
        {
            q: 'What happens when my 14-day trial ends?',
            a: 'You can select a subscription tier or customize your active modules. No charges will ever occur without explicit tenant admin approval.',
        },
        {
            q: 'Do you offer custom integrations for legacy ERP systems?',
            a: 'Yes, our Enterprise tier includes dedicated Solutions Engineering to build connectors for SAP, Oracle NetSuite, Microsoft Dynamics, and custom APIs.',
        },
    ]

    return (
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
            {/* Header */}
            <div className="text-center max-w-3xl mx-auto mb-16">
                <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-blue-500/10 border border-blue-500/20 text-blue-400 text-sm font-semibold mb-6">
                    Transparent Modular Pricing
                </div>
                <h1 className="text-4xl md:text-6xl font-extrabold tracking-tight text-white mb-6">
                    Pay Only for the Modules You Operationalize.
                </h1>
                <p className="text-lg text-zinc-400 leading-relaxed">
                    Scale your supply chain seamlessly. Every plan includes full multi-tenant PostgreSQL RLS security guarantees and catalog management.
                </p>

                {/* Annual / Monthly Toggle */}
                <div className="mt-10 inline-flex items-center gap-3 p-1.5 rounded-full bg-zinc-900 border border-zinc-800 backdrop-blur-xl">
                    <button
                        onClick={() => setBillingCycle('monthly')}
                        className={`px-5 py-2 rounded-full text-xs font-bold transition-all ${
                            billingCycle === 'monthly'
                                ? 'bg-blue-600 text-white shadow-md'
                                : 'text-zinc-400 hover:text-white'
                        }`}
                    >
                        Monthly Billing
                    </button>
                    <button
                        onClick={() => setBillingCycle('annual')}
                        className={`px-5 py-2 rounded-full text-xs font-bold transition-all flex items-center gap-2 ${
                            billingCycle === 'annual'
                                ? 'bg-blue-600 text-white shadow-md'
                                : 'text-zinc-400 hover:text-white'
                        }`}
                    >
                        Annual Billing
                        <span className="px-2 py-0.5 rounded-full bg-emerald-500/20 text-emerald-300 text-[10px] font-extrabold uppercase">
                            Save 20%
                        </span>
                    </button>
                </div>
            </div>

            {/* Pricing Cards Grid */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-24 items-stretch">
                {tiers.map((tier, idx) => (
                    <div
                        key={idx}
                        className={`relative rounded-3xl p-8 flex flex-col justify-between transition-all duration-300 backdrop-blur-xl ${
                            tier.popular
                                ? 'bg-zinc-900/90 border-2 border-blue-500 shadow-2xl shadow-blue-500/10 md:-translate-y-2'
                                : 'bg-zinc-900/40 border border-zinc-800/80 hover:border-zinc-700'
                        }`}
                    >
                        {tier.popular && (
                            <div className="absolute -top-3.5 left-1/2 -translate-x-1/2 px-4 py-1 rounded-full bg-blue-600 text-white text-xs font-extrabold uppercase tracking-wider shadow-lg flex items-center gap-1">
                                <Sparkles className="w-3 h-3" /> Most Popular
                            </div>
                        )}

                        <div>
                            <h3 className="text-xl font-bold text-white mb-2">{tier.name}</h3>
                            <p className="text-xs text-zinc-400 leading-relaxed mb-6 min-h-[36px]">{tier.desc}</p>

                            <div className="mb-6">
                                {typeof tier.price === 'number' ? (
                                    <div className="flex items-baseline gap-1">
                                        <span className="text-4xl font-black text-white">${tier.price}</span>
                                        <span className="text-zinc-500 text-sm font-medium">/ month</span>
                                    </div>
                                ) : (
                                    <div className="text-4xl font-black text-white">{tier.price}</div>
                                )}
                            </div>

                            <ul className="space-y-3 mb-8 text-sm text-zinc-300">
                                {tier.features.map((feat, fIdx) => (
                                    <li key={fIdx} className="flex items-center gap-2.5">
                                        <Check className="w-4 h-4 text-blue-400 shrink-0" />
                                        <span>{feat}</span>
                                    </li>
                                ))}
                            </ul>
                        </div>

                        <Link
                            href={tier.href}
                            className={`w-full py-3.5 rounded-xl font-bold text-sm text-center transition-all flex items-center justify-center gap-2 ${
                                tier.popular
                                    ? 'bg-blue-600 hover:bg-blue-500 text-white shadow-lg shadow-blue-600/30'
                                    : 'bg-zinc-800 hover:bg-zinc-700 text-white border border-zinc-700'
                            }`}
                        >
                            {tier.cta}
                            <ArrowRight className="w-4 h-4" />
                        </Link>
                    </div>
                ))}
            </div>

            {/* Custom Interactive Module Stack Estimator */}
            <div className="p-8 md:p-12 rounded-3xl bg-zinc-900/40 border border-zinc-800 backdrop-blur-xl mb-24">
                <div className="max-w-3xl mb-8">
                    <span className="text-xs font-bold uppercase tracking-wider text-blue-400 mb-2 block">
                        Interactive Stack Builder
                    </span>
                    <h2 className="text-3xl font-extrabold text-white mb-3">
                        Build Your Custom Enterprise Stack
                    </h2>
                    <p className="text-zinc-400 text-sm">
                        Toggle specific operational modules to calculate your tailored monthly investment.
                    </p>
                </div>

                <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 items-center">
                    <div className="lg:col-span-2 space-y-3">
                        {modulesList.map((mod) => {
                            const isSelected = selectedModules.includes(mod.id)
                            return (
                                <div
                                    key={mod.id}
                                    onClick={() => toggleModule(mod.id)}
                                    className={`p-4 rounded-2xl border transition-all cursor-pointer flex items-center justify-between ${
                                        isSelected
                                            ? 'bg-blue-600/10 border-blue-500/60 text-white'
                                            : 'bg-zinc-950/60 border-zinc-800 text-zinc-400 hover:border-zinc-700'
                                    }`}
                                >
                                    <div className="flex items-center gap-3">
                                        <div className={`w-5 h-5 rounded-md flex items-center justify-center border ${isSelected ? 'bg-blue-600 border-blue-600 text-white' : 'border-zinc-700'}`}>
                                            {isSelected && <Check className="w-3.5 h-3.5" />}
                                        </div>
                                        <span className="text-sm font-semibold">{mod.name}</span>
                                    </div>
                                    <span className="text-sm font-bold text-white">
                                        +${Math.round(mod.price * discount)}/mo
                                    </span>
                                </div>
                            )
                        })}
                    </div>

                    <div className="p-8 rounded-2xl bg-zinc-950 border border-zinc-800 text-center space-y-4">
                        <div className="text-xs text-zinc-500 font-bold uppercase tracking-wider">Calculated Monthly Total</div>
                        <div className="text-5xl font-black text-white">
                            ${customStackTotal}
                            <span className="text-zinc-500 text-sm font-normal"> / mo</span>
                        </div>
                        <div className="text-xs text-zinc-400">
                            Includes Base Growth Tier + {selectedModules.length} selected modules ({billingCycle} discount applied).
                        </div>
                        <Link
                            href={`/register?customStack=${selectedModules.join(',')}`}
                            className="block w-full py-3.5 rounded-xl bg-blue-600 hover:bg-blue-500 text-white font-bold text-sm transition-all shadow-lg shadow-blue-600/30"
                        >
                            Provision This Stack
                        </Link>
                    </div>
                </div>
            </div>

            {/* Interactive Enterprise ROI & Cost Savings Calculator */}
            <ROICalculatorWidget />

            {/* Frequently Asked Questions */}
            <div className="max-w-4xl mx-auto">
                <div className="text-center mb-12">
                    <h2 className="text-3xl font-extrabold text-white mb-3">Frequently Asked Questions</h2>
                    <p className="text-zinc-400 text-sm">Everything you need to know about tenant licensing and provisioning.</p>
                </div>

                <div className="space-y-4">
                    {faqs.map((faq, idx) => (
                        <div key={idx} className="p-6 rounded-2xl bg-zinc-900/40 border border-zinc-800/80 backdrop-blur-xl">
                            <h3 className="font-bold text-white text-base mb-2 flex items-center gap-2">
                                <HelpCircle className="w-4 h-4 text-blue-400 shrink-0" />
                                {faq.q}
                            </h3>
                            <p className="text-zinc-400 text-sm leading-relaxed pl-6">{faq.a}</p>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    )
}

function ROICalculatorWidget() {
    const [monthlyOrders, setMonthlyOrders] = useState(15000)
    const [warehouses, setWarehouses] = useState(3)
    const [avgOrderCost, setAvgOrderCost] = useState(18)

    // ROI Math
    const totalFreightSpend = monthlyOrders * avgOrderCost
    const monthlyFreightSavings = Math.round(totalFreightSpend * 0.18) // 18% rate optimization
    const stockoutRecovery = Math.round(warehouses * 4500) // $4.5k saved per node from automated reorders
    const totalMonthlySavings = monthlyFreightSavings + stockoutRecovery
    const annualSavings = totalMonthlySavings * 12

    return (
        <div className="p-8 md:p-12 rounded-3xl bg-gradient-to-br from-zinc-900 via-zinc-950 to-zinc-900 border border-zinc-800 backdrop-blur-xl mb-24">
            <div className="max-w-3xl mb-8">
                <span className="text-xs font-bold uppercase tracking-wider text-emerald-400 mb-2 block">
                    Enterprise Financial Modeling
                </span>
                <h2 className="text-3xl font-extrabold text-white mb-3">
                    Estimate Your Annual Logistics ROI
                </h2>
                <p className="text-zinc-400 text-sm">
                    Adjust the sliders below to calculate projected freight cost reductions and stockout recovery.
                </p>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-10 items-center">
                {/* Sliders Column */}
                <div className="lg:col-span-2 space-y-6">
                    <div>
                        <div className="flex justify-between text-xs font-bold text-zinc-300 mb-2">
                            <span>Monthly Package Volume</span>
                            <span className="text-blue-400 font-mono">{monthlyOrders.toLocaleString()} orders/mo</span>
                        </div>
                        <input
                            type="range"
                            min="1000"
                            max="100000"
                            step="1000"
                            value={monthlyOrders}
                            onChange={(e) => setMonthlyOrders(Number(e.target.value))}
                            className="w-full h-2 bg-zinc-800 rounded-lg appearance-none cursor-pointer accent-blue-500"
                        />
                    </div>

                    <div>
                        <div className="flex justify-between text-xs font-bold text-zinc-300 mb-2">
                            <span>Active Fulfillment Centers / Warehouses</span>
                            <span className="text-blue-400 font-mono">{warehouses} Locations</span>
                        </div>
                        <input
                            type="range"
                            min="1"
                            max="25"
                            step="1"
                            value={warehouses}
                            onChange={(e) => setWarehouses(Number(e.target.value))}
                            className="w-full h-2 bg-zinc-800 rounded-lg appearance-none cursor-pointer accent-blue-500"
                        />
                    </div>

                    <div>
                        <div className="flex justify-between text-xs font-bold text-zinc-300 mb-2">
                            <span>Average Shipping & Fulfillment Cost / Order</span>
                            <span className="text-blue-400 font-mono">${avgOrderCost}</span>
                        </div>
                        <input
                            type="range"
                            min="5"
                            max="50"
                            step="1"
                            value={avgOrderCost}
                            onChange={(e) => setAvgOrderCost(Number(e.target.value))}
                            className="w-full h-2 bg-zinc-800 rounded-lg appearance-none cursor-pointer accent-blue-500"
                        />
                    </div>
                </div>

                {/* Calculation Output Box */}
                <div className="p-8 rounded-2xl bg-zinc-950 border border-zinc-800 text-center space-y-4">
                    <div className="text-xs text-zinc-500 font-bold uppercase tracking-wider">Projected Annual Savings</div>
                    <div className="text-4xl md:text-5xl font-black text-emerald-400">
                        ${annualSavings.toLocaleString()}
                        <span className="text-zinc-500 text-xs block font-normal mt-1">/ year in recovered operational value</span>
                    </div>
                    <div className="pt-2 border-t border-zinc-800 text-xs text-zinc-400 space-y-1 text-left">
                        <div className="flex justify-between">
                            <span>Carrier Rate Optimization (18%):</span>
                            <span className="text-white font-mono">${(monthlyFreightSavings * 12).toLocaleString()}/yr</span>
                        </div>
                        <div className="flex justify-between">
                            <span>Prevented Stockout Downtime:</span>
                            <span className="text-white font-mono">${(stockoutRecovery * 12).toLocaleString()}/yr</span>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

