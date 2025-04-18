// app/user-management/actions/deleteUser.ts
'use server';

import { cookies } from 'next/headers';
import { fetchClient } from '@/lib/fetchClient';

export async function deleteUser(userId: string) {
  try {
    const cookieStore = await cookies();
    const cookiesHeader = cookieStore
      .getAll()
      .map((c) => `${c.name}=${c.value}`)
      .join('; ');

    const response = await fetchClient(`/api/admin/users/${userId}`, {
      method: 'DELETE',
      cookies: cookiesHeader,
      headers: { 'Content-Type': 'application/json' },
    });

    if (!response.ok) {
      throw new Error('Błąd usuwania użytkownika');
    }
  } catch (error) {
    console.error('Błąd usuwania:', error);
  }
}