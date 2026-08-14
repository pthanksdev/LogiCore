import { NextResponse, type NextRequest } from 'next/server'

export async function middleware(request: NextRequest) {
    const token = request.cookies.get('scm_auth_token')?.value
    const path = request.nextUrl.pathname

    // Public Paths (No auth required)
    const publicRoutes = ['/', '/login', '/register', '/pricing', '/features', '/solutions', '/about', '/contact', '/track', '/migrate', '/auth']
    const isPublicPath = publicRoutes.some((route) => path === route || path.startsWith(route + '/'))

    if (!token && !isPublicPath) {
        return NextResponse.redirect(new URL('/login', request.url))
    }

    return NextResponse.next()
}

export const config = {
    matcher: [
        '/((?!_next/static|_next/image|favicon.ico|.*\\.(?:svg|png|jpg|jpeg|gif|webp)$).*)',
    ],
}
