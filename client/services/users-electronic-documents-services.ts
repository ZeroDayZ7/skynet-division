import { fetchClient } from "@/lib/fetchClient";
import { cookies } from "next/headers";
// Interfejs odpowiedzi z backendu

interface BackendResponseEID {
  success: boolean;
  data: UserDataEID;
}

export interface UserDataEID {
  user: {
    first_name: string;
    second_name: string;
    last_name: string;
    pesel: string;
    birth_date: string;
    birth_place: string;
  };
  document_number: string | null;
  issue_date: string | null;
  expiration_date: string | null;
  photo?: string | null;
}
// Pobieranie danych usżytkownika = ELEKRONICZNY DOWÓD
export const getUserEIDData = async (): Promise<UserDataEID | null> => {
  const cookieStore = await cookies();
  const cookiesHeader = cookieStore
    .getAll()
    .map((cookie) => `${cookie.name}=${cookie.value}`)
    .join("; ");

  const response = await fetchClient<BackendResponseEID>("/api/users/user-eid", {
    method: "POST",
    cookies: cookiesHeader,
    csrf: true,
  });

  if (!response.success) {
    console.error("Błąd odpowiedzi backendu:", response);
    return null;
  }

  return response.data;
};
// ==============================================================================
// ==============================================================================
// ==============================================================================
interface BackendResponsePassport {
  success: boolean;
  data: UserDataPassport;
}
export interface UserDataPassport {
  user: {
    first_name: string;
    second_name: string;
    last_name: string;
    pesel: string;
    birth_date: string;
    birth_place: string;
  };
  passport_number: string | null;
  issue_date: string | null;
  expiration_date: string | null;
  photo?: string | null;
}

// Pobieranie danych usżytkownika = PASSPORT
export const getUserPassportData = async (): Promise<UserDataPassport | null> => {
  const cookieStore = await cookies();
  const cookiesHeader = cookieStore
    .getAll()
    .map((cookie) => `${cookie.name}=${cookie.value}`)
    .join("; ");

  const response = await fetchClient<BackendResponsePassport>("/api/users/user-passport", {
    method: "POST",
    cookies: cookiesHeader,
    csrf: true,
  });

  if (!response.success) {
    console.error("Błąd odpowiedzi backendu:", response);
    return null;
  }

  return response.data;
};