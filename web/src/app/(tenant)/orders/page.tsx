'use client'

import { useEffect, useState } from 'react'
import Link from 'next/link'
import { ordersApi } from '@/lib/api'

export default function OrdersPage() {
    const [orders, setOrders] = useState<any[]>([])
    const [loading, setLoading] = useState(true)

    const fetchOrders = async () => {
        try {
            const res = await ordersApi.getCustomerOrders()
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

    const getStatusBadge = (status: string) => {
        switch (status) {
            case 'approved':
                return <span className="px-3 py-1 bg-emerald-500/10 border border-emerald-500/20 text-emerald-400 text-xs font-semibold rounded-full">Approved & Active</span>
            case 'pending':
                return <span className="px-3 py-1 bg-amber-500/10 border border-amber-500/20 text-amber-400 text-xs font-semibold rounded-full">Under Review</span>
            case 'pending_decline':
                return <span className="px-3 py-1 bg-orange-500/10 border border-orange-500/20 text-orange-400 text-xs font-semibold rounded-full">Escalated for Review</span>
            case 'rejected':
                return <span className="px-3 py-1 bg-red-500/10 border border-red-500/20 text-red-400 text-xs font-semibold rounded-full">Declined</span>
            default:
                return <span className="px-3 py-1 bg-zinc-800 text-zinc-400 text-xs font-semibold rounded-full">{status}</span>
        }
    }

    if (loading) {
        return (
            <div className="p-8 max-w-6xl mx-auto text-white font-mono text-sm">
                Loading order history from backend API...
            </div>
        )
    }

    return (
        <div className="p-8 max-w-6xl mx-auto">
            <div className="flex items-center justify-between mb-8">
                <div>
                    <h1 className="text-3xl font-extrabold text-white tracking-tight">Order History & Requests</h1>
                    <p className="text-zinc-400 text-sm mt-1">Track your pending module applications and active provisioning status from PostgreSQL API.</p>
                </div>
                <Link
                    href="/catalog"
                    className="px-4 py-2 bg-blue-600 hover:bg-blue-500 text-white font-medium text-sm rounded-xl transition-all shadow-md shadow-blue-500/20"
                >
                    + Request New Module
                </Link>
            </div>

            {orders.length === 0 ? (
                <div className="bg-zinc-900/50 border border-zinc-800 rounded-3xl p-12 text-center">
                    <div className="text-4xl mb-4">📦</div>
                    <h3 className="text-xl font-bold text-white mb-2">No Order History Found</h3>
                    <p className="text-zinc-400 text-sm max-w-md mx-auto mb-6">
                        You haven't requested access to any modules yet. Explore the module catalog to get started.
                    </p>
                    <Link
                        href="/catalog"
                        className="inline-flex px-5 py-2.5 bg-zinc-800 hover:bg-zinc-700 text-white text-sm font-semibold rounded-xl transition-all"
                    >
                        Browse Catalog &rarr;
                    </Link>
                </div>
            ) : (
                <div className="space-y-4">
                    {orders.map(order => (
                        <div key={order.id} className="bg-zinc-900/80 border border-zinc-800/80 rounded-2xl p-6 hover:border-zinc-700 transition-all">
                            <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
                                <div className="space-y-1">
                                    <div className="flex items-center gap-3">
                                        <h3 className="text-lg font-bold text-white">{order.module?.name || 'SCM Module'}</h3>
                                        {getStatusBadge(order.status)}
                                    </div>
                                    <p className="text-zinc-400 text-sm">{order.module?.description || 'Enterprise Logistics Engine'}</p>
                                </div>
                                <div className="text-left md:text-right shrink-0">
                                    <div className="text-lg font-bold text-white">${Number(order.module?.base_price || 499).toLocaleString()}/mo</div>
                                    <div className="text-xs text-zinc-500">Requested: {new Date(order.created_at).toLocaleDateString()}</div>
                                </div>
                            </div>

                            {order.status === 'rejected' && order.decline_reason && (
                                <div className="mt-4 p-3 bg-red-950/40 border border-red-900/50 rounded-xl text-red-300 text-xs font-mono">
                                    <strong>Decline Reason:</strong> {order.decline_reason}
                                </div>
                            )}
                        </div>
                    ))}
                </div>
            )}
        </div>
    )
}
