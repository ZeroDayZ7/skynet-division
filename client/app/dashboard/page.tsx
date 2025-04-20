'use client';

import DashboardMenu from '@/app/dashboard/components/DashboardMenu';
import PointsDisplay from '@/app/dashboard/components/PointsDisplay';
import HeaderActions from '@/app/dashboard/components/HeaderActions';



export default function DashboardPage() {
  return (
    <div className="flex min-h-screen flex-col p-2">
      <div className="flex items-center justify-between p-4">
        <PointsDisplay />
        <HeaderActions />
      </div>
      <main className='flex-1'>
        <DashboardMenu />
      </main>
    </div>
  );
}