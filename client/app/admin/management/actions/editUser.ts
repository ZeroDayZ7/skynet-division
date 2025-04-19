'use server';

import { apiClient } from '@/lib/apiClient';

export async function editUser(userId: string, data: { email?: string; first_name?: string; last_name?: string }) {
  console.log(`[editUser] Edycja użytkownika: ${userId}`);
  return apiClient(`/api/admin/users/${userId}`, {
    method: 'PATCH',
    body: data,
  });
}