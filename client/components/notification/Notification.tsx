"use client";

import { memo } from "react";
import { FaBell } from "react-icons/fa";
import { useAuth } from "@/context/auth-context";

const Notifications = () => {
  const { user } = useAuth();
  const count = user?.notifications ?? 0;
  const displayCount = count > 9 ? "9+" : count;

  return (
    <div className="relative inline-block">
      <FaBell
        className="text-gray-600 hover:text-blue-500 text-2xl cursor-pointer transition-colors duration-200"
        aria-label="Notifications"
      />
      {count > 0 && (
        <span className="absolute -top-2 -right-2 bg-red-500 text-white text-xs font-bold rounded-full w-5 h-5 flex items-center justify-center select-none">
          {displayCount}
        </span>
      )}
    </div>
  );
};

export default memo(Notifications);
