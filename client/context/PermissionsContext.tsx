// app/user-management/contexts/PermissionsContext.tsx
'use client';

import { createContext, useState, useContext, useEffect, ReactNode } from 'react';
import { FaSpinner } from 'react-icons/fa';
import { getUserPermissions } from '@/context/permissions/getUserPermissions';
import { Permission } from '@/app/admin/management/types/user';

interface PermissionsContextType {
  permissions: Record<string, Permission> | null;
  role: string | null;
}

const PermissionsContext = createContext<PermissionsContextType | undefined>(undefined);

export const PermissionsProvider = ({ children }: { children: ReactNode }) => {
  const [permissions, setPermissions] = useState<Record<string, Permission> | null>(null);
  const [role, setRole] = useState<string | null>(null);
  const [isLoaded, setIsLoaded] = useState(false);

  useEffect(() => {
    const fetchPermissions = async () => {
      try {
        const data = await getUserPermissions();
        if (data) {
          setPermissions(data.permissions);
          setRole(data.role);
        }
      } catch (error) {
        console.error('Błąd pobierania uprawnień:', error);
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
    throw new Error('usePermissions musi być używane w PermissionsProvider');
  }
  return context;
};