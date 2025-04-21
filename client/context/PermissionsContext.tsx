'use client';

import { createContext, useState, useContext, useEffect, ReactNode } from 'react';
import { FaSpinner } from 'react-icons/fa';
import { getUserPermissions } from './permissions/getUserPermissions';
import { Permissions, UserPermissions } from './permissions/types';

interface PermissionsContextType {
  permissions: Permissions | null;
  hasPermissionEnabled: (key: string) => boolean;
  hasPermissionVisible: (key: string) => boolean;
}

const PermissionsContext = createContext<PermissionsContextType | undefined>(undefined);

export const PermissionsProvider = ({ children }: { children: ReactNode }) => {
  const [permissions, setPermissions] = useState<Permissions | null>(null);
  const [isLoaded, setIsLoaded] = useState(false);

  useEffect(() => {
    const fetchPermissions = async () => {
      setIsLoaded(false);
      try {
        const response: UserPermissions | null = await getUserPermissions();
        if (!response?.permissions) {
          throw new Error('Brak danych uprawnień');
        }
        setPermissions(response.permissions);
      } catch (error) {
        console.error('Błąd pobierania uprawnień:', error);
        setPermissions(null);
      } finally {
        setIsLoaded(true);
      }
    };

    fetchPermissions();
  }, []);

  const hasPermissionEnabled = (key: string): boolean => permissions?.[key]?.is_enabled ?? false;
  const hasPermissionVisible = (key: string): boolean => permissions?.[key]?.is_visible ?? false;

  if (!isLoaded) {
    return (
      <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50">
        <FaSpinner className="animate-spin text-white text-4xl" />
      </div>
    );
  }

  return (
    <PermissionsContext.Provider value={{ permissions, hasPermissionEnabled, hasPermissionVisible }}>
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