"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { FaSignOutAlt } from "react-icons/fa";
import Notifications from "@/components/notification/Notification";
import LogoutModal from "@/components/LogoutModal";

export default function HeaderActions() {
  const router = useRouter();
  const [isModalOpen, setIsModalOpen] = useState(false);

  const handleNavigation = () => {
    router.push("/notifications");
  };

  const handleLogout = () => {
    setIsModalOpen(true);
  };

  return (
    <>
      <div className="flex gap-4">
        <button
          onClick={handleNavigation}
          className="text-gray-600 hover:text-blue-500 text-2xl"
        >
          <Notifications />
        </button>
        <button
          onClick={handleLogout}
          className="text-gray-600 hover:text-red-500 text-2xl"
        >
          <FaSignOutAlt />
        </button>
      </div>
      {isModalOpen && (
        <LogoutModal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)} />
      )}
    </>
  );
}