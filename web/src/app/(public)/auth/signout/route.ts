import { NextResponse } from 'next/server'
import { cookies } from 'next/headers'

export async function POST() {
    const cookieStore = await cookies()
    cookieStore.delete('scm_auth_token')
    return NextResponse.redirect(new URL('/login', process.env.NEXT_PUBLIC_SITE_URL || 'http://localhost:3000'))
}

export async function GET() {
    const cookieStore = await cookies()
    cookieStore.delete('scm_auth_token')
    return NextResponse.redirect(new URL('/login', process.env.NEXT_PUBLIC_SITE_URL || 'http://localhost:3000'))
}
