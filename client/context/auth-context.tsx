"use client";

import {
  createContext,
  useState,
  useContext,
  ReactNode,
  useEffect,
  useCallback,
} from "react";
import { useRouter, usePathname } from "next/navigation";
import { checkSession, SessionData } from "@/services/auth.service";
import { FaSpinner } from "react-icons/fa";

type User = {
  role: string;
  points: number;
  notifications: number;
};

type AuthContextType = {
  user: User | null;
  isAuthenticated: boolean | null;
  login: (user: User) => void;
  logout: () => void;
  checkSession: () => Promise<void>;
};

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider = ({ children }: { children: ReactNode }) => {
  const [user, setUser] = useState<User | null>(null);
  const [isAuthenticated, setIsAuthenticated] = useState<boolean | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [isInitialLogin, setIsInitialLogin] = useState<boolean>(false); // Nowy stan
  const router = useRouter();
  const pathname = usePathname();

  const checkSessionHandler = useCallback(async () => {
    try {
      const data: SessionData = await checkSession();
      setIsAuthenticated(data.isAuthenticated);
      if (data.isAuthenticated && data.user) {
        const newUser: User = {
          ...data.user,
          notifications: data.user.notifications ?? 0, // Domyślna wartość dla notifications
        };
        setUser(newUser);
        localStorage.setItem("user", JSON.stringify(newUser));
        if (pathname === "/login") router.replace("/dashboard");
      } else {
        setUser(null);
        localStorage.removeItem("user");
        if (pathname !== "/login") router.replace("/login");
      }
    } catch (error) {
      console.error("Session check error:", error);
      setIsAuthenticated(false);
      setUser(null);
      if (pathname !== "/login") router.replace("/login");
    } finally {
      setIsLoading(false);
    }
  }, [pathname, router]);

  const login = (user: User) => {
    setUser(user);
    setIsAuthenticated(true);
    setIsInitialLogin(true); // Oznaczamy, że to pierwsze logowanie
    localStorage.setItem("user", JSON.stringify(user));
    setIsLoading(false); // Wyłączamy loading po zalogowaniu
  };

  const logout = () => {
    setUser(null);
    setIsAuthenticated(false);
    setIsInitialLogin(false); // Resetujemy stan przy wylogowaniu
    localStorage.removeItem("user");
  };

  useEffect(() => {
    // Sprawdzamy sesję tylko, jeśli to nie jest pierwsze logowanie
    if (!isInitialLogin) {
      console.log(`E2`);
      checkSessionHandler();
    } else {
      // Jeśli to pierwsze logowanie, resetujemy flagę po jednorazowym pominięciu
      console.log(`E1`);
      setIsInitialLogin(false);
    }
  }, [checkSessionHandler, isInitialLogin]);

  if (isLoading) {
    return (
      <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50">
        <FaSpinner className="animate-spin text-white text-4xl" />
      </div>
    );
  }

  return (
    <AuthContext.Provider
      value={{ user, isAuthenticated, login, logout, checkSession: checkSessionHandler }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = (): AuthContextType => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
};