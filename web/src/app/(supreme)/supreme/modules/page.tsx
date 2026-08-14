'use client'

import { useEffect, useState } from 'react'
import { catalogApi } from '@/lib/api'
import toast from 'react-hot-toast'

export default function SupremeModulesPage() {
    const [modules, setModules] = useState<any[]>([])
    const [loading, setLoading] = useState(true)
    const [form, setForm] = useState({
        name: '',
        slug: '',
        base_price: '',
        description: '',
    })

    const fetchModules = async () => {
        try {
            const res = await catalogApi.getModules()
            if (res.success) {
                setModules(res.data || [])
            }
        } catch (err) {
            console.error(err)
        } finally {
            setLoading(false)
        }
    }

    useEffect(() => {
        fetchModules()
    }, [])

    const handleCreate = async (e: React.FormEvent) => {
        e.preventDefault()
        try {
            const res = await catalogApi.createModule({
                name: form.name,
                slug: form.slug,
                base_price: parseFloat(form.base_price || '0'),
                description: form.description,
            })

            if (res.success) {
                toast.success('Module created successfully!')
                setForm({ name: '', slug: '', base_price: '', description: '' })
                fetchModules()
            } else {
                toast.error(res.message || 'Failed to create module.')
            }
        } catch (err: any) {
            toast.error(err.message || 'Creation failed.')
        }
    }

    const handleDelete = async (id: string) => {
        try {
            const res = await catalogApi.deleteModule(id)
            if (res.success) {
                toast.success('Module deleted.')
                fetchModules()
            } else {
                toast.error(res.message || 'Failed to delete module.')
            }
        } catch (err: any) {
            toast.error(err.message || 'Deletion failed.')
        }
    }

    if (loading) {
        return (
            <div className="p-8 max-w-6xl mx-auto text-white">
                Loading module catalog...
            </div>
        )
    }

    return (
        <div className="p-8 max-w-6xl mx-auto space-y-8">
            <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
                <div>
                    <h1 className="text-3xl font-extrabold text-white tracking-tight">Catalog & Module Management</h1>
                    <p className="text-zinc-400 text-sm mt-1">Add, update pricing, or remove platform software offerings.</p>
                </div>
            </div>

            {/* Create Module Form */}
            <div className="bg-zinc-900 border border-zinc-800 rounded-3xl p-6 shadow-2xl">
                <h3 className="text-lg font-bold text-white mb-4">Add New Catalog Item</h3>
                <form onSubmit={handleCreate} className="grid grid-cols-1 md:grid-cols-4 gap-4">
                    <div>
                        <label className="text-xs font-semibold text-zinc-400">Module Name</label>
                        <input
                            name="name"
                            type="text"
                            required
                            placeholder="Inventory AI"
                            value={form.name}
                            onChange={(e) => setForm({ ...form, name: e.target.value })}
                            className="w-full mt-1 px-3 py-2 bg-zinc-950 border border-zinc-800 rounded-xl text-sm text-white outline-none"
                        />
                    </div>
                    <div>
                        <label className="text-xs font-semibold text-zinc-400">URL Slug</label>
                        <input
                            name="slug"
                            type="text"
                            required
                            placeholder="inventory-ai"
                            value={form.slug}
                            onChange={(e) => setForm({ ...form, slug: e.target.value })}
                            className="w-full mt-1 px-3 py-2 bg-zinc-950 border border-zinc-800 rounded-xl text-sm text-white outline-none"
                        />
                    </div>
                    <div>
                        <label className="text-xs font-semibold text-zinc-400">Base Price ($/mo)</label>
                        <input
                            name="base_price"
                            type="number"
                            step="0.01"
                            required
                            placeholder="499.00"
                            value={form.base_price}
                            onChange={(e) => setForm({ ...form, base_price: e.target.value })}
                            className="w-full mt-1 px-3 py-2 bg-zinc-950 border border-zinc-800 rounded-xl text-sm text-white outline-none"
                        />
                    </div>
                    <div className="md:col-span-4">
                        <label className="text-xs font-semibold text-zinc-400">Description</label>
                        <textarea
                            name="description"
                            rows={2}
                            required
                            placeholder="AI-powered inventory optimization module..."
                            value={form.description}
                            onChange={(e) => setForm({ ...form, description: e.target.value })}
                            className="w-full mt-1 px-3 py-2 bg-zinc-950 border border-zinc-800 rounded-xl text-sm text-white outline-none resize-none"
                        />
                    </div>
                    <div className="md:col-span-4 flex justify-end">
                        <button
                            type="submit"
                            className="px-5 py-2.5 bg-purple-600 hover:bg-purple-500 text-white font-semibold text-sm rounded-xl transition-all shadow-md shadow-purple-600/20"
                        >
                            + Create Module
                        </button>
                    </div>
                </form>
            </div>

            {/* Existing Modules List */}
            <div className="bg-zinc-900 border border-zinc-800 rounded-3xl p-6 shadow-2xl space-y-4">
                <h3 className="text-lg font-bold text-white">Active Catalog Items ({modules.length})</h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    {modules.map(m => (
                        <div key={m.id} className="p-5 bg-zinc-950/50 border border-zinc-800/80 rounded-2xl flex flex-col justify-between gap-4">
                            <div>
                                <div className="flex items-center justify-between">
                                    <h4 className="font-bold text-white text-base">{m.name}</h4>
                                    <span className="font-mono text-purple-400 text-sm font-bold">${Number(m.base_price).toLocaleString()}/mo</span>
                                </div>
                                <div className="text-xs font-mono text-zinc-500 mt-0.5">/{m.slug}</div>
                                <p className="text-xs text-zinc-400 mt-2">{m.description}</p>
                            </div>

                            <div className="flex justify-end pt-2 border-t border-zinc-800/60">
                                <button
                                    onClick={() => handleDelete(m.id)}
                                    className="text-xs text-red-400 hover:text-red-300 font-semibold"
                                >
                                    Delete Module
                                </button>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    )
}
