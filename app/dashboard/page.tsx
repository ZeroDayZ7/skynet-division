"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import LogoutModal from "../../components/LogoutModal";
import Notifications from "@/components/notification/Notification";
import {
  FaSignOutAlt, FaNewspaper, FaLanguage, FaIdCard,
  FaShoppingCart, FaGamepad, FaBook, FaCalendar, FaFileAlt, FaCloud, FaShieldAlt,
  FaLightbulb, FaTools, FaSpinner
} from "react-icons/fa";


export default function Dashboard() {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const router = useRouter();

  // Tablica menuItems z ustawionymi enabled/disabled na stałe
  const [menuItems] = useState([
    { icon: FaIdCard, link: "/electronic-documents", label: "eDokumenty", enabled: true },
    { icon: FaNewspaper, link: "/citizens-projects", label: "Projekty Obywatelskie", enabled: true }, // Disabled
    { icon: FaLanguage , link: "/language-trainer", label: "Trener Języka", enabled: true },
    { icon: FaShoppingCart, link: "/shop", label: "Sklep", enabled: false }, // Disabled
    { icon: FaGamepad, link: "/games", label: "Gry", enabled: false },
    { icon: FaBook, link: "/library", label: "Biblioteka", enabled: false },
    { icon: FaCalendar, link: "/calendar", label: "Kalendarz", enabled: false },
    { icon: FaFileAlt, link: "/documents", label: "Dokumenty", enabled: false },
    { icon: FaCloud, link: "/cloud", label: "Chmura", enabled: false },
    { icon: FaShieldAlt, link: "/security", label: "Bezpieczeństwo", enabled: false },
    { icon: FaLightbulb, link: "/ideas", label: "Pomysły", enabled: false },
    { icon: FaTools, link: "/settings", label: "Ustawienia", enabled: true }
  ]);

  const handleNavigation = (link: string) => {
    setIsLoading(true);
    router.push(link);
  };

  return (

    <main className="flex flex-col min-h-screen p-4">
      {/* Górny pasek z przyciskami */}
      <div className="flex justify-end gap-4 p-4">
        <button onClick={() => handleNavigation("/notifications")} className="text-gray-600 hover:text-blue-500 text-2xl">
          <Notifications />
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
        // Siatka ikon z opisami
        <div className="grid grid-cols-3 gap-4 flex-1 p-2">
          {menuItems.map(({ icon: Icon, link, label, enabled }, index) => (
            <button
              key={index}
              onClick={() => handleNavigation(link)}
              className={`flex flex-col items-center justify-center p-4 bg-gray-200 rounded-xl shadow-md hover:bg-gray-300 transition ${
                enabled ? '' : 'opacity-50 cursor-not-allowed'
              }`}
              disabled={!enabled} // Wyłącza przycisk, jeśli "enabled" jest false
            >
              <Icon className="text-4xl text-gray-700" />
              <span className="text-sm text-gray-800 mt-2">{label}</span>
            </button>
          ))}
        </div>
      )}

      {/* Modal wylogowania */}
      <LogoutModal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)} />
    </main>
  );
}
