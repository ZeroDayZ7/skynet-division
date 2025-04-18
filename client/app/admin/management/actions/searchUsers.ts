// app/user-management/actions/searchUsers.ts
'use server';

import { cookies } from 'next/headers';
import { fetchClient } from '@/lib/fetchClient';
import { User } from '../types/user';

interface SearchCriteria {
  email: string;
  id: string | number;
  role: string;
}

export async function searchUsers(criteria: SearchCriteria): Promise<User[]> {
  try {
    const cookieStore = await cookies();
    const cookiesHeader = cookieStore
      .getAll()
      .map((c) => `${c.name}=${c.value}`)
      .join('; ');

    const query = new URLSearchParams();
    if (criteria.email) query.set('email', criteria.email);
    if (criteria.id) query.set('id', criteria.id.toString());
    if (criteria.role && criteria.role !== 'all') query.set('role', criteria.role);

    const users = await fetchClient<User[]>(
      `/api/admin/search?${query.toString()}`,
      {
        method: 'GET',
        cookies: cookiesHeader,
        headers: { 'Content-Type': 'application/json' },
      }
    );

    return users.map((u) => ({
      id: Number(u.id),
      email: u.email,
      points: u.points,
      login_count: u.login_count,
      role: u.role,
      userBlock: u.userBlock,
      lastLoginIp: u.lastLoginIp,
      permissions: u.permissions ?? {},
      userData: u.userData
        ? {
            first_name: u.userData.first_name,
            last_name: u.userData.last_name,
          }
        : undefined,
    }));
  } catch (error: any) {
    console.error('Błąd wyszukiwania użytkowników:', error);
    return [];
  }
}