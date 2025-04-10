import crypto from 'crypto';

// Generuje 32-bajtowy klucz w formacie szesnastkowym
const generatedKey = crypto.randomBytes(32).toString('hex');
console.log('Wygenerowany klucz JWT:', generatedKey);
