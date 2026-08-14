'use client'

import { useEffect, useState } from 'react'
import CatalogClient from './CatalogClient'
import { catalogApi, ordersApi } from '@/lib/api'

export default function CatalogPage() {
    const [loading, setLoading] = useState(true)
    const [modules, setModules] = useState<any[]>([])
    const [myOrders, setMyOrders] = useState<any[]>([])

    useEffect(() => {
        async function loadCatalog() {
            try {
                const [modRes, ordRes] = await Promise.all([
                    catalogApi.getModules(),
                    ordersApi.getCustomerOrders(),
                ])
                if (modRes.success) setModules(modRes.data || [])
                if (ordRes.success) setMyOrders(ordRes.data || [])
            } catch (err) {
                console.error(err)
            } finally {
                setLoading(false)
            }
        }
        loadCatalog()
    }, [])

    if (loading) {
        return (
            <div className="p-8 lg:p-12 max-w-7xl mx-auto text-white">
                Loading catalog modules...
            </div>
        )
    }

    return (
        <div className="p-8 lg:p-12 max-w-7xl mx-auto">
            <div className="mb-10">
                <h1 className="text-4xl font-extrabold tracking-tight mb-3">Module Catalog</h1>
                <p className="text-zinc-400 text-lg">Purchase SCM modules to expand your platform capabilities.</p>
            </div>

            <CatalogClient
                modules={modules}
                myModules={[]}
                myOrders={myOrders}
            />
        </div>
    )
}
