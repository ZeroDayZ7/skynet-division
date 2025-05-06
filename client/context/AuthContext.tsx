'use client';

import { createContext, useState, useContext, ReactNode, useEffect, useCallback } from 'react';
import { Loader2 } from "lucide-react";
import { getUserSession } from '@/lib/session/getUserSession';
import { getUnreadNotificationsCount } from '@/lib/api/notifications';
import type { UserRole } from '@/components/ui/RoleBadge';


// types/user.ts
export type User = {
  id: number;
  username: string;
  role: UserRole;
  hasDocumentsEnabled?: boolean;
};

export type FullUser = {
  points?: number;
  notifications?: number;

};

type AuthContextType = {
  user: User | null;
  fullUser: FullUser | null,
  isLoading: boolean;
  login: (user: User) => void;
  logout: () => void;
};

const AuthContext = createContext<AuthContextType | undefined>(undefined);

// Komponent dostarczający kontekst autoryzacji
export const AuthProvider = ({ children }: { children: ReactNode }) => {
  const [user, setUser] = useState<User | null>(null);
  const [fullUser, setFullUser] = useState<FullUser | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(true);


// Sprawdzenie autentykacji przy pierwszym renderowaniu
useEffect(() => {
  checkAuth();
}, []);

// Funkcja sprawdzająca autentykację
const checkAuth = useCallback(async (): Promise<boolean> => {
  console.log('[AuthProvider][Initialize]: checkAuth');

  try {
    const session = await getUserSession();
    console.log(JSON.stringify(session));
    
    if (session) {
      // console.log(`[AuthContext/SESSION]: ${JSON.stringify(session)}`);
      setUser(session.user as User);
      return true;
    } else {
      setUser(null);
      return false;
    }
  } catch (err) {
    console.error('[AuthProvider] Błąd podczas sprawdzania sesji:', err);
    setUser(null);
    return false;
  } finally {
    setIsLoading(false);
  }
}, []);


  useEffect(() => {
    // console.log(`[AuthContext][Initialize]: unreadNotificationsCount`);
    if (!user) return;
  
    const fetchNotifications = async () => {
      try {
        const unreadNotificationsCount = await getUnreadNotificationsCount();
        // console.log(`[AuthContext][unreadNotificationsCount]: ${JSON.stringify(unreadNotificationsCount)}`);
        updateNotificationsContext(unreadNotificationsCount);
      } catch (err) {
        console.error('[useEffect] Błąd podczas pobierania powiadomień:', err);
      }
    };
  
    fetchNotifications();
  }, [user]);
  


  // Logowanie użytkownika
  const login = (user: User) => {
    setUser(user);
    // localStorage.setItem('user', JSON.stringify(user));
  };

  // Wylogowanie użytkownika
  const logout = () => {
    setUser(null);
    // localStorage.removeItem('user');
  };

  // Aktualizacja licznika powiadomień
  const updateNotificationsContext = (count: number) => {
    if (!user || typeof count !== 'number') return;
  
    const updatedUser = { ...fullUser, notifications: Math.max(0, count) }; // Bezpośrednie ustawienie pobranej liczby powiadomień
    setFullUser(updatedUser);
    // localStorage.setItem('user', JSON.stringify(updatedUser)); // Opcjonalnie zapis do localStorage
  };

  console.log('[AuthProvider] render', { user, isLoading });

  // Wyświetlanie loadera podczas inicjalizacji
  if (isLoading) {
    return (
      <div
        className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50"
        role="status"
        aria-live="polite"
      >
        <Loader2 className="animate-spin text-muted-foreground text-4xl" />
        <span className="sr-only">Ładowanie danych, proszę czekać...</span>
      </div>
    );
  }
  

  return (
    <AuthContext.Provider
      value={{
        user,
        fullUser,
        isLoading,
        login,
        logout,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

// Hook do używania kontekstu
export const useAuth = (): AuthContextType => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth musi być używany wewnątrz AuthProvider');
  }
  return context;
};