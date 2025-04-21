'use server';

import { apiClient } from '@/lib/apiClient';
import { Permissions } from '@/context/permissions/types';

interface ApiResponse<T> {
  success: boolean;
  message: string;
  data?: T;
  type?: string;
}

// Pobieranie uprawnień metodą POST
export async function fetchUserPermissions(userId: number): Promise<Permissions | null> {
  try {
    const response = await apiClient<Permissions | null>(`/api/admin/users/${userId}/permissions`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: { userId }, 
    });

console.log(`Pobrano uprawnienia dla użytkownika ${userId}:`, response);

    if (response.success && response.data) {
      console.log('Pobrano uprawnienia:', response.data.permissions);
      return response.data;
    } else {
      console.error('Błąd przy pobieraniu uprawnień:', response.message);
      return null;
    }
  } catch (error) {
    console.error('Błąd pobierania uprawnień:', error);
    return null;
  }
}

// Pobieranie uprawnień (alternatywa, jeśli nadal potrzebna)
export async function getPermissions(userId: number): Promise<ApiResponse<Permissions | null>> {
  return apiClient<Permissions | null>(`/api/admin/users/${userId}/permissions`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: userId,
  });
}

// Edycja uprawnień
export async function editPermissions(userId: number, permissions: Permissions): Promise<ApiResponse<any>> {
  return apiClient(`/api/admin/users/${userId}/permissions`, {
    method: 'PUT',
    headers: { 'Content-Type': 'application/json' },
    body: permissions,
  });
}