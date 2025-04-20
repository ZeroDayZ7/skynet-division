'use client';

import {
  createContext,
  useState,
  useContext,
  useEffect,
  ReactNode,
} from 'react';
import { getUserPermissions } from '@/context/permissions/getUserPermissions'; 
import { FaSpinner } from 'react-icons/fa';

type PermissionsContextType = {
  permissions: Record<string, { enabled: boolean, hidden: boolean }> | null; // Zmieniamy typ na obiekt
  role: string | null;
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

  if (!isLoaded) {
    return (
      <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50">
        <FaSpinner className="animate-spin text-white text-4xl" />
      </div>
    );
  }

  return (
    <PermissionsContext.Provider value={{ permissions, role }}>
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
