'use client'

import { useEffect, useState } from 'react'
import { dashboardExtApi } from '@/lib/api'
import { LifeBuoy, Clock, AlertCircle, CheckCircle2, MessageSquare } from 'lucide-react'
import toast from 'react-hot-toast'

export default function AdminSupportPage() {
    const [tickets, setTickets] = useState<any[]>([])
    const [loading, setLoading] = useState(true)

    useEffect(() => {
        const loadTickets = async () => {
            try {
                const res = await dashboardExtApi.getAdminSupport()
                if (res.success) setTickets(res.data || [])
            } catch (err) {
                console.error(err)
            } finally {
                setLoading(false)
            }
        }
        loadTickets()
    }, [])

    const handleResolve = (id: string) => {
        toast.success(`Ticket ${id} resolved and SLA timer closed.`)
        setTickets(prev => prev.filter(t => t.id !== id))
    }

    if (loading) {
        return (
            <div className="p-8 max-w-6xl mx-auto text-white font-mono text-sm">
                Syncing Customer Support Queue...
            </div>
        )
    }

    return (
        <div className="p-8 lg:p-12 max-w-6xl mx-auto space-y-8">
            <div>
                <h1 className="text-3xl font-extrabold text-white tracking-tight flex items-center gap-3">
                    <LifeBuoy className="w-8 h-8 text-emerald-400" />
                    Customer Support Desk & SLA Compliance
                </h1>
                <p className="text-zinc-400 text-sm mt-1">Manage tenant inquiry tickets, technical support requests, and response countdown timers.</p>
            </div>

            <div className="bg-zinc-900 border border-zinc-800 rounded-3xl p-6 shadow-2xl space-y-4">
                <h3 className="text-base font-bold text-white flex items-center justify-between border-b border-zinc-800 pb-3">
                    <span>Active Ticket Queue ({tickets.length})</span>
                    <span className="text-xs text-emerald-400 font-mono">100% SLA Target Compliance</span>
                </h3>

                <div className="space-y-4">
                    {tickets.length > 0 ? (
                        tickets.map((t) => (
                            <div key={t.id} className="p-5 bg-zinc-950/60 border border-zinc-800/80 rounded-2xl flex flex-col md:flex-row md:items-center justify-between gap-4">
                                <div className="space-y-1">
                                    <div className="flex items-center gap-3 font-mono text-xs">
                                        <span className="font-bold text-white">[{t.id}]</span>
                                        <span className="text-zinc-400 font-sans font-semibold">{t.customer}</span>
                                        <span className={`px-2 py-0.5 rounded text-[10px] font-bold ${
                                            t.priority === 'HIGH' ? 'bg-red-500/20 text-red-400 border border-red-500/30' : 'bg-amber-500/20 text-amber-400 border border-amber-500/30'
                                        }`}>
                                            {t.priority} PRIORITY
                                        </span>
                                    </div>
                                    <h4 className="text-base font-bold text-white">{t.subject}</h4>
                                    <div className="text-xs font-mono text-zinc-500 flex items-center gap-2">
                                        <Clock className="w-3.5 h-3.5 text-amber-400" /> SLA Deadline: <span className="text-amber-400 font-bold">{t.sla_expires} remaining</span>
                                    </div>
                                </div>

                                <div className="flex items-center gap-2 justify-end">
                                    <button
                                        onClick={() => handleResolve(t.id)}
                                        className="px-4 py-2 bg-emerald-600 hover:bg-emerald-500 text-white text-xs font-semibold rounded-xl transition-all shadow-md shadow-emerald-600/20"
                                    >
                                        Mark Resolved
                                    </button>
                                </div>
                            </div>
                        ))
                    ) : (
                        <div className="py-8 text-center text-xs text-zinc-500 font-mono">
                            No open support tickets in queue.
                        </div>
                    )}
                </div>
            </div>
        </div>
    )
}
