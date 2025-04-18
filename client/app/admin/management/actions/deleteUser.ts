// app/user-management/actions/deleteUser.ts
'use server';

import { cookies } from 'next/headers';
import { fetchClient } from '@/lib/fetchClient';

export async function deleteUser(userId: string) {
  try {
    console.log(`[deleteUser] Rozpoczynanie usuwania dla userId: ${userId}`);
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
      console.error(`[deleteUser] Błąd odpowiedzi serwera: ${response.status}`);
      throw new Error('Błąd usuwania użytkownika');
    }
    console.log(`[deleteUser] Użytkownik usunięty: userId=${userId}`);
  } catch (error) {
    console.error(`[deleteUser] Błąd podczas usuwania:`, error);
    throw error;
  }
}