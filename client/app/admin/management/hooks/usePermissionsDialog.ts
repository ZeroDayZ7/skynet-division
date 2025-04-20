// app/user-management/hooks/usePermissionsDialog.ts
'use client';

import { useState, useEffect, useCallback } from 'react';
import { useApi } from '@/hooks/useApi';
import { useRouter } from 'next/navigation';
import { getPermissions, editPermissions } from '../actions/editPermissions';
import { Permissions } from '../types/user';

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
  handlePermissionChange: (key: string, field: 'enabled' | 'hidden', value: boolean) => void;
  handleSave: () => Promise<void>;
}

export const usePermissionsDialog = ({
  user,
  hasPermission,
  onClose,
}: UsePermissionsDialogProps): UsePermissionsDialogReturn => {
  const router = useRouter();
  const { execute } = useApi();
  const [open, setOpen] = useState(false);
  const [userPermissions, setUserPermissions] = useState<Permissions>({});
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (!user) {
      setOpen(false);
      return;
    }

    setOpen(!!user && hasPermission);

    if (user && hasPermission) {
      const fetchPermissions = async () => {
        setLoading(true);
        setError(null);
        try {
          const response = await execute(getPermissions, user.id);
          if (response.success) {
            const filteredPermissions: Permissions = {};
            for (const [key, value] of Object.entries(response.data || {})) {
              filteredPermissions[key] = value ?? { enabled: false, hidden: false };
            }
            setUserPermissions(filteredPermissions);
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
    } else {
      setUserPermissions({});
      setOpen(false);
    }
  }, [user, hasPermission, execute]);

  const handlePermissionChange = useCallback(
    (key: string, field: 'enabled' | 'hidden', value: boolean) => {
      setUserPermissions((prev) => ({
        ...prev,
        [key]: {
          enabled: field === 'enabled' ? value : prev[key]?.enabled ?? false,
          hidden: field === 'hidden' ? value : prev[key]?.hidden ?? false,
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
      const result = await execute(editPermissions, user.id, userPermissions);
      if (result.success) {
        setOpen(false);
        onClose();
        router.refresh();
      } else {
        setError(result.message || 'Nie udało się zapisać uprawnień.');
      }
    } catch (error) {
      setError('Wystąpił błąd podczas zapisywania uprawnień.');
    }
  }, [user, userPermissions, execute, onClose, router]);

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