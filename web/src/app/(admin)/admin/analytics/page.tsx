'use client'

import { useEffect, useState } from 'react'
import { dashboardExtApi } from '@/lib/api'
import { BarChart3, TrendingUp, Zap, Clock, ShieldCheck } from 'lucide-react'

export default function AdminAnalyticsPage() {
    const [analytics, setAnalytics] = useState<any>(null)
    const [loading, setLoading] = useState(true)

    useEffect(() => {
        const loadAnalytics = async () => {
            try {
                const res = await dashboardExtApi.getAdminAnalytics()
                if (res.success) setAnalytics(res.data)
            } catch (err) {
                console.error(err)
            } finally {
                setLoading(false)
            }
        }
        loadAnalytics()
    }, [])

    if (loading) {
        return (
            <div className="p-8 max-w-6xl mx-auto text-white font-mono text-sm">
                Generating Fulfillment Velocity Charts...
            </div>
        )
    }

    return (
        <div className="p-8 lg:p-12 max-w-6xl mx-auto space-y-8">
            <div>
                <h1 className="text-3xl font-extrabold text-white tracking-tight flex items-center gap-3">
                    <BarChart3 className="w-8 h-8 text-emerald-400" />
                    Fulfillment Velocity & Operational Analytics
                </h1>
                <p className="text-zinc-400 text-sm mt-1">Platform performance metrics, admin response lead times, and fulfillment accuracy reports.</p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
                <div className="p-6 bg-zinc-900 border border-zinc-800 rounded-3xl space-y-2">
                    <span className="text-xs font-semibold text-zinc-400 uppercase tracking-wider">Avg Admin Approval Time</span>
                    <p className="text-3xl font-black text-emerald-400 font-mono">
                        {analytics?.avg_approval_time_hours} hrs
                    </p>
                    <span className="text-xs text-emerald-400 flex items-center gap-1">
                        <Zap className="w-3.5 h-3.5" /> Fast Velocity
                    </span>
                </div>

                <div className="p-6 bg-zinc-900 border border-zinc-800 rounded-3xl space-y-2">
                    <span className="text-xs font-semibold text-zinc-400 uppercase tracking-wider">Fulfillment Accuracy</span>
                    <p className="text-3xl font-black text-white font-mono">
                        {analytics?.fulfillment_accuracy}
                    </p>
                    <span className="text-xs text-zinc-500 font-mono">Zero Discrepancy Rate</span>
                </div>

                <div className="p-6 bg-zinc-900 border border-zinc-800 rounded-3xl space-y-2">
                    <span className="text-xs font-semibold text-zinc-400 uppercase tracking-wider">Monthly Dispatches</span>
                    <p className="text-3xl font-black text-purple-400 font-mono">
                        {analytics?.total_dispatches_this_month?.toLocaleString()}
                    </p>
                    <span className="text-xs text-purple-400/80">Active Shipments</span>
                </div>

                <div className="p-6 bg-zinc-900 border border-zinc-800 rounded-3xl space-y-2">
                    <span className="text-xs font-semibold text-zinc-400 uppercase tracking-wider">SLA Compliance</span>
                    <p className="text-3xl font-black text-emerald-400 font-mono">
                        {analytics?.sla_compliance}
                    </p>
                    <span className="text-xs text-emerald-400 flex items-center gap-1">
                        <ShieldCheck className="w-3.5 h-3.5" /> Target Achieved
                    </span>
                </div>
            </div>

            {/* Monthly Volume Trend Visualizer */}
            <div className="bg-zinc-900 border border-zinc-800 rounded-3xl p-6 shadow-2xl space-y-4">
                <h3 className="text-lg font-bold text-white">Monthly Dispatch Volume Trend</h3>
                <div className="grid grid-cols-4 gap-4 items-end h-44 pt-6">
                    {analytics?.monthly_volume?.map((m: any) => (
                        <div key={m.month} className="flex flex-col items-center gap-2 h-full justify-end">
                            <div
                                style={{ height: `${(m.volume / 1500) * 100}%` }}
                                className="w-full max-w-[48px] bg-gradient-to-t from-emerald-600 to-emerald-400 rounded-t-xl transition-all duration-500 hover:brightness-125"
                            />
                            <span className="text-xs font-mono text-zinc-400">{m.month} ({m.volume})</span>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    )
}
