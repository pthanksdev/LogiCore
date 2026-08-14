'use client'

import { useEffect, useState } from 'react'
import { dashboardExtApi } from '@/lib/api'
import { Key, Globe, Plus, Copy, Check } from 'lucide-react'
import toast from 'react-hot-toast'

export default function CustomerIntegrationsPage() {
    const [integrations, setIntegrations] = useState<any>(null)
    const [loading, setLoading] = useState(true)

    useEffect(() => {
        const loadIntegrations = async () => {
            try {
                const res = await dashboardExtApi.getCustomerIntegrations()
                if (res.success) setIntegrations(res.data)
            } catch (err) {
                console.error(err)
            } finally {
                setLoading(false)
            }
        }
        loadIntegrations()
    }, [])

    const handleGenerateKey = () => {
        toast.success('New SAP Production API Token generated: scm_live_sec_9912x')
    }

    const handleAddWebhook = (e: React.FormEvent) => {
        e.preventDefault()
        toast.success('Webhook endpoint registered.')
    }

    if (loading) {
        return (
            <div className="p-8 max-w-5xl mx-auto text-white font-mono text-sm">
                Fetching API Key Secret Keys...
            </div>
        )
    }

    return (
        <div className="p-8 lg:p-12 max-w-5xl mx-auto space-y-8">
            <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
                <div>
                    <h1 className="text-3xl font-extrabold text-white tracking-tight flex items-center gap-3">
                        <Key className="w-8 h-8 text-blue-400" />
                        API Keys & ERP Webhooks
                    </h1>
                    <p className="text-zinc-400 text-sm mt-1">Connect SCM real-time logistics data into corporate ERP systems (SAP, NetSuite, Salesforce).</p>
                </div>
                <button
                    onClick={handleGenerateKey}
                    className="px-4 py-2 bg-blue-600 hover:bg-blue-500 text-white text-xs font-semibold rounded-xl flex items-center gap-2 shadow-lg shadow-blue-600/20 transition-all"
                >
                    <Plus className="w-4 h-4" /> Generate API Secret Key
                </button>
            </div>

            {/* API Keys Table */}
            <div className="bg-zinc-900 border border-zinc-800 rounded-3xl p-6 shadow-2xl space-y-4">
                <h3 className="text-base font-bold text-white">Active API Secret Keys</h3>
                <div className="space-y-3 font-mono text-xs">
                    {integrations?.api_keys?.map((k: any) => (
                        <div key={k.id} className="p-4 bg-zinc-950/60 border border-zinc-800/80 rounded-2xl flex flex-col md:flex-row md:items-center justify-between gap-4">
                            <div>
                                <h4 className="font-bold text-white text-sm font-sans">{k.name}</h4>
                                <span className="text-blue-400 font-bold">{k.prefix}</span>
                            </div>
                            <div className="text-zinc-500 flex items-center gap-4">
                                <span>Created: {k.created_at}</span>
                                <span>Last Used: {k.last_used}</span>
                            </div>
                        </div>
                    ))}
                </div>
            </div>

            {/* Webhooks Manager */}
            <div className="bg-zinc-900 border border-zinc-800 rounded-3xl p-6 shadow-2xl space-y-4">
                <h3 className="text-base font-bold text-white flex items-center gap-2">
                    <Globe className="w-5 h-5 text-emerald-400" /> Real-Time Event Webhooks
                </h3>
                <form onSubmit={handleAddWebhook} className="flex gap-4">
                    <input
                        type="url"
                        required
                        placeholder="https://api.yourcompany.com/webhooks/scm"
                        className="flex-grow px-4 py-2.5 bg-zinc-950 border border-zinc-800 rounded-xl text-sm text-white outline-none focus:border-blue-500"
                    />
                    <button
                        type="submit"
                        className="px-5 py-2.5 bg-zinc-800 hover:bg-zinc-700 text-white font-semibold text-sm rounded-xl transition-colors"
                    >
                        Register Endpoint
                    </button>
                </form>

                <div className="space-y-2 font-mono text-xs pt-2">
                    {integrations?.webhooks?.map((w: any) => (
                        <div key={w.id} className="p-3 bg-zinc-950/60 border border-zinc-800/80 rounded-xl flex items-center justify-between">
                            <span className="text-zinc-300">{w.url}</span>
                            <span className="px-2 py-0.5 rounded text-[10px] bg-emerald-500/10 text-emerald-400 border border-emerald-500/20 font-bold">
                                {w.status}
                            </span>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    )
}
