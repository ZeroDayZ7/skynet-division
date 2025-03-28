import { useState } from "react";

// Definicja typu dla props
interface LogoutModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export default function LogoutModal({ isOpen, onClose }: LogoutModalProps) {
  const [loading, setLoading] = useState(false);

  const handleLogout = async () => {
    // const { publicRuntimeConfig } = getConfig();
    // const apiUrl = publicRuntimeConfig.apiUrl; // Pobranie wartości apiUrl

    const apiUrl = process.env.NEXT_PUBLIC_API_SERV;

    setLoading(true);

    console.log(`Attempting to log out from: ${apiUrl}/api/logout`);

    setTimeout(async () => {
      try {
        const response = await fetch(`${apiUrl}/api/logout`, {
          method: "POST",
          credentials: "include",
        });
        if (response.ok) {
          window.location.href = "/";
        } else {
          console.error("Logout failed");
        }
      } catch (error) {
        console.error("Error logging out", error);
      } finally {
        setLoading(false);
      }
    }, 1000); // Opóźnienie 1000 ms (1 sekunda)
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
