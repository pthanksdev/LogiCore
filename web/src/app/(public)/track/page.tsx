'use client'

import React, { useState, useEffect } from 'react'
import {
    Search,
    Truck,
    Package,
    CheckCircle2,
    Clock,
    MapPin,
    Thermometer,
    ShieldCheck,
    Navigation,
    ArrowRight,
    Building2,
} from 'lucide-react'
import { trackingApi } from '@/lib/api'

export default function TrackPage() {
    const [trackingId, setTrackingId] = useState('1000000001')
    const [loading, setLoading] = useState(false)
    const [searched, setSearched] = useState(false)
    const [trackingData, setTrackingData] = useState<any>(null)
    const [error, setError] = useState<string | null>(null)

    const handleSearch = async (e?: React.FormEvent) => {
        if (e) e.preventDefault()
        if (!trackingId.trim()) return

        setLoading(true)
        setError(null)

        try {
            const res = await trackingApi.trackParcel(trackingId.trim())
            if (!res.success) {
                setError(res.message || 'No tracking information found for this reference ID.')
                setTrackingData(null)
            } else {
                setTrackingData(res.data)
            }
        } catch (err: any) {
            setError(err.message || 'Failed to query tracking API.')
            setTrackingData(null)
        } finally {
            setLoading(false)
            setSearched(true)
        }
    }

    useEffect(() => {
        handleSearch()
    }, [])

    return (
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
            {/* Header */}
            <div className="text-center max-w-3xl mx-auto mb-12">
                <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-blue-500/10 border border-blue-500/20 text-blue-400 text-sm font-semibold mb-6">
                    Universal Freight & Order Tracking
                </div>
                <h1 className="text-4xl md:text-6xl font-extrabold tracking-tight text-white mb-6">
                    Track Any Order or Customer Account in Real-Time.
                </h1>
                <p className="text-lg text-zinc-400 leading-relaxed">
                    Enter your 10-digit Customer Reference ID or Order UUID for live order status and fulfillment telemetry.
                </p>
            </div>

            {/* Tracking Search Input */}
            <div className="max-w-2xl mx-auto mb-16">
                <form onSubmit={handleSearch} className="relative flex items-center">
                    <input
                        type="text"
                        value={trackingId}
                        onChange={(e) => setTrackingId(e.target.value)}
                        placeholder="Enter 10-digit Cust ID (e.g. 1000000001)"
                        className="w-full pl-6 pr-36 py-4 rounded-2xl bg-zinc-900/90 border border-zinc-700 text-white text-base focus:outline-none focus:border-blue-500 shadow-2xl backdrop-blur-xl transition-all"
                    />
                    <button
                        type="submit"
                        disabled={loading}
                        className="absolute right-2 px-6 py-2.5 rounded-xl bg-blue-600 hover:bg-blue-500 text-white font-bold text-sm transition-all flex items-center gap-2 shadow-lg shadow-blue-600/30 disabled:opacity-50"
                    >
                        <Search className="w-4 h-4" />
                        {loading ? 'Searching...' : 'Track'}
                    </button>
                </form>
                <div className="flex items-center justify-center gap-3 mt-3 text-xs text-zinc-500 font-mono">
                    <span>Demo Cust ID:</span>
                    <button onClick={() => { setTrackingId('1000000001'); handleSearch(); }} className="text-blue-400 hover:underline">1000000001</button>
                </div>
            </div>

            {error && (
                <div className="max-w-2xl mx-auto mb-12 p-6 rounded-2xl bg-red-950/40 border border-red-800 text-red-300 text-center font-medium">
                    {error}
                </div>
            )}

            {/* Shipment Result Details */}
            {searched && trackingData && (
                <div className="space-y-8 animate-in fade-in slide-in-from-bottom-4 duration-300">
                    <div className="p-8 rounded-3xl bg-zinc-900/80 border border-zinc-800 backdrop-blur-xl grid grid-cols-1 md:grid-cols-4 gap-6 items-center">
                        <div>
                            <div className="text-xs text-zinc-500 uppercase font-bold tracking-wider mb-1">Reference Code</div>
                            <div className="text-xl font-black text-white font-mono">{trackingId}</div>
                            <div className="text-xs text-blue-400 font-semibold mt-1">Laravel REST Telemetry</div>
                        </div>

                        <div>
                            <div className="text-xs text-zinc-500 uppercase font-bold tracking-wider mb-1">System Status</div>
                            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-emerald-500/10 border border-emerald-500/20 text-emerald-400 text-xs font-bold">
                                <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
                                Live Telemetry Active
                            </div>
                        </div>

                        <div>
                            <div className="text-xs text-zinc-500 uppercase font-bold tracking-wider mb-1">Database Engine</div>
                            <div className="text-sm font-bold text-white flex items-center gap-1.5">
                                PostgreSQL 16
                            </div>
                        </div>

                        <div className="text-right md:border-l border-zinc-800 md:pl-6">
                            <div className="text-xs text-zinc-500 uppercase font-bold tracking-wider mb-1">Audit Verification</div>
                            <div className="text-xs text-emerald-400 font-mono flex items-center justify-end gap-1">
                                <ShieldCheck className="w-4 h-4 text-emerald-400" />
                                Sanctum Verified
                            </div>
                        </div>
                    </div>

                    <div className="p-8 rounded-3xl bg-zinc-900/40 border border-zinc-800 backdrop-blur-xl">
                        <h2 className="text-xl font-bold text-white mb-6 flex items-center gap-2">
                            <Package className="w-5 h-5 text-blue-400" />
                            Order & Shipment Records
                        </h2>

                        {Array.isArray(trackingData) && trackingData.length > 0 ? (
                            <div className="space-y-4">
                                {trackingData.map((ord: any) => (
                                    <div key={ord.id} className="p-5 rounded-2xl bg-zinc-950/80 border border-zinc-800 flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
                                        <div>
                                            <div className="text-sm font-bold text-white">{ord.module?.name || 'SCM Module'}</div>
                                            <div className="text-xs text-zinc-500 font-mono mt-1">Order ID: {ord.id}</div>
                                            {ord.decline_reason && (
                                                <div className="text-xs text-red-400 mt-1">Reason: {ord.decline_reason}</div>
                                            )}
                                        </div>
                                        <div className="flex items-center gap-3">
                                            <span className={`px-3 py-1 rounded-full text-xs font-bold uppercase ${
                                                ord.status === 'approved' ? 'bg-emerald-500/10 text-emerald-400 border border-emerald-500/30' :
                                                ord.status === 'pending_decline' ? 'bg-amber-500/10 text-amber-400 border border-amber-500/30' :
                                                ord.status === 'rejected' ? 'bg-red-500/10 text-red-400 border border-red-500/30' :
                                                'bg-blue-500/10 text-blue-400 border border-blue-500/30'
                                            }`}>
                                                {ord.status}
                                            </span>
                                            <span className="text-xs text-zinc-500">{new Date(ord.created_at).toLocaleDateString()}</span>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        ) : (
                            <div className="text-zinc-400 text-sm">No orders registered under this reference yet.</div>
                        )}
                    </div>
                </div>
            )}
        </div>
    )
}
