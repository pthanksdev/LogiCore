'use client'

import { useEffect, useState } from 'react'
import { ordersApi } from '@/lib/api'
import toast from 'react-hot-toast'

export default function AdminOrdersPage() {
    const [orders, setOrders] = useState<any[]>([])
    const [loading, setLoading] = useState(true)
    const [declineReason, setDeclineReason] = useState<{ [key: string]: string }>({})

    const fetchOrders = async () => {
        try {
            const res = await ordersApi.getAdminOrders()
            if (res.success) {
                setOrders(res.data || [])
            }
        } catch (err) {
            console.error(err)
        } finally {
            setLoading(false)
        }
    }

    useEffect(() => {
        fetchOrders()
    }, [])

    const handleApprove = async (orderId: string) => {
        try {
            const res = await ordersApi.approveOrder(orderId)
            if (res.success) {
                toast.success('Order approved and module provisioned!')
                fetchOrders()
            } else {
                toast.error(res.message || 'Failed to approve order.')
            }
        } catch (err: any) {
            toast.error(err.message || 'Approval request failed.')
        }
    }

    const handleDeclineSubmit = async (e: React.FormEvent, orderId: string) => {
        e.preventDefault()
        const reason = declineReason[orderId]
        if (!reason || reason.length < 3) {
            toast.error('Please provide a decline reason.')
            return
        }

        try {
            const res = await ordersApi.requestDecline(orderId, reason)
            if (res.success) {
                toast.success('Decline request submitted for Supreme Admin escalation.')
                fetchOrders()
            } else {
                toast.error(res.message || 'Failed to submit decline request.')
            }
        } catch (err: any) {
            toast.error(err.message || 'Decline request failed.')
        }
    }

    if (loading) {
        return (
            <div className="p-8 max-w-6xl mx-auto text-white">
                Loading admin orders queue...
            </div>
        )
    }

    return (
        <div className="p-8 max-w-6xl mx-auto">
            <div className="mb-8">
                <h1 className="text-3xl font-extrabold text-white tracking-tight">Order Approval Queue</h1>
                <p className="text-zinc-400 text-sm mt-1">Review incoming tenant requests and provision catalog modules.</p>
            </div>

            {orders.length === 0 ? (
                <div className="bg-zinc-900 border border-zinc-800 rounded-3xl p-12 text-center text-zinc-400">
                    No orders submitted yet.
                </div>
            ) : (
                <div className="space-y-4">
                    {orders.map(order => (
                        <div key={order.id} className="bg-zinc-900 border border-zinc-800 rounded-2xl p-6 shadow-xl">
                            <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
                                <div className="space-y-1">
                                    <div className="flex items-center gap-3">
                                        <h3 className="text-lg font-bold text-white">{order.module?.name || 'Module'}</h3>
                                        <span className={`px-2.5 py-0.5 rounded-full text-xs font-semibold ${
                                            order.status === 'approved' ? 'bg-emerald-500/10 text-emerald-400 border border-emerald-500/20' :
                                            order.status === 'pending' ? 'bg-amber-500/10 text-amber-400 border border-amber-500/20' :
                                            order.status === 'pending_decline' ? 'bg-orange-500/10 text-orange-400 border border-orange-500/20' :
                                            'bg-red-500/10 text-red-400 border border-red-500/20'
                                        }`}>
                                            {order.status}
                                        </span>
                                    </div>
                                    <p className="text-zinc-400 text-sm">
                                        Customer: <strong className="text-white">{order.customer?.name || 'Client'}</strong> ({order.cust_id})
                                    </p>
                                    <p className="text-xs text-zinc-500">Submitted: {new Date(order.created_at).toLocaleString()}</p>
                                </div>

                                <div className="flex items-center gap-3">
                                    {order.status === 'pending' && (
                                        <>
                                            <button
                                                onClick={() => handleApprove(order.id)}
                                                className="px-4 py-2 bg-emerald-600 hover:bg-emerald-500 text-white font-semibold text-xs rounded-xl transition-all shadow-md shadow-emerald-600/20"
                                            >
                                                Approve & Provision
                                            </button>

                                            <details className="relative">
                                                <summary className="px-4 py-2 bg-red-900/30 hover:bg-red-900/50 text-red-400 font-semibold text-xs rounded-xl border border-red-800/50 cursor-pointer select-none">
                                                    Decline...
                                                </summary>
                                                <div className="absolute right-0 mt-2 w-72 bg-zinc-950 border border-zinc-800 rounded-2xl p-4 shadow-2xl z-20">
                                                    <form onSubmit={(e) => handleDeclineSubmit(e, order.id)} className="space-y-3">
                                                        <label className="text-xs font-semibold text-zinc-300">Reason for Decline</label>
                                                        <textarea
                                                            required
                                                            rows={2}
                                                            placeholder="State business reason..."
                                                            value={declineReason[order.id] || ''}
                                                            onChange={(e) => setDeclineReason({ ...declineReason, [order.id]: e.target.value })}
                                                            className="w-full px-3 py-2 bg-zinc-900 border border-zinc-800 rounded-lg text-xs text-white outline-none resize-none"
                                                        />
                                                        <button
                                                            type="submit"
                                                            className="w-full py-2 bg-red-600 hover:bg-red-500 text-white font-semibold text-xs rounded-lg"
                                                        >
                                                            Submit Decline Request
                                                        </button>
                                                    </form>
                                                </div>
                                            </details>
                                        </>
                                    )}
                                </div>
                            </div>

                            {order.decline_reason && (
                                <div className="mt-4 p-3 bg-zinc-950 border border-zinc-800 rounded-xl text-xs text-zinc-400 font-mono">
                                    Decline Note: {order.decline_reason}
                                </div>
                            )}
                        </div>
                    ))}
                </div>
            )}
        </div>
    )
}
