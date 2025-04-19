'use server';

import { apiClient } from '@/lib/apiClient';

export async function unblockUser(userId: string) {
  console.log(`[unblockUser] Rozpoczynanie odblokowania dla userId: ${userId}`);
  return apiClient(`/api/admin/users/${userId}/unblock`, { method: 'PATCH' });
}