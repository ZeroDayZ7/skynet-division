"use client";

import { useRouter } from "next/navigation";
import { FaHome } from "react-icons/fa"; // Ikona domu

// Komponent przycisku menu głównego / dashboardu
export default function MainMenuButton() {
  const router = useRouter(); // Hook do nawigacji w Next.js

  const goToDashboard = () => {
    router.push("/dashboard"); // Przekieruj użytkownika na stronę dashboardu
  };

  return (
    <button
      onClick={goToDashboard}
      className="text-blue-500 flex items-center gap-2 cursor-pointer"
    >
      <FaHome />
      Menu główne
    </button>
  );
}