'use server';

import { apiClient } from '@/lib/apiClient';
import { User } from '../types/user';
import { Permissions } from '@/context/permissions/types';

interface SearchCriteria {
  email?: string;
  id?: string | number;
  role?: string;
}

export async function searchUsers(criteria: SearchCriteria): Promise<User[]> {
  try {
    const query = new URLSearchParams();
    if (criteria.email) query.set('email', criteria.email);
    if (criteria.id) query.set('id', criteria.id.toString());
    if (criteria.role && criteria.role !== 'all') query.set('role', criteria.role);

    const url = `api/admin/search?${query.toString()}`;
    const response = await apiClient<User[]>(url, { method: 'GET' });

    if (response.success && response.data) {
      return response.data.map((u) => ({
        id: u.id,
        email: u.email,
        role: u.role,
        userBlock: u.userBlock,
        permissions: isValidPermissions(u.permissions) ? u.permissions : null,
        userData: u.userData
          ? {
              first_name: u.userData.first_name,
              last_name: u.userData.last_name,
            }
          : null,
      }));
    } else {
      console.error('Błąd przy pobieraniu użytkowników:', response.message);
      return [];
    }
  } catch (error) {
    console.error('Błąd wyszukiwania użytkowników:', error);
    return [];
  }
}

function isValidPermissions(data: unknown): data is Permissions {
  if (data === null || typeof data !== 'object') return false;
  return Object.values(data).every(
    (perm) => typeof perm === 'object' && 'is_enabled' in perm && 'is_visible' in perm && typeof perm.is_enabled === 'boolean' && typeof perm.is_visible === 'boolean'
  );
}