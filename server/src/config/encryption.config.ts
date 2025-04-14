// EncryptionConfig
import { config } from 'dotenv';

// Wczytaj zmienne środowiskowe 
config();

/**
 * Interfejs dla konfiguracji szyfrowania
 */
export interface EncryptionConfig {
  /**
   * Klucz do szyfrowania, powinien mieć długość 32 bajtów (256 bitów) dla algorytmu AES-256
   * Jeżeli używasz AES-256-GCM, klucz musi mieć długość 32 bajtów.
   * @example "1234567890abcdef1234567890abcdef1234567890abcdef1234567890abcdef"
   */
  encryptionKey: string;

  /**
   * Algorytm szyfrowania do użycia, np. 'aes-256-gcm', 'aes-128-cbc', itp.
   * Zwykle używa się 'aes-256-gcm' dla lepszej integralności i wydajności.
   * @example "aes-256-gcm"
   */
  encryptionAlgorithm: string;

  /**
   * Długość wektora inicjującego (IV) w bajtach. Dla AES-GCM zwykle jest to 12 bajtów.
   * Wartość ta jest zależna od wybranego algorytmu.
   * @example 12
   */
  ivLength: number;

  /**
   * Długość tagu autentyczności w bajtach. Dla AES-GCM zwykle wynosi 16 bajtów.
   * Tag ten służy do weryfikacji integralności danych i autentyczności.
   * @example 16
   */
  tagLength: number;
}

/**
 * Konfiguracja szyfrowania, która pobiera wartości ze zmiennych środowiskowych.
 * Wartości domyślne można ustawić w pliku .env.
 */
export const encryptionConfig: EncryptionConfig = {
  /**
   * Klucz do szyfrowania (32 bajty dla AES-256)
   * @default 'defaultEncryptionKey'
   */
  encryptionKey: process.env.ENCRYPTION_KEY || 'd003e8b6be8768e6cb4ac84c09b6d4cfcd835712dcf3f9f736c432663c45316f',

  /**
   * Algorytm szyfrowania
   * @default 'aes-256-gcm'
   */
  encryptionAlgorithm: process.env.ENCRYPTION_ALGORITHM || 'aes-256-gcm',

  /**
   * Długość IV (wektora inicjującego) w bajtach
   * @default 12 (dla AES-GCM)
   */
  ivLength: parseInt(process.env.IV_LENGTH || '12', 10),

  /**
   * Długość tagu autentyczności w bajtach
   * @default 16 (dla AES-GCM)
   */
  tagLength: parseInt(process.env.TAG_LENGTH || '16', 10),
};
