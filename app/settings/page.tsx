"use client";

import { useRouter } from "next/navigation";
import { FaArrowLeft } from "react-icons/fa"; // Ikona strzałki w lewo

export default function Settings() {
  const router = useRouter(); // Hook do nawigacji w Next.js

  const goBack = () => {
    router.back(); // Cofnij użytkownika do poprzedniej strony
  };

  return (
    <div className="p-6">
      {/* Ikona cofania */}
      <button 
        onClick={goBack} 
        className="text-blue-500 flex items-center gap-2 mb-4"
      >
        <FaArrowLeft />
        Cofnij
      </button>

      {/* Zawartość ustawień */}
      <div>SETTINGS</div>
    </div>
  );
}
