'use server';

import { apiClient } from '@/lib/apiClient';

export async function blockUser(userId: string) {
  console.log(`[blockUser] Rozpoczynanie blokady dla userId: ${userId}`);
  return apiClient(`/api/admin/users/${userId}/block`, { method: 'PATCH' });
}