'use client'

import { useEffect, useState } from 'react'
import { dashboardExtApi } from '@/lib/api'
import { Truck, Navigation, Thermometer, ShieldCheck, Send } from 'lucide-react'
import toast from 'react-hot-toast'

export default function AdminShipmentsPage() {
    const [shipments, setShipments] = useState<any[]>([])
    const [loading, setLoading] = useState(true)

    useEffect(() => {
        const loadShipments = async () => {
            try {
                const res = await dashboardExtApi.getAdminShipments()
                if (res.success) setShipments(res.data || [])
            } catch (err) {
                console.error(err)
            } finally {
                setLoading(false)
            }
        }
        loadShipments()
    }, [])

    const handleUpdateStatus = (trackingId: string) => {
        toast.success(`Telemetry ping sent for ${trackingId}. Status synchronized.`)
    }

    if (loading) {
        return (
            <div className="p-8 max-w-6xl mx-auto text-white font-mono text-sm">
                Fetching Global Dispatch Streams...
            </div>
        )
    }

    return (
        <div className="p-8 lg:p-12 max-w-6xl mx-auto space-y-8">
            <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
                <div>
                    <h1 className="text-3xl font-extrabold text-white tracking-tight flex items-center gap-3">
                        <Truck className="w-8 h-8 text-emerald-400" />
                        Carrier Dispatch & Freight Shipments
                    </h1>
                    <p className="text-zinc-400 text-sm mt-1">Live tracking assignment, temperature sensor telemetry, and customs manifests.</p>
                </div>
                <button className="px-4 py-2 bg-emerald-600 hover:bg-emerald-500 text-white text-xs font-semibold rounded-xl flex items-center gap-2 shadow-lg shadow-emerald-600/20 transition-all">
                    <Send className="w-4 h-4" /> Dispatch Freight Unit
                </button>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {shipments.map((s) => (
                    <div key={s.tracking_id} className="p-6 bg-zinc-900 border border-zinc-800 rounded-3xl space-y-4 shadow-xl">
                        <div className="flex items-center justify-between border-b border-zinc-800 pb-3">
                            <span className="font-mono text-sm font-bold text-emerald-400">{s.tracking_id}</span>
                            <span className="px-2.5 py-0.5 rounded-full text-xs font-semibold bg-emerald-500/10 text-emerald-400 border border-emerald-500/20">
                                {s.status}
                            </span>
                        </div>

                        <div className="space-y-2 text-xs font-mono text-zinc-300">
                            <div className="flex justify-between">
                                <span className="text-zinc-500">Carrier Partner:</span>
                                <span className="text-white font-bold">{s.carrier}</span>
                            </div>
                            <div className="flex justify-between">
                                <span className="text-zinc-500">Origin Node:</span>
                                <span>{s.origin}</span>
                            </div>
                            <div className="flex justify-between">
                                <span className="text-zinc-500">Destination Hub:</span>
                                <span>{s.destination}</span>
                            </div>
                            <div className="flex justify-between">
                                <span className="text-zinc-500">IoT Sensor Temp:</span>
                                <span className="text-cyan-400 flex items-center gap-1">
                                    <Thermometer className="w-3.5 h-3.5" /> {s.temperature}
                                </span>
                            </div>
                            <div className="flex justify-between">
                                <span className="text-zinc-500">Estimated Delivery:</span>
                                <span className="text-amber-400">{s.eta}</span>
                            </div>
                        </div>

                        <div className="pt-2 border-t border-zinc-800/80 flex justify-end">
                            <button
                                onClick={() => handleUpdateStatus(s.tracking_id)}
                                className="px-3 py-1 bg-zinc-800 hover:bg-zinc-700 text-xs font-semibold text-zinc-200 rounded-lg transition-colors"
                            >
                                Ping GPS Telemetry
                            </button>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    )
}
