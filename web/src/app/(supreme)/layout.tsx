'use client'

import React, { useState } from 'react'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { openCommandPalette } from '@/components/CommandPalette'
import { Menu, X, LayoutDashboard, Layers, AlertTriangle, ShieldCheck, Building, DollarSign, Lock, Activity, LogOut, Search } from 'lucide-react'

export default function SupremeLayout({
    children,
}: {
    children: React.ReactNode
}) {
    const [mobileOpen, setMobileOpen] = useState(false)
    const pathname = usePathname()

    const coreNav = [
        { label: 'System Dashboard', href: '/supreme/dashboard', icon: LayoutDashboard },
        { label: 'Catalog CRUD Manager', href: '/supreme/modules', icon: Layers },
        { label: 'Escalations Queue', href: '/supreme/escalations', icon: AlertTriangle },
        { label: 'Staff & Role Manager', href: '/supreme/staff', icon: ShieldCheck },
    ]

    const opsNav = [
        { label: 'Enterprise Tenants', href: '/supreme/tenants', icon: Building },
        { label: 'Financial Ledger', href: '/supreme/billing', icon: DollarSign },
        { label: 'System Audit Logs', href: '/supreme/audit-logs', icon: Lock },
        { label: 'Infrastructure Health', href: '/supreme/system-health', icon: Activity },
    ]

    const renderNav = (closeMobile = false) => (
        <nav className="space-y-1 px-3">
            <div className="px-3 mb-2 text-xs font-semibold text-zinc-500 uppercase tracking-wider">Core Management</div>
            {coreNav.map((item) => {
                const IconComp = item.icon
                const isActive = pathname === item.href
                return (
                    <Link
                        key={item.href}
                        href={item.href}
                        onClick={() => closeMobile && setMobileOpen(false)}
                        className={`flex items-center gap-3 px-3 py-2.5 text-sm font-medium rounded-xl transition-colors ${
                            isActive
                                ? 'bg-purple-600/15 text-purple-400 border border-purple-500/30'
                                : 'text-zinc-400 hover:text-white hover:bg-zinc-800/60'
                        }`}
                    >
                        <IconComp className="w-4 h-4 shrink-0" />
                        {item.label}
                    </Link>
                )
            })}

            <div className="px-3 pt-6 mb-2 text-xs font-semibold text-zinc-500 uppercase tracking-wider">Platform Operations</div>
            {opsNav.map((item) => {
                const IconComp = item.icon
                const isActive = pathname === item.href
                return (
                    <Link
                        key={item.href}
                        href={item.href}
                        onClick={() => closeMobile && setMobileOpen(false)}
                        className={`flex items-center gap-3 px-3 py-2.5 text-sm font-medium rounded-xl transition-colors ${
                            isActive
                                ? 'bg-purple-600/15 text-purple-400 border border-purple-500/30'
                                : 'text-zinc-400 hover:text-white hover:bg-zinc-800/60'
                        }`}
                    >
                        <IconComp className="w-4 h-4 shrink-0" />
                        {item.label}
                    </Link>
                )
            })}
        </nav>
    )

    return (
        <div className="flex flex-col md:flex-row h-screen bg-zinc-950 font-sans text-white overflow-hidden">
            {/* Mobile Header Bar */}
            <div className="md:hidden bg-zinc-900 border-b border-zinc-800 px-4 py-3 flex items-center justify-between z-40 shrink-0">
                <div>
                    <div className="font-bold text-lg text-purple-400">Supreme Admin</div>
                </div>
                <div className="flex items-center gap-2">
                    <button
                        onClick={() => openCommandPalette()}
                        className="p-2 rounded-xl bg-zinc-800 text-purple-400 hover:text-white"
                        aria-label="Search"
                    >
                        <Search className="w-5 h-5" />
                    </button>
                    <button
                        onClick={() => setMobileOpen(!mobileOpen)}
                        className="p-2 rounded-xl bg-zinc-800 text-zinc-300 hover:text-white"
                    >
                        {mobileOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
                    </button>
                </div>
            </div>

            {/* Mobile Slide-Over Drawer */}
            {mobileOpen && (
                <div className="md:hidden fixed inset-0 z-50 bg-black/80 backdrop-blur-md flex flex-col">
                    <div className="p-4 border-b border-zinc-800 flex items-center justify-between bg-zinc-900">
                        <div className="font-bold text-lg text-purple-400">Supreme Platform Control</div>
                        <button onClick={() => setMobileOpen(false)} className="p-2 rounded-xl bg-zinc-800 text-zinc-400">
                            <X className="w-6 h-6" />
                        </button>
                    </div>
                    <div className="flex-1 overflow-y-auto py-4 bg-zinc-950">
                        {renderNav(true)}
                    </div>
                    <div className="p-4 border-t border-zinc-800 bg-zinc-900">
                        <form action="/auth/signout" method="post">
                            <button className="w-full py-3 text-sm font-semibold text-zinc-400 hover:text-white bg-zinc-800 rounded-xl transition-colors flex items-center justify-center gap-2">
                                <LogOut className="w-4 h-4" /> Sign out Securely
                            </button>
                        </form>
                    </div>
                </div>
            )}

            {/* Desktop Sidebar */}
            <aside className="hidden md:flex w-64 bg-zinc-900 border-r border-zinc-800 flex-col shrink-0">
                <div className="p-6 border-b border-zinc-800">
                    <div className="font-bold text-xl tracking-tight mb-1 text-purple-400">Supreme Admin</div>
                    <div className="text-xs text-zinc-500 font-mono truncate text-purple-400/50 mb-4">Platform Owner</div>

                    <button
                        onClick={() => openCommandPalette()}
                        className="w-full px-3 py-2 rounded-xl bg-zinc-950 border border-zinc-800 text-zinc-400 hover:text-white text-xs font-mono flex items-center justify-between transition-all hover:border-purple-500/50"
                    >
                        <span className="flex items-center gap-2">
                            <Search className="w-3.5 h-3.5 text-purple-400" /> Search...
                        </span>
                        <kbd className="px-1.5 py-0.5 rounded bg-zinc-800 text-zinc-300 text-[10px]">⌘K</kbd>
                    </button>
                </div>

                <div className="flex-1 overflow-y-auto py-4">
                    {renderNav(false)}
                </div>

                <div className="p-4 border-t border-zinc-800">
                    <form action="/auth/signout" method="post">
                        <button className="w-full px-4 py-2.5 text-sm font-medium text-zinc-400 hover:text-white bg-zinc-800 hover:bg-zinc-700 rounded-xl transition-colors flex items-center justify-center gap-2">
                            <LogOut className="w-4 h-4" /> Sign out Securely
                        </button>
                    </form>
                </div>
            </aside>

            {/* Main Content Area */}
            <main className="flex-1 overflow-y-auto p-4 sm:p-6 lg:p-8">
                {children}
            </main>
        </div>
    )
}
