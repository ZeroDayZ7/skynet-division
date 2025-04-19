// register.services.ts

import { fetchClient } from "@/lib/fetchClient";

// Interfejsy dla odpowiedzi z API
export interface RegisterResponse {
  success: boolean;
  message: string;
}

// Sprawdzanie dostępności e-maila
export const checkEmailAvailability = async (email: string): Promise<boolean> => {
  try {
    const data = await fetchClient<{ available: boolean; message?: string}>("/api/auth/check-email", {
      method: "POST",
      body: JSON.stringify({ email }),
      credentials: "include",
      // csrf: true,
    });
    return data.available;
  } catch (error) {
    // console.error("Błąd sprawdzania e-maila:", error);
    throw error;
  }
};

// Rejestracja użytkownika
export const registerUser = async (email: string): Promise<RegisterResponse> => {
  try {
    const response = await fetchClient("/api/auth/register", {
      method: "POST",
      body: JSON.stringify({ email }),
      credentials: "include",
      // csrf: true,
    });

    const data: RegisterResponse = await response.json();
    return data;
  } catch (error) {
    console.error("Błąd rejestracji użytkownika:", error);
    throw new Error("Błąd podczas rejestracji użytkownika");
  }
};

// export const registerUserV2 = async (email: string): Promise<RegisterResponse> => {
//   try {
//     const response = await fetchClient("/api/register", {
//       method: "POST",
//       body: JSON.stringify({ email }),
//       credentials: "include",
//       csrf: true,
//     });
// }};

export const registerUserV2 = async (userData: RegisterResponse): Promise<RegisterResponse> => {
    return await fetchClient("/api/register", {
      method: "POST",
      body: JSON.stringify(userData),
      credentials: "include",
      // csrf: true,
    });
  };