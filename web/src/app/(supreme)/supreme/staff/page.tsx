'use client'

import { useEffect, useState } from 'react'
import { supremeApi } from '@/lib/api'
import toast from 'react-hot-toast'

export default function SupremeStaffPage() {
    const [staff, setStaff] = useState<any[]>([])
    const [loading, setLoading] = useState(true)

    const fetchStaff = async () => {
        try {
            const res = await supremeApi.getStaff()
            if (res.success) {
                setStaff(res.data || [])
            }
        } catch (err) {
            console.error(err)
        } finally {
            setLoading(false)
        }
    }

    useEffect(() => {
        fetchStaff()
    }, [])

    const handleRoleChange = async (userId: number | string, newRole: string) => {
        try {
            const res = await supremeApi.updateStaffRole(userId, newRole)
            if (res.success) {
                toast.success('Role updated successfully!')
                fetchStaff()
            } else {
                toast.error(res.message || 'Failed to update role.')
            }
        } catch (err: any) {
            toast.error(err.message || 'Role change request failed.')
        }
    }

    if (loading) {
        return (
            <div className="p-8 max-w-5xl mx-auto text-white">
                Loading staff & role permissions...
            </div>
        )
    }

    return (
        <div className="p-8 max-w-5xl mx-auto space-y-8">
            <div>
                <h1 className="text-3xl font-extrabold text-white tracking-tight">Staff & Privilege Management</h1>
                <p className="text-zinc-400 text-sm mt-1">Promote or demote user permissions across Customer, Admin, and Supreme Admin tiers.</p>
            </div>

            <div className="bg-zinc-900 border border-zinc-800 rounded-3xl overflow-hidden shadow-2xl">
                <table className="w-full text-left border-collapse">
                    <thead>
                        <tr className="border-b border-zinc-800 bg-zinc-950/50 text-xs font-semibold text-zinc-400 uppercase tracking-wider">
                            <th className="p-4 pl-6">ID</th>
                            <th className="p-4">Name / Entity</th>
                            <th className="p-4">Email</th>
                            <th className="p-4">Current Role</th>
                            <th className="p-4 pr-6 text-right">Change Role</th>
                        </tr>
                    </thead>
                    <tbody className="divide-y divide-zinc-800/60 text-sm text-zinc-300">
                        {staff.map(u => (
                            <tr key={u.id} className="hover:bg-zinc-800/30 transition-colors">
                                <td className="p-4 pl-6 font-mono text-xs text-zinc-500">#{u.id}</td>
                                <td className="p-4 font-bold text-white">{u.name}</td>
                                <td className="p-4 text-zinc-400">{u.email}</td>
                                <td className="p-4">
                                    <span className={`px-2.5 py-0.5 rounded-full text-xs font-semibold ${
                                        u.role === 'supreme_admin' ? 'bg-purple-500/10 text-purple-400 border border-purple-500/20' :
                                        u.role === 'admin' ? 'bg-emerald-500/10 text-emerald-400 border border-emerald-500/20' :
                                        'bg-zinc-800 text-zinc-400'
                                    }`}>
                                        {u.role}
                                    </span>
                                </td>
                                <td className="p-4 pr-6 text-right">
                                    <div className="flex justify-end gap-2">
                                        {u.role !== 'admin' && (
                                            <button
                                                onClick={() => handleRoleChange(u.id, 'admin')}
                                                className="px-2.5 py-1 bg-emerald-950 hover:bg-emerald-900 border border-emerald-800/50 text-emerald-300 rounded-lg text-xs font-semibold"
                                            >
                                                Make Admin
                                            </button>
                                        )}
                                        {u.role !== 'supreme_admin' && (
                                            <button
                                                onClick={() => handleRoleChange(u.id, 'supreme_admin')}
                                                className="px-2.5 py-1 bg-purple-950 hover:bg-purple-900 border border-purple-800/50 text-purple-300 rounded-lg text-xs font-semibold"
                                            >
                                                Make Supreme
                                            </button>
                                        )}
                                        {u.role !== 'customer' && (
                                            <button
                                                onClick={() => handleRoleChange(u.id, 'customer')}
                                                className="px-2.5 py-1 bg-zinc-800 hover:bg-zinc-700 text-zinc-300 rounded-lg text-xs font-semibold"
                                            >
                                                Demote to Customer
                                            </button>
                                        )}
                                    </div>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </div>
    )
}
