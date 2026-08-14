'use client'

import React, { useState, useEffect } from 'react'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import {
    Zap,
    ArrowRight,
    Menu,
    X,
    Search,
    Package,
    Truck,
    Globe,
    Briefcase,
    ShieldCheck,
    Layers,
    CreditCard,
} from 'lucide-react'

export default function PublicLayout({
    children,
}: {
    children: React.ReactNode
}) {
    const pathname = usePathname()
    const [scrolled, setScrolled] = useState(false)
    const [mobileMenuOpen, setMobileMenuOpen] = useState(false)
    const [cmdKOpen, setCmdKOpen] = useState(false)

    useEffect(() => {
        const handleScroll = () => {
            setScrolled(window.scrollY > 20)
        }
        const handleKeyDown = (e: KeyboardEvent) => {
            if ((e.metaKey || e.ctrlKey) && e.key === 'k') {
                e.preventDefault()
                setCmdKOpen((prev) => !prev)
            }
        }
        window.addEventListener('scroll', handleScroll, { passive: true })
        window.addEventListener('keydown', handleKeyDown)
        return () => {
            window.removeEventListener('scroll', handleScroll)
            window.removeEventListener('keydown', handleKeyDown)
        }
    }, [])

    const navLinks = [
        { label: 'Features', href: '/features' },
        { label: 'Solutions', href: '/solutions' },
        { label: 'Pricing', href: '/pricing' },
        { label: 'About', href: '/about' },
        { label: 'Contact', href: '/contact' },
    ]

    return (
        <div className="relative min-h-screen bg-zinc-950 font-sans text-zinc-100 selection:bg-blue-500 selection:text-white flex flex-col justify-between overflow-x-hidden">
            {/* Fixed Parallax Background */}
            <div className="fixed inset-0 pointer-events-none -z-20 overflow-hidden">
                <div
                    className="absolute inset-0 bg-cover bg-center bg-no-repeat bg-fixed opacity-30 filter saturate-150 contrast-125 transition-opacity duration-1000"
                    style={{ backgroundImage: "url('/hero_parallax_bg.png')" }}
                />
                <div className="absolute inset-0 bg-gradient-to-b from-zinc-950/70 via-zinc-950/90 to-zinc-950" />
            </div>

            {/* Ambient Lighting Accents */}
            <div className="fixed top-0 left-1/4 w-96 h-96 bg-blue-600/10 rounded-full blur-[150px] pointer-events-none -z-10" />
            <div className="fixed top-1/3 right-1/4 w-96 h-96 bg-indigo-600/10 rounded-full blur-[150px] pointer-events-none -z-10" />

            {/* Sticky Navigation */}
            <header
                className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
                    scrolled
                        ? 'bg-zinc-950/85 backdrop-blur-xl border-b border-zinc-800/80 shadow-2xl shadow-black/50 py-3'
                        : 'bg-zinc-950/40 backdrop-blur-md border-b border-zinc-800/40 py-4'
                }`}
            >
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex items-center justify-between">
                    {/* Brand Logo */}
                    <Link href="/" className="flex items-center gap-2.5 group">
                        <div className="w-9 h-9 rounded-xl bg-gradient-to-tr from-blue-600 via-indigo-500 to-cyan-400 p-[1px] shadow-lg shadow-blue-500/20 group-hover:scale-105 transition-transform">
                            <div className="w-full h-full bg-zinc-950 rounded-[11px] flex items-center justify-center">
                                <Zap className="w-5 h-5 text-blue-400 fill-blue-400/20" />
                            </div>
                        </div>
                        <span className="font-bold text-xl tracking-tight text-white">
                            Logi<span className="text-blue-500">Core</span>
                        </span>
                    </Link>

                    {/* Desktop Navigation Links */}
                    <nav className="hidden md:flex items-center gap-1.5 bg-zinc-900/60 p-1.5 rounded-full border border-zinc-800/80 backdrop-blur-md">
                        {navLinks.map((link) => {
                            const isActive = pathname === link.href
                            return (
                                <Link
                                    key={link.href}
                                    href={link.href}
                                    className={`px-4 py-1.5 rounded-full text-sm font-medium transition-all ${
                                        isActive
                                            ? 'bg-blue-600 text-white shadow-md shadow-blue-600/30'
                                            : 'text-zinc-400 hover:text-white hover:bg-zinc-800/60'
                                    }`}
                                >
                                    {link.label}
                                </Link>
                            )
                        })}
                    </nav>

                    {/* Desktop Actions (Search + Auth) */}
                    <div className="hidden md:flex items-center gap-3">
                        <button
                            onClick={() => setCmdKOpen(true)}
                            className="px-3.5 py-2 rounded-xl bg-zinc-900 border border-zinc-800 text-zinc-400 hover:text-white text-xs font-mono flex items-center gap-2.5 transition-all hover:border-blue-500/50 hover:bg-zinc-800/80"
                        >
                            <Search className="w-3.5 h-3.5 text-blue-400" />
                            <span>Quick Search...</span>
                            <kbd className="px-1.5 py-0.5 rounded bg-zinc-800 text-zinc-300 text-[10px]">⌘K</kbd>
                        </button>
                        <Link
                            href="/login"
                            className="px-4 py-2 text-sm font-medium text-zinc-300 hover:text-white transition-colors"
                        >
                            Log in
                        </Link>
                        <Link
                            href="/register"
                            className="relative group px-5 py-2 rounded-xl bg-white text-zinc-950 text-sm font-semibold hover:bg-zinc-100 transition-all active:scale-[0.98] shadow-lg shadow-white/10 overflow-hidden"
                        >
                            <span className="relative z-10 flex items-center gap-1.5">
                                Start Free Trial
                                <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-0.5" />
                            </span>
                        </Link>
                    </div>

                    {/* Mobile Buttons (Search + Hamburger Toggle) */}
                    <div className="flex items-center gap-2 md:hidden">
                        <button
                            onClick={() => setCmdKOpen(true)}
                            className="p-2.5 rounded-xl bg-zinc-900 border border-zinc-800 text-zinc-300 hover:text-white focus:outline-none flex items-center justify-center"
                            aria-label="Search Portal"
                        >
                            <Search className="w-5 h-5 text-blue-400" />
                        </button>
                        <button
                            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
                            className="p-2.5 rounded-xl bg-zinc-900 border border-zinc-800 text-zinc-300 hover:text-white focus:outline-none"
                            aria-label="Toggle Navigation Menu"
                        >
                            {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
                        </button>
                    </div>
                </div>

                {/* Mobile Drawer */}
                {mobileMenuOpen && (
                    <div className="md:hidden bg-zinc-950/95 backdrop-blur-2xl border-b border-zinc-800 px-6 py-6 transition-all animate-in fade-in slide-in-from-top-4 duration-200">
                        <div className="flex flex-col gap-3">
                            {navLinks.map((link) => (
                                <Link
                                    key={link.href}
                                    href={link.href}
                                    onClick={() => setMobileMenuOpen(false)}
                                    className={`px-4 py-3 rounded-xl text-base font-medium transition-colors ${
                                        pathname === link.href
                                            ? 'bg-blue-600 text-white font-semibold'
                                            : 'text-zinc-300 hover:bg-zinc-900'
                                    }`}
                                >
                                    {link.label}
                                </Link>
                            ))}
                            <hr className="border-zinc-800 my-2" />
                            <div className="flex flex-col gap-2.5 pt-1">
                                <Link
                                    href="/login"
                                    onClick={() => setMobileMenuOpen(false)}
                                    className="w-full text-center py-3 rounded-xl bg-zinc-900 border border-zinc-800 text-zinc-200 font-semibold"
                                >
                                    Log in
                                </Link>
                                <Link
                                    href="/register"
                                    onClick={() => setMobileMenuOpen(false)}
                                    className="w-full text-center py-3 rounded-xl bg-blue-600 text-white font-semibold shadow-lg shadow-blue-600/30"
                                >
                                    Start Free Trial
                                </Link>
                            </div>
                        </div>
                    </div>
                )}
            </header>

            {/* Main Page Content */}
            <main className="pt-24 flex-grow relative z-10">{children}</main>

            {/* Footer */}
            <footer className="relative z-10 bg-zinc-950/90 border-t border-zinc-800/80 pt-16 pb-12 mt-20 backdrop-blur-xl">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="grid grid-cols-1 md:grid-cols-5 gap-10 pb-12 border-b border-zinc-800/60">
                        {/* Brand Column */}
                        <div className="md:col-span-2 space-y-4">
                            <Link href="/" className="flex items-center gap-2.5">
                                <div className="w-8 h-8 rounded-lg bg-blue-600 flex items-center justify-center text-white font-bold">
                                    L
                                </div>
                                <span className="font-bold text-xl text-white">Logi<span className="text-blue-500">Core</span></span>
                            </Link>
                            <p className="text-zinc-400 text-sm max-w-sm leading-relaxed">
                                The next-generation modular supply chain engine. Provision inventory control, real-time logistics tracking, and enterprise procurement on a multi-tenant PostgreSQL core.
                            </p>

                            {/* System Status Pill */}
                            <div className="inline-flex items-center gap-2.5 px-3 py-1.5 rounded-full bg-emerald-500/10 border border-emerald-500/20 text-emerald-400 text-xs font-medium">
                                <span className="relative flex h-2 w-2">
                                    <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
                                    <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-500"></span>
                                </span>
                                All Systems Operational (99.99% Uptime)
                            </div>
                        </div>

                        {/* Navigation Columns */}
                        <div>
                            <h4 className="text-sm font-semibold text-white tracking-wider uppercase mb-4">Product</h4>
                            <ul className="space-y-2.5 text-sm text-zinc-400">
                                <li><Link href="/features" className="hover:text-white transition-colors">Modular Architecture</Link></li>
                                <li><Link href="/features" className="hover:text-white transition-colors">Real-Time Inventory</Link></li>
                                <li><Link href="/features" className="hover:text-white transition-colors">Procurement Workflows</Link></li>
                                <li><Link href="/features" className="hover:text-white transition-colors">Supreme Admin Portal</Link></li>
                                <li><Link href="/pricing" className="hover:text-white transition-colors">Pricing Tiers</Link></li>
                            </ul>
                        </div>

                        <div>
                            <h4 className="text-sm font-semibold text-white tracking-wider uppercase mb-4">Solutions</h4>
                            <ul className="space-y-2.5 text-sm text-zinc-400">
                                <li><Link href="/solutions" className="hover:text-white transition-colors">Global 3PL Logistics</Link></li>
                                <li><Link href="/solutions" className="hover:text-white transition-colors">Manufacturing ERP</Link></li>
                                <li><Link href="/solutions" className="hover:text-white transition-colors">E-Commerce Multi-Warehouse</Link></li>
                                <li><Link href="/solutions" className="hover:text-white transition-colors">Cold Chain & Pharma</Link></li>
                            </ul>
                        </div>

                        <div>
                            <h4 className="text-sm font-semibold text-white tracking-wider uppercase mb-4">Company</h4>
                            <ul className="space-y-2.5 text-sm text-zinc-400">
                                <li><Link href="/about" className="hover:text-white transition-colors">About Us</Link></li>
                                <li><Link href="/contact" className="hover:text-white transition-colors">Enterprise Contact</Link></li>
                                <li><Link href="/login" className="hover:text-white transition-colors">Customer Portal</Link></li>
                                <li><Link href="/register" className="hover:text-white transition-colors">Start Trial</Link></li>
                            </ul>
                        </div>
                    </div>
                </div>
            </footer>

            {/* Command Palette Modal */}
            {cmdKOpen && <CommandPaletteModal onClose={() => setCmdKOpen(false)} />}
        </div>
    )
}

function CommandPaletteModal({ onClose }: { onClose: () => void }) {
    const [query, setQuery] = useState('')

    const items = [
        { label: 'Track & Trace Container', href: '/track', category: 'Navigation', icon: Package },
        { label: 'Modular Capability Matrix', href: '/features', category: 'Product', icon: Layers },
        { label: 'Tiered Pricing & ROI Calculator', href: '/pricing', category: 'Product', icon: CreditCard },
        { label: 'Industry Vertical Solutions', href: '/solutions', category: 'Solutions', icon: Truck },
        { label: 'Company Mission & SLA', href: '/about', category: 'Company', icon: Globe },
        { label: 'Enterprise Proposal Request', href: '/contact', category: 'Contact', icon: Briefcase },
        { label: 'Customer Portal Login', href: '/login', category: 'Auth', icon: ShieldCheck },
        { label: 'Start 14-Day Free Trial', href: '/register', category: 'Auth', icon: Zap },
    ]

    const filtered = items.filter(
        (item) =>
            item.label.toLowerCase().includes(query.toLowerCase()) ||
            item.category.toLowerCase().includes(query.toLowerCase())
    )

    return (
        <div className="fixed inset-0 z-50 bg-zinc-950/80 backdrop-blur-md flex items-start justify-center pt-16 sm:pt-24 px-4 animate-in fade-in duration-150">
            <div className="fixed inset-0" onClick={onClose} />
            <div className="relative w-full max-w-xl bg-zinc-900 border border-zinc-800 rounded-3xl shadow-2xl overflow-hidden z-10">
                <div className="p-4 border-b border-zinc-800 flex items-center gap-3">
                    <Search className="w-4 h-4 text-blue-400 shrink-0" />
                    <input
                        type="text"
                        autoFocus
                        value={query}
                        onChange={(e) => setQuery(e.target.value)}
                        placeholder="Search page or command..."
                        className="w-full bg-transparent text-white text-sm focus:outline-none placeholder:text-zinc-500 font-medium"
                    />
                    <button onClick={onClose} className="p-1 rounded-lg hover:bg-zinc-800 text-zinc-400">
                        <X className="w-4 h-4" />
                    </button>
                </div>

                <div className="max-h-80 overflow-y-auto p-2 space-y-1">
                    {filtered.length > 0 ? (
                        filtered.map((item, idx) => {
                            const IconComp = item.icon
                            return (
                                <Link
                                    key={idx}
                                    href={item.href}
                                    onClick={onClose}
                                    className="flex items-center justify-between px-4 py-3 rounded-2xl hover:bg-zinc-800/80 transition-colors group"
                                >
                                    <div className="flex items-center gap-3">
                                        <div className="w-8 h-8 rounded-xl bg-zinc-800 flex items-center justify-center text-blue-400">
                                            <IconComp className="w-4 h-4" />
                                        </div>
                                        <span className="text-sm font-semibold text-zinc-200 group-hover:text-white">
                                            {item.label}
                                        </span>
                                    </div>
                                    <span className="text-xs text-zinc-500 font-mono uppercase tracking-wider">
                                        {item.category}
                                    </span>
                                </Link>
                            )
                        })
                    ) : (
                        <div className="py-8 text-center text-xs text-zinc-500 font-mono">
                            No matching commands found.
                        </div>
                    )}
                </div>

                <div className="p-3 bg-zinc-950/80 border-t border-zinc-800 text-[11px] text-zinc-500 flex items-center justify-between font-mono">
                    <span>Navigation Shortcut</span>
                    <span>Tap item or ESC to exit</span>
                </div>
            </div>
        </div>
    )
}
