// lib/editUserPermissions.ts
'use server';

import { apiClient } from '@/lib/apiClient';
import { Permissions } from '../types/user';

interface ApiResponse<T> {
  success: boolean;
  message: string;
  data?: T;
  type?: string;
}

export async function editUserPermissions(userId: string, permissions: Permissions): Promise<ApiResponse<any>> {
  try {
    // Wysyłanie zapytania o edycję uprawnień
    const response = await apiClient(`/api/admin/users/${userId}/permissions`, {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ permissions }),
    });

    if (response.success) {
      return { success: true, message: 'Uprawnienia zostały zapisane' };
    } else {
      return { success: false, message: response.message };
    }
  } catch (error) {
    console.error('Błąd przy edytowaniu uprawnień użytkownika:', error);
    return { success: false, message: 'Błąd zapisywania uprawnień' };
  }
}
