'use client';

import { createContext, useState, useContext, ReactNode, useEffect, useCallback } from 'react';
import { Loader2 } from "lucide-react";
import { getUserSession } from '@/lib/session/getUserSession';
import { getUnreadNotificationsCount } from '@/lib/api/notifications';


// types/user.ts
export type User = {
  id: string;
  username: string;
  role: 'user' | 'admin' | "superadmin";
  points?: number;
  notifications?: number;
  hasDocumentsEnabled?: boolean; // opcjonalnie, jeśli nie zawsze występuje
};

type AuthContextType = {
  user: User | null;
  isAuthenticated: boolean | null;
  isLoading: boolean;
  login: (user: User) => void;
  logout: () => void;
};

const AuthContext = createContext<AuthContextType | undefined>(undefined);

// Komponent dostarczający kontekst autoryzacji
export const AuthProvider = ({ children }: { children: ReactNode }) => {
  const [user, setUser] = useState<User | null>(null);
  const [isAuthenticated, setIsAuthenticated] = useState<boolean | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(true);


// Sprawdzenie autentykacji przy pierwszym renderowaniu
useEffect(() => {
  checkAuth();
}, []);

// Funkcja sprawdzająca autentykację
const checkAuth = useCallback(async (): Promise<boolean> => {
  console.log('[AuthProvider][Initialize]: checkAuth');
  setIsLoading(true);

  try {
    const session = await getUserSession(); // ważne: sesja musi być dostępna w ciasteczkach
    if (session) {
      console.log(`[AuthContext/SESSION]: ${JSON.stringify(session)}`);
      setUser(session.user as User);
      setIsAuthenticated(true);
      return true;
    } else {
      setUser(null);
      setIsAuthenticated(false);
      return false;
    }
  } catch (err) {
    console.error('[AuthProvider] Błąd podczas sprawdzania sesji:', err);
    setUser(null);
    setIsAuthenticated(false);
    return false;
  } finally {
    setIsLoading(false);
  }
}, []);


  useEffect(() => {
    console.log(`[AuthContext][Initialize]: unreadNotificationsCount`);
    if (!user || !isAuthenticated) return;
  
    const fetchNotifications = async () => {
      try {
        const unreadNotificationsCount = await getUnreadNotificationsCount();
        console.log(`[AuthContext][unreadNotificationsCount]: ${JSON.stringify(unreadNotificationsCount)}`);
        updateNotificationsContext(unreadNotificationsCount);
      } catch (err) {
        console.error('[useEffect] Błąd podczas pobierania powiadomień:', err);
      }
    };
  
    fetchNotifications();
  }, [isAuthenticated]);
  


  // Logowanie użytkownika
  const login = (user: User) => {
    setUser(user);
    setIsAuthenticated(true);
    // localStorage.setItem('user', JSON.stringify(user));
  };

  // Wylogowanie użytkownika
  const logout = () => {
    setUser(null);
    setIsAuthenticated(false);
    // localStorage.removeItem('user');
  };

  // Aktualizacja licznika powiadomień
  const updateNotificationsContext = (count: number) => {
    if (!user || typeof count !== 'number') return;
  
    const updatedUser = { ...user, notifications: Math.max(0, count) }; // Bezpośrednie ustawienie pobranej liczby powiadomień
    setUser(updatedUser);
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
        isAuthenticated,
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