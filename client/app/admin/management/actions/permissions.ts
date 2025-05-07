'use server';

import { apiClient } from '@/lib/apiClient';

interface PermissionEntry {
  is_visible: boolean;
  is_enabled: boolean;
  description: string;
}

interface Permissions {
  [key: string]: PermissionEntry;
}

export async function getPermissions(userId: number): Promise<Permissions | null> {
  const response = await apiClient<{ permissions: Permissions }>(
    `/api/admin/users/get/permissions`,
    {
      method: 'POST',
      body: { userId },
    }
  );

  console.log(`[getPermissions] Odpowiedź: ${JSON.stringify(response)}`);

  if (response?.data?.permissions) {
    return response.data.permissions;
  }

  return null;
}

export async function editPermissions(userId: number, permissions: Permissions): Promise<boolean> {
  try {
    const response = await apiClient<{ success: boolean }>(
      `/api/admin/users/set/permissions`,
      {
        method: 'PUT',
        body: { userId, permissions },
      }
    );

    console.log(`[editPermissions] Odpowiedź: ${JSON.stringify(response)}`);

    return response?.data?.success ?? false; // jeśli data.success nie istnieje → false
  } catch (error) {
    console.error(`[editPermissions] Błąd podczas wysyłania uprawnień dla userId ${userId}: ${error}`);
    return false;
  }
}
