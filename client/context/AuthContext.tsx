'use client';

import { createContext, useState, useContext, ReactNode, useEffect, useCallback } from 'react';
import { Loader2 } from "lucide-react";
import { getUserSession } from '@/lib/session/getUserSession';
import type { UserRole } from '@/components/ui/RoleBadge';
import { useRouter } from 'next/navigation';
import Loader from '@/components/Loader';


// types/user.ts
export type User = {
  id: number;
  username: string;
  role: UserRole;
  points?: number;
  notifications?: number;
  hasDocumentsEnabled?: boolean;
};


type AuthContextType = {
  isAuthenticated: boolean;
  user: User | null;
  isLoading: boolean;
  login: (user: User) => void;
  logout: () => void;
};

const AuthContext = createContext<AuthContextType | undefined>(undefined);

// Komponent dostarczający kontekst autoryzacji
export const AuthProvider = ({ children }: { children: ReactNode }) => {
  const [isAuthenticated, setIsAuthenticated] = useState<boolean>(false);
  const [user, setUser] = useState<User | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const router = useRouter();


// Sprawdzenie autentykacji przy pierwszym renderowaniu
useEffect(() => {
  checkAuth();
}, []);

// console.log('[AuthProvider] render', { user, isLoading });
// Funkcja sprawdzająca autentykację
const checkAuth = useCallback(async (): Promise<boolean> => {
  // console.log('[AuthProvider][Initialize]: checkAuth');

  try {
    const session = await getUserSession();
    // console.log(JSON.stringify(session));
    
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

  // Wyświetlanie loadera podczas inicjalizacji
  if (isLoading) {
    return (
      // <div
      //   className="fixed inset-0 flex items-center justify-center bg-foreground bg-opacity-50 z-50"
      //   role="status"
      //   aria-live="polite"
      // >
      //   <Loader2 className="animate-spin text-muted-foreground text-4xl" />
      //   <span className="sr-only">Ładowanie danych, proszę czekać...</span>
      // </div>

      <>
        <Loader fullscreen={true} /> 
      </>
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