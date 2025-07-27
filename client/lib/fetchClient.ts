const apiUrl = process.env.NEXT_PUBLIC_API_SERV || "http://localhost:4000";

const DEFAULT_TIMEOUT = 5000;

interface FetchOptions extends RequestInit {
  timeout?: number;
  cookies?: string; // Ciasteczka z middleware lub Server Component
}

interface FetchErrorResponse {
  message?: string;
}

// Funkcja do pobierania odpowiedzi z API
export async function fetchClient<T = any>(
  endpoint: string,
  options: FetchOptions = {}
): Promise<T> {
  const { timeout = DEFAULT_TIMEOUT, cookies, ...rest } = options;

  const controller = new AbortController();
  const timeoutId = setTimeout(() => controller.abort(), timeout);

  const headers: HeadersInit = {
    "Content-Type": "application/json",
    ...(cookies && typeof window === "undefined" ? { Cookie: cookies } : {}),
    ...(rest.headers || {}),
  };

  try {
    // Zmieniamy metodę na GET, gdy jest odpowiednia
    const response = await fetch(`${apiUrl}${endpoint}`, {
      ...rest,
      credentials: "include", // Wysyłanie ciasteczek po stronie klienta
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
