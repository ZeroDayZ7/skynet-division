"use client";

import { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import LogoutModal from "../../components/LogoutModal";
import { FaSignOutAlt, FaCogs, FaUser, FaBell, FaChartBar, FaEnvelope, FaMap, FaCamera, FaMusic, FaVideo, FaShoppingCart, FaGamepad, FaBook, FaCalendar, FaFileAlt, FaCloud, FaShieldAlt, FaWrench, FaLightbulb, FaTools, FaSpinner } from "react-icons/fa";

export default function Dashboard() {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const router = useRouter();

  const menuItems = [
    { icon: FaUser, link: "/profile" },
    { icon: FaBell, link: "/notifications" },
    { icon: FaChartBar, link: "/stats" },
    { icon: FaEnvelope, link: "/messages" },
    { icon: FaMap, link: "/maps" },
    { icon: FaCamera, link: "/camera" },
    { icon: FaMusic, link: "/music" },
    { icon: FaVideo, link: "/videos" },
    { icon: FaShoppingCart, link: "/shop" },
    { icon: FaGamepad, link: "/games" },
    { icon: FaBook, link: "/library" },
    { icon: FaCalendar, link: "/calendar" },
    { icon: FaFileAlt, link: "/documents" },
    { icon: FaCloud, link: "/cloud" },
    { icon: FaShieldAlt, link: "/security" },
    { icon: FaWrench, link: "/tools" },
    { icon: FaLightbulb, link: "/ideas" },
    { icon: FaTools, link: "/settings/tools" }
  ];

  // Obsługa kliknięcia w link – pokazuje loader i przekierowuje
  const handleNavigation = (link: string) => {
    setIsLoading(true);
    router.push(link);
  };

  return (
    <main className="flex flex-col min-h-screen p-4">
      {/* Górny pasek z przyciskami */}
      <div className="flex justify-end gap-4 p-4">
        <button onClick={() => handleNavigation("/settings")} className="text-gray-600 hover:text-blue-500 text-2xl">
          <FaCogs />
        </button>
        <button onClick={() => setIsModalOpen(true)} className="text-gray-600 hover:text-red-500 text-2xl">
          <FaSignOutAlt />
        </button>
      </div>

      {/* Ekran ładowania */}
      {isLoading ? (
        <div className="flex flex-1 items-center justify-center">
          <FaSpinner className="text-6xl text-gray-600 animate-spin" />
        </div>
      ) : (
        // Siatka ikon z linkami
        <div className="grid grid-cols-4 gap-4 flex-1 p-4">
          {menuItems.map(({ icon: Icon, link }, index) => (
            <button
              key={index}
              onClick={() => handleNavigation(link)}
              className="flex items-center justify-center p-4 bg-gray-200 rounded-xl shadow-md hover:bg-gray-300 transition"
            >
              <Icon className="text-4xl text-gray-700" />
            </button>
          ))}
        </div>
      )}

      {/* Modal wylogowania */}
      <LogoutModal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)} />
    </main>
  );
}
