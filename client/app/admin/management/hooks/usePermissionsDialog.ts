// app/hooks/usePermissionsDialog.ts
'use client';

import { useState, useEffect, useCallback, useMemo } from 'react';
import { useRouter } from 'next/navigation';
import { getPermissions, editPermissions } from '../actions/editPermissions';
import { Permissions, Permission } from '../types/permissions';

interface UsePermissionsDialogProps {
  user: { id: string; email: string; first_name?: string; last_name?: string } | null;
  hasPermission: boolean;
  onClose: () => void;
}

interface UsePermissionsDialogReturn {
  open: boolean;
  setOpen: (open: boolean) => void;
  userPermissions: Permissions;
  loading: boolean;
  error: string | null;
  handlePermissionChange: (key: string, field: 'enabled' | 'visible', value: boolean) => void;
  handleSave: () => Promise<void>;
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

  // Cache permissions to avoid refetching
  const permissionsCache = useMemo(() => new Map<string, Permissions>(), []);

  useEffect(() => {
    if (!user) {
      setOpen(false);
      setUserPermissions({});
      return;
    }

    setOpen(!!user && hasPermission);

    if (user && hasPermission) {
      const fetchPermissions = async () => {
        // Check cache first
        if (permissionsCache.has(user.id)) {
          setUserPermissions(permissionsCache.get(user.id)!);
          setLoading(false);
          return;
        }

        setLoading(true);
        setError(null);
        try {
          const response = await getPermissions(user.id);
          if (response.success) {
            const filteredPermissions: Permissions = {};
            for (const [key, value] of Object.entries(response.data || {})) {
              filteredPermissions[key] = (value as Permission) ?? { enabled: false, visible: false };
            }
            setUserPermissions(filteredPermissions);
            permissionsCache.set(user.id, filteredPermissions);
          } else {
            setError(response.message || 'Nie udało się pobrać uprawnień.');
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
    (key: string, field: 'enabled' | 'visible', value: boolean) => {
      setUserPermissions((prev) => ({
        ...prev,
        [key]: {
          enabled: field === 'enabled' ? value : prev[key]?.enabled ?? false,
          visible: field === 'visible' ? value : prev[key]?.visible ?? false,
        },
      }));
    },
    []
  );

  const handleSave = useCallback(async () => {
    if (!user || Object.keys(userPermissions).length === 0) {
      setError('Brak uprawnień do zapisania.');
      return;
    }

    setError(null);
    try {
      const result = await editPermissions(user.id, userPermissions);
      if (result.success) {
        permissionsCache.set(user.id, userPermissions); // Update cache
        setOpen(false);
        onClose();
        router.refresh();
      } else {
        setError(result.message || 'Nie udało się zapisać uprawnień.');
      }
    } catch (error) {
      setError('Wystąpił błąd podczas zapisywania uprawnień.');
    }
  }, [user, userPermissions, onClose, router, permissionsCache]);

  return {
    open,
    setOpen,
    userPermissions,
    loading,
    error,
    handlePermissionChange,
    handleSave,
  };
};