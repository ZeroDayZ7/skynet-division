import { fetchClient } from "./fetchClient";
/**
 * Fetches CSRF token from the backend for secure API requests.
 * @module lib/api/csrf
 */

const CSRF_TOKEN_URL = '/api/csrf-token';

/**
 * Retrieves a CSRF token from the backend.
 * @returns CSRF token as a string.
 * @throws Error if the request fails or the response is invalid.
 */
export async function fetchCsrfToken(): Promise<string> {
  try {
    const response = await fetchClient<{ csrfToken: string }>(CSRF_TOKEN_URL, {
      method: 'GET',
      cache: 'no-store',
    });

    if (!response?.csrfToken || typeof response.csrfToken !== 'string') {
      throw new Error('Invalid CSRF token format received from server');
    }

    return response.csrfToken;
  } catch (error: any) {
    throw new Error(`Failed to fetch CSRF token: ${error.message}`);
  }
}