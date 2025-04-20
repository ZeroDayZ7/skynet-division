'use client';

import DashboardMenu from '@/components/dashboard/DashboardMenu';
import PointsDisplay from '@/components/dashboard/PointsDisplay';
import HeaderActions from '@/components/dashboard/HeaderActions';
import AdminPanelButton from '@/components/dashboard/AdminPanelButton';


export default function DashboardPage() {
  return (
    <div className="flex min-h-screen flex-col p-2">
      <div className="flex items-center justify-between p-4">
        <PointsDisplay />
        <HeaderActions />
      </div>
      <main className='flex-1'>
        <DashboardMenu />
        <AdminPanelButton />
      </main>
    </div>
  );
}