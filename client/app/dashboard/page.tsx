import { headers } from 'next/headers';
import DashboardMenu from '@/components/dashboard/DashboardMenu';
import PointsDisplay from '@/components/dashboard/PointsDisplay';
import HeaderActions from '@/components/dashboard/HeaderActions';

export default async function DashboardPage() {
  const hdrs = await headers();
  const role = hdrs.get('x-user-role') as 'admin' | 'user' | null;
  const showAdmin = role === 'admin';

  return (
    <div className="flex min-h-screen flex-col p-2">
      <div className="flex items-center justify-between p-4">
        <PointsDisplay />
        <HeaderActions />
      </div>
      <DashboardMenu showAdmin={showAdmin} />
    </div>
  );
}