import { UserSearch } from './UserSearch';
import { UserTable } from './UserTable';
import { EditUserDialog } from './EditUserDialog';
import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/card';
import { searchUsers } from './actions';
import { Suspense } from 'react';
import { User } from './types';

interface Props {
  searchParams: Promise<{ email?: string; id?: string; role?: string }>;
  onOpenPermissionsDialog: (user: User) => void;  // Prop for opening the permissions dialog
}

export default async function UserManagementPage({ searchParams, onOpenPermissionsDialog }: Props) {
  const { email = '', id = '', role = '' } = await searchParams;
  const hasSearchCriteria = email || id || role;
  const users = hasSearchCriteria ? await searchUsers({ email, id, role }) : [];

  return (
    <div className="container mx-auto p-6">
      <Card>
        <CardHeader>
          <CardTitle>Zarządzanie użytkownikami</CardTitle>
        </CardHeader>
        <CardContent>
          <Suspense fallback={<div>Ładowanie formularza...</div>}>
            <UserSearch searchCriteria={{ email, id, role }} />
          </Suspense>
          {hasSearchCriteria && (
            <UserTable
              users={users}
              noResults={users.length === 0}
              onEditPermissions={onOpenPermissionsDialog}
            />
          )}
        </CardContent>
      </Card>
      <Suspense fallback={null}>
        <EditUserDialog />
      </Suspense>
    </div>
  );
}
