"use client";
import MenuGrid from "@/components/dashboard/MenuGrid";
import PointsDisplay from "@/components/dashboard/PointsDisplay";
import HeaderActions from "@/components/dashboard/HeaderActions";

export default function Dashboard() {

  return (
    <div className="flex flex-col min-h-screen p-2">
        <div>
          <div className="flex justify-between items-center p-4">
            <PointsDisplay />
            <HeaderActions />
          </div>
          <MenuGrid />
        </div>
    </div>
  );
}