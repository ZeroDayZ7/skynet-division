import { useEffect } from 'react';
import { getUnreadNotificationsCount } from '@/lib/api/notifications';
import { useAuth } from '../AuthContext'; // Używamy kontekstu Auth
import type { User } from '../AuthContext';

/**
 * Hook do pobierania liczby nieprzeczytanych powiadomień.
 * Automatycznie wywołuje funkcję aktualizującą liczbę powiadomień w kontekście po zmianie użytkownika.
 *
 * @param {User | null} user - Użytkownik, dla którego mają być pobrane powiadomienia. Jeśli użytkownik jest `null`, hook nie wykonuje żadnej akcji.
 * 
 * @returns {void} - Hook nie zwraca żadnej wartości. Jego celem jest aktualizacja stanu powiadomień w kontekście.
 */
export const useFetchNotifications = (
    user: User | null,
    updateNotificationsContext: (count: number | ((prev: number) => number)) => void
  ) => {
    useEffect(() => {
      const fetchNotifications = async () => {
        if (user) {
          try {
            const unreadNotificationsCount = await getUnreadNotificationsCount();
            console.log(`unreadNotificationsCount: ${unreadNotificationsCount}`);
            updateNotificationsContext(unreadNotificationsCount);
          } catch (err) {
            console.error('[useFetchNotifications] Błąd podczas pobierania powiadomień:', err);
          }
        }
      };
  
      fetchNotifications();
    }, [user, updateNotificationsContext]);
  };
  