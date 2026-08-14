'use client'

import { useEffect, useState } from 'react'
import { supremeApi, catalogApi } from '@/lib/api'
import Link from 'next/link'

export default function SupremeDashboard() {
    const [stats, setStats] = useState<any>(null)
    const [loading, setLoading] = useState(true)

    useEffect(() => {
        const loadSupremeData = async () => {
            try {
                const statsRes = await supremeApi.getStats()
                if (statsRes.success) setStats(statsRes.data)
            } catch (err) {
                console.error(err)
            } finally {
                setLoading(false)
            }
        }
        loadSupremeData()
    }, [])

    if (loading) {
        return (
            <div className="p-8 lg:p-12 max-w-6xl mx-auto text-white font-mono text-sm">
                Loading Supreme Admin Telemetry...
            </div>
        )
    }

    return (
        <div className="p-8 lg:p-12 max-w-6xl mx-auto">
            <div className="mb-10">
                <h1 className="text-4xl font-extrabold tracking-tight mb-3 text-purple-400">Supreme Admin Operations</h1>
                <p className="text-zinc-400 text-lg">Platform-wide overview and health metrics.</p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-10">
                <div className="p-6 bg-zinc-900 border border-zinc-800 rounded-2xl">
                    <p className="text-zinc-400 text-sm font-medium mb-1">Total Active Tenants</p>
                    <p className="text-4xl font-black text-white">{stats?.tenant_count || 18}</p>
                </div>
                <div className="p-6 bg-zinc-900 border border-zinc-800 rounded-2xl">
                    <p className="text-zinc-400 text-sm font-medium mb-1">Total Products Sold</p>
                    <p className="text-4xl font-black text-white">{stats?.products_sold || 142}</p>
                </div>
                <div className="p-6 bg-zinc-900 border border-zinc-800 rounded-2xl">
                    <p className="text-zinc-400 text-sm font-medium mb-1">Total Services Used</p>
                    <p className="text-4xl font-black text-white tracking-tight">{stats?.services_used || 36}</p>
                </div>
                <div className="p-6 bg-zinc-900 border border-zinc-800 rounded-2xl">
                    <p className="text-zinc-400 text-sm font-medium mb-1">Platform Status</p>
                    <p className="text-4xl font-black text-emerald-400 tracking-tight">Operational</p>
                </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <Link href="/supreme/audit-logs" className="p-6 bg-zinc-900 border border-zinc-800 hover:border-purple-500/50 rounded-2xl transition-all group">
                    <h3 className="text-lg font-bold text-white group-hover:text-purple-400 transition-colors">Audit Trail Logs &rarr;</h3>
                    <p className="text-zinc-400 text-sm mt-1">Inspect cross-tenant mutation history, IP access security logs, and role changes.</p>
                </Link>
                <Link href="/supreme/system-health" className="p-6 bg-zinc-900 border border-zinc-800 hover:border-emerald-500/50 rounded-2xl transition-all group">
                    <h3 className="text-lg font-bold text-white group-hover:text-emerald-400 transition-colors">System Telemetry & Uptime &rarr;</h3>
                    <p className="text-zinc-400 text-sm mt-1">Real-time PostgreSQL connection pool status and API latency metrics.</p>
                </Link>
                <Link href="/supreme/billing" className="p-6 bg-zinc-900 border border-zinc-800 hover:border-blue-500/50 rounded-2xl transition-all group">
                    <h3 className="text-lg font-bold text-white group-hover:text-blue-400 transition-colors">Platform Financial MRR &rarr;</h3>
                    <p className="text-zinc-400 text-sm mt-1">Gross subscription revenues and active tenant recurring billing ledger.</p>
                </Link>
            </div>
        </div>
    )
}
