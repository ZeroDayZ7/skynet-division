export async function fetchCsrfToken(): Promise<string> {
    const response = await fetch('http://localhost:3001/api/csrf-token', {
      method: 'GET',
      credentials: 'include',
    });
    if (!response.ok) {
      throw new Error('Nie udało się pobrać tokenu CSRF');
    }
    const data = await response.json();
    return data.csrfToken;
  }