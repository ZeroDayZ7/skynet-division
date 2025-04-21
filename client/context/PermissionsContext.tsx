'use client';

import { createContext, useState, useContext, useEffect, ReactNode } from 'react';
import { FaSpinner } from 'react-icons/fa';
import { getUserPermissions } from '@/context/permissions/getUserPermissions';

export interface Permission {
  enabled: boolean;
  visible: boolean;
}

export interface Permissions {
  [key: string]: Permission;
}

interface PermissionsContextType {
  permissions: Record<string, Permission> | null;
}

const PermissionsContext = createContext<PermissionsContextType | undefined>(undefined);

export const PermissionsProvider = ({ children }: { children: ReactNode }) => {
  const [permissions, setPermissions] = useState<Record<string, Permission> | null>(null);
  const [isLoaded, setIsLoaded] = useState(false);

  useEffect(() => {
    const fetchPermissions = async () => {
      try {
        const response = await getUserPermissions();
        console.debug('== Permission Context DATA ==', response);
        if (!response) {
          throw new Error('Nie można pobrać uprawnień użytkownika');
        }
        setPermissions(response.permissions);
      } catch (error) {
        console.error(error);
        setPermissions(null);
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
    <PermissionsContext.Provider value={{ permissions }}>
      {children}
    </PermissionsContext.Provider>
  );
};

export const usePermissions = (): PermissionsContextType => {
  const context = useContext(PermissionsContext);
  if (!context) {
    throw new Error('usePermissions musi być używane w PermissionsProvider');
  }
  return context;

};