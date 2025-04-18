// #ro/auth/types/UserAttributes.ts

export interface UserAttributes {
  id: number;
  email: string | null;
  pass: string;
  pin: string | null;
  points: number | null;
  activation_token: string | null;
  permissions?: Record<string, boolean> | null; // Dodane pole
  login_count: number;
  role: string | null;
  userBlock: boolean;
  loginAttempts: number | null;
  lastLoginAttempt: Date | null;
  lastLoginIp: string | null;
}

// Typ do tworzenia użytkownika (bez id i innych opcjonalnych pól)
export type UserCreationAttributes = Omit<UserAttributes, 'id'> & {
  pin?: string | null;
  activation_token?: string | null;
};

// Typ do aktualizacji (wszystko opcjonalne oprócz id)
export type UserUpdateAttributes = Partial<UserCreationAttributes> & {
  id: number;
};

// Typ bezpieczny do zwracania (bez wrażliwych danych)
export type UserSafeAttributes = Omit<UserAttributes, 'pass' | 'pin' | 'activation_token'>;