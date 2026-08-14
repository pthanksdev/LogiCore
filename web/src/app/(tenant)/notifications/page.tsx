'use client'

import { useEffect, useState } from 'react'
import { apiFetch } from '@/lib/api'
import toast from 'react-hot-toast'

export default function NotificationsPage() {
    const [notifications, setNotifications] = useState<any[]>([])
    const [loading, setLoading] = useState(true)

    const fetchNotifications = async () => {
        try {
            const res = await apiFetch('/notifications')
            if (res.success) {
                setNotifications(res.data || [])
            }
        } catch (err) {
            console.error(err)
        } finally {
            setLoading(false)
        }
    }

    useEffect(() => {
        fetchNotifications()
    }, [])

    const markAsRead = async (id: string | number) => {
        try {
            const res = await apiFetch(`/notifications/${id}/read`, { method: 'PATCH' })
            if (res.success) {
                toast.success('Notification marked as read')
                fetchNotifications()
            }
        } catch (err) {
            toast.error('Failed to update notification status.')
        }
    }

    if (loading) {
        return (
            <div className="p-8 max-w-4xl mx-auto text-white font-mono text-sm">
                Loading notifications from backend API...
            </div>
        )
    }

    return (
        <div className="p-8 max-w-4xl mx-auto">
            <div className="flex items-center justify-between mb-8">
                <div>
                    <h1 className="text-3xl font-extrabold text-white tracking-tight">Notifications Center</h1>
                    <p className="text-zinc-400 text-sm mt-1">Platform updates, order responses, and provisioning alerts from PostgreSQL engine.</p>
                </div>
            </div>

            {notifications.length === 0 ? (
                <div className="bg-zinc-900/50 border border-zinc-800 rounded-3xl p-12 text-center">
                    <div className="text-4xl mb-4">🔔</div>
                    <h3 className="text-xl font-bold text-white mb-2">No Notifications</h3>
                    <p className="text-zinc-400 text-sm">You have no pending system notifications at this time.</p>
                </div>
            ) : (
                <div className="space-y-3">
                    {notifications.map(item => (
                        <div
                            key={item.id}
                            className={`p-5 rounded-2xl border transition-all flex items-start justify-between gap-4 ${
                                item.is_read
                                    ? 'bg-zinc-900/40 border-zinc-800/60 text-zinc-400'
                                    : 'bg-blue-950/20 border-blue-500/30 text-white shadow-lg shadow-blue-500/5'
                            }`}
                        >
                            <div className="flex items-start gap-4">
                                <span className={`text-xl mt-0.5 ${item.is_read ? 'text-zinc-500' : 'text-blue-400'}`}>
                                    {item.is_read ? '✉️' : '📩'}
                                </span>
                                <div>
                                    <p className="text-sm font-medium leading-relaxed">{item.message}</p>
                                    <div className="text-xs text-zinc-500 mt-1">
                                        {new Date(item.created_at).toLocaleString()}
                                    </div>
                                </div>
                            </div>

                            {!item.is_read && (
                                <button
                                    onClick={() => markAsRead(item.id)}
                                    className="text-xs text-blue-400 hover:text-blue-300 font-semibold shrink-0"
                                >
                                    Mark read
                                </button>
                            )}
                        </div>
                    ))}
                </div>
            )}
        </div>
    )
}
