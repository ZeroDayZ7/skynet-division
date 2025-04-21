'use server';

import { apiClient } from '@/lib/apiClient';
import { Permissions } from '@/context/permissions/types'; // Używamy typu z context/permissions

interface ApiResponse<T> {
  success: boolean;
  message?: string;
  data?: T;
  type?: string;
}

export async function getPermissions(userId: number): Promise<ApiResponse<Permissions | null>> {
  return apiClient<Permissions | null>(`/api/admin/users/${userId}/permissions`, {
    method: 'POST', // Zmieniamy na POST dla bezpieczeństwa
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ userId }),
  });
}

export async function editPermissions(userId: number, permissions: Permissions): Promise<ApiResponse<any>> {
  return apiClient(`/api/admin/users/${userId}/permissions`, {
    method: 'PUT',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ permissions }),
  });
}