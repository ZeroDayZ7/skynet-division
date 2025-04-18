// app/user-management/actions/editPermissions.ts
'use server';

import { cookies } from 'next/headers';
import { fetchClient } from '@/lib/fetchClient';
import { Permissions } from '../types/user';

export async function editPermissions(userId: string, permissions: Permissions) {
  try {
    const cookieStore = await cookies();
    const cookiesHeader = cookieStore
      .getAll()
      .map((c) => `${c.name}=${c.value}`)
      .join('; ');

    const response = await fetchClient(`/api/admin/users/${userId}/permissions`, {
      method: 'PUT',
      cookies: cookiesHeader,
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ permissions }),
    });

    if (!response.ok) {
      throw new Error('Błąd edycji uprawnień');
    }
  } catch (error) {
    console.error('Błąd edycji uprawnień:', error);
  }
}