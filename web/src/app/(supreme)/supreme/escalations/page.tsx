'use client'

import { useEffect, useState } from 'react'
import { supremeApi } from '@/lib/api'
import toast from 'react-hot-toast'

export default function SupremeEscalationsPage() {
    const [escalations, setEscalations] = useState<any[]>([])
    const [loading, setLoading] = useState(true)

    const fetchEscalations = async () => {
        try {
            const res = await supremeApi.getEscalations()
            if (res.success) {
                setEscalations(res.data || [])
            }
        } catch (err) {
            console.error(err)
        } finally {
            setLoading(false)
        }
    }

    useEffect(() => {
        fetchEscalations()
    }, [])

    const handleResolve = async (id: string, action: 'confirm_decline' | 'force_approve') => {
        try {
            const res = await supremeApi.resolveEscalation(id, action)
            if (res.success) {
                toast.success(res.message || 'Escalation resolved.')
                fetchEscalations()
            } else {
                toast.error(res.message || 'Resolution failed.')
            }
        } catch (err: any) {
            toast.error(err.message || 'Escalation request failed.')
        }
    }

    if (loading) {
        return (
            <div className="p-8 max-w-5xl mx-auto text-white">
                Loading escalations queue...
            </div>
        )
    }

    return (
        <div className="p-8 max-w-5xl mx-auto space-y-8">
            <div>
                <h1 className="text-3xl font-extrabold text-white tracking-tight">Two-Step Decline Review Queue</h1>
                <p className="text-zinc-400 text-sm mt-1">Review orders marked for decline by platform admins requiring Supreme sign-off.</p>
            </div>

            {escalations.length === 0 ? (
                <div className="bg-zinc-900 border border-zinc-800 rounded-3xl p-12 text-center text-zinc-400">
                    No pending decline escalations at this time.
                </div>
            ) : (
                <div className="space-y-4">
                    {escalations.map(item => (
                        <div key={item.id} className="bg-zinc-900 border border-orange-500/30 rounded-2xl p-6 shadow-2xl">
                            <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
                                <div className="space-y-1">
                                    <div className="flex items-center gap-3">
                                        <h3 className="text-lg font-bold text-white">{item.module?.name}</h3>
                                        <span className="px-2.5 py-0.5 rounded-full text-xs font-semibold bg-orange-500/10 text-orange-400 border border-orange-500/20">
                                            Pending Supreme Sign-off
                                        </span>
                                    </div>
                                    <p className="text-zinc-400 text-sm">
                                        Customer: <strong className="text-white">{item.customer?.name}</strong> ({item.cust_id})
                                    </p>
                                    <p className="text-xs text-orange-400/90 font-mono mt-1">
                                        Decline Reason Proposed: "{item.decline_reason}"
                                    </p>
                                </div>

                                <div className="flex items-center gap-3 shrink-0">
                                    <button
                                        onClick={() => handleResolve(item.id, 'confirm_decline')}
                                        className="px-4 py-2 bg-red-600 hover:bg-red-500 text-white font-semibold text-xs rounded-xl shadow-md shadow-red-600/20"
                                    >
                                        Confirm Rejection
                                    </button>

                                    <button
                                        onClick={() => handleResolve(item.id, 'force_approve')}
                                        className="px-4 py-2 bg-emerald-600 hover:bg-emerald-500 text-white font-semibold text-xs rounded-xl shadow-md shadow-emerald-600/20"
                                    >
                                        Overrule & Approve
                                    </button>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            )}
        </div>
    )
}
