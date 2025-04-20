// app/user-management/actions/permissions.ts
'use server';

import { apiClient } from '@/lib/apiClient';
import { Permissions } from '../types/user';

interface ApiResponse<T> {
  success: boolean;
  message: string;
  data?: T;
  type?: string;
}

export async function getPermissions(userId: string): Promise<ApiResponse<Permissions | null>> {
  console.log(`[getPermissions] Pobieranie uprawnień dla użytkownika: ${userId}`);
  const response = await apiClient<Permissions | null>(`/api/admin/users/${userId}/permissions`, {
    method: 'GET',
  });
  console.log(`[getPermissions] Odpowiedź z apiClient:`, JSON.stringify(response));
  return response;
}

export async function editPermissions(userId: string, permissions: Permissions): Promise<ApiResponse<any>> {
  console.log(`[editPermissions] Edycja uprawnień użytkownika: ${userId}, permissions=`, permissions);
  const response = await apiClient(`/api/admin/users/${userId}/permissions`, {
    method: 'PUT',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ permissions }),
  });
  console.log(`[editPermissions] Odpowiedź z apiClient:`, JSON.stringify(response));
  return response;
}