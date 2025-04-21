'use server';

import { apiClient } from '@/lib/apiClient';

export async function deleteUser(userId: number) {
  console.log(`[deleteUser] Usuwanie użytkownika: ${userId}`);
  return apiClient(`/api/admin/users/${userId}`, { method: 'DELETE' });
}
