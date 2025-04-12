import crypto from 'crypto';
import { encryptionConfig } from '#ro/auth/config/encryption.config'; // Importujemy nasz nowy config
import SystemLog from '#ro/utils/SystemLog';

// Funkcja do szyfrowania danych z AES-GCM
export const encryptDataGCM = (data: string): string => {
  try {
    if (!data) throw new Error("Brak danych do zaszyfrowania");

    const iv = crypto.randomBytes(encryptionConfig.ivLength); // Używamy IV z configu
    const key = Buffer.from(encryptionConfig.encryptionKey, 'hex'); // Używamy klucza z configu

    const cipher = crypto.createCipheriv(encryptionConfig.encryptionAlgorithm, key, iv) as crypto.CipherGCM; // Wymuszenie typu CipherGCM
    let encrypted = cipher.update(data, 'utf8', 'hex');
    encrypted += cipher.final('hex');

    const tag = cipher.getAuthTag(); // Pobranie tagu autentyczności

    return `${iv.toString('hex')}:${tag.toString('hex')}:${encrypted}`;
  } catch (err) {
    SystemLog.error('Encryption failed', {
      error: err instanceof Error ? err.message : 'Unknown error',
      dataSample: data?.slice(0, 5) + '...',
    });
    throw new Error('Błąd szyfrowania');
  }
};

// Funkcja do deszyfrowania danych z AES-GCM
export const decryptDataGCM = (encryptedData: string): string | null => {
  if (!encryptedData) return null;

  try {
    const [ivHex, tagHex, encrypted] = encryptedData.split(':');
    if (!ivHex || !tagHex || !encrypted) throw new Error('Nieprawidłowy format zaszyfrowanych danych');

    const iv = Buffer.from(ivHex, 'hex');
    const tag = Buffer.from(tagHex, 'hex');
    const key = Buffer.from(encryptionConfig.encryptionKey, 'hex'); // Używamy klucza z configu

    if (iv.length !== encryptionConfig.ivLength) throw new Error('Nieprawidłowa długość IV dla AES-GCM');

    const decipher = crypto.createDecipheriv(encryptionConfig.encryptionAlgorithm, key, iv) as crypto.DecipherGCM; // Wymuszenie typu DecipherGCM
    decipher.setAuthTag(tag); // Ustawienie tagu autentyczności

    let decrypted = decipher.update(encrypted, 'hex', 'utf8');
    decrypted += decipher.final('utf8');

    return decrypted;
  } catch (error) {
    SystemLog.error('Decryption failed', {
      error: error instanceof Error ? error.message : 'Unknown error',
      encryptedData: encryptedData?.slice(0, 5) + '...',
    });
    return null;
  }
};


// =====================================================================
// ====  npx tsx encryptGCM.ts
// =====================================================================
const dataToEncrypt = "88012011551"; // Wprowadź dane do zaszyfrowania
// Szyfrowanie
const encryptedData = encryptDataGCM(dataToEncrypt);
if (encryptedData) {
  SystemLog.warn(`Zaszyfrowane dane: ${encryptedData}`);

  // Deszyfrowanie
  const decryptedData = decryptDataGCM(encryptedData);
  SystemLog.warn(`Odszyfrowane dane: ${decryptedData}`);
}