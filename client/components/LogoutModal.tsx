import { useState } from "react";
import { logoutUser } from "@/services/auth.service";
import { useAuth } from "@/context/auth-context"; // Import kontekstu
import { useRouter } from "next/navigation";

interface LogoutModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export default function LogoutModal({ isOpen, onClose }: LogoutModalProps) {
  const [loading, setLoading] = useState(false);
  const { logout } = useAuth(); // Pobranie funkcji wylogowania z kontekstu
  const router = useRouter();

  const handleLogout = async () => {
    setLoading(true);
    try {
      await logoutUser(); // Wylogowanie na backendzie
      logout(); // Wyczyść stan użytkownika w kontekście
      router.replace("/login");
      // window.location.replace("/login");
      // window.location.href = "/login";
    } catch (error) {
      console.error("Error during logout process:", error);
    } finally {
      setLoading(false);
      onClose(); // Zamknięcie modalu po zakończeniu procesu
    }
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
      <div className="bg-white p-6 rounded-lg shadow-lg">
        <h2 className="text-xl font-bold mb-4">
          Czy na pewno chcesz się wylogować?
        </h2>
        <div className="flex justify-between">
          <button onClick={onClose} className="px-4 py-2 bg-gray-300 rounded">
            Anuluj
          </button>
          <button
            onClick={handleLogout}
            className="px-4 py-2 bg-red-500 text-white rounded"
            disabled={loading}
          >
            {loading ? "Wylogowywanie..." : "Wyloguj"}
          </button>
        </div>
      </div>
    </div>
  );
}
