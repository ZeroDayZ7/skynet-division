// hooks/useEditPermissions.ts
import { useState, useEffect } from 'react';
import { getPermissions, editPermissions } from '@/app/admin/management/actions/permissions';
import { apiClient } from '@/lib/apiClient';
import { Permissions } from '@/context/permissions/types';
import { User } from '@/app/admin/management/types/user';

export const useEditPermissions = (user: User | null, hasEditPermission: boolean, onClose: () => void) => {
  const [userPermissions, setUserPermissions] = useState<Permissions>({});
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (!hasEditPermission || !user) {
      onClose();
      return;
    }

    const fetchPermissions = async () => {
      setLoading(true);
      try {
        const response = await getPermissions(user.id);
        if (response) {
          setUserPermissions(response);
        } else {
          setError('Nie udało się pobrać uprawnień.');
        }
      } catch {
        setError('Wystąpił błąd podczas pobierania uprawnień.');
      } finally {
        setLoading(false);
      }
    };

    fetchPermissions();
  }, [user, hasEditPermission]);

  const savePermissions = async () => {
    setLoading(true);
    try {
      const success = await editPermissions(user!.id, userPermissions);
      if (!success) {
        setError('Nie udało się zapisać uprawnień.');
      }
    } catch {
      setError('Wystąpił błąd podczas zapisywania uprawnień.');
    } finally {
      setLoading(false);
    }
  };

//   const assignDefaultPermissions = async () => {
//     setLoading(true);
//     try {
//       const response = await apiClient<{ success: boolean; templates: { key: string; description: string }[] }>(
//         `/api/admin/permissions/templates`,
//         { method: 'GET' }
//       );

//       if (response.success && response.templates) {
//         const defaultPermissions: Permissions = response.templates.reduce((acc, template) => {
//           acc[template.key] = {
//             is_visible: true,
//             is_enabled: false,
//             description: template.description,
//           };
//           return acc;
//         }, {} as Permissions);
//         setUserPermissions(defaultPermissions);
//       } else {
//         setError('Nie udało się pobrać szablonów uprawnień.');
//       }
//     } catch {
//       setError('Nie udało się nadać uprawnień.');
//     } finally {
//       setLoading(false);
//     }
//   };

  return {
    userPermissions,
    setUserPermissions,
    loading,
    error,
    savePermissions,
    // assignDefaultPermissions,
  };
};
