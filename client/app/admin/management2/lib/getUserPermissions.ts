'use server';

import { apiClient } from '@/lib/apiClient';
import { Permissions } from '../types/user';

interface ApiResponse<T> {
  success: boolean;
  data?: T;
  type?: string;
}

export async function getUserPermissions(userId: number): Promise<ApiResponse<Permissions | null>> {
  try {
    // Wysyłanie zapytania POST z userId w ciele zapytania
    const response = await apiClient<Permissions | null>('/api/admin/permissions', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: { userId } // ✅ raw object, apiClient go serializuje
 // Przesyłamy ID użytkownika w ciele zapytania
    });

    console.log('response', response); // Logowanie odpowiedzi

    if (response.success && response.data) {
      return { success: true, data: response.data };
    } else {
      return { success: false, data: null };
    }
  } catch (error) {
    console.error('Błąd przy pobieraniu uprawnień użytkownika:', error);
    return { success: false, data: null };
  }
}
