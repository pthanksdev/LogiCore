import Link from 'next/link'

export default async function AdminDashboardPage() {
    return (
        <div className="p-8 max-w-6xl mx-auto space-y-8">
            <div className="flex justify-between items-end border-b border-zinc-800 pb-6">
                <div>
                    <h1 className="text-3xl font-extrabold tracking-tight text-emerald-400">Admin Control Center</h1>
                    <p className="text-zinc-400">Operations, Logistics Dispatch & Tenant CRM Oversight</p>
                </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <div className="p-6 bg-zinc-900 border border-zinc-800 rounded-2xl">
                    <p className="text-zinc-400 text-sm font-medium mb-1">Total Active Tenants</p>
                    <p className="text-4xl font-black text-white">24</p>
                </div>
                <div className="p-6 bg-zinc-900 border border-zinc-800 rounded-2xl">
                    <p className="text-zinc-400 text-sm font-medium mb-1">Total Orders Dispatched</p>
                    <p className="text-4xl font-black text-white">184</p>
                </div>
                <div className="p-6 bg-zinc-900 border border-zinc-800 rounded-2xl">
                    <p className="text-zinc-400 text-sm font-medium mb-1">Provisioned Modules</p>
                    <p className="text-4xl font-black text-emerald-400">42</p>
                </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <Link href="/admin/orders" className="p-6 bg-zinc-900 border border-zinc-800 hover:border-emerald-500/50 rounded-2xl transition-all group">
                    <h3 className="text-lg font-bold text-white group-hover:text-emerald-400 transition-colors">Manage Order Queue &rarr;</h3>
                    <p className="text-zinc-400 text-sm mt-1">Review pending module access requests, dispatch freight orders, and issue two-step decline proposals.</p>
                </Link>
                <Link href="/admin/customers" className="p-6 bg-zinc-900 border border-zinc-800 hover:border-blue-500/50 rounded-2xl transition-all group">
                    <h3 className="text-lg font-bold text-white group-hover:text-blue-400 transition-colors">Customer CRM Directory &rarr;</h3>
                    <p className="text-zinc-400 text-sm mt-1">Inspect onboarded 10-digit tenant profiles, tax information, and module toggles.</p>
                </Link>
            </div>
        </div>
    )
}
