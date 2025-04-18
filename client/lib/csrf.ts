export async function fetchCsrfToken(token: string | null = null): Promise<string> {
  const response = await fetch('http://localhost:3001/api/csrf-token', {
    method: 'GET',
    credentials: 'include',
    headers: {
      'Content-Type': 'application/json',
      ...(token && {
        'Cookie': `${process.env.SESSION_COOKIE_NAME}=${token}`,
      }),
    },
  });

  if (!response.ok) {
    throw new Error('Nie udało się pobrać tokenu CSRF');
  }

  const data = await response.json();
  console.log(data);
  return data.csrfToken;
}
