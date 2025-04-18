// app/user-management/actions/blockUser.ts
'use server';

import { cookies } from 'next/headers';
import { fetchClient } from '@/lib/fetchClient';

export async function blockUser(userId: string) {
  try {
    const cookieStore = await cookies();
    const cookiesHeader = cookieStore
      .getAll()
      .map((c) => `${c.name}=${c.value}`)
      .join('; ');

    const response = await fetchClient(`/api/admin/users/${userId}/block`, {
      method: 'PATCH', // Zmieniono na PATCH
      cookies: cookiesHeader,
      headers: { 'Content-Type': 'application/json' },
    });

    if (!response.ok) {
      throw new Error('Błąd blokowania użytkownika');
    }
  } catch (error) {
    console.error('Błąd blokowania:', error);
  }
}