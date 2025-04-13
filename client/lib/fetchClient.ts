const apiUrl = process.env.NEXT_PUBLIC_API_SERV || "http://localhost:3000";
const crsfCookieName = process.env.NEXT_PUBLIC_CSRF_COOKIE_NAME || "csrf";
const DEFAULT_TIMEOUT = 5000;

interface FetchOptions extends RequestInit {
  timeout?: number;
  cookies?: string; // Ciasteczka z middleware lub Server Component
  csrf?: boolean;   // Czy dołączać CSRF
}

interface FetchErrorResponse {
  message?: string;
}

// Funkcja do pobierania tokenu CSRF
const getCsrfTokenFromCookies = (cookies?: string): string | null => {
  if (typeof window !== "undefined") {
    // Po stronie klienta: użyj document.cookie
    const matches = document.cookie.match(new RegExp(`(^| )${crsfCookieName}=([^;]+)`));
    return matches ? matches[2] : null;
  } else if (cookies) {
    // Po stronie serwera: parsuj przekazane ciasteczka
    const matches = cookies.match(new RegExp(`(^| )${crsfCookieName}=([^;]+)`));
    return matches ? matches[2] : null;
  }
  return null;
};

export async function fetchClient<T = any>(
  endpoint: string,
  options: FetchOptions = {}
): Promise<T> {
  const { timeout = DEFAULT_TIMEOUT, cookies, csrf = false, ...rest } = options;
  const controller = new AbortController();
  const timeoutId = setTimeout(() => controller.abort(), timeout);

  let csrfToken = null;
  if (csrf) {
    csrfToken = getCsrfTokenFromCookies(cookies);
    console.log("CSRF Token:", csrfToken);
  }

  const headers = {
    "Content-Type": "application/json",
    ...(cookies && typeof window === "undefined" ? { Cookie: cookies } : {}), // Ciasteczka tylko po stronie serwera
    ...(csrfToken ? { "X-CSRF-Token": csrfToken } : {}),
    ...(rest.headers || {}),
  };

  // console.log("Wysyłane nagłówki:", headers);

  try {
    const response = await fetch(`${apiUrl}${endpoint}`, {
      ...rest,
      credentials: "include", // Dla klienta
      headers,
      signal: controller.signal,
    });

    clearTimeout(timeoutId);

    const contentType = response.headers.get("Content-Type");
    if (contentType?.includes("application/json")) {
      const data = await response.json();
      if (!response.ok) {
        const errorData = data as FetchErrorResponse;
        throw new Error(errorData.message || `Błąd: ${response.status}`);
      }
      return data as T;
    }

    if (!response.ok) {
      throw new Error(`Błąd: ${response.status}`);
    }

    return undefined as T; // Dla przypadków bez JSON
  } catch (err: any) {
    if (err.name === "AbortError") {
      throw new Error("Przekroczono limit czasu odpowiedzi serwera");
    }
    if (err.message.includes("Failed to fetch") || err.message.includes("NetworkError")) {
      throw new Error("Brak połączenia z serwerem");
    }
    throw err;
  }
}