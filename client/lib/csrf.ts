
export async function fetchCsrfToken(token: string): Promise<string> {
    const response = await fetch('http://localhost:3001/api/csrf-token', {
      method: 'GET',
      credentials: 'include',
      headers: {
        'Content-Type': 'application/json',
        'Cookie': `${process.env.SESSION_COOKIE_NAME}=${token}`, // Użyj tokena z ciasteczek
      },
    });
    if (!response.ok) {
      throw new Error('Nie udało się pobrać tokenu CSRF');
    }
    const data = await response.json();
    console.log(data);
    return data.csrfToken;
  }