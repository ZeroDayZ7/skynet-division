export interface UserAttributes {
  id: number;
  email: string | null;
  pass: string;
  pin: number | null;
  points: number | null;
  activation_token: string | null;
  reset_password_token: string | null;
  login_count: number;
  role: string | null;
  userBlock: boolean;
  loginAttempts: number | null;
  lastLoginAttempt: Date | null;
  lastLoginIp: string | null;
}

// Id często jest autoIncrement, więc przy tworzeniu pomijamy:
export type UserCreationAttributes = Omit<UserAttributes, "id">;
