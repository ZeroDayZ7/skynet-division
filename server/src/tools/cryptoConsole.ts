import dotenv from 'dotenv';
dotenv.config();
import crypto from 'crypto';
import { jwtConfig } from '#auth/config/jwt.config'; // Upewnij się, że masz właściwy plik konfiguracyjny
import SystemLog from '#/utils/SystemLog'; // Upewnij się, że masz właściwy plik konfiguracyjny
import readline from 'readline';



// Funkcje szyfrowania i deszyfrowania
export const encryptId = (userId: string): string => {
  console.log(process.env.JWT_SECRET); 
  const iv = crypto.randomBytes(16); // Generowanie losowego IV
  const key = Buffer.from(jwtConfig.encryptionKey, 'hex'); // Klucz do szyfrowania
  
  const cipher = crypto.createCipheriv(jwtConfig.encryptionAlgorithm || 'aes-256-cbc', key, iv);
  let encrypted = cipher.update(userId, 'utf8', 'hex');
  encrypted += cipher.final('hex');
  
  return `${iv.toString('hex')}:${encrypted}`;
};

export const decryptId = (encryptedId: string): string | null => {
  if (!encryptedId) return null;
  
  try {
    // Walidacja formatu
    if (!encryptedId.includes(':')) {
      throw new Error('Invalid encrypted format');
    }
    
    const [ivHex, encrypted] = encryptedId.split(':');
    if (!ivHex || !encrypted) throw new Error('Invalid IV or encrypted data');
    
    const iv = Buffer.from(ivHex, 'hex');
    const key = Buffer.from(jwtConfig.encryptionKey, 'hex');
    
    if (iv.length !== 16) { // IV musi mieć długość 16 bajtów
      throw new Error('Invalid IV length');
    }
    
    const decipher = crypto.createDecipheriv(
      jwtConfig.encryptionAlgorithm || 'aes-256-cbc',
      key,
      iv
    );
    return decipher.update(encrypted, 'hex', 'utf8') + decipher.final('utf8');
  } catch (error) {
    SystemLog.error('Decryption failed', {
      error: error instanceof Error ? error.message : 'Unknown error',
      encryptedId: encryptedId?.slice(0, 5) + '...' // Ograniczanie logowania
    });
    return null;
  }
};

// Używanie readline do interakcji z użytkownikiem
const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout
});

// Pytanie o ID użytkownika do szyfrowania
rl.question('Wprowadź ID użytkownika do zaszyfrowania: ', (userId) => {
  const encryptedId = encryptId(userId);
  console.log('Zaszyfrowane ID:', encryptedId);

  // Pytanie o zaszyfrowane ID do deszyfrowania
  rl.question('Wprowadź zaszyfrowane ID do odszyfrowania: ', (encryptedInput) => {
    const decryptedId = decryptId(encryptedInput);
    console.log('Odszyfrowane ID:', decryptedId);
    rl.close();
  });
});
