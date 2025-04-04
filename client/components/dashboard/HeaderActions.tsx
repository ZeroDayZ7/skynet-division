"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { FaSignOutAlt } from "react-icons/fa";
import Notifications from "@/components/notification/Notification";
import LogoutModal from "@/components/LogoutModal";

import { FaSpinner } from "react-icons/fa";

export default function HeaderActions() {
  const router = useRouter();
  const [isModalOpen, setIsModalOpen] = useState<boolean>(false);
  const [isLoading, setIsLoading] = useState<boolean>(false);

  const handleNavigation = () => {
    setIsLoading(true);
    router.push("/notifications");
  };

  const handleLogout = () => {
    setIsModalOpen(true);
  };

  return (
    <>
      <div className="flex gap-4">
        {isLoading ? (
          <div className="flex flex-1 items-center justify-center">
            <FaSpinner className="text-xl text-gray-600 animate-spin" />
          </div>
        ) : (
          <button
            onClick={handleNavigation}
            className="text-gray-600 hover:text-blue-500 text-2xl"
          >
            <Notifications />
          </button>
        )}
        <button
          onClick={handleLogout}
          className="text-gray-600 hover:text-red-500 text-2xl"
        >
          <FaSignOutAlt />
        </button>
      </div>
      {isModalOpen && (
        <LogoutModal
          isOpen={isModalOpen}
          onClose={() => setIsModalOpen(false)}
        />
      )}
    </>
  );
}
