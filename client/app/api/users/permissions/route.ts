// app/api/user/permissions/route.ts
import { NextResponse } from 'next/server';

export async function GET() {
  try {
    const res = await fetch(`${process.env.EXPRESS_API_URL}/api/user/permissions`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
      },
      cache: 'no-store',
    });

    if (!res.ok) return NextResponse.json({ success: false });

    const json = await res.json();

    return NextResponse.json({ success: true, data: json.data });
  } catch (error) {
    console.error('API ERROR:', error);
    return NextResponse.json({ success: false });
  }
}
