// app/user-management/actions/editUser.ts
'use server';

import { cookies } from 'next/headers';
import { fetchClient } from '@/lib/fetchClient';
import { User } from '../types/user';

export async function editUser(user: User) {
  try {
    const cookieStore = await cookies();
    const cookiesHeader = cookieStore
      .getAll()
      .map((c) => `${c.name}=${c.value}`)
      .join('; ');

    const response = await fetchClient(`/api/admin/users/${user.id}`, {
      method: 'PUT',
      cookies: cookiesHeader,
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(user),
    });

    if (!response.ok) {
      throw new Error('Błąd edycji użytkownika');
    }
  } catch (error) {
    console.error('Błąd edycji:', error);
  }
}