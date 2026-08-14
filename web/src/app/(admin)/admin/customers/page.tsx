import Link from 'next/link'

export default async function AdminCustomersPage() {
    return (
        <div className="p-8 max-w-6xl mx-auto">
            <div className="mb-8">
                <h1 className="text-3xl font-extrabold text-white tracking-tight">Customer CRM Directory</h1>
                <p className="text-zinc-400 text-sm mt-1">Manage onboarded enterprise tenants and view subscription status.</p>
            </div>

            <div className="bg-zinc-900 border border-zinc-800 rounded-3xl p-12 text-center text-zinc-400">
                Active customer tenants are synced live via the Eloquent Customer API model.
            </div>
        </div>
    )
}
