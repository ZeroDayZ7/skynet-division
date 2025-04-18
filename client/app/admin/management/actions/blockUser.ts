// app/user-management/actions/blockUser.ts
'use server';

import { cookies } from 'next/headers';
import { fetchClient } from '@/lib/fetchClient';

export async function blockUser(userId: string) {
  try {
    console.log(`[blockUser] Rozpoczynanie blokady dla userId: ${userId}`);
    const cookieStore = await cookies();
    const cookiesHeader = cookieStore
      .getAll()
      .map((c) => `${c.name}=${c.value}`)
      .join('; ');

    const response = await fetchClient(`/api/admin/users/${userId}/block`, {
      method: 'PATCH',
      cookies: cookiesHeader,
      headers: { 'Content-Type': 'application/json' },
    });

    if (!response.ok) {
      console.error(`[blockUser] Błąd odpowiedzi serwera: ${response.status}`);
      throw new Error('Błąd blokowania użytkownika');
    }
    console.log(`[blockUser] Użytkownik zablokowany: userId=${userId}`);
  } catch (error) {
    console.error(`[blockUser] Błąd podczas blokowania:`, error);
    throw error;
  }
}