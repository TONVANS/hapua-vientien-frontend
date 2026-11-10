import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';

export function proxy(request: NextRequest) {
  const { pathname } = request.nextUrl;
  const token = request.cookies.get('hapua_token')?.value;

  const hasToken = Boolean(
    token &&
    token !== 'undefined' &&
    token !== 'null' &&
    token.trim() !== ''
  );

  // Protect admin routes
  if (pathname.startsWith('/admin')) {
    const isLoginPage = pathname === '/admin/login';

    // If no token and trying to access protected admin page -> redirect to login
    if (!hasToken && !isLoginPage) {
      const url = request.nextUrl.clone();
      url.pathname = '/admin/login';
      url.searchParams.set('from', pathname);
      return NextResponse.redirect(url);
    }

    // If token exists and trying to access login page -> redirect to dashboard
    if (hasToken && isLoginPage) {
      const url = request.nextUrl.clone();
      url.pathname = '/admin/dashboard';
      return NextResponse.redirect(url);
    }
  }

  return NextResponse.next();
}

export const config = {
  matcher: ['/admin/:path*'],
};
