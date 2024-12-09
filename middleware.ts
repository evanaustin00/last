import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';
import { getSession } from 'next-auth/react';

export function middleware(req: NextRequest) {
  const { pathname } = new URL(req.url);
  

  // Get user role from the session cookie (adjust as per your session setup)
  const userRole = req.cookies.get('next-auth.session-token')?.value; // Assuming the session token contains the user's role

  // Check if the user is a "pegawai" and tries to access restricted pages
  if (userRole === 'pegawai' && (pathname.startsWith('/detail_penjualan') || pathname.startsWith('/detail_pembelian'))) {
    // Redirect to the dashboard with an error message
    const errorMessage = encodeURIComponent('Anda tidak memiliki akses ke halaman ini.');
    return NextResponse.redirect(new URL(`/dashboard?error=${errorMessage}`, req.url));
  }

  // Allow the request to continue
  return NextResponse.next();
}
