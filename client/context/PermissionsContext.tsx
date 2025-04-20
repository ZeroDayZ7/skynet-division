'use client';

import {
  createContext,
  useState,
  useContext,
  useEffect,
  ReactNode,
} from 'react';
import { getUserPermissions } from '@/context/permissions/getUserPermissions'; 

type PermissionsContextType = {
  permissions: Record<string, { enabled: boolean, hidden: boolean }> | null; // Zmieniamy typ na obiekt
  role: string | null;
  isLoaded: boolean;
};

const PermissionsContext = createContext<PermissionsContextType | undefined>(undefined);

export const PermissionsProvider = ({ children }: { children: ReactNode }) => {
  const [permissions, setPermissions] = useState<Record<string, { enabled: boolean, hidden: boolean }> | null>(null); // Używamy Record, żeby przechowywać obiekt z uprawnieniami
  const [role, setRole] = useState<string | null>(null);
  const [isLoaded, setIsLoaded] = useState(false);

  useEffect(() => {
    const fetchPermissions = async () => {
      try {
        const data = await getUserPermissions();
        console.log('Fetched permissions:', data);
        if (data) {
          setPermissions(data.permissions);  // Zapisujemy obiekt z uprawnieniami
          setRole(data.role);
        }
      } catch (error) {
        console.error('Error fetching permissions:', error);
      } finally {
        setIsLoaded(true);
      }
    };

    fetchPermissions();
  }, []);

  return (
    <PermissionsContext.Provider value={{ permissions, role, isLoaded }}>
      {children}
    </PermissionsContext.Provider>
  );
};

export const usePermissions = (): PermissionsContextType => {
  const context = useContext(PermissionsContext);
  if (!context) {
    throw new Error('usePermissions must be used within a PermissionsProvider');
  }
  return context;
};
