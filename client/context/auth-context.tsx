"use client";

import {
  createContext,
  useState,
  useContext,
  ReactNode,
  useEffect,
} from "react";
import { useRouter, usePathname } from "next/navigation";
import { FaSpinner } from "react-icons/fa";
import { checkSession } from "@/services/auth.service";

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
};

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider = ({ children }: { children: ReactNode }) => {
  const [user, setUser] = useState<User | null>(null);
  const [isAuthenticated, setIsAuthenticated] = useState<boolean | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  // const router = useRouter();
  // const pathname = usePathname();

  // useEffect(() => {
  //   // Tworzymy funkcję asynchroniczną wewnątrz useEffect
  //   const fetchSessionData = async () => {
  //     console.log('== AuthProvider ==');
  //     try {
  //       const sessionData = await checkSession(); // Asynchroniczne wywołanie
  //       console.log(`SESSION: ${JSON.stringify(sessionData)}`);
  //     } catch (error) {
  //       console.error('Error checking session:', error);
  //     }
  //   };
  
  //   fetchSessionData(); // Wywołanie funkcji asynchronicznej
  // }, []);

  const login = (user: User) => {
    setUser(user);
    setIsAuthenticated(true);
    localStorage.setItem("user", JSON.stringify(user));
    // if (pathname === "/login") router.push("/dashboard");
  };

  const logout = () => {
    setUser(null);
    setIsAuthenticated(false);
    localStorage.removeItem("user");
    // router.replace("/login");
  };

  if (isLoading) {
    return (
      <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50">
        <FaSpinner className="animate-spin text-white text-4xl" />
      </div>
    );
  }

  return (
    <AuthContext.Provider
      value={{ user, isAuthenticated, login, logout }}
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