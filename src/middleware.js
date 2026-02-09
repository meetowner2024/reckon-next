import { NextResponse } from 'next/server';

export function middleware(request) {
  const token = request.cookies.get('admin_token')?.value;
  const { pathname } = request.nextUrl;

  // Protect /admin routes
  if (pathname.startsWith('/admin')) {
    if (!token) {
      // If no token, redirect to login
      const url = new URL('/login', request.url);
      return NextResponse.redirect(url);
    }
  }

  // If already logged in, don't show login or register page
  if (token && (pathname === '/login' || pathname === '/register')) {
    const url = new URL('/admin', request.url);
    return NextResponse.redirect(url);
  }

  return NextResponse.next();
}

// Config to specify which paths the middleware should run on
export const config = {
  matcher: [
    '/admin/:path*',
    '/login',
    '/register'
  ],
};
