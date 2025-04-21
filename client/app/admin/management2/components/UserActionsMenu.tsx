// app/user-management/components/UserActionsMenu.tsx
'use client';

import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover';
import { MoreVertical } from 'lucide-react';
import { User } from '../types/user';
import { EditPermissionsDialog } from './EditPermissionsModal';

interface UserActionsMenuProps {
  user: User;
  onEditPermissions: (userId: string) => void; 
}

export const UserActionsMenu: React.FC<UserActionsMenuProps> = ({ user }) => {
  const [isModalOpen, setIsModalOpen] = useState(false);

  const handleEditPermissions = () => {
    setIsModalOpen(true); // Otwórz dialog
  };

  const handleBlockUser = (userId: number) => {
    console.log(`Blokowanie użytkownika ${userId}`);
    // Logika blokowania użytkownika
  };

  const actions = [
    { label: 'Edytuj uprawnienia', onClick: handleEditPermissions },
    { label: 'Zablokuj konto', onClick: () => handleBlockUser(user.id) },
  ];

  return (
    <Popover>
      <PopoverTrigger asChild>
        <Button variant="ghost" size="icon">
          <MoreVertical className="h-4 w-4" />
        </Button>
      </PopoverTrigger>
      <PopoverContent className="w-48">
        {actions.map((action) => (
          <Button
            key={action.label}
            variant="ghost"
            className="w-full justify-start"
            onClick={action.onClick}
          >
            {action.label}
          </Button>
        ))}
      </PopoverContent>

      {/* Dialog do edytowania uprawnień */}
      <EditPermissionsDialog
        isOpen={isModalOpen}
        userId={user.id}
        onClose={() => setIsModalOpen(false)}
      />
    </Popover>
  );
};
