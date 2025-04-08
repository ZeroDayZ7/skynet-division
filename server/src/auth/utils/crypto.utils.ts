import crypto from 'crypto';
import { jwtConfig } from '#auth/config/jwt.config';
import SystemLog from '#/utils/SystemLog';

// Function to encrypt user ID
export const encryptId = (userId: string): string => {
  const iv = crypto.randomBytes(16); // Generate random IV
  const key = Buffer.from(jwtConfig.encryptionKey, 'hex');
  
  const cipher = crypto.createCipheriv(jwtConfig.encryptionAlgorithm || 'aes-256-cbc', key, iv);
  let encrypted = cipher.update(userId, 'utf8', 'hex');
  encrypted += cipher.final('hex');
  
  return `${iv.toString('hex')}:${encrypted}`;
};

// Function to decrypt user ID
export const decryptId = (encryptedId: string): string | null => {
  if (!encryptedId) return null;
  
  try {
    // Validate format
    if (!encryptedId.includes(':')) {
      throw new Error('Invalid encrypted format');
    }
    
    const [ivHex, encrypted] = encryptedId.split(':');
    if (!ivHex || !encrypted) throw new Error('Invalid IV or encrypted data');
    
    const iv = Buffer.from(ivHex, 'hex');
    const key = Buffer.from(jwtConfig.encryptionKey, 'hex');
    
    // Validate IV length
    if (iv.length !== 16) { // IV for AES must be 16 bytes
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
      encryptedId: encryptedId?.slice(0, 5) + '...' // Limit logging
    });
    return null;
  }
};