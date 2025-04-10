import { fetchClient } from "@/lib/fetchClient";

// Interfejs dla danych użytkownika
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

// Funkcja pobierająca dane e-dowodu użytkownika
export const getUserEIDData = async (options: {cookies?: string} = {}): Promise<UserDataEID | null> => {
  // Używamy fetchClient i zwracamy wynik
  return fetchClient<UserDataEID>("/api/users/user-eid", {
    method: "POST",
    cookies: options.cookies,             // Używamy tokenu CSRF, jeśli jest wymagany
    
  });
};
