'use client';
import MenuGrid from '@/components/dashboard/MenuGrid';
import PointsDisplay from '@/components/dashboard/PointsDisplay';
import HeaderActions from '@/components/dashboard/HeaderActions';

export default function Dashboard() {
  return (
    <div className="flex min-h-screen flex-col p-2">
      <div>
        <div className="flex items-center justify-between p-4">
          <PointsDisplay />
          <HeaderActions />
        </div>
        <MenuGrid />
      </div>
    </div>
  );
}
