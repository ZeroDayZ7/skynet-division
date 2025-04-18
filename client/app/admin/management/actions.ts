'use server';

import { User } from './types';
import { cookies } from 'next/headers';
import { fetchClient } from '@/lib/fetchClient';

interface SearchCriteria {
  email: string;
  id: string | number; // Zmieniono na string | number
  role: string;
}

export async function searchUsers(criteria: SearchCriteria): Promise<User[]> {
  try {
    // 1. Pobranie ciasteczek
    const cookieStore = await cookies();
    const cookiesHeader = cookieStore
      .getAll()
      .map((c) => `${c.name}=${c.value}`)
      .join('; ');

    // 2. Zbudowanie query string
    const query = new URLSearchParams();
    if (criteria.email) query.set('email', criteria.email);
    if (criteria.id) query.set('id', criteria.id.toString()); // Konwersja id na string
    if (criteria.role && criteria.role !== 'all') query.set('role', criteria.role);

    // 3. Wykonanie zapytania
    const users = await fetchClient<User[]>(
      `/api/admin/search?${query.toString()}`,
      {
        method: 'GET',
        cookies: cookiesHeader,
        headers: { 'Content-Type': 'application/json' },
      }
    );

    console.log('Odpowiedź serwera:', users);

    // 4. Mapowanie danych
    return users.map((u) => ({
      id: Number(u.id), // Upewniamy się, że id jest number
      email: u.email,
      points: u.points,
      login_count: u.login_count,
      role: u.role,
      userBlock: u.userBlock,
      lastLoginIp: u.lastLoginIp,
      permissions: u.permissions ?? {}, // Zamiana null na pusty obiekt
      userData: u.userData ? {
        first_name: u.userData.first_name,
        last_name: u.userData.last_name,
      } : undefined,
    }));
  } catch (error: any) {
    console.error('Błąd wyszukiwania użytkowników:', error);
    return [];
  }
}

export async function editUser(user: User) {
  try {
    const cookieStore = await cookies();
    const cookiesHeader = cookieStore
      .getAll()
      .map((c) => `${c.name}=${c.value}`)
      .join('; ');

    const response = await fetchClient(
      `/api/admin/users/${user.id}`,
      {
        method: 'PUT',
        cookies: cookiesHeader,
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(user),
      }
    );

    if (!response.ok) {
      throw new Error('Błąd edycji użytkownika');
    }
  } catch (error) {
    console.error('Błąd edycji:', error);
  }
}

export async function blockUser(userId: string) {
  try {
    const cookieStore = await cookies();
    const cookiesHeader = cookieStore
      .getAll()
      .map((c) => `${c.name}=${c.value}`)
      .join('; ');

    const response = await fetchClient(
      `/api/admin/users/${userId}/block`,
      {
        method: 'POST',
        cookies: cookiesHeader,
        headers: { 'Content-Type': 'application/json' },
      }
    );

    if (!response.ok) {
      throw new Error('Błąd blokowania użytkownika');
    }
  } catch (error) {
    console.error('Błąd blokowania:', error);
  }
}

export async function deleteUser(userId: string) {
  try {
    const cookieStore = await cookies();
    const cookiesHeader = cookieStore
      .getAll()
      .map((c) => `${c.name}=${c.value}`)
      .join('; ');

    const response = await fetchClient(
      `/api/admin/users/${userId}`,
      {
        method: 'DELETE',
        cookies: cookiesHeader,
        headers: { 'Content-Type': 'application/json' },
      }
    );

    if (!response.ok) {
      throw new Error('Błąd usuwania użytkownika');
    }
  } catch (error) {
    console.error('Błąd usuwania:', error);
  }
}