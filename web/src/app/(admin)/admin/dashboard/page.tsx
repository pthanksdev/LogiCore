'use client'

import { useEffect, useState } from 'react'
import Link from 'next/link'
import { dashboardExtApi, ordersApi } from '@/lib/api'
import { Building2, PackageCheck, Layers, RefreshCw, ArrowRight, ShieldAlert, CheckCircle2, Clock } from 'lucide-react'

export default function AdminDashboardPage() {
    const [stats, setStats] = useState({
        active_tenants: 0,
        total_orders: 0,
        approved_orders: 0,
        provisioned_modules: 0,
    })
    const [recentOrders, setRecentOrders] = useState<any[]>([])
    const [loading, setLoading] = useState(true)
    const [refreshing, setRefreshing] = useState(false)

    const fetchDashboardData = async () => {
        setRefreshing(true)
        try {
            const [statsRes, ordersRes] = await Promise.all([
                dashboardExtApi.getAdminStats(),
                ordersApi.getAdminOrders(),
            ])

            if (statsRes.success && statsRes.data) {
                setStats(statsRes.data)
            }

            if (ordersRes.success && Array.isArray(ordersRes.data)) {
                setRecentOrders(ordersRes.data.slice(0, 5))
            }
        } catch (error) {
            console.error('Error fetching admin dashboard metrics:', error)
        } finally {
            setLoading(false)
            setRefreshing(false)
        }
    }

    useEffect(() => {
        fetchDashboardData()
    }, [])

    return (
        <div className="p-8 max-w-6xl mx-auto space-y-8">
            {/* Header section */}
            <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center border-b border-zinc-800 pb-6 gap-4">
                <div>
                    <h1 className="text-3xl font-extrabold tracking-tight text-emerald-400">Admin Control Center</h1>
                    <p className="text-zinc-400 mt-1">Real-time Operations, Freight Dispatch & Multi-tenant CRM Oversight</p>
                </div>
                <button
                    onClick={fetchDashboardData}
                    disabled={refreshing}
                    className="inline-flex items-center gap-2 px-4 py-2 bg-zinc-900 border border-zinc-800 hover:border-zinc-700 text-zinc-300 hover:text-white rounded-xl text-sm font-medium transition-all active:scale-95 disabled:opacity-50"
                >
                    <RefreshCw className={`w-4 h-4 ${refreshing ? 'animate-spin text-emerald-400' : ''}`} />
                    <span>Refresh Live Data</span>
                </button>
            </div>

            {/* Metrics cards grid */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <div className="p-6 bg-zinc-900/90 border border-zinc-800/80 rounded-2xl relative overflow-hidden group hover:border-blue-500/30 transition-all shadow-xl">
                    <div className="flex items-center justify-between">
                        <p className="text-zinc-400 text-sm font-semibold tracking-wide uppercase">Total Active Tenants</p>
                        <Building2 className="w-5 h-5 text-blue-400 opacity-80 group-hover:scale-110 transition-transform" />
                    </div>
                    {loading ? (
                        <div className="h-10 w-24 bg-zinc-800/60 animate-pulse rounded-lg mt-3" />
                    ) : (
                        <p className="text-4xl font-black text-white mt-3 tracking-tight">{stats.active_tenants}</p>
                    )}
                    <p className="text-xs text-zinc-500 mt-2">Onboarded Customer Accounts</p>
                </div>

                <div className="p-6 bg-zinc-900/90 border border-zinc-800/80 rounded-2xl relative overflow-hidden group hover:border-emerald-500/30 transition-all shadow-xl">
                    <div className="flex items-center justify-between">
                        <p className="text-zinc-400 text-sm font-semibold tracking-wide uppercase">Total Orders Dispatched</p>
                        <PackageCheck className="w-5 h-5 text-emerald-400 opacity-80 group-hover:scale-110 transition-transform" />
                    </div>
                    {loading ? (
                        <div className="h-10 w-24 bg-zinc-800/60 animate-pulse rounded-lg mt-3" />
                    ) : (
                        <p className="text-4xl font-black text-white mt-3 tracking-tight">{stats.approved_orders} <span className="text-sm font-normal text-zinc-500">/ {stats.total_orders} total</span></p>
                    )}
                    <p className="text-xs text-zinc-500 mt-2">Fulfilling & Dispatched Supply Orders</p>
                </div>

                <div className="p-6 bg-zinc-900/90 border border-zinc-800/80 rounded-2xl relative overflow-hidden group hover:border-purple-500/30 transition-all shadow-xl">
                    <div className="flex items-center justify-between">
                        <p className="text-zinc-400 text-sm font-semibold tracking-wide uppercase">Provisioned Modules</p>
                        <Layers className="w-5 h-5 text-purple-400 opacity-80 group-hover:scale-110 transition-transform" />
                    </div>
                    {loading ? (
                        <div className="h-10 w-24 bg-zinc-800/60 animate-pulse rounded-lg mt-3" />
                    ) : (
                        <p className="text-4xl font-black text-emerald-400 mt-3 tracking-tight">{stats.provisioned_modules}</p>
                    )}
                    <p className="text-xs text-zinc-500 mt-2">Active Catalog Modules</p>
                </div>
            </div>

            {/* Quick Action Navigation Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <Link href="/admin/orders" className="p-6 bg-zinc-900 border border-zinc-800 hover:border-emerald-500/50 rounded-2xl transition-all group shadow-lg">
                    <div className="flex items-center justify-between">
                        <h3 className="text-lg font-bold text-white group-hover:text-emerald-400 transition-colors flex items-center gap-2">
                            Manage Order Queue
                            <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform text-emerald-400" />
                        </h3>
                        <span className="text-xs font-semibold px-2.5 py-1 rounded-full bg-emerald-950 text-emerald-300 border border-emerald-800/60">Live Queue</span>
                    </div>
                    <p className="text-zinc-400 text-sm mt-2 leading-relaxed">Review pending module access requests, dispatch freight orders, and issue two-step decline proposals.</p>
                </Link>
                <Link href="/admin/customers" className="p-6 bg-zinc-900 border border-zinc-800 hover:border-blue-500/50 rounded-2xl transition-all group shadow-lg">
                    <div className="flex items-center justify-between">
                        <h3 className="text-lg font-bold text-white group-hover:text-blue-400 transition-colors flex items-center gap-2">
                            Customer CRM Directory
                            <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform text-blue-400" />
                        </h3>
                        <span className="text-xs font-semibold px-2.5 py-1 rounded-full bg-blue-950 text-blue-300 border border-blue-800/60">CRM Directory</span>
                    </div>
                    <p className="text-zinc-400 text-sm mt-2 leading-relaxed">Inspect onboarded 10-digit tenant profiles, tax information, and module toggles.</p>
                </Link>
            </div>

            {/* Live Order Queue Preview Table */}
            <div className="p-6 bg-zinc-900/90 border border-zinc-800/80 rounded-2xl space-y-4 shadow-xl">
                <div className="flex items-center justify-between">
                    <div>
                        <h2 className="text-xl font-bold text-white tracking-tight">Recent Dispatches & Orders</h2>
                        <p className="text-xs text-zinc-400 mt-0.5">Live database stream of tenant provisioning orders</p>
                    </div>
                    <Link href="/admin/orders" className="text-xs font-semibold text-emerald-400 hover:text-emerald-300 transition-colors">
                        View All Orders &rarr;
                    </Link>
                </div>

                {loading ? (
                    <div className="space-y-3 py-4">
                        {[1, 2, 3].map((i) => (
                            <div key={i} className="h-12 bg-zinc-800/50 rounded-xl animate-pulse" />
                        ))}
                    </div>
                ) : recentOrders.length === 0 ? (
                    <div className="py-12 text-center text-zinc-500 text-sm">
                        No orders recorded in database.
                    </div>
                ) : (
                    <div className="overflow-x-auto">
                        <table className="w-full text-left border-collapse">
                            <thead>
                                <tr className="border-b border-zinc-800 text-xs font-semibold text-zinc-400 uppercase tracking-wider">
                                    <th className="py-3 px-4">Order ID</th>
                                    <th className="py-3 px-4">Customer</th>
                                    <th className="py-3 px-4">Module</th>
                                    <th className="py-3 px-4">Status</th>
                                    <th className="py-3 px-4 text-right">Date</th>
                                </tr>
                            </thead>
                            <tbody className="divide-y divide-zinc-800/60 text-sm">
                                {recentOrders.map((order) => (
                                    <tr key={order.id} className="hover:bg-zinc-800/30 transition-colors">
                                        <td className="py-3.5 px-4 font-mono text-zinc-300 text-xs">#{order.id}</td>
                                        <td className="py-3.5 px-4 text-white font-medium">{order.customer?.name || order.customer?.company || `Customer #${order.cust_id || order.user_id}`}</td>
                                        <td className="py-3.5 px-4 text-zinc-300">{order.module?.name || `Module #${order.module_id}`}</td>
                                        <td className="py-3.5 px-4">
                                            <span className={`inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-xs font-semibold ${
                                                order.status === 'approved'
                                                    ? 'bg-emerald-950 text-emerald-400 border border-emerald-800/80'
                                                    : order.status === 'decline_proposed'
                                                    ? 'bg-amber-950 text-amber-400 border border-amber-800/80'
                                                    : order.status === 'declined'
                                                    ? 'bg-red-950 text-red-400 border border-red-800/80'
                                                    : 'bg-blue-950 text-blue-400 border border-blue-800/80'
                                            }`}>
                                                {order.status === 'approved' ? (
                                                    <CheckCircle2 className="w-3.5 h-3.5" />
                                                ) : order.status === 'decline_proposed' ? (
                                                    <ShieldAlert className="w-3.5 h-3.5" />
                                                ) : (
                                                    <Clock className="w-3.5 h-3.5" />
                                                )}
                                                {order.status}
                                            </span>
                                        </td>
                                        <td className="py-3.5 px-4 text-right text-zinc-500 text-xs">
                                            {new Date(order.created_at).toLocaleDateString()}
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                )}
            </div>
        </div>
    )
}
