'use client';

import { createContext, useState, useContext, ReactNode, useEffect } from 'react';
import { Loader2 } from "lucide-react";
import { getUserSession } from '@/lib/session/getUserSession';


// types/user.ts
export type User = {
  id: string;
  username: string;
  role: 'user' | 'admin' | "superadmin";
  points?: number;
  notifications: number;
  hasDocumentsEnabled?: boolean; // opcjonalnie, jeśli nie zawsze występuje
};


type AuthContextType = {
  user: User;
  isAuthenticated: boolean | null;
  isLoading: boolean;
  login: (user: User) => void;
  logout: () => void;
  updateNotificationsContext: (count: number | ((prev: number) => number)) => void; // Obsługuje zarówno liczbę, jak i funkcję
};

const AuthContext = createContext<AuthContextType | undefined>(undefined);

// Komponent dostarczający kontekst autoryzacji
export const AuthProvider = ({ children }: { children: ReactNode }) => {
  const [user, setUser] = useState<User | null>(null);
  const [isAuthenticated, setIsAuthenticated] = useState<boolean | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(true);


  useEffect(() => {
    const initializeAuth = async () => {
      console.log('[AuthProvider] initializeAuth');

      try {
        const session = await getUserSession(); // ważne: sesja musi być dostępna w ciasteczkach
        if (session) {
          console.log(`[AuthContext/SESSION]: ${JSON.stringify(session)}`);
          setUser(session.user as User);
          setIsAuthenticated(true);
        } else {
          setUser(null);
          setIsAuthenticated(false);
        }
      } catch (err) {
        console.error('[AuthProvider] Błąd podczas sprawdzania sesji:', err);
        setUser(null);
        setIsAuthenticated(false);
      } finally {
        setIsLoading(false);
      }
    };

    initializeAuth();
  }, []);

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
  const updateNotificationsContext = (count: number | ((prev: number) => number)) => {
    if (!user) return;

    const newCount = typeof count === 'function' ? count(user.notifications) : count;
    const updatedUser = { ...user, notifications: Math.max(0, newCount) };
    setUser(updatedUser);
    // localStorage.setItem('user', JSON.stringify(updatedUser));
  };

  console.log('[AuthProvider] render', { user, isLoading });

  // Wyświetlanie loadera podczas inicjalizacji
  if (isLoading) {
    return (
      <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50">
        {/* <FaSpinner className="animate-spin text-white text-4xl" /> */}
        <Loader2 className="animate-spin text-muted-foreground text-4xl" />
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
        updateNotificationsContext,
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