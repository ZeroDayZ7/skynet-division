// app/user-management/actions.ts
'use server';

import { apiClient } from '@/lib/apiClient';
import { User } from '../types/user';

interface SearchCriteria {
  email?: string;
  id?: string | number;
  role?: string;
}

export async function searchUsers(criteria: SearchCriteria) {
  try {
    if (!criteria.email && !criteria.id && !criteria.role) {
      return {
        success: false,
        message: 'Brak kryteriów wyszukiwania',
      };
    }

    const response = await apiClient<User[]>('/api/admin/search', {
      method: 'POST',
      body: criteria,
      headers: {
        'Content-Type': 'application/json',
      },
    });

    if (!response.success) {
      return response;
    }
    
    return response.data ? { success: true, data: response.data } : { success: false, message: 'Brak danych' };
  } catch (error) {
    return {
      success: false,
      message: 'Wystąpił błąd podczas wyszukiwania użytkowników.',
    };
  }
}
