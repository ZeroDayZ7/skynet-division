// app/api/users/search/route.ts
import { NextResponse } from 'next/server';
import { mockUsers } from '@/components/user-management/data';

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const email = searchParams.get('email') || '';
  const id = searchParams.get('id') || '';
  const role = searchParams.get('role') || '';
  const filtered = mockUsers.filter((user) => {
    return (
      (!email || user.email.toLowerCase().includes(email.toLowerCase())) &&
      (!id || user.id.includes(id)) &&
      (!role || user.role === role)
    );
  });
  return NextResponse.json(filtered);
}