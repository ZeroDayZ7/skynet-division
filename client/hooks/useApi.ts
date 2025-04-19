'use client';

import { useCallback } from 'react';
import { useRouter } from 'next/navigation';
import { useMessage } from '@/context/MessageContext';
import { ErrorType } from '@/types/errors';

interface ApiResponse<T> {
  success: boolean;
  message?: string;
  data?: T;
  type?: string;
  code?: string;
}

export const useApi = () => {
  const router = useRouter();
  const { setMessage } = useMessage();

  const execute = useCallback(
    async <T>(apiFunction: (...args: any[]) => Promise<ApiResponse<T>>, ...args: any[]): Promise<ApiResponse<T>> => {
      try {
        const result = await apiFunction(...args);

        // Wyświetlanie komunikatu
        if (result.message) {
          setMessage(result.message, result.success ? 'success' : 'error');
        }

        // Obsługa błędu UNAUTHORIZED
        if (!result.success && result.type === ErrorType.UNAUTHORIZED) {
            router.replace('/login');
        }

        return result;
      } catch (error: any) {
        const errorMessage = error.message || 'Wystąpił nieznany błąd.';
        setMessage(errorMessage, 'error');
        return {
          success: false,
          type: ErrorType.INTERNAL,
          code: 'UNKNOWN_ERROR',
          message: errorMessage,
        };
      }
    },
    [router, setMessage]
  );

  return { execute };
};