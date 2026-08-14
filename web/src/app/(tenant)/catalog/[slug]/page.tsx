import Link from 'next/link'

export default async function ModuleDetailPage({
    params,
}: {
    params: Promise<{ slug: string }>
}) {
    const { slug } = await params

    return (
        <div className="p-8 max-w-4xl mx-auto">
            <Link
                href="/catalog"
                className="inline-flex items-center gap-2 text-sm text-zinc-400 hover:text-white mb-6 transition-colors"
            >
                &larr; Back to Catalog
            </Link>

            <div className="bg-zinc-900 border border-zinc-800 rounded-3xl p-8 shadow-2xl relative overflow-hidden">
                <div className="flex flex-col md:flex-row md:items-center justify-between gap-6 pb-6 border-b border-zinc-800">
                    <div>
                        <div className="text-xs font-semibold text-blue-400 uppercase tracking-widest mb-1">
                            Enterprise Module
                        </div>
                        <h1 className="text-3xl font-extrabold text-white capitalize">{slug.replace(/-/g, ' ')}</h1>
                        <p className="text-zinc-400 text-sm mt-1">Real-time supply chain management module.</p>
                    </div>

                    <div className="bg-zinc-950 p-4 rounded-2xl border border-zinc-800 text-center shrink-0">
                        <div className="text-xs text-zinc-500 uppercase tracking-wider mb-1">Subscription Price</div>
                        <div className="text-3xl font-extrabold text-white">$499</div>
                        <div className="text-xs text-zinc-400 font-mono">/ month</div>
                    </div>
                </div>

                <div className="py-8 space-y-6">
                    <h3 className="text-lg font-bold text-white">Module Features & Specifications</h3>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div className="p-4 bg-zinc-950/50 border border-zinc-800/80 rounded-2xl flex items-start gap-3">
                            <span className="text-emerald-400 text-lg">⚡</span>
                            <div>
                                <h4 className="text-sm font-semibold text-white">Real-Time Data Sync</h4>
                                <p className="text-xs text-zinc-400 mt-0.5">High-frequency PostgreSQL event streaming for inventory updates.</p>
                            </div>
                        </div>
                        <div className="p-4 bg-zinc-950/50 border border-zinc-800/80 rounded-2xl flex items-start gap-3">
                            <span className="text-blue-400 text-lg">🔒</span>
                            <div>
                                <h4 className="text-sm font-semibold text-white">Row-Level Authorization</h4>
                                <p className="text-xs text-zinc-400 mt-0.5">Strict isolation ensures zero data leak across tenant boundaries.</p>
                            </div>
                        </div>
                    </div>
                </div>

                <div className="pt-6 border-t border-zinc-800 flex items-center justify-end">
                    <Link
                        href="/orders"
                        className="px-6 py-3.5 bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-500 hover:to-indigo-500 text-white font-bold rounded-xl transition-all shadow-lg shadow-blue-500/25 active:scale-[0.98]"
                    >
                        Provision via Order Engine &rarr;
                    </Link>
                </div>
            </div>
        </div>
    )
}
