import Link from 'next/link'

export default async function AdminLayout({
    children,
}: {
    children: React.ReactNode
}) {
    return (
        <div className="flex h-screen bg-zinc-950 font-sans text-white overflow-hidden">
            {/* Sidebar */}
            <aside className="w-64 bg-zinc-900 border-r border-zinc-800 flex flex-col shrink-0">
                <div className="p-6 border-b border-zinc-800">
                    <div className="font-bold text-xl tracking-tight mb-1 text-emerald-400">Admin Portal</div>
                    <div className="text-xs text-zinc-500 font-mono truncate">Operations & Dispatch</div>
                </div>

                <div className="flex-1 overflow-y-auto py-4">
                    <nav className="space-y-1 px-3">
                        <div className="px-3 mb-2 text-xs font-semibold text-zinc-500 uppercase tracking-wider">Management</div>
                        <Link href="/admin/dashboard" className="flex items-center gap-3 px-3 py-2 text-sm font-medium rounded-lg text-zinc-400 hover:text-white hover:bg-zinc-800 transition-colors">
                            Platform Overview
                        </Link>
                        <Link href="/admin/orders" className="flex items-center justify-between px-3 py-2 text-sm font-medium rounded-lg text-zinc-400 hover:text-white hover:bg-zinc-800 transition-colors">
                            Order Queue
                        </Link>
                        <Link href="/admin/customers" className="flex items-center gap-3 px-3 py-2 text-sm font-medium rounded-lg text-zinc-400 hover:text-white hover:bg-zinc-800 transition-colors">
                            Customer CRM Directory
                        </Link>

                        <div className="px-3 pt-4 mb-2 text-xs font-semibold text-zinc-500 uppercase tracking-wider">Logistics & Ops</div>
                        <Link href="/admin/inventory" className="flex items-center gap-3 px-3 py-2 text-sm font-medium rounded-lg text-zinc-400 hover:text-white hover:bg-zinc-800 transition-colors">
                            Stock Inventory
                        </Link>
                        <Link href="/admin/shipments" className="flex items-center gap-3 px-3 py-2 text-sm font-medium rounded-lg text-zinc-400 hover:text-white hover:bg-zinc-800 transition-colors">
                            Global Shipments
                        </Link>
                        <Link href="/admin/support" className="flex items-center gap-3 px-3 py-2 text-sm font-medium rounded-lg text-zinc-400 hover:text-white hover:bg-zinc-800 transition-colors">
                            Support Desk
                        </Link>
                        <Link href="/admin/analytics" className="flex items-center gap-3 px-3 py-2 text-sm font-medium rounded-lg text-zinc-400 hover:text-white hover:bg-zinc-800 transition-colors">
                            Operational Analytics
                        </Link>
                    </nav>
                </div>

                <div className="p-4 border-t border-zinc-800">
                    <form action="/auth/signout" method="post">
                        <button className="w-full px-4 py-2 text-sm font-medium text-zinc-400 hover:text-white bg-zinc-800 hover:bg-zinc-700 rounded-lg transition-colors">
                            Sign out Securely
                        </button>
                    </form>
                </div>
            </aside>

            {/* Main Content Area */}
            <main className="flex-1 overflow-y-auto">
                {children}
            </main>
        </div>
    )
}
