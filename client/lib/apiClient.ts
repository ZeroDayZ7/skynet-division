// lib/apiClient.ts
'use server';

import { cookies } from 'next/headers';
import { fetchCsrfToken } from '@/lib/csrf';
import { ErrorType } from '@/types/errors';

interface ApiResponse<T> {
  success: boolean;
  message: string;
  data?: T;
  type?: string;
}

interface ApiRequestOptions {
  method?: 'GET' | 'POST' | 'PATCH' | 'DELETE' | 'PUT';
  headers?: Record<string, string>;
  body?: any;
  credentials?: RequestCredentials;
}

const FALLBACK_ERROR_MESSAGES: Record<ErrorType | 'NETWORK_ERROR' | 'UNKNOWN', string> = {
  UNAUTHORIZED: 'Brak autoryzacji. Proszę zalogować się ponownie.',
  VALIDATION: 'Nieprawidłowe dane w żądaniu.',
  NOT_FOUND: 'Zasób nie został znaleziony.',
  INTERNAL: 'Wystąpił błąd serwera. Spróbuj ponownie później.',
  NETWORK_ERROR: 'Brak połączenia z serwerem. Sprawdź swoje połączenie internetowe.',
  UNKNOWN: 'Wystąpił nieznany błąd.',
};

export async function apiClient<T>(
  url: string,
  options: ApiRequestOptions = {}
): Promise<ApiResponse<T>> {
  try {
    const cookieStore = await cookies();
    const SESSION_KEY = cookieStore.get('SESSION_KEY')?.value || '';
    const csrfToken = await fetchCsrfToken(SESSION_KEY);
    console.log(`[apiClient] CSRF Token: ${csrfToken}`);
    const cookiesHeader = cookieStore
      .getAll()
      .map((c) => `${c.name}=${c.value}`)
      .join('; ');
      console.log(`[apiClient] Cookies: ${cookiesHeader}`);

    const defaultHeaders: Record<string, string> = {
      'Content-Type': 'application/json',
      'X-CSRF-Token': csrfToken,
      Cookie: cookiesHeader,
    };

    // Poprawka: Usuń początkowy ukośnik z URL, aby uniknąć podwójnych ukośników
    const cleanUrl = url.startsWith('/') ? url.slice(1) : url;
    const apiUrl = `http://localhost:3001/${cleanUrl}`;

    const response = await fetch(apiUrl, {
      method: options.method || 'GET',
      headers: {
        ...defaultHeaders,
        ...options.headers,
      },
      body: options.body ? JSON.stringify(options.body) : undefined,
      credentials: options.credentials || 'include',
      cache: 'no-store', // Wyłącz cache dla świeżych danych
    });

    console.log(`[apiClient] Żądanie: ${apiUrl}, Status: ${response.status}, OK: ${response.ok}`);

    // Mapowanie błędów
    if (!response.ok) {
      let type: ErrorType | 'UNKNOWN' = 'UNKNOWN';
      let message = FALLBACK_ERROR_MESSAGES.UNKNOWN;

      // Mapowanie kodów HTTP na typy błędów
      switch (response.status) {
        case 401:
          type = ErrorType.UNAUTHORIZED;
          message = FALLBACK_ERROR_MESSAGES.UNAUTHORIZED;
          break;
        case 400:
          type = ErrorType.VALIDATION;
          message = FALLBACK_ERROR_MESSAGES.VALIDATION;
          break;
        case 404:
          type = ErrorType.NOT_FOUND;
          message = FALLBACK_ERROR_MESSAGES.NOT_FOUND;
          break;
        case 500:
          type = ErrorType.INTERNAL;
          message = FALLBACK_ERROR_MESSAGES.INTERNAL;
          break;
      }

      // Próba sparsowania odpowiedzi JSON
      const contentType = response.headers.get('Content-Type');
      if (contentType?.includes('application/json')) {
        const errorData = await response.json();
        if (errorData.type && Object.values(ErrorType).includes(errorData.type)) {
          type = errorData.type;
          message = errorData.message || FALLBACK_ERROR_MESSAGES[type];
        }
      }

      console.error(`[apiClient] Błąd odpowiedzi serwera: ${response.status}, type: ${type}, message: ${message}`);
      return { success: false, type, message };
    }

    // Sprawdzenie Content-Type
    const contentType = response.headers.get('Content-Type');
    if (!contentType?.includes('application/json')) {
      console.error(`[apiClient] Oczekiwano JSON, otrzymano Content-Type: ${contentType}`);
      return {
        success: false,
        type: ErrorType.INTERNAL,
        message: FALLBACK_ERROR_MESSAGES.INTERNAL,
      };
    }

    const result = await response.json();
    console.log(`[apiClient] Sukces: ${apiUrl}, odpowiedź: ${JSON.stringify(result)}`);
    return {
      success: true,
      message: result.message || 'Operacja zakończona sukcesem.',
      data: result.data || result,
    };
  } catch (error) {
    console.error(`[apiClient] Błąd podczas żądania: ${url}`, error);
    return {
      success: false,
      type: 'NETWORK_ERROR',
      message: FALLBACK_ERROR_MESSAGES.NETWORK_ERROR,
    };
  }
}