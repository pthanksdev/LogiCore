'use client'

import { useEffect, useState } from 'react'
import { dashboardExtApi } from '@/lib/api'
import { Warehouse, Package, AlertTriangle, Plus, Search } from 'lucide-react'
import toast from 'react-hot-toast'

export default function AdminInventoryPage() {
    const [inventory, setInventory] = useState<any[]>([])
    const [loading, setLoading] = useState(true)

    useEffect(() => {
        const loadInventory = async () => {
            try {
                const res = await dashboardExtApi.getAdminInventory()
                if (res.success) setInventory(res.data || [])
            } catch (err) {
                console.error(err)
            } finally {
                setLoading(false)
            }
        }
        loadInventory()
    }, [])

    const handleReorder = (sku: string) => {
        toast.success(`Reorder dispatch initiated for ${sku}.`)
    }

    if (loading) {
        return (
            <div className="p-8 max-w-6xl mx-auto text-white font-mono text-sm">
                Scanning Warehouse Inventory Grids...
            </div>
        )
    }

    return (
        <div className="p-8 lg:p-12 max-w-6xl mx-auto space-y-8">
            <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
                <div>
                    <h1 className="text-3xl font-extrabold text-white tracking-tight flex items-center gap-3">
                        <Warehouse className="w-8 h-8 text-emerald-400" />
                        Regional Warehouse & Inventory Stock
                    </h1>
                    <p className="text-zinc-400 text-sm mt-1">Real-time SKU quantities across Los Angeles, O'Hare, and JFK logistics hubs.</p>
                </div>
                <button className="px-4 py-2 bg-emerald-600 hover:bg-emerald-500 text-white text-xs font-semibold rounded-xl flex items-center gap-2 shadow-lg shadow-emerald-600/20 transition-all">
                    <Plus className="w-4 h-4" /> Add SKU Item
                </button>
            </div>

            <div className="bg-zinc-900 border border-zinc-800 rounded-3xl overflow-hidden shadow-2xl">
                <table className="w-full text-left border-collapse">
                    <thead>
                        <tr className="border-b border-zinc-800 bg-zinc-950/50 text-xs font-semibold text-zinc-400 uppercase tracking-wider font-mono">
                            <th className="p-4 pl-6">SKU Code</th>
                            <th className="p-4">Item Name</th>
                            <th className="p-4">Warehouse Facility</th>
                            <th className="p-4">Available Qty</th>
                            <th className="p-4">Reorder Point</th>
                            <th className="p-4">Stock Status</th>
                            <th className="p-4 pr-6 text-right">Action</th>
                        </tr>
                    </thead>
                    <tbody className="divide-y divide-zinc-800/60 text-sm text-zinc-300 font-mono">
                        {inventory.map((item) => (
                            <tr key={item.sku} className="hover:bg-zinc-800/30 transition-colors">
                                <td className="p-4 pl-6 font-bold text-emerald-400">{item.sku}</td>
                                <td className="p-4 font-sans font-bold text-white">{item.name}</td>
                                <td className="p-4 text-xs text-zinc-400">{item.warehouse}</td>
                                <td className="p-4 font-bold text-white">{item.quantity.toLocaleString()} units</td>
                                <td className="p-4 text-zinc-500">{item.reorder_point} units</td>
                                <td className="p-4">
                                    <span className={`px-2.5 py-0.5 rounded-full text-xs font-sans font-semibold ${
                                        item.status === 'In Stock' ? 'bg-emerald-500/10 text-emerald-400 border border-emerald-500/20' : 'bg-amber-500/10 text-amber-400 border border-amber-500/20'
                                    }`}>
                                        {item.status}
                                    </span>
                                </td>
                                <td className="p-4 pr-6 text-right font-sans">
                                    <button
                                        onClick={() => handleReorder(item.sku)}
                                        className="px-3 py-1 bg-zinc-800 hover:bg-zinc-700 text-xs font-semibold text-zinc-200 rounded-lg transition-colors"
                                    >
                                        Reorder Batch
                                    </button>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </div>
    )
}
