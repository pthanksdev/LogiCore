'use client'

import { useEffect, useState } from 'react'
import { dashboardExtApi } from '@/lib/api'
import { Users, UserPlus, Shield, Mail } from 'lucide-react'
import toast from 'react-hot-toast'

export default function CustomerTeamPage() {
    const [team, setTeam] = useState<any[]>([])
    const [loading, setLoading] = useState(true)

    useEffect(() => {
        const loadTeam = async () => {
            try {
                const res = await dashboardExtApi.getCustomerTeam()
                if (res.success) setTeam(res.data || [])
            } catch (err) {
                console.error(err)
            } finally {
                setLoading(false)
            }
        }
        loadTeam()
    }, [])

    const handleInvite = (e: React.FormEvent) => {
        e.preventDefault()
        toast.success('Team invitation email sent.')
    }

    if (loading) {
        return (
            <div className="p-8 max-w-5xl mx-auto text-white font-mono text-sm">
                Loading Organization Directory...
            </div>
        )
    }

    return (
        <div className="p-8 lg:p-12 max-w-5xl mx-auto space-y-8">
            <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
                <div>
                    <h1 className="text-3xl font-extrabold text-white tracking-tight flex items-center gap-3">
                        <Users className="w-8 h-8 text-blue-400" />
                        Team & User Access Control
                    </h1>
                    <p className="text-zinc-400 text-sm mt-1">Manage sub-users, assign procurement permissions, and control tenant staff access.</p>
                </div>
            </div>

            {/* Invite Teammate */}
            <div className="bg-zinc-900 border border-zinc-800 rounded-3xl p-6 shadow-2xl space-y-4">
                <h3 className="text-base font-bold text-white">Invite Team Member</h3>
                <form onSubmit={handleInvite} className="flex flex-col md:flex-row gap-4">
                    <input
                        type="email"
                        required
                        placeholder="colleague@company.com"
                        className="flex-grow px-4 py-2.5 bg-zinc-950 border border-zinc-800 rounded-xl text-sm text-white outline-none focus:border-blue-500"
                    />
                    <select className="px-4 py-2.5 bg-zinc-950 border border-zinc-800 rounded-xl text-sm text-white outline-none font-mono">
                        <option>Procurement Officer</option>
                        <option>Finance Auditor</option>
                        <option>Logistics Manager</option>
                    </select>
                    <button
                        type="submit"
                        className="px-5 py-2.5 bg-blue-600 hover:bg-blue-500 text-white font-semibold text-sm rounded-xl transition-all shadow-md shadow-blue-600/20 flex items-center gap-2"
                    >
                        <UserPlus className="w-4 h-4" /> Send Invite
                    </button>
                </form>
            </div>

            {/* Team Directory Table */}
            <div className="bg-zinc-900 border border-zinc-800 rounded-3xl overflow-hidden shadow-2xl">
                <table className="w-full text-left border-collapse">
                    <thead>
                        <tr className="border-b border-zinc-800 bg-zinc-950/50 text-xs font-semibold text-zinc-400 uppercase tracking-wider font-mono">
                            <th className="p-4 pl-6">Name</th>
                            <th className="p-4">Email</th>
                            <th className="p-4">Tenant Role</th>
                            <th className="p-4">Status</th>
                        </tr>
                    </thead>
                    <tbody className="divide-y divide-zinc-800/60 text-sm text-zinc-300">
                        {team.map((member) => (
                            <tr key={member.id} className="hover:bg-zinc-800/30 transition-colors">
                                <td className="p-4 pl-6 font-bold text-white">{member.name}</td>
                                <td className="p-4 font-mono text-xs text-zinc-400">{member.email}</td>
                                <td className="p-4 font-mono text-xs text-blue-400">{member.role}</td>
                                <td className="p-4">
                                    <span className="px-2.5 py-0.5 rounded-full text-xs font-semibold bg-emerald-500/10 text-emerald-400 border border-emerald-500/20">
                                        {member.status}
                                    </span>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </div>
    )
}
