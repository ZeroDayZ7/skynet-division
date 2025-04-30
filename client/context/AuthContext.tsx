'use client';

import { createContext, useState, useContext, ReactNode, useEffect } from 'react';
import { FaSpinner } from 'react-icons/fa';
import { checkSession } from '@/services/auth.service';



export type User = {
  role: string;
  points: number;
  notifications: number;
};

type AuthContextType = {
  user: User | null;
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

  // Inicjalizacja autoryzacji
  useEffect(() => {
    const initializeAuth = async () => {
      console.log('Inicjalizacja AuthProvider');

      // Sprawdź użytkownika w localStorage
      const localUser = localStorage.getItem('user');
      if (localUser) {
        try {
          const parsedUser = JSON.parse(localUser);
          setUser(parsedUser);
          setIsAuthenticated(true);
          console.log('Załadowano użytkownika z localStorage:', parsedUser);
        } catch (err) {
          console.error('Błąd parsowania localStorage:', err);
          localStorage.removeItem('user');
        }
      }
      setIsLoading(false);
    };

    initializeAuth();
  }, []); // Pusty array zależności, aby wywołać tylko raz

  // Logowanie użytkownika
  const login = (user: User) => {
    setUser(user);
    setIsAuthenticated(true);
    localStorage.setItem('user', JSON.stringify(user));
  };

  // Wylogowanie użytkownika
  const logout = () => {
    setUser(null);
    setIsAuthenticated(false);
    localStorage.removeItem('user');
  };

  // Aktualizacja licznika powiadomień
  const updateNotificationsContext = (count: number | ((prev: number) => number)) => {
    if (!user) return;

    const newCount = typeof count === 'function' ? count(user.notifications) : count;
    const updatedUser = { ...user, notifications: Math.max(0, newCount) };
    setUser(updatedUser);
    localStorage.setItem('user', JSON.stringify(updatedUser));
  };

  // Wyświetlanie loadera podczas inicjalizacji
  if (isLoading) {
    return (
      <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50">
        <FaSpinner className="animate-spin text-white text-4xl" />
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