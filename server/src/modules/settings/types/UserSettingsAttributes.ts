// types/UserSettingsAttributes.ts
import { Optional } from 'sequelize';

export interface UserSettingsAttributes {
  id: number;
  user_id: number;
  pin_hash: string | null;
  two_factor_enabled: boolean;
  dark_mode: boolean;
  biometric_enabled: boolean;
  createdAt: Date;
  updatedAt: Date;
}

// Przy tworzeniu rekordu, `id`, `pin_hash`, `createdAt`, `updatedAt` nie są wymagane
export type UserSettingsCreationAttributes = Optional<
  UserSettingsAttributes,
  'user_id' | 'pin_hash' | 'createdAt' | 'updatedAt'
>;
