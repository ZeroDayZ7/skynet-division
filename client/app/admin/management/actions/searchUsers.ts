// app/user-management/actions.ts
'use server';

import { apiClient } from '@/lib/apiClient';
import { User } from '../types/user';

interface SearchCriteria {
  email?: string;
  id?: string | number;
  role?: string;
}

export interface ApiResponse<T> {
  success: boolean;
  message: string;
  data?: T;
}



export async function searchUsers(criteria: SearchCriteria): Promise<User[]> {
  if (!criteria.email && !criteria.id && !criteria.role) {
    throw new Error('Brak kryteriów wyszukiwania');
  }

  const response = await apiClient<User[]>('/api/admin/search', {
    method: 'POST',
    body: criteria,
  });

  if (!response.success || !response.data) {
    throw new Error(response.message);
  }

  return response.data;
}
