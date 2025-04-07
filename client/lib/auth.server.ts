// "use server";
// import { cookies } from "next/headers";
// import { loginUser } from "@/services/auth.service";

// export async function serverLogin(email: string, password: string) {
//   try {
//     const data = await loginUser(email, password);
//     if (!data.isAuthenticated) {
//       return { success: false, error: "Nieprawidłowe dane logowania" };
//     }

//     // Sprawdź, czy token istnieje, aby uniknąć wartości undefined
//     if (!data.token) {
//       return { success: false, error: "Brak tokenu" };
//     }

//     const cookieStore = await cookies();  // Czekamy na Promise
//     // Ustawianie ciasteczka z tokenem
//     cookieStore.set("ACCESS_KEY", data.token, {
//       httpOnly: true, // Ustawienie ciasteczka jako HttpOnly
//       path: "/", // Ustawienie ścieżki, do której będzie dostępne ciasteczko
//       secure: process.env.NODE_ENV === "production", // Bezpieczne ciasteczko w produkcji (https)
//       maxAge: 60 * 60 * 24, // Czas życia ciasteczka (np. 24 godziny)
//     });

//     return { success: data.isAuthenticated, user: data.user, token: data.token };
//   } catch (err: any) {
//     return { success: false, error: err.message || "Wystąpił problem z logowaniem" };
//   }
// }
