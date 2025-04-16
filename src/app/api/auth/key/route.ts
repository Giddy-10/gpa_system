import { NextResponse } from 'next/server';
import { getAuthToken } from '@/app/lib/auth';

export async function GET() {
  const authToken = await getAuthToken();

  if (!authToken.token) {
    return NextResponse.json({ token: null });
  }

  return NextResponse.json({ token: authToken.token });
}