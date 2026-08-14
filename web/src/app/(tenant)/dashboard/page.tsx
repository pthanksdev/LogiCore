'use client'

import Link from 'next/link'
import { motion } from 'framer-motion'

export default function DashboardPage() {
    return (
        <div className="p-8 max-w-6xl mx-auto space-y-8">
            <header className="flex justify-between items-end border-b border-zinc-800 pb-6">
                <div>
                    <h1 className="text-3xl font-extrabold tracking-tight text-blue-400">Tenant Operations Console</h1>
                    <p className="text-zinc-400">LogiCore Freight & Multi-Warehouse Supply Chain Management</p>
                </div>
            </header>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <motion.div initial={{ opacity: 0, y: 15 }} animate={{ opacity: 1, y: 0 }} className="p-6 bg-zinc-900 border border-zinc-800 rounded-2xl">
                    <p className="text-zinc-400 text-sm font-medium mb-1">Active Freight Shipments</p>
                    <p className="text-4xl font-black text-white">12</p>
                </motion.div>
                <motion.div initial={{ opacity: 0, y: 15 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.1 }} className="p-6 bg-zinc-900 border border-zinc-800 rounded-2xl">
                    <p className="text-zinc-400 text-sm font-medium mb-1">Stock SKU Count</p>
                    <p className="text-4xl font-black text-white">1,480</p>
                </motion.div>
                <motion.div initial={{ opacity: 0, y: 15 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.2 }} className="p-6 bg-zinc-900 border border-zinc-800 rounded-2xl">
                    <p className="text-zinc-400 text-sm font-medium mb-1">Provisioned Modules</p>
                    <p className="text-4xl font-black text-emerald-400">4 Active</p>
                </motion.div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <Link href="/catalog" className="p-6 bg-zinc-900 border border-zinc-800 hover:border-blue-500/50 rounded-2xl transition-all group">
                    <h3 className="text-lg font-bold text-white group-hover:text-blue-400 transition-colors">Browse Module Catalog &rarr;</h3>
                    <p className="text-zinc-400 text-sm mt-1">Explore real-time inventory control, multi-carrier parcel tracking, and enterprise procurement extensions.</p>
                </Link>
                <Link href="/settings" className="p-6 bg-zinc-900 border border-zinc-800 hover:border-purple-500/50 rounded-2xl transition-all group">
                    <h3 className="text-lg font-bold text-white group-hover:text-purple-400 transition-colors">Tenant Organization Settings &rarr;</h3>
                    <p className="text-zinc-400 text-sm mt-1">Configure company profile, GST tax details, and security credentials.</p>
                </Link>
            </div>
        </div>
    )
}
