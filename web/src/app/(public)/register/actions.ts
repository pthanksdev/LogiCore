'use server'

import { cookies } from 'next/headers'
import { redirect } from 'next/navigation'

export async function signup(formData: FormData) {
    const name = formData.get('name') as string
    const email = formData.get('email') as string
    const password = formData.get('password') as string
    const company = formData.get('company') as string

    const apiUrl = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:8000/api/v1'
    const res = await fetch(`${apiUrl}/auth/register`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ name, email, password, company }),
    })

    const data = await res.json()

    if (!res.ok || !data.success) {
        redirect('/register?error=' + encodeURIComponent(data.message || 'Registration failed'))
    }

    const cookieStore = await cookies()
    cookieStore.set('scm_auth_token', data.token || 'demo-token', { path: '/' })

    redirect('/dashboard')
}
