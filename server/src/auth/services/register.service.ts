import Users from "#auth/models/Users"; // Importuj model User
import bcrypt from "bcrypt"; // Jeśli używasz hashowania haseł
import { UserAttributes } from "#auth/types/UserAttributes";
import SystemLog from "#utils/SystemLog";

// Funkcja do sprawdzania dostępności e-maila
export const checkEmailAvailability = async (email: string): Promise<boolean> => {
  const user = await Users.findOne({ where: { email } });
  SystemLog.info(`services: ${user}`);
  return !user; // Jeśli użytkownik istnieje, zwróci false (e-mail zajęty)
};


// Funkcja do rejestracji użytkownika
export const registerUser = async (email: string, password: string): Promise<UserAttributes> => {
  // Sprawdź, czy e-mail już istnieje
  const existingUser = await Users.findOne({ where: { email } });

  if (existingUser) {
    throw new Error("E-mail już zajęty.");
  }

  // Szyfruj hasło
  const hashedPassword = await bcrypt.hash(password, 10);

  // Zapisz nowego użytkownika do bazy danych
  const newUser = await Users.create({
    email,
    pass: hashedPassword,
    role: 'user',  // Domyślna rola
    userBlock: false,
    points: 0,
    login_count: 0,
  });

  return newUser.get({ plain: true });
};
