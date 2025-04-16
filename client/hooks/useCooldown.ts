// lib/toastUtils.ts
import { toast } from 'sonner';

export function showCooldownToast(failCount: number, maxAttempts: number = 9, lockTime: number = 30000) {
  if (failCount >= maxAttempts) {
    const timeLeft = lockTime / 1000; // Czas w sekundach
    toast.error(`Zbyt wiele prób! Próbuj ponownie za ${timeLeft} sekund.`, {
      description: 'Jeszcze jeden klik i zostaniesz zbanowany 👀',
      icon: '⛔',
      duration: 5000,
    });
  } else {
    toast.info('Odczekaj chwilę przed kolejną zmianą.', {
      duration: 3000, // Czas wyświetlania info
    });
  }
}
