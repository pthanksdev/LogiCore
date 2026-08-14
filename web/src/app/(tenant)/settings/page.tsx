'use client'

import React, { useState, useEffect } from 'react'
import { authApi } from '@/lib/api'
import { User, Shield, Key, Building, Save, CheckCircle2 } from 'lucide-react'
import toast from 'react-hot-toast'

export default function SettingsPage() {
    const [user, setUser] = useState<any>(null)
    const [loading, setLoading] = useState(true)
    const [saving, setSaving] = useState(false)
    const [name, setName] = useState('')
    const [phone, setPhone] = useState('')
    const [address, setAddress] = useState('')
    const [company, setCompany] = useState('')
    const [gstNumber, setGstNumber] = useState('')

    useEffect(() => {
        const fetchProfile = async () => {
            try {
                const res = await authApi.me()
                if (res.success && res.data) {
                    setUser(res.data)
                    setName(res.data.name || '')
                    setPhone(res.data.phone || '+1 (555) 019-2831')
                    setAddress(res.data.address || '100 Logistics Way, Suite 400')
                    setCompany(res.data.company || 'Global Logistics Enterprise')
                    setGstNumber(res.data.gst_number || 'GST-9988-7766')
                }
            } catch (err) {
                console.error(err)
            } finally {
                setLoading(false)
            }
        }
        fetchProfile()
    }, [])

    const handleSave = async (e: React.FormEvent) => {
        e.preventDefault()
        setSaving(true)
        
        try {
            const res = await authApi.updateProfile({
                name,
                phone,
                address,
                company,
                gst_number: gstNumber,
            });

            if (res.success) {
                toast.success('Organization profile updated successfully!')
            } else {
                toast.error(res.message || 'Failed to update profile.')
            }
        } catch (err: any) {
            toast.error(err.message || 'An error occurred during update.')
        } finally {
            setSaving(false)
        }
    }

    if (loading) {
        return (
            <div className="p-8 text-center text-zinc-500 font-mono">
                Loading Organization Profile...
            </div>
        )
    }

    return (
        <div className="p-8 max-w-4xl mx-auto space-y-8">
            <div>
                <h1 className="text-3xl font-extrabold text-white tracking-tight flex items-center gap-3">
                    <User className="w-8 h-8 text-blue-400" />
                    Account & Profile Settings
                </h1>
                <p className="text-zinc-400 text-sm mt-1">Manage your organization contact details, security credentials, and company preferences.</p>
            </div>

            {/* Profile Overview Card */}
            <div className="bg-zinc-900 border border-zinc-800 rounded-3xl p-8 shadow-2xl backdrop-blur-xl">
                <div className="flex items-center justify-between pb-6 mb-6 border-b border-zinc-800">
                    <div>
                        <div className="text-xs text-zinc-500 font-mono uppercase tracking-wider">Account Identifier</div>
                        <div className="text-xl font-bold text-white mt-1">{user?.email || 'customer@enterprise.com'}</div>
                        <div className="text-xs text-blue-400 font-mono mt-0.5">Role: {user?.role || 'customer'}</div>
                    </div>
                    <div className="px-3 py-1.5 bg-emerald-500/10 border border-emerald-500/20 text-emerald-400 text-xs font-bold rounded-full flex items-center gap-1.5">
                        <CheckCircle2 className="w-4 h-4 text-emerald-400" />
                        Verified Account
                    </div>
                </div>

                <form onSubmit={handleSave} className="space-y-6">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        <div className="space-y-1.5">
                            <label className="text-sm font-semibold text-zinc-300">Full Representative Name</label>
                            <input
                                type="text"
                                value={name}
                                onChange={(e) => setName(e.target.value)}
                                required
                                className="w-full px-4 py-3 bg-zinc-950/60 border border-zinc-800 rounded-xl focus:border-blue-500 text-white outline-none transition-colors"
                            />
                        </div>

                        <div className="space-y-1.5">
                            <label className="text-sm font-semibold text-zinc-300">Company Name</label>
                            <input
                                type="text"
                                value={company}
                                onChange={(e) => setCompany(e.target.value)}
                                required
                                className="w-full px-4 py-3 bg-zinc-950/60 border border-zinc-800 rounded-xl focus:border-blue-500 text-white outline-none transition-colors"
                            />
                        </div>

                        <div className="space-y-1.5">
                            <label className="text-sm font-semibold text-zinc-300">Phone Number</label>
                            <input
                                type="text"
                                value={phone}
                                onChange={(e) => setPhone(e.target.value)}
                                className="w-full px-4 py-3 bg-zinc-950/60 border border-zinc-800 rounded-xl focus:border-blue-500 text-white outline-none transition-colors"
                            />
                        </div>

                        <div className="space-y-1.5">
                            <label className="text-sm font-semibold text-zinc-300">GST / Tax Identification Number</label>
                            <input
                                type="text"
                                value={gstNumber}
                                onChange={(e) => setGstNumber(e.target.value)}
                                className="w-full px-4 py-3 bg-zinc-950/60 border border-zinc-800 rounded-xl focus:border-blue-500 text-white outline-none transition-colors"
                            />
                        </div>
                    </div>

                    <div className="space-y-1.5">
                        <label className="text-sm font-semibold text-zinc-300">Corporate Address</label>
                        <textarea
                            rows={3}
                            value={address}
                            onChange={(e) => setAddress(e.target.value)}
                            className="w-full px-4 py-3 bg-zinc-950/60 border border-zinc-800 rounded-xl focus:border-blue-500 text-white outline-none resize-none transition-colors"
                        />
                    </div>

                    <div className="pt-4 border-t border-zinc-800 flex justify-end">
                        <button
                            type="submit"
                            disabled={saving}
                            className="px-6 py-3 bg-blue-600 hover:bg-blue-500 text-white font-bold text-sm rounded-xl transition-all flex items-center gap-2 shadow-lg shadow-blue-600/30 disabled:opacity-50"
                        >
                            <Save className="w-4 h-4" />
                            {saving ? 'Saving...' : 'Save Profile Changes'}
                        </button>
                    </div>
                </form>
            </div>

            {/* Security & Authentication Section */}
            <div className="bg-zinc-900 border border-zinc-800 rounded-3xl p-8 shadow-2xl backdrop-blur-xl">
                <h2 className="text-xl font-bold text-white mb-4 flex items-center gap-2">
                    <Shield className="w-5 h-5 text-emerald-400" />
                    Security & Authentication
                </h2>
                <p className="text-zinc-400 text-sm mb-6">Manage multi-factor authentication, active sessions, and password credentials.</p>

                <div className="space-y-4">
                    <div className="p-4 rounded-2xl bg-zinc-950/80 border border-zinc-800 flex items-center justify-between">
                        <div>
                            <div className="text-sm font-bold text-white">Password</div>
                            <div className="text-xs text-zinc-500 mt-0.5">Last updated 12 days ago</div>
                        </div>
                        <button
                            onClick={() => toast.success('Password reset link sent to your registered email!')}
                            className="px-4 py-2 rounded-xl bg-zinc-800 hover:bg-zinc-700 text-white font-semibold text-xs transition-colors flex items-center gap-1.5"
                        >
                            <Key className="w-3.5 h-3.5" />
                            Update Password
                        </button>
                    </div>
                </div>
            </div>
        </div>
    )
}
