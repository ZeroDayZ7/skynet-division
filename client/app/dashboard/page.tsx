// 'use client';
import { headers } from 'next/headers';
import MenuGrid from '@/components/dashboard/MenuGrid';
import PointsDisplay from '@/components/dashboard/PointsDisplay';
import HeaderActions from '@/components/dashboard/HeaderActions';

export default async function Dashboard() {
  const headersData = await headers();
  const role = headersData.get("x-user-role") as "admin" | "user" | null;
  console.log(`Dashboard role: ${role}`);

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
