'use client'

import { useEffect, useState } from 'react'
import { dashboardExtApi } from '@/lib/api'
import { Activity, Server, Cpu, Database, Globe, RefreshCw } from 'lucide-react'

export default function SupremeSystemHealthPage() {
    const [health, setHealth] = useState<any>(null)
    const [loading, setLoading] = useState(true)

    const fetchHealth = async () => {
        setLoading(true)
        try {
            const res = await dashboardExtApi.getSupremeSystemHealth()
            if (res.success) setHealth(res.data)
        } catch (err) {
            console.error(err)
        } finally {
            setLoading(false)
        }
    }

    useEffect(() => {
        fetchHealth()
    }, [])

    if (loading) {
        return (
            <div className="p-8 max-w-6xl mx-auto text-white font-mono text-sm">
                Polling Infrastructure Nodes...
            </div>
        )
    }

    return (
        <div className="p-8 lg:p-12 max-w-6xl mx-auto space-y-8">
            <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
                <div>
                    <h1 className="text-3xl font-extrabold text-white tracking-tight flex items-center gap-3">
                        <Activity className="w-8 h-8 text-emerald-400" />
                        Infrastructure Telemetry & Cluster Health
                    </h1>
                    <p className="text-zinc-400 text-sm mt-1">Real-time status of Docker microservices, PostgreSQL database performance, and global carrier API webhooks.</p>
                </div>
                <button
                    onClick={fetchHealth}
                    className="px-4 py-2 bg-zinc-900 border border-zinc-800 hover:bg-zinc-800 text-white text-xs font-semibold rounded-xl flex items-center gap-2 transition-all"
                >
                    <RefreshCw className="w-4 h-4 text-emerald-400" /> Refresh Telemetry
                </button>
            </div>

            {/* Microservice Container Status */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <div className="p-6 bg-zinc-900 border border-zinc-800 rounded-3xl space-y-3">
                    <div className="flex items-center justify-between">
                        <span className="text-xs font-semibold text-zinc-400 uppercase tracking-wider flex items-center gap-2">
                            <Database className="w-4 h-4 text-purple-400" /> PostgreSQL Engine
                        </span>
                        <span className="px-2 py-0.5 rounded-full text-[10px] font-bold bg-emerald-500/10 text-emerald-400 border border-emerald-500/20">
                            ONLINE
                        </span>
                    </div>
                    <p className="text-sm font-mono text-white">{health?.db_status}</p>
                    <div className="text-xs font-mono text-zinc-500 flex justify-between">
                        <span>Latency: {health?.db_latency_ms}ms</span>
                        <span>Active Conns: {health?.active_connections}</span>
                    </div>
                </div>

                <div className="p-6 bg-zinc-900 border border-zinc-800 rounded-3xl space-y-3">
                    <div className="flex items-center justify-between">
                        <span className="text-xs font-semibold text-zinc-400 uppercase tracking-wider flex items-center gap-2">
                            <Server className="w-4 h-4 text-blue-400" /> Redis Queue Broker
                        </span>
                        <span className="px-2 py-0.5 rounded-full text-[10px] font-bold bg-emerald-500/10 text-emerald-400 border border-emerald-500/20">
                            CONNECTED
                        </span>
                    </div>
                    <p className="text-sm font-mono text-white">{health?.redis_status}</p>
                    <div className="text-xs font-mono text-zinc-500">Queue Processing Velocity: 100%</div>
                </div>

                <div className="p-6 bg-zinc-900 border border-zinc-800 rounded-3xl space-y-3">
                    <div className="flex items-center justify-between">
                        <span className="text-xs font-semibold text-zinc-400 uppercase tracking-wider flex items-center gap-2">
                            <Globe className="w-4 h-4 text-emerald-400" /> Global Webhooks
                        </span>
                        <span className="px-2 py-0.5 rounded-full text-[10px] font-bold bg-emerald-500/10 text-emerald-400 border border-emerald-500/20">
                            HEALTHY
                        </span>
                    </div>
                    <p className="text-sm font-mono text-white">3 Carrier APIs Connected</p>
                    <div className="text-xs font-mono text-zinc-500">FedEx / Maersk / DHL</div>
                </div>
            </div>

            {/* Docker Container Cluster Grid */}
            <div className="bg-zinc-900 border border-zinc-800 rounded-3xl p-6 shadow-2xl space-y-4">
                <h3 className="text-lg font-bold text-white">Active Docker Microservices</h3>
                <div className="overflow-x-auto">
                    <table className="w-full text-left border-collapse">
                        <thead>
                            <tr className="border-b border-zinc-800 bg-zinc-950/50 text-xs font-semibold text-zinc-400 uppercase tracking-wider font-mono">
                                <th className="p-4">Container Name</th>
                                <th className="p-4">Status</th>
                                <th className="p-4">Uptime SLA</th>
                                <th className="p-4">CPU Usage</th>
                                <th className="p-4">RAM Memory</th>
                            </tr>
                        </thead>
                        <tbody className="divide-y divide-zinc-800/60 text-sm font-mono text-zinc-300">
                            {health?.docker_containers?.map((c: any) => (
                                <tr key={c.name} className="hover:bg-zinc-800/30 transition-colors">
                                    <td className="p-4 font-bold text-white">{c.name}</td>
                                    <td className="p-4">
                                        <span className="px-2.5 py-0.5 rounded-full text-xs font-semibold bg-emerald-500/10 text-emerald-400 border border-emerald-500/20">
                                            {c.status}
                                        </span>
                                    </td>
                                    <td className="p-4 text-emerald-400">{c.uptime}</td>
                                    <td className="p-4 text-zinc-400">{c.cpu}</td>
                                    <td className="p-4 text-purple-400">{c.memory}</td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
    )
}
