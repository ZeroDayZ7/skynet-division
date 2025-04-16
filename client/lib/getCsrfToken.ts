export function getCsrfToken(): string | null {
  if (typeof document === 'undefined') return null;

  const cookieName = process.env.NEXT_PUBLIC_CSRF_COOKIE_NAME || 'csrf-token';
  const cookies = document.cookie.split(';');

  for (const cookie of cookies) {
    const [key, value] = cookie.trim().split('=');
    if (key === cookieName) {
      return decodeURIComponent(value);
    }
  }

  return null;
}
