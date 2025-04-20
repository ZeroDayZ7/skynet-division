// app/user-management/page.tsx
// 'use client'
import { UserSearch } from './components/UserSearch';
import { UserTable } from './components/UserTable';
import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/card';
import { searchUsers } from './actions/searchUsers';
import { Suspense } from 'react';

interface Props {
  searchParams: Promise<{ email?: string; id?: string; role?: string }>;
}

export default async function UserManagementPage({ searchParams }: Props) {
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
          {hasSearchCriteria && <UserTable users={users} noResults={users.length === 0} />}
        </CardContent>
      </Card>
    </div>
  );
}