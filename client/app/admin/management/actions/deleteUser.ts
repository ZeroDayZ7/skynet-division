'use server';

import { apiClient } from '@/lib/apiClient';

export async function deleteUser(userId: string) {
  console.log(`[deleteUser] Usuwanie użytkownika: ${userId}`);
  return apiClient(`/api/admin/users/${userId}`, { method: 'DELETE' });
}
