import Link from 'next/link'

export default async function AdminCustomerDetailPage({
    params,
}: {
    params: Promise<{ id: string }>
}) {
    const { id } = await params

    return (
        <div className="p-8 max-w-5xl mx-auto space-y-8">
            <Link href="/admin/customers" className="text-sm text-zinc-400 hover:text-white transition-colors">
                &larr; Back to Customer Directory
            </Link>

            <div className="bg-zinc-900 border border-zinc-800 rounded-3xl p-8 shadow-2xl">
                <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 pb-6 border-b border-zinc-800">
                    <div>
                        <div className="text-xs text-zinc-500 font-mono uppercase">Customer Profile</div>
                        <h1 className="text-3xl font-extrabold text-white mt-1">Tenant {id}</h1>
                    </div>

                    <div className="bg-zinc-950 p-4 rounded-2xl border border-zinc-800 text-left">
                        <div className="text-xs text-zinc-500 font-mono">10-Digit ID</div>
                        <div className="text-xl font-mono font-bold text-blue-400">{id}</div>
                    </div>
                </div>
            </div>
        </div>
    )
}
