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
  return apiClient<Permissions | null>(`/api/admin/users/${userId}/permissions`, { method: 'GET' });
}

export async function editPermissions(userId: string, permissions: Permissions): Promise<ApiResponse<any>> {
  return apiClient(`/api/admin/users/${userId}/permissions`, {
    method: 'PUT',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ permissions }),
  });
}