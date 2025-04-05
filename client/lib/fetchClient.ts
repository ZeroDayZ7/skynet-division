// lib/fetchClient.ts

const apiUrl = process.env.NEXT_PUBLIC_API_SERV;
const DEFAULT_TIMEOUT = 5000;

interface FetchOptions extends RequestInit {
  timeout?: number;
}

export async function fetchClient<T = any>(
  endpoint: string,
  options: FetchOptions = {}
): Promise<T> {
  const { timeout = DEFAULT_TIMEOUT, ...rest } = options;
  const controller = new AbortController();
  const timeoutId = setTimeout(() => controller.abort(), timeout);

  try {
    const response = await fetch(`${apiUrl}${endpoint}`, {
      ...rest,
      credentials: "include",
      headers: {
        "Content-Type": "application/json",
        ...(rest.headers || {}),
      },
      signal: controller.signal,
    });

    clearTimeout(timeoutId);

    const contentType = response.headers.get("Content-Type");

    // Jeśli odpowiedź ma body w JSON
    if (contentType?.includes("application/json")) {
      const data = await response.json();

      if (!response.ok) {
        throw new Error(data?.message || `Błąd: ${response.status}`);
      }

      return data as T;
    }

    if (!response.ok) {
      throw new Error(`Błąd: ${response.status}`);
    }

    // @ts-expect-error - nie zwracamy nic, ale typowo jako T
    return undefined; // spełnia Promise<T>, np. T = void
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
