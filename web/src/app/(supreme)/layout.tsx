import Link from 'next/link'

export default async function SupremeLayout({
    children,
}: {
    children: React.ReactNode
}) {
    return (
        <div className="flex h-screen bg-zinc-950 font-sans text-white overflow-hidden">
            {/* Sidebar */}
            <aside className="w-64 bg-zinc-900 border-r border-zinc-800 flex flex-col shrink-0">
                <div className="p-6 border-b border-zinc-800">
                    <div className="font-bold text-xl tracking-tight mb-1 text-purple-400">Supreme Admin</div>
                    <div className="text-xs text-zinc-500 font-mono truncate text-purple-400/50">Platform Owner</div>
                </div>

                <div className="flex-1 overflow-y-auto py-4">
                    <nav className="space-y-1 px-3">
                        <div className="px-3 mb-2 text-xs font-semibold text-zinc-500 uppercase tracking-wider">Core Management</div>
                        <Link href="/supreme/dashboard" className="flex items-center gap-3 px-3 py-2 text-sm font-medium rounded-lg text-zinc-400 hover:text-white hover:bg-zinc-800 transition-colors">
                            System Dashboard
                        </Link>
                        <Link href="/supreme/modules" className="flex items-center gap-3 px-3 py-2 text-sm font-medium rounded-lg text-zinc-400 hover:text-white hover:bg-zinc-800 transition-colors">
                            Catalog CRUD Manager
                        </Link>
                        <Link href="/supreme/escalations" className="flex items-center justify-between px-3 py-2 text-sm font-medium rounded-lg text-zinc-400 hover:text-white hover:bg-zinc-800 transition-colors">
                            Escalations Queue
                        </Link>
                        <Link href="/supreme/staff" className="flex items-center gap-3 px-3 py-2 text-sm font-medium rounded-lg text-zinc-400 hover:text-white hover:bg-zinc-800 transition-colors">
                            Staff & Role Manager
                        </Link>

                        <div className="px-3 pt-4 mb-2 text-xs font-semibold text-zinc-500 uppercase tracking-wider">Platform Operations</div>
                        <Link href="/supreme/tenants" className="flex items-center gap-3 px-3 py-2 text-sm font-medium rounded-lg text-zinc-400 hover:text-white hover:bg-zinc-800 transition-colors">
                            Enterprise Tenants
                        </Link>
                        <Link href="/supreme/billing" className="flex items-center gap-3 px-3 py-2 text-sm font-medium rounded-lg text-zinc-400 hover:text-white hover:bg-zinc-800 transition-colors">
                            Financial Ledger
                        </Link>
                        <Link href="/supreme/audit-logs" className="flex items-center gap-3 px-3 py-2 text-sm font-medium rounded-lg text-zinc-400 hover:text-white hover:bg-zinc-800 transition-colors">
                            System Audit Logs
                        </Link>
                        <Link href="/supreme/system-health" className="flex items-center gap-3 px-3 py-2 text-sm font-medium rounded-lg text-zinc-400 hover:text-white hover:bg-zinc-800 transition-colors">
                            Infrastructure Health
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
