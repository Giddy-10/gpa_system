import { NextResponse } from 'next/server';
import { checkAuthStatus } from '@/app/lib/auth';

export async function GET() {
  const authStatus = await checkAuthStatus();

  if (!authStatus.isAuthenticated) {
    return NextResponse.json({ isAuthenticated: false, redirectUrl: '/' });
  }

  return NextResponse.json({ isAuthenticated: true });
}