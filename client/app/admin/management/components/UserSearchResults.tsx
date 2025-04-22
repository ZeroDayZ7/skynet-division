'use client';

import { useState, useMemo } from 'react';
import { Button } from '@/components/ui/button';
import { Table, TableBody, TableCell, TableRow } from '@/components/ui/table';
import { User } from '../types/user';
import { usePermissions } from '@/context/PermissionsContext';
import { UserTableHeader } from './UserTableHeader';
import { UserRow } from './UserRow';
import { UserActionsManager } from './UserActionsManager';
import { actionConfig } from '../hooks/actionConfig';

export const UserSearchResults: React.FC<{ users: User[] }> = ({ users }) => {
  const { hasPermissionEnabled } = usePermissions();
  const [selectedUserIds, setSelectedUserIds] = useState<number[]>([]);
  const [selectedAction, setSelectedAction] = useState<string | null>(null);

  // Funkcja do przełączania zaznaczenia użytkownika
  const toggleSelection = (userId: number) => {
    setSelectedUserIds((prev) =>
      prev.includes(userId)
        ? prev.filter((id) => id !== userId)
        : [...prev, userId]
    );
  };

  // Wybierz akcje na podstawie uprawnień i stanu użytkowników
  const selectedUsers = users.filter((user) => selectedUserIds.includes(user.id));
  const actions = useMemo(() => {
    const areAllBlocked = selectedUsers.every((user) => user.userBlock);
    return actionConfig
      .filter((config) => hasPermissionEnabled(config.permissionKey))
      .map((config) => ({
        ...config,
        label:
          config.action === 'block' && areAllBlocked
            ? 'Odblokuj'
            : typeof config.label === 'function'
            ? config.label(selectedUsers[0])
            : config.label,
      }));
  }, [selectedUsers, hasPermissionEnabled]);

  // Funkcja do obsługi kliknięcia akcji
  const handleAction = (action: string) => {
    setSelectedAction(action);
  };

  // Zamknij dialog
  const closeDialog = () => {
    setSelectedAction(null);
    setSelectedUserIds([]); // Opcjonalnie: wyczyść zaznaczenie po akcji
  };

  return (
    <>
      {selectedUserIds.length > 0 && (
        <div className="flex gap-2 mb-4">
          {actions.map((action) => (
            <Button
              key={action.action}
              onClick={() => handleAction(action.action)}
              variant={action.destructive ? 'destructive' : 'outline'}
            >
              {action.label}
            </Button>
          ))}
        </div>
      )}

      <Table>
        <UserTableHeader />
        <TableBody>
          {users.length === 0 ? (
            <TableRow>
              <TableCell colSpan={8} className="text-center">
                Brak wyników
              </TableCell>
            </TableRow>
          ) : (
            users.map((user) => (
              <UserRow
                key={user.id}
                user={user}
                isSelected={selectedUserIds.includes(user.id)}
                toggleSelection={toggleSelection}
              />
            ))
          )}
        </TableBody>
      </Table>

      {/* Zarządzanie dialogami akcji */}
      {selectedAction && (
        <UserActionsManager
          selectedUsers={selectedUsers}
          action={selectedAction}
          onClose={closeDialog}
        />
      )}
    </>
  );
};