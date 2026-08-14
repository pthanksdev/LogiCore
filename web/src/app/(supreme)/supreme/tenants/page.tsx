'use client'

import { useEffect, useState } from 'react'
import { dashboardExtApi } from '@/lib/api'
import { Building2, Shield, HardDrive, Cpu, Ban, CheckCircle2 } from 'lucide-react'
import toast from 'react-hot-toast'

export default function SupremeTenantsPage() {
    const [tenants, setTenants] = useState<any[]>([])
    const [loading, setLoading] = useState(true)

    const fetchTenants = async () => {
        try {
            const res = await dashboardExtApi.getSupremeTenants()
            if (res.success) setTenants(res.data || [])
        } catch (err) {
            console.error(err)
        } finally {
            setLoading(false)
        }
    }

    useEffect(() => {
        fetchTenants()
    }, [])

    const toggleTenantStatus = (id: string | number, currentStatus: string) => {
        toast.success(`Tenant ${currentStatus === 'Active' ? 'suspended' : 'activated'}.`)
        setTenants(prev => prev.map(t => t.id === id ? { ...t, status: t.status === 'Active' ? 'Suspended' : 'Active' } : t))
    }

    if (loading) {
        return (
            <div className="p-8 max-w-6xl mx-auto text-white font-mono text-sm">
                Loading Platform Tenants...
            </div>
        )
    }

    return (
        <div className="p-8 lg:p-12 max-w-6xl mx-auto space-y-8">
            <div>
                <h1 className="text-3xl font-extrabold text-white tracking-tight flex items-center gap-3">
                    <Building2 className="w-8 h-8 text-purple-400" />
                    Global Tenant Directory & Resource Quotas
                </h1>
                <p className="text-zinc-400 text-sm mt-1">Root management of corporate customer accounts, active module allocations, and RLS quota enforcement.</p>
            </div>

            <div className="bg-zinc-900 border border-zinc-800 rounded-3xl overflow-hidden shadow-2xl">
                <table className="w-full text-left border-collapse">
                    <thead>
                        <tr className="border-b border-zinc-800 bg-zinc-950/50 text-xs font-semibold text-zinc-400 uppercase tracking-wider">
                            <th className="p-4 pl-6">Cust ID</th>
                            <th className="p-4">Enterprise Name</th>
                            <th className="p-4">Corporate Contact</th>
                            <th className="p-4">Active Modules</th>
                            <th className="p-4">API Quota</th>
                            <th className="p-4">Storage Quota</th>
                            <th className="p-4">Status</th>
                            <th className="p-4 pr-6 text-right">Actions</th>
                        </tr>
                    </thead>
                    <tbody className="divide-y divide-zinc-800/60 text-sm text-zinc-300">
                        {tenants.map(t => (
                            <tr key={t.id} className="hover:bg-zinc-800/30 transition-colors">
                                <td className="p-4 pl-6 font-mono text-xs text-purple-400 font-bold">#{t.cust_id}</td>
                                <td className="p-4 font-bold text-white">{t.name}</td>
                                <td className="p-4 text-xs font-mono text-zinc-400">{t.email}</td>
                                <td className="p-4">
                                    <span className="px-2.5 py-1 bg-purple-500/10 border border-purple-500/20 text-purple-300 rounded-lg font-mono text-xs font-bold">
                                        {t.active_modules_count} Active
                                    </span>
                                </td>
                                <td className="p-4 text-xs font-mono text-zinc-400">{t.api_quota}</td>
                                <td className="p-4 text-xs font-mono text-zinc-400">{t.storage_quota}</td>
                                <td className="p-4">
                                    <span className={`px-2.5 py-0.5 rounded-full text-xs font-semibold ${
                                        t.status === 'Active' ? 'bg-emerald-500/10 text-emerald-400 border border-emerald-500/20' : 'bg-red-500/10 text-red-400 border border-red-500/20'
                                    }`}>
                                        {t.status}
                                    </span>
                                </td>
                                <td className="p-4 pr-6 text-right">
                                    <button
                                        onClick={() => toggleTenantStatus(t.id, t.status)}
                                        className={`px-3 py-1 text-xs font-semibold rounded-lg transition-all ${
                                            t.status === 'Active'
                                                ? 'bg-red-950/60 text-red-300 border border-red-800/50 hover:bg-red-900'
                                                : 'bg-emerald-950/60 text-emerald-300 border border-emerald-800/50 hover:bg-emerald-900'
                                        }`}
                                    >
                                        {t.status === 'Active' ? 'Suspend Tenant' : 'Activate Tenant'}
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
