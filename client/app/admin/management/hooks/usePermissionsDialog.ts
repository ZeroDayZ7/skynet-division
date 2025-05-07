'use client';

import { useState, useEffect, useCallback, useMemo } from 'react';
import { useRouter } from 'next/navigation';
import { getPermissions, editPermissions } from '@/app/admin/management/actions';
import { Permissions } from '@/context/permissions/types';

interface UsePermissionsDialogProps {
  user: { id: number; email: string; first_name?: string; last_name?: string } | null;
  hasPermission: boolean;
  onClose: () => void;
}

interface UsePermissionsDialogReturn {
  open: boolean;
  setOpen: (open: boolean) => void;
  userPermissions: Permissions;
  loading: boolean;
  error: string | null;
  handlePermissionChange: (key: string, field: 'is_enabled' | 'is_visible', value: boolean) => void;
  // handleSave: () => Promise<void>;
}

export const usePermissionsDialog = ({
  user,
  hasPermission,
  onClose,
}: UsePermissionsDialogProps): UsePermissionsDialogReturn => {
  const router = useRouter();
  const [open, setOpen] = useState(false);
  const [userPermissions, setUserPermissions] = useState<Permissions>({});
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const permissionsCache = useMemo(() => new Map<number, Permissions>(), []);

  useEffect(() => {
    if (!user) {
      setOpen(false);
      setUserPermissions({});
      return;
    }

    setOpen(!!user && hasPermission);

    if (user && hasPermission) {
      const fetchPermissions = async () => {
        if (permissionsCache.has(user.id)) {
          setUserPermissions(permissionsCache.get(user.id)!);
          setLoading(false);
          return;
        }

        setLoading(true);
        setError(null);
        try {
          const permissions = await getPermissions(user.id);
          console.log(`Pobrano uprawnienia dla użytkownika ${user.id}:`, permissions);
          if (permissions) {
            setUserPermissions(permissions);
            permissionsCache.set(user.id, permissions);
          } else {
            setError('Nie udało się pobrać uprawnień.');
          }
        } catch (error) {
          setError('Wystąpił błąd podczas pobierania uprawnień.');
        } finally {
          setLoading(false);
        }
      };
      fetchPermissions();
    }
  }, [user, hasPermission, permissionsCache]);

  const handlePermissionChange = useCallback(
    (key: string, field: 'is_enabled' | 'is_visible', value: boolean) => {
      setUserPermissions((prev) => ({
        ...prev,
        [key]: {
          ...prev[key],
          [field]: value,
        },
      }));
    },
    []
  );

  // const handleSave = useCallback(async () => {
  //   if (!user || Object.keys(userPermissions).length === 0) {
  //     setError('Brak uprawnień do zapisania.');
  //     return;
  //   }

  //   setError(null);
  //   try {
  //     const result = await editPermissions(user.id, userPermissions);
  //     if (result.success) {
  //       permissionsCache.set(user.id, userPermissions);
  //       setOpen(false);
  //       onClose();
  //       router.refresh();
  //     } else {
  //       setError(result.message || 'Nie udało się zapisać uprawnień.');
  //     }
  //   } catch (error) {
  //     setError('Wystąpił błąd podczas zapisywania uprawnień.');
  //   }
  // }, [user, userPermissions, onClose, router, permissionsCache]);

  return {
    open,
    setOpen,
    userPermissions,
    loading,
    error,
    handlePermissionChange,
    // handleSave,
  };
};