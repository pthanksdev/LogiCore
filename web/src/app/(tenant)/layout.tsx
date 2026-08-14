import Link from 'next/link'

export default async function TenantLayout({
    children,
}: {
    children: React.ReactNode
}) {
    return (
        <div className="flex h-screen bg-zinc-950 font-sans text-white overflow-hidden">
            {/* Sidebar */}
            <aside className="w-64 bg-zinc-900 border-r border-zinc-800 flex flex-col shrink-0">
                <div className="p-6 border-b border-zinc-800">
                    <div className="font-bold text-xl tracking-tight mb-1">SCM<span className="text-blue-500">Platform</span></div>
                    <div className="text-xs text-zinc-500 font-mono">Tenant Portal</div>
                </div>

                <div className="flex-1 overflow-y-auto py-4">
                    <nav className="space-y-1 px-3">
                        <div className="px-3 mb-2 text-xs font-semibold text-zinc-500 uppercase tracking-wider">Main Operations</div>
                        <Link href="/dashboard" className="flex items-center gap-3 px-3 py-2 text-sm font-medium rounded-lg text-zinc-400 hover:text-white hover:bg-zinc-800 transition-colors">
                            Dashboard
                        </Link>
                        <Link href="/catalog" className="flex items-center gap-3 px-3 py-2 text-sm font-medium rounded-lg text-zinc-400 hover:text-white hover:bg-zinc-800 transition-colors">
                            Module Catalog
                        </Link>
                        <Link href="/orders" className="flex items-center gap-3 px-3 py-2 text-sm font-medium rounded-lg text-zinc-400 hover:text-white hover:bg-zinc-800 transition-colors">
                            Orders & Tracking
                        </Link>
                        <Link href="/notifications" className="flex items-center gap-3 px-3 py-2 text-sm font-medium rounded-lg text-zinc-400 hover:text-white hover:bg-zinc-800 transition-colors">
                            Notifications
                        </Link>
                        <Link href="/settings" className="flex items-center gap-3 px-3 py-2 text-sm font-medium rounded-lg text-zinc-400 hover:text-white hover:bg-zinc-800 transition-colors">
                            Profile Settings
                        </Link>

                        <div className="px-3 pt-4 mb-2 text-xs font-semibold text-zinc-500 uppercase tracking-wider">Services & Tools</div>
                        <Link href="/dashboard/shipments" className="flex items-center gap-3 px-3 py-2 text-sm font-medium rounded-lg text-zinc-400 hover:text-white hover:bg-zinc-800 transition-colors">
                            🚚 Cargo Shipments
                        </Link>
                        <Link href="/dashboard/billing" className="flex items-center gap-3 px-3 py-2 text-sm font-medium rounded-lg text-zinc-400 hover:text-white hover:bg-zinc-800 transition-colors">
                            💳 Invoices & Billing
                        </Link>
                        <Link href="/dashboard/team" className="flex items-center gap-3 px-3 py-2 text-sm font-medium rounded-lg text-zinc-400 hover:text-white hover:bg-zinc-800 transition-colors">
                            👥 Team Directory
                        </Link>
                        <Link href="/dashboard/integrations" className="flex items-center gap-3 px-3 py-2 text-sm font-medium rounded-lg text-zinc-400 hover:text-white hover:bg-zinc-800 transition-colors">
                            🔌 API & Webhooks
                        </Link>
                    </nav>
                </div>

                <div className="p-4 border-t border-zinc-800">
                    <form action="/auth/signout" method="post">
                        <button className="w-full px-4 py-2 text-sm font-medium text-zinc-400 hover:text-white bg-zinc-800 hover:bg-zinc-700 rounded-lg transition-colors">
                            Sign out
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
