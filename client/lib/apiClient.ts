'use server';

import { cookies } from 'next/headers';
import { fetchCsrfToken } from '@/lib/csrf';
import { ErrorType } from '@/types/errors';

interface ApiResponse<T> {
  success: boolean;
  message?: string;
  data?: T;
  type?: string;
  code?: string;
}

interface ApiRequestOptions {
  method?: 'GET' | 'POST' | 'PATCH' | 'DELETE' | 'PUT';
  headers?: Record<string, string>;
  body?: any;
  credentials?: RequestCredentials;
}

export async function apiClient<T>(
  url: string,
  options: ApiRequestOptions = {}
): Promise<ApiResponse<T>> {
  try {
    const cookieStore = await cookies();
    const SESSION_KEY = cookieStore.get('SESSION_KEY')?.value || '';
    const csrfToken = await fetchCsrfToken(SESSION_KEY);
    const cookiesSession = `SESSION_KEY=${SESSION_KEY}`;

    const defaultHeaders: Record<string, string> = {
      'Content-Type': 'application/json',
      'X-CSRF-Token': csrfToken,
      Cookie: cookiesSession,
    };

    const response = await fetch(`http://localhost:3001${url}`, {
      method: options.method || 'GET',
      headers: {
        ...defaultHeaders,
        ...options.headers,
      },
      body: options.body ? JSON.stringify(options.body) : undefined,
      credentials: options.credentials || 'include',
    });

    console.log(`[apiClient] Żądanie: ${url}, Status: ${response.status}, OK: ${response.ok}`);

    // Mapowanie kodów HTTP na błędy
    if (!response.ok) {
      let type = ErrorType.INTERNAL;
      let code = 'SERVER_ERROR';
      let message = 'Błąd operacji.';

      switch (response.status) {
        case 401:
          type = ErrorType.UNAUTHORIZED;
          code = 'AUTH_UNAUTHORIZED';
          message = 'Nieautoryzowany dostęp. Proszę zalogować się ponownie.';
          cookieStore.delete('JWT_COOKIE');
          cookieStore.delete('SESSION_KEY');
          break;
        case 400:
          type = ErrorType.VALIDATION;
          code = 'BAD_REQUEST';
          message = 'Nieprawidłowe dane w żądaniu.';
          break;
        case 404:
          type = ErrorType.NOT_FOUND;
          code = 'NOT_FOUND';
          message = 'Zasób nie został znaleziony.';
          break;
        case 500:
          type = ErrorType.INTERNAL;
          code = 'INTERNAL_SERVER_ERROR';
          message = 'Wystąpił błąd serwera. Spróbuj ponownie później.';
          break;
      }

      // Próba sparsowania odpowiedzi JSON
      const contentType = response.headers.get('Content-Type');
      if (contentType?.includes('application/json')) {
        const errorData = await response.json();
        message = errorData.message || message;
        type = errorData.type || type;
        code = errorData.code || code;
      }

      console.error(`[apiClient] Błąd odpowiedzi serwera: ${response.status}, treść: ${message}`);
      return { success: false, type, code, message };
    }

    // Sprawdzenie Content-Type
    const contentType = response.headers.get('Content-Type');
    if (!contentType?.includes('application/json')) {
      console.error(`[apiClient] Oczekiwano JSON, otrzymano Content-Type: ${contentType}`);
      return {
        success: false,
        type: ErrorType.INTERNAL,
        code: 'INVALID_RESPONSE',
        message: 'Nieprawidłowy format odpowiedzi serwera.',
      };
    }

    const result = await response.json();
    console.log(`[apiClient] Sukces: ${url}, odpowiedź: ${JSON.stringify(result)}`);
    return {
      success: true,
      message: result.message || 'Operacja zakończona sukcesem.',
      data: result.data || result,
    };
  } catch (error) {
    console.error(`[apiClient] Błąd podczas żądania: ${url}`, error);
    return {
      success: false,
      type: ErrorType.INTERNAL,
      code: 'INTERNAL_SERVER_ERROR',
      message: 'Wystąpił błąd serwera. Spróbuj ponownie później.',
    };
  }
}