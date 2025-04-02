"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import {
  FaIdCard,
  FaNewspaper,
  FaLanguage,
  FaShoppingCart,
  FaTools,
  FaBriefcase,
  FaSpinner,
} from "react-icons/fa";

const menuItems = [
  { icon: FaIdCard, link: "/electronic-documents", label: "eDokumenty", enabled: true },
  { icon: FaNewspaper, link: "/citizens-projects", label: "Projekty Obywatelskie", enabled: true },
  { icon: FaLanguage, link: "/language-trainer", label: "Trener Języka", enabled: true },
  { icon: FaBriefcase, link: "/jobs-board", label: "Praca", enabled: true },
  { icon: FaShoppingCart, link: "/market", label: "Market", enabled: true },
  { icon: FaTools, link: "/settings", label: "Ustawienia", enabled: true },
];

export default function MenuGrid() {
  const router = useRouter();
  const [loadingIndex, setLoadingIndex] = useState<number | null>(null); // Śledzi, który przycisk się ładuje

  const handleNavigation = (link: string, index: number) => {
    setLoadingIndex(index); // Ustawiamy indeks ładowanego przycisku
    router.push(link);
  };

  return (
    <div className="grid grid-cols-3 gap-4 flex-1 p-2">
      {menuItems.map(({ icon: Icon, link, label, enabled }, index) => (
        <button
          key={index}
          onClick={() => enabled && handleNavigation(link, index)}
          className={`flex flex-col items-center justify-center p-4 bg-gray-200 rounded-xl shadow-md hover:bg-gray-300 transition ${
            enabled ? "" : "opacity-50 cursor-not-allowed"
          }`}
          disabled={!enabled || loadingIndex === index} // Wyłączamy przycisk podczas ładowania
        >
          {loadingIndex === index ? (
            <FaSpinner className="text-4xl text-gray-700 animate-spin" />
          ) : (
            <Icon className="text-4xl text-gray-700" />
          )}
          <span className="text-sm text-gray-800 mt-2">{label}</span>
        </button>
      ))}
    </div>
  );
}