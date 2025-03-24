import { NextResponse } from 'next/server'
import type { NextRequest } from 'next/server'
import hasCookie from './services/hasCookie'

export async function middleware(request: NextRequest) {
    const userId = await hasCookie('user');
    const token = await hasCookie('token');
    const { pathname } = request.nextUrl;


    if (!userId || !token) {
        if (pathname !== '/authenticate') {
            return NextResponse.redirect(new URL('/authenticate', request.url));
        }
    }

    else if (pathname === '/authenticate') {
        return NextResponse.redirect(new URL('/', request.url));
    }

    return NextResponse.next();
}

// Apply middleware to all routes
export const config = {
    matcher: ['/', '/history', '/support', '/subscription', '/authenticate'],
};

