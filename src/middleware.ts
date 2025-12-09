import { NextRequest, NextResponse } from 'next/server'

// Protected routes that require authentication
const protectedRoutes = [
  '/dashboard',
  '/admin',
  '/projects',
  '/orders',
  '/customer-statements',
  '/finances',
  '/my-tasks',
  '/inventory',
  '/performance',
  '/quotes',
  '/employees',
  '/clients'
]

export function middleware(request: NextRequest) {
  const pathname = request.nextUrl.pathname

  // Check if the route is protected
  const isProtectedRoute = protectedRoutes.some(route => pathname.startsWith(route))

  if (isProtectedRoute) {
    // Get token from cookies or headers
    const token = request.cookies.get('token')?.value || request.headers.get('authorization')?.replace('Bearer ', '')
    
    // Try to get from localStorage via a different approach
    const user = request.cookies.get('user')?.value

    if (!token && !user) {
      // Redirect to login if not authenticated
      const loginUrl = new URL('/login', request.url)
      return NextResponse.redirect(loginUrl)
    }
  }

  // Allow the request to proceed
  return NextResponse.next()
}

export const config = {
  matcher: [
    '/dashboard/:path*',
    '/admin/:path*',
    '/projects/:path*',
    '/orders/:path*',
    '/customer-statements/:path*',
    '/finances/:path*',
    '/my-tasks/:path*',
    '/inventory/:path*',
    '/performance/:path*',
    '/quotes/:path*',
    '/employees/:path*',
    '/clients/:path*'
  ]
}
