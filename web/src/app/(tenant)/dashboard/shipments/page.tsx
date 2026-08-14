'use client'

import { useEffect, useState } from 'react'
import { dashboardExtApi } from '@/lib/api'
import { Package, Truck, Thermometer, Navigation, ShieldCheck, MapPin } from 'lucide-react'

export default function CustomerShipmentsPage() {
    const [shipments, setShipments] = useState<any[]>([])
    const [loading, setLoading] = useState(true)

    useEffect(() => {
        const loadShipments = async () => {
            try {
                const res = await dashboardExtApi.getCustomerShipments()
                if (res.success) setShipments(res.data || [])
            } catch (err) {
                console.error(err)
            } finally {
                setLoading(false)
            }
        }
        loadShipments()
    }, [])

    if (loading) {
        return (
            <div className="p-8 max-w-5xl mx-auto text-white font-mono text-sm">
                Connecting to Container GPS Satellite Grid...
            </div>
        )
    }

    return (
        <div className="p-8 lg:p-12 max-w-5xl mx-auto space-y-8">
            <div>
                <h1 className="text-3xl font-extrabold text-white tracking-tight flex items-center gap-3">
                    <Truck className="w-8 h-8 text-blue-400" />
                    Live Cargo & Freight Shipments
                </h1>
                <p className="text-zinc-400 text-sm mt-1">Real-time GPS positioning, IoT sensor telemetry, and estimated arrival windows.</p>
            </div>

            {/* Simulated Live Satellite Telemetry Map Container */}
            <div className="relative h-64 w-full bg-zinc-900 border border-zinc-800 rounded-3xl overflow-hidden shadow-2xl flex items-center justify-center">
                <div
                    className="absolute inset-0 bg-cover bg-center opacity-40 filter saturate-150"
                    style={{ backgroundImage: "url('/hero_parallax_bg.png')" }}
                />
                <div className="absolute inset-0 bg-gradient-to-t from-zinc-950 via-zinc-950/60 to-transparent" />
                <div className="relative z-10 text-center space-y-2">
                    <div className="inline-flex items-center gap-2 px-3 py-1 bg-blue-500/20 border border-blue-500/30 text-blue-400 rounded-full text-xs font-mono font-bold animate-pulse">
                        <MapPin className="w-4 h-4" /> Live GPS Satellite Link Active
                    </div>
                    <h3 className="text-xl font-extrabold text-white">Container #LOGI-9842-US En Route</h3>
                    <p className="text-zinc-400 text-xs font-mono">Passing I-80 Eastbound Corridor (3.4 miles to Chicago Hub)</p>
                </div>
            </div>

            <div className="space-y-4">
                <h3 className="text-lg font-bold text-white">Active Cargo Items</h3>
                {shipments.map((s) => (
                    <div key={s.id} className="p-6 bg-zinc-900 border border-zinc-800 rounded-3xl space-y-3">
                        <div className="flex items-center justify-between font-mono">
                            <span className="text-base font-bold text-blue-400">{s.tracking_code}</span>
                            <span className="px-2.5 py-0.5 rounded-full text-xs font-semibold bg-emerald-500/10 text-emerald-400 border border-emerald-500/20">
                                {s.status}
                            </span>
                        </div>
                        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-xs font-mono text-zinc-300">
                            <div>
                                <span className="text-zinc-500 block">Origin → Destination</span>
                                <span className="text-white font-bold">{s.origin} → {s.destination}</span>
                            </div>
                            <div>
                                <span className="text-zinc-500 block">IoT Temp Sensor</span>
                                <span className="text-cyan-400 font-bold flex items-center gap-1">
                                    <Thermometer className="w-3.5 h-3.5" /> {s.temperature}
                                </span>
                            </div>
                            <div>
                                <span className="text-zinc-500 block">Estimated Arrival</span>
                                <span className="text-amber-400 font-bold">{s.eta}</span>
                            </div>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    )
}
