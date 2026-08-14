'use client'

import { useEffect, useState } from 'react'
import { dashboardExtApi } from '@/lib/api'
import { DollarSign, TrendingUp, CreditCard, ArrowUpRight, ShieldCheck, Download } from 'lucide-react'

export default function SupremeBillingPage() {
    const [finance, setFinance] = useState<any>(null)
    const [loading, setLoading] = useState(true)

    useEffect(() => {
        const loadFinance = async () => {
            try {
                const res = await dashboardExtApi.getSupremeFinance()
                if (res.success) setFinance(res.data)
            } catch (err) {
                console.error(err)
            } finally {
                setLoading(false)
            }
        }
        loadFinance()
    }, [])

    if (loading) {
        return (
            <div className="p-8 max-w-6xl mx-auto text-white font-mono text-sm">
                Loading Global Platform Financials...
            </div>
        )
    }

    return (
        <div className="p-8 lg:p-12 max-w-6xl mx-auto space-y-8">
            <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
                <div>
                    <h1 className="text-3xl font-extrabold text-white tracking-tight flex items-center gap-3">
                        <DollarSign className="w-8 h-8 text-purple-400" />
                        Global Financials & Subscription Revenue
                    </h1>
                    <p className="text-zinc-400 text-sm mt-1">Platform-wide Monthly Recurring Revenue (MRR), ARR, and global invoice stream.</p>
                </div>
                <button className="px-4 py-2 bg-purple-600 hover:bg-purple-500 text-white text-xs font-semibold rounded-xl flex items-center gap-2 shadow-lg shadow-purple-600/20 transition-all">
                    <Download className="w-4 h-4" /> Export CSV Financial Audit
                </button>
            </div>

            {/* High Level Metrics Cards */}
            <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
                <div className="p-6 bg-zinc-900 border border-zinc-800 rounded-3xl space-y-2">
                    <span className="text-xs font-semibold text-zinc-400 uppercase tracking-wider">Monthly Recurring (MRR)</span>
                    <p className="text-3xl font-black text-purple-400 font-mono">
                        ${Number(finance?.mrr || 0).toLocaleString()}
                    </p>
                    <span className="text-xs text-emerald-400 flex items-center gap-1">
                        <TrendingUp className="w-3.5 h-3.5" /> +14.2% vs last month
                    </span>
                </div>

                <div className="p-6 bg-zinc-900 border border-zinc-800 rounded-3xl space-y-2">
                    <span className="text-xs font-semibold text-zinc-400 uppercase tracking-wider">Annualized Run Rate (ARR)</span>
                    <p className="text-3xl font-black text-white font-mono">
                        ${Number(finance?.arr || 0).toLocaleString()}
                    </p>
                    <span className="text-xs text-zinc-500 font-mono">12-Month Projections</span>
                </div>

                <div className="p-6 bg-zinc-900 border border-zinc-800 rounded-3xl space-y-2">
                    <span className="text-xs font-semibold text-zinc-400 uppercase tracking-wider">Total Collected</span>
                    <p className="text-3xl font-black text-emerald-400 font-mono">
                        ${Number(finance?.total_collected || 0).toLocaleString()}
                    </p>
                    <span className="text-xs text-zinc-400">Settled to Stripe Gateway</span>
                </div>

                <div className="p-6 bg-zinc-900 border border-zinc-800 rounded-3xl space-y-2">
                    <span className="text-xs font-semibold text-zinc-400 uppercase tracking-wider">Outstanding Invoices</span>
                    <p className="text-3xl font-black text-amber-400 font-mono">
                        ${Number(finance?.total_outstanding || 0).toLocaleString()}
                    </p>
                    <span className="text-xs text-amber-400/80">Pending Settlement</span>
                </div>
            </div>

            {/* Global Invoice Stream */}
            <div className="bg-zinc-900 border border-zinc-800 rounded-3xl p-6 shadow-2xl space-y-4">
                <h3 className="text-lg font-bold text-white flex items-center justify-between">
                    <span>Recent Enterprise Invoices</span>
                    <span className="text-xs text-zinc-500 font-mono font-normal">Real-Time Ledger Sync</span>
                </h3>

                <div className="overflow-x-auto">
                    <table className="w-full text-left border-collapse">
                        <thead>
                            <tr className="border-b border-zinc-800 bg-zinc-950/50 text-xs font-semibold text-zinc-400 uppercase tracking-wider">
                                <th className="p-4">Invoice #</th>
                                <th className="p-4">Tenant Client</th>
                                <th className="p-4">Amount</th>
                                <th className="p-4">Billing Status</th>
                                <th className="p-4">Due Date</th>
                                <th className="p-4 text-right">Action</th>
                            </tr>
                        </thead>
                        <tbody className="divide-y divide-zinc-800/60 text-sm text-zinc-300 font-mono">
                            {finance?.invoices?.length > 0 ? (
                                finance.invoices.map((inv: any) => (
                                    <tr key={inv.id} className="hover:bg-zinc-800/30 transition-colors">
                                        <td className="p-4 font-bold text-white">INV-{inv.id}</td>
                                        <td className="p-4">{inv.customer?.name || 'Enterprise Customer'}</td>
                                        <td className="p-4 font-bold text-purple-400">${Number(inv.amount).toLocaleString()}</td>
                                        <td className="p-4">
                                            <span className={`px-2.5 py-0.5 rounded-full text-xs font-sans font-semibold ${
                                                inv.status === 'paid' ? 'bg-emerald-500/10 text-emerald-400 border border-emerald-500/20' :
                                                'bg-amber-500/10 text-amber-400 border border-amber-500/20'
                                            }`}>
                                                {inv.status?.toUpperCase()}
                                            </span>
                                        </td>
                                        <td className="p-4 text-zinc-400">{inv.due_date || 'Net 30'}</td>
                                        <td className="p-4 text-right">
                                            <button className="text-xs text-purple-400 hover:text-purple-300 font-semibold font-sans">
                                                Download PDF
                                            </button>
                                        </td>
                                    </tr>
                                ))
                            ) : (
                                <tr>
                                    <td colSpan={6} className="p-8 text-center text-zinc-500 font-mono text-xs">
                                        No financial invoices recorded yet.
                                    </td>
                                </tr>
                            )}
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
    )
}
