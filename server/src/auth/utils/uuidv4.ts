// utils/generateUuid.ts
import { v4 as uuidv4 } from 'uuid';

// Funkcja generująca UUID
export const generateCSRFToken = (): string => {
  return uuidv4();
};
