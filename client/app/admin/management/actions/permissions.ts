'use server';

import { apiClient } from '@/lib/apiClient';
import { Permissions } from '@/context/permissions/types';

interface ApiResponse<T> {
  success: boolean;
  permissions?: Permissions;
  message: string;
  data?: T;
  type?: string;
}

// Pobieranie uprawnień (alternatywa, jeśli nadal potrzebna)
export async function getPermissions(userId: number): Promise<ApiResponse<Permissions | null>> {
  return apiClient<Permissions | null>(`/api/admin/users/${userId}/permissions`, {
    method: 'POST',
    body: userId,
  });
  if(!response.success) {
    throw new Error(response.message);
  }
}

// Edycja uprawnień
export async function editPermissions(userId: number, permissions: Permissions): Promise<ApiResponse<any>> {
  return apiClient(`/api/admin/users/${userId}/permissions`, {
    method: 'PUT',
    headers: { 'Content-Type': 'application/json' },
    body: permissions,
  });
}