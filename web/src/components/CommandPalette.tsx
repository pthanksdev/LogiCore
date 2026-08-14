'use client'

import React, { useState, useEffect } from 'react'
import { useRouter } from 'next/navigation'
import { Search, Command, LayoutDashboard, Truck, Warehouse, DollarSign, Users, Key, LifeBuoy, ShieldCheck, Lock, Activity, X } from 'lucide-react'

export function CommandPalette() {
    const [isOpen, setIsOpen] = useState(false)
    const [query, setQuery] = useState('')
    const router = useRouter()

    useEffect(() => {
        const handleKeyDown = (e: KeyboardEvent) => {
            if ((e.metaKey || e.ctrlKey) && e.key === 'k') {
                e.preventDefault()
                setIsOpen((prev) => !prev)
            }
            if (e.key === 'Escape') {
                setIsOpen(false)
            }
        }
        window.addEventListener('keydown', handleKeyDown)
        return () => window.removeEventListener('keydown', handleKeyDown)
    }, [])

    const links = [
        { label: 'Supreme Dashboard', url: '/supreme/dashboard', icon: LayoutDashboard, category: 'Supreme' },
        { label: 'Supreme Financials', url: '/supreme/billing', icon: DollarSign, category: 'Supreme' },
        { label: 'Global Tenants & Quotas', url: '/supreme/tenants', icon: Users, category: 'Supreme' },
        { label: 'Security Audit Logs', url: '/supreme/audit-logs', icon: Lock, category: 'Supreme' },
        { label: 'Infrastructure Telemetry', url: '/supreme/system-health', icon: Activity, category: 'Supreme' },
        { label: 'Regional Inventory', url: '/admin/inventory', icon: Warehouse, category: 'Platform Admin' },
        { label: 'Carrier Freight Dispatch', url: '/admin/shipments', icon: Truck, category: 'Platform Admin' },
        { label: 'Support Queue & SLA', url: '/admin/support', icon: LifeBuoy, category: 'Platform Admin' },
        { label: 'Operational Analytics', url: '/admin/analytics', icon: Activity, category: 'Platform Admin' },
        { label: 'Customer Billing & Invoices', url: '/dashboard/billing', icon: DollarSign, category: 'Customer Portal' },
        { label: 'Live Cargo GPS Tracking', url: '/dashboard/shipments', icon: Truck, category: 'Customer Portal' },
        { label: 'Team Access Control', url: '/dashboard/team', icon: Users, category: 'Customer Portal' },
        { label: 'ERP Webhooks & API Keys', url: '/dashboard/integrations', icon: Key, category: 'Customer Portal' },
        { label: 'Public Parcel Tracking', url: '/track', icon: Search, category: 'Public' },
        { label: 'Platform Features & Matrix', url: '/features', icon: ShieldCheck, category: 'Public' },
        { label: 'Industry Solutions', url: '/solutions', icon: Warehouse, category: 'Public' },
        { label: 'Pricing Calculator', url: '/pricing', icon: DollarSign, category: 'Public' },
    ]

    const filtered = links.filter((item) =>
        item.label.toLowerCase().includes(query.toLowerCase()) ||
        item.category.toLowerCase().includes(query.toLowerCase())
    )

    const handleSelect = (url: string) => {
        setIsOpen(false)
        setQuery('')
        router.push(url)
    }

    if (!isOpen) return null

    return (
        <div className="fixed inset-0 z-50 bg-black/70 backdrop-blur-md flex items-start justify-center pt-20 px-4 animate-in fade-in duration-200">
            <div className="bg-zinc-900 border border-zinc-800 w-full max-w-2xl rounded-3xl shadow-2xl overflow-hidden flex flex-col max-h-[80vh]">
                {/* Search Bar Header */}
                <div className="p-4 border-b border-zinc-800 flex items-center gap-3">
                    <Search className="w-5 h-5 text-zinc-400 shrink-0" />
                    <input
                        type="text"
                        autoFocus
                        value={query}
                        onChange={(e) => setQuery(e.target.value)}
                        placeholder="Search modules, analytics, endpoints, or pages... (ESC to close)"
                        className="w-full bg-transparent text-white text-base outline-none font-sans placeholder:text-zinc-500"
                    />
                    <button
                        onClick={() => setIsOpen(false)}
                        className="p-1 rounded-lg hover:bg-zinc-800 text-zinc-400 hover:text-white"
                    >
                        <X className="w-5 h-5" />
                    </button>
                </div>

                {/* Results List */}
                <div className="overflow-y-auto p-2 space-y-1">
                    {filtered.length > 0 ? (
                        filtered.map((item) => {
                            const IconComp = item.icon
                            return (
                                <button
                                    key={item.url}
                                    onClick={() => handleSelect(item.url)}
                                    className="w-full p-3 rounded-2xl flex items-center justify-between hover:bg-zinc-800/80 text-left transition-colors group"
                                >
                                    <div className="flex items-center gap-3">
                                        <div className="w-9 h-9 rounded-xl bg-zinc-950 border border-zinc-800 flex items-center justify-center text-blue-400 group-hover:border-blue-500/50">
                                            <IconComp className="w-4 h-4" />
                                        </div>
                                        <div>
                                            <div className="text-sm font-bold text-white group-hover:text-blue-400 transition-colors">
                                                {item.label}
                                            </div>
                                            <div className="text-xs text-zinc-500 font-mono">{item.url}</div>
                                        </div>
                                    </div>
                                    <span className="text-[10px] font-mono font-bold px-2 py-0.5 rounded-full bg-zinc-950 border border-zinc-800 text-zinc-400">
                                        {item.category}
                                    </span>
                                </button>
                            )
                        })
                    ) : (
                        <div className="p-8 text-center text-sm text-zinc-500 font-mono">
                            No matching commands found.
                        </div>
                    )}
                </div>

                {/* Footer Command Hints */}
                <div className="p-3 border-t border-zinc-800 bg-zinc-950/60 flex items-center justify-between text-xs text-zinc-500 font-mono">
                    <div className="flex items-center gap-2">
                        <span className="px-1.5 py-0.5 rounded bg-zinc-800 text-zinc-300">↑↓</span> to navigate
                        <span className="px-1.5 py-0.5 rounded bg-zinc-800 text-zinc-300">ESC</span> to exit
                    </div>
                    <div className="flex items-center gap-1 text-blue-400">
                        <Command className="w-3.5 h-3.5" /> SCM Command Palette
                    </div>
                </div>
            </div>
        </div>
    )
}
