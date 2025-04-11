"use client";

import { useRouter } from "next/navigation";
import { FaHome } from "react-icons/fa"; // Ikona domu
import { Button } from "./button";

// Komponent przycisku menu głównego / dashboardu
export default function MainMenuButton() {
  const router = useRouter(); // Hook do nawigacji w Next.js

  const goToDashboard = () => {
    router.push("/dashboard"); // Przekieruj użytkownika na stronę dashboardu
  };

  return (
    <Button
      variant={'btn_1'}
      onClick={goToDashboard}
    >
      <FaHome />
      Menu główne
    </Button>
  );
}