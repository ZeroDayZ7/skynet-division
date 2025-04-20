// app/user-management/actions/permissions.ts
'use server';

import { apiClient } from '@/lib/apiClient';
import { Permissions } from '../types/user';

// Definicja typu ApiResponse zgodna z useApi
interface ApiResponse<T> {
  success: boolean;
  message: string;
  data?: T;
  type?: string;
}

export async function getPermissions(userId: string): Promise<ApiResponse<Permissions | null>> {
  console.log(`[getPermissions] Pobieranie uprawnień dla użytkownika: ${userId}`);
  try {
    const response = await apiClient(`/api/admin/users/${userId}/permissions`, {
      method: 'GET',
    });
    // Sprawdzamy, czy response.data jest zgodne z Permissions
    const data: Permissions | null = isValidPermissions(response.data) ? response.data : null;
    return {
      success: true,
      data,
      message: 'Pobrano uprawnienia',
      type: 'SUCCESS',
    };
  } catch (error) {
    console.error(`[getPermissions] Błąd pobierania uprawnień dla userId=${userId}:`, error);
    return {
      success: false,
      data: null,
      message: 'Nie udało się pobrać uprawnień',
      type: 'ERROR',
    };
  }
}

export async function editPermissions(userId: string, permissions: Permissions): Promise<ApiResponse<any>> {
  console.log(`[editPermissions] Edycja uprawnień użytkownika: ${userId}`);
  try {
    const response = await apiClient(`/api/admin/users/${userId}/permissions`, {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ permissions }),
    });
    return {
      success: true,
      data: response.data,
      message: 'Uprawnienia zapisano pomyślnie',
      type: 'SUCCESS',
    };
  } catch (error) {
    console.error(`[editPermissions] Błąd edycji uprawnień dla userId=${userId}:`, error);
    return {
      success: false,
      data: null,
      message: 'Nie udało się zapisać uprawnień',
      type: 'ERROR',
    };
  }
}

// Funkcja pomocnicza do sprawdzania, czy dane są zgodne z Permissions
function isValidPermissions(data: unknown): data is Permissions {
  if (data === null || typeof data !== 'object') return false;
  return Object.values(data).every(
    (perm) => typeof perm === 'object' && 'enabled' in perm && 'hidden' in perm && typeof perm.enabled === 'boolean' && typeof perm.hidden === 'boolean'
  );
}