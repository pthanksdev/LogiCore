'use client'

import { useState } from 'react'
import Link from 'next/link'
import { useRouter } from 'next/navigation'
import { authApi } from '@/lib/api'
import { Eye, EyeOff } from 'lucide-react'

export default function RegisterPage() {
    const router = useRouter()
    const [loading, setLoading] = useState(false)
    const [showPassword, setShowPassword] = useState(false)
    const [error, setError] = useState<string | null>(null)

    const [form, setForm] = useState({
        name: '',
        email: '',
        password: '',
        phone: '',
        address: '',
        gst_number: '',
        company: '',
    })

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault()
        setLoading(true)
        setError(null)

        try {
            const res = await authApi.register(form)
            if (!res.success) {
                setError(res.message || 'Registration failed. Please try again.')
                setLoading(false)
                return
            }
            router.push('/dashboard')
        } catch (err: any) {
            setError(err.message || 'An unexpected error occurred.')
            setLoading(false)
        }
    }

    return (
        <div className="flex min-h-screen items-center justify-center bg-zinc-950 p-4 relative overflow-hidden">
            {/* Background glowing gradients */}
            <div className="absolute top-0 left-0 w-full h-full overflow-hidden pointer-events-none z-0">
                <div className="absolute top-[-20%] right-[-10%] w-[50%] h-[50%] bg-blue-600/20 blur-[140px] rounded-full mix-blend-screen" />
                <div className="absolute bottom-[-20%] left-[-10%] w-[50%] h-[50%] bg-indigo-600/20 blur-[140px] rounded-full mix-blend-screen" />
            </div>

            <div className="w-full max-w-lg bg-zinc-900/80 backdrop-blur-xl rounded-3xl border border-zinc-800 p-8 shadow-2xl z-10 my-8">
                <div className="text-center mb-8">
                    <div className="inline-flex items-center gap-2 px-3 py-1 bg-blue-500/10 border border-blue-500/20 rounded-full text-blue-400 text-xs font-semibold mb-4">
                        Enterprise Onboarding
                    </div>
                    <h1 className="text-3xl font-extrabold text-white tracking-tight mb-2">
                        Register Your Business
                    </h1>
                    <p className="text-zinc-400 text-sm">
                        Create an account to access the B2B Supply Chain Catalog and request module access.
                    </p>
                </div>

                {error && (
                    <div className="mb-6 p-4 bg-red-500/10 border border-red-500/30 rounded-xl text-red-400 text-sm text-center font-medium">
                        {error}
                    </div>
                )}

                <form onSubmit={handleSubmit} className="space-y-4 flex flex-col">
                    <div className="space-y-1.5">
                        <label className="text-sm font-medium text-zinc-300 ml-1" htmlFor="name">
                            Company / Entity Name <span className="text-blue-500">*</span>
                        </label>
                        <input
                            id="name"
                            name="name"
                            type="text"
                            required
                            value={form.name}
                            onChange={(e) => setForm({ ...form, name: e.target.value })}
                            className="w-full px-4 py-3 bg-zinc-950/50 border border-zinc-800 rounded-xl focus:ring-2 focus:ring-blue-500 outline-none text-white placeholder-zinc-500 transition-all"
                            placeholder="Apex Logistics Ltd."
                        />
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div className="space-y-1.5">
                            <label className="text-sm font-medium text-zinc-300 ml-1" htmlFor="email">
                                Work Email <span className="text-blue-500">*</span>
                            </label>
                            <input
                                id="email"
                                name="email"
                                type="email"
                                required
                                value={form.email}
                                onChange={(e) => setForm({ ...form, email: e.target.value })}
                                className="w-full px-4 py-3 bg-zinc-950/50 border border-zinc-800 rounded-xl focus:ring-2 focus:ring-blue-500 outline-none text-white placeholder-zinc-500 transition-all"
                                placeholder="procurement@apex.com"
                            />
                        </div>

                        <div className="space-y-1.5">
                            <label className="text-sm font-medium text-zinc-300 ml-1" htmlFor="phone">
                                Phone Number
                            </label>
                            <input
                                id="phone"
                                name="phone"
                                type="tel"
                                value={form.phone}
                                onChange={(e) => setForm({ ...form, phone: e.target.value })}
                                className="w-full px-4 py-3 bg-zinc-950/50 border border-zinc-800 rounded-xl focus:ring-2 focus:ring-blue-500 outline-none text-white placeholder-zinc-500 transition-all"
                                placeholder="+1 (555) 000-0000"
                            />
                        </div>
                    </div>

                    <div className="space-y-1.5">
                        <label className="text-sm font-medium text-zinc-300 ml-1" htmlFor="password">
                            Password <span className="text-blue-500">*</span>
                        </label>
                        <div className="relative">
                            <input
                                id="password"
                                name="password"
                                type={showPassword ? 'text' : 'password'}
                                required
                                value={form.password}
                                onChange={(e) => setForm({ ...form, password: e.target.value })}
                                className="w-full px-4 py-3 pr-12 bg-zinc-950/50 border border-zinc-800 rounded-xl focus:ring-2 focus:ring-blue-500 outline-none text-white placeholder-zinc-500 transition-all"
                                placeholder="••••••••••••"
                            />
                            <button
                                type="button"
                                onClick={() => setShowPassword(!showPassword)}
                                className="absolute right-3.5 top-1/2 -translate-y-1/2 text-zinc-400 hover:text-white p-1 rounded-lg transition-colors focus:outline-none"
                                aria-label={showPassword ? 'Hide password' : 'Show password'}
                            >
                                {showPassword ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
                            </button>
                        </div>
                    </div>

                    <div className="space-y-1.5">
                        <label className="text-sm font-medium text-zinc-300 ml-1" htmlFor="gst_number">
                            Tax ID / GST Number
                        </label>
                        <input
                            id="gst_number"
                            name="gst_number"
                            type="text"
                            value={form.gst_number}
                            onChange={(e) => setForm({ ...form, gst_number: e.target.value })}
                            className="w-full px-4 py-3 bg-zinc-950/50 border border-zinc-800 rounded-xl focus:ring-2 focus:ring-blue-500 outline-none text-white placeholder-zinc-500 transition-all"
                            placeholder="22AAAAA0000A1Z5"
                        />
                    </div>

                    <div className="space-y-1.5">
                        <label className="text-sm font-medium text-zinc-300 ml-1" htmlFor="address">
                            Business Address
                        </label>
                        <textarea
                            id="address"
                            name="address"
                            rows={2}
                            value={form.address}
                            onChange={(e) => setForm({ ...form, address: e.target.value })}
                            className="w-full px-4 py-3 bg-zinc-950/50 border border-zinc-800 rounded-xl focus:ring-2 focus:ring-blue-500 outline-none text-white placeholder-zinc-500 transition-all resize-none"
                            placeholder="100 Enterprise Way, Suite 400..."
                        />
                    </div>

                    <div className="pt-4">
                        <button
                            type="submit"
                            disabled={loading}
                            className="w-full py-3.5 px-4 bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-500 hover:to-indigo-500 disabled:opacity-50 text-white font-semibold rounded-xl transition-all shadow-lg shadow-blue-500/25 active:scale-[0.98]"
                        >
                            {loading ? 'Registering...' : 'Complete Registration →'}
                        </button>
                    </div>
                </form>

                <div className="mt-6 text-center text-sm text-zinc-500">
                    Already have an account?{' '}
                    <Link href="/login" className="text-blue-400 hover:underline font-medium">
                        Sign In
                    </Link>
                </div>
            </div>
        </div>
    )
}
