// lib/getCsrfToken.ts
export function getCsrfToken(): string | null {
    const name = 'csrf-token';
    const cookies = document.cookie.split(';');
    for (let cookie of cookies) {
      const [key, value] = cookie.trim().split('=');
      if (key === name) {
        return decodeURIComponent(value);
      }
    }
    return null;
  }