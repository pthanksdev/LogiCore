'use client'

import { useEffect, useState } from 'react'
import { dashboardExtApi } from '@/lib/api'
import { ShieldCheck, Lock, Download, Filter } from 'lucide-react'

export default function SupremeAuditLogsPage() {
    const [logs, setLogs] = useState<any[]>([])
    const [loading, setLoading] = useState(true)

    useEffect(() => {
        const loadLogs = async () => {
            try {
                const res = await dashboardExtApi.getSupremeAuditLogs()
                if (res.success) setLogs(res.data || [])
            } catch (err) {
                console.error(err)
            } finally {
                setLoading(false)
            }
        }
        loadLogs()
    }, [])

    if (loading) {
        return (
            <div className="p-8 max-w-6xl mx-auto text-white font-mono text-sm">
                Loading Security Audit Trail...
            </div>
        )
    }

    return (
        <div className="p-8 lg:p-12 max-w-6xl mx-auto space-y-8">
            <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
                <div>
                    <h1 className="text-3xl font-extrabold text-white tracking-tight flex items-center gap-3">
                        <Lock className="w-8 h-8 text-purple-400" />
                        Platform Security & Audit Trail
                    </h1>
                    <p className="text-zinc-400 text-sm mt-1">Immutable security log stream recording administrative operations, role escalations, and API events.</p>
                </div>
                <button className="px-4 py-2 bg-zinc-900 border border-zinc-800 hover:bg-zinc-800 text-white text-xs font-semibold rounded-xl flex items-center gap-2 transition-all">
                    <Download className="w-4 h-4 text-purple-400" /> Export Audit Log CSV
                </button>
            </div>

            <div className="bg-zinc-900 border border-zinc-800 rounded-3xl p-6 shadow-2xl space-y-4">
                <div className="flex items-center justify-between border-b border-zinc-800 pb-4">
                    <h3 className="text-base font-bold text-white">Live Event Stream ({logs.length})</h3>
                    <div className="flex items-center gap-2">
                        <Filter className="w-4 h-4 text-zinc-500" />
                        <span className="text-xs font-mono text-zinc-400">Filter Severity: All</span>
                    </div>
                </div>

                <div className="space-y-3 font-mono">
                    {logs.map((log) => (
                        <div key={log.id} className="p-4 bg-zinc-950/60 border border-zinc-800/80 rounded-2xl flex flex-col md:flex-row md:items-center justify-between gap-4">
                            <div className="space-y-1">
                                <div className="flex items-center gap-3">
                                    <span className={`px-2 py-0.5 rounded text-[10px] font-bold ${
                                        log.severity === 'HIGH' ? 'bg-red-500/20 text-red-400 border border-red-500/30' :
                                        log.severity === 'MEDIUM' ? 'bg-amber-500/20 text-amber-400 border border-amber-500/30' :
                                        'bg-zinc-800 text-zinc-400'
                                    }`}>
                                        {log.severity}
                                    </span>
                                    <span className="text-xs font-bold text-purple-400">{log.action}</span>
                                    <span className="text-xs text-zinc-500">[{log.id}]</span>
                                </div>
                                <p className="text-sm text-zinc-200 font-sans">{log.details}</p>
                                <div className="text-xs text-zinc-500 flex gap-4">
                                    <span>Actor: {log.user}</span>
                                    <span>IP: {log.ip}</span>
                                </div>
                            </div>
                            <div className="text-xs text-zinc-500 whitespace-nowrap">
                                {new Date(log.timestamp).toLocaleString()}
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    )
}
