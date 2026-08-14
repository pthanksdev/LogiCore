'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import { authApi } from '@/lib/api'

export default function LoginPage() {
    const router = useRouter()
    const [isLogin, setIsLogin] = useState(true)
    const [loading, setLoading] = useState(false)
    const [errorMsg, setErrorMsg] = useState<string | null>(null)

    const [form, setForm] = useState({
        name: '',
        company: '',
        email: '',
        password: '',
    })

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault()
        setLoading(true)
        setErrorMsg(null)

        try {
            if (isLogin) {
                const res = await authApi.login(form.email, form.password)
                if (!res.success) {
                    setErrorMsg(res.message || 'Login failed. Please check credentials.')
                    setLoading(false)
                    return
                }

                const role = res.data?.user?.role || 'customer'
                if (role === 'supreme_admin') router.push('/supreme/dashboard')
                else if (role === 'admin') router.push('/admin/dashboard')
                else router.push('/dashboard')
            } else {
                const res = await authApi.register(form)
                if (!res.success) {
                    setErrorMsg(res.message || 'Registration failed.')
                    setLoading(false)
                    return
                }
                router.push('/dashboard')
            }
        } catch (err: any) {
            setErrorMsg(err.message || 'An unexpected error occurred.')
            setLoading(false)
        }
    }

    return (
        <div className="flex min-h-screen items-center justify-center bg-zinc-950 p-4 relative overflow-hidden">
            {/* Background decorations */}
            <div className="absolute top-0 left-0 w-full h-full overflow-hidden pointer-events-none z-0">
                <div className="absolute top-[-20%] left-[-10%] w-[50%] h-[50%] bg-blue-600/20 blur-[120px] rounded-full mix-blend-screen" />
                <div className="absolute bottom-[-20%] right-[-10%] w-[50%] h-[50%] bg-indigo-600/20 blur-[120px] rounded-full mix-blend-screen" />
            </div>

            <div className="w-full max-w-md bg-zinc-900/80 backdrop-blur-xl rounded-3xl border border-zinc-800 p-8 shadow-2xl z-10 transition-all duration-300">

                {/* Toggle Switches */}
                <div className="flex bg-zinc-950 rounded-xl p-1 mb-8 shadow-inner border border-zinc-800/50">
                    <button
                        type="button"
                        onClick={() => { setIsLogin(true); setErrorMsg(null); }}
                        className={`flex-1 py-2.5 text-sm font-semibold rounded-lg transition-all ${isLogin ? 'bg-zinc-800 text-white shadow-sm' : 'text-zinc-500 hover:text-zinc-300'}`}
                    >
                        Log In
                    </button>
                    <button
                        type="button"
                        onClick={() => { setIsLogin(false); setErrorMsg(null); }}
                        className={`flex-1 py-2.5 text-sm font-semibold rounded-lg transition-all ${!isLogin ? 'bg-zinc-800 text-white shadow-sm' : 'text-zinc-500 hover:text-zinc-300'}`}
                    >
                        Sign Up
                    </button>
                </div>

                <div className="text-center mb-6">
                    <h1 className="text-3xl font-extrabold text-white tracking-tight mb-2">
                        {isLogin ? 'Welcome Back' : 'Create an Account'}
                    </h1>
                    <p className="text-zinc-400 text-sm">
                        {isLogin
                            ? 'Enter your email and password to access your enterprise portal.'
                            : 'Sign up to provision your multi-tenant environment.'}
                    </p>
                </div>

                {errorMsg && (
                    <div className="mb-6 p-3 bg-red-950/60 border border-red-800/80 rounded-xl text-red-300 text-sm text-center">
                        {errorMsg}
                    </div>
                )}

                <form onSubmit={handleSubmit} className="space-y-4 flex flex-col">

                    {!isLogin && (
                        <>
                            <div className="space-y-1.5">
                                <label className="text-sm font-medium text-zinc-300 ml-1" htmlFor="name">
                                    Full Name
                                </label>
                                <input
                                    id="name"
                                    name="name"
                                    type="text"
                                    required={!isLogin}
                                    value={form.name}
                                    onChange={(e) => setForm({ ...form, name: e.target.value })}
                                    className="w-full px-4 py-3 bg-zinc-950/50 border border-zinc-800 rounded-xl focus:ring-2 focus:ring-blue-500 outline-none text-white placeholder-zinc-500"
                                    placeholder="John Doe"
                                />
                            </div>
                            <div className="space-y-1.5">
                                <label className="text-sm font-medium text-zinc-300 ml-1" htmlFor="company">
                                    Company Name
                                </label>
                                <input
                                    id="company"
                                    name="company"
                                    type="text"
                                    required={!isLogin}
                                    value={form.company}
                                    onChange={(e) => setForm({ ...form, company: e.target.value })}
                                    className="w-full px-4 py-3 bg-zinc-950/50 border border-zinc-800 rounded-xl focus:ring-2 focus:ring-blue-500 outline-none text-white placeholder-zinc-500"
                                    placeholder="Acme Logistics Inc."
                                />
                            </div>
                        </>
                    )}

                    <div className="space-y-1.5">
                        <label className="text-sm font-medium text-zinc-300 ml-1" htmlFor="email">
                            Email Address
                        </label>
                        <input
                            id="email"
                            name="email"
                            type="email"
                            required
                            value={form.email}
                            onChange={(e) => setForm({ ...form, email: e.target.value })}
                            className="w-full px-4 py-3 bg-zinc-950/50 border border-zinc-800 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all outline-none text-white placeholder-zinc-500"
                            placeholder="you@company.com"
                        />
                    </div>

                    <div className="space-y-1.5">
                        <label className="text-sm font-medium text-zinc-300 ml-1" htmlFor="password">
                            Password
                        </label>
                        <input
                            id="password"
                            name="password"
                            type="password"
                            required
                            value={form.password}
                            onChange={(e) => setForm({ ...form, password: e.target.value })}
                            className="w-full px-4 py-3 bg-zinc-950/50 border border-zinc-800 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all outline-none text-white placeholder-zinc-500"
                            placeholder="••••••••"
                        />
                    </div>

                    <div className="pt-4">
                        <button
                            type="submit"
                            disabled={loading}
                            className="w-full py-3.5 px-4 bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-500 hover:to-indigo-500 disabled:opacity-50 text-white font-semibold rounded-xl transition-all shadow-lg shadow-blue-500/25 active:scale-[0.98]"
                        >
                            {loading ? 'Processing...' : isLogin ? 'Sign In →' : 'Sign Up'}
                        </button>
                    </div>
                </form>
            </div>
        </div>
    )
}
