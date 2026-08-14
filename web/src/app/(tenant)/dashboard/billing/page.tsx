'use client'

import { useEffect, useState } from 'react'
import { dashboardExtApi } from '@/lib/api'
import { CreditCard, Download, ShieldCheck, DollarSign, FileText } from 'lucide-react'
import toast from 'react-hot-toast'

export default function CustomerBillingPage() {
    const [invoices, setInvoices] = useState<any[]>([])
    const [loading, setLoading] = useState(true)

    useEffect(() => {
        const loadBilling = async () => {
            try {
                const res = await dashboardExtApi.getCustomerBilling()
                if (res.success) setInvoices(res.data || [])
            } catch (err) {
                console.error(err)
            } finally {
                setLoading(false)
            }
        }
        loadBilling()
    }, [])

    const handleDownloadPdf = (id: string | number) => {
        toast.success(`Downloading Invoice #INV-${id} PDF receipt...`)
    }

    if (loading) {
        return (
            <div className="p-8 max-w-5xl mx-auto text-white font-mono text-sm">
                Fetching Enterprise Billing Statement...
            </div>
        )
    }

    return (
        <div className="p-8 lg:p-12 max-w-5xl mx-auto space-y-8">
            <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
                <div>
                    <h1 className="text-3xl font-extrabold text-white tracking-tight flex items-center gap-3">
                        <CreditCard className="w-8 h-8 text-blue-400" />
                        Billing & Corporate Invoices
                    </h1>
                    <p className="text-zinc-400 text-sm mt-1">View monthly subscription statements, download PDF receipts, and update payment details.</p>
                </div>
            </div>

            {/* Active Payment Method Card */}
            <div className="p-6 bg-zinc-900 border border-zinc-800 rounded-3xl flex flex-col md:flex-row items-center justify-between gap-6">
                <div className="flex items-center gap-4">
                    <div className="w-12 h-12 rounded-2xl bg-blue-600/10 border border-blue-500/20 flex items-center justify-center text-blue-400">
                        <CreditCard className="w-6 h-6" />
                    </div>
                    <div>
                        <h4 className="font-bold text-white text-base">Corporate Auto-Pay (Stripe ACH)</h4>
                        <p className="text-xs font-mono text-zinc-400">JPMorgan Chase Bank •••• 9812</p>
                    </div>
                </div>
                <button className="px-4 py-2 bg-zinc-800 hover:bg-zinc-700 text-white text-xs font-semibold rounded-xl transition-colors">
                    Update Payment Method
                </button>
            </div>

            {/* Monthly Invoice History */}
            <div className="bg-zinc-900 border border-zinc-800 rounded-3xl p-6 shadow-2xl space-y-4">
                <h3 className="text-base font-bold text-white">Invoice History</h3>
                <div className="overflow-x-auto">
                    <table className="w-full text-left border-collapse">
                        <thead>
                            <tr className="border-b border-zinc-800 bg-zinc-950/50 text-xs font-semibold text-zinc-400 uppercase tracking-wider font-mono">
                                <th className="p-4">Invoice #</th>
                                <th className="p-4">Amount</th>
                                <th className="p-4">Billing Status</th>
                                <th className="p-4">Due Date</th>
                                <th className="p-4 text-right">PDF Download</th>
                            </tr>
                        </thead>
                        <tbody className="divide-y divide-zinc-800/60 text-sm font-mono text-zinc-300">
                            {invoices.length > 0 ? (
                                invoices.map((inv) => (
                                    <tr key={inv.id} className="hover:bg-zinc-800/30 transition-colors">
                                        <td className="p-4 font-bold text-white flex items-center gap-2">
                                            <FileText className="w-4 h-4 text-blue-400" /> INV-{inv.id}
                                        </td>
                                        <td className="p-4 font-bold text-blue-400">${Number(inv.amount).toLocaleString()}</td>
                                        <td className="p-4 font-sans">
                                            <span className="px-2.5 py-0.5 rounded-full text-xs font-semibold bg-emerald-500/10 text-emerald-400 border border-emerald-500/20">
                                                {inv.status?.toUpperCase()}
                                            </span>
                                        </td>
                                        <td className="p-4 text-zinc-400">{inv.due_date || 'Net 30'}</td>
                                        <td className="p-4 text-right font-sans">
                                            <button
                                                onClick={() => handleDownloadPdf(inv.id)}
                                                className="text-xs text-blue-400 hover:text-blue-300 font-semibold inline-flex items-center gap-1"
                                            >
                                                <Download className="w-3.5 h-3.5" /> PDF
                                            </button>
                                        </td>
                                    </tr>
                                ))
                            ) : (
                                <tr>
                                    <td colSpan={5} className="p-8 text-center text-zinc-500 font-mono text-xs">
                                        No invoices recorded for this account.
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
