"use client";

import { useState } from "react";
import { FaExclamationTriangle, FaCheckCircle, FaInfoCircle, FaStar } from "react-icons/fa";
import BackButton from "@/components/ui/BackButton";

export default function NotificationsList() {
  const allNotifications = [
    { id: 1, type: "success", message: "Twój projekt został zaakceptowany!", icon: FaCheckCircle },
    { id: 2, type: "warning", message: "Twój projekt wymaga uzupełnienia informacji.", icon: FaInfoCircle },
    { id: 3, type: "error", message: "Projekt nie przeszedł weryfikacji.", icon: FaExclamationTriangle },
    { id: 4, type: "success", message: "Twoje głosowanie zostało zarejestrowane.", icon: FaCheckCircle },
    { id: 5, type: "warning", message: "Ważne! Zbliżają się wybory samorządowe - pamiętaj o głosowaniu!", icon: FaExclamationTriangle },
    { id: 6, type: "error", message: "Problem z przesłaniem formularza, spróbuj ponownie.", icon: FaExclamationTriangle },
    { id: 7, type: "warning", message: "Twoja propozycja budżetowa została przesunięta do dalszej analizy.", icon: FaInfoCircle },
    { id: 8, type: "success", message: "Twój projekt uzyskał 100 nowych głosów!", icon: FaCheckCircle },
    { id: 9, type: "error", message: "Twoje zgłoszenie zostało odrzucone.", icon: FaExclamationTriangle },
    { id: 10, type: "warning", message: "Nowa aktualizacja dostępna do pobrania.", icon: FaInfoCircle },
  ];

  const [notifications, setNotifications] = useState(allNotifications.slice(0, 5));
  const [visibleCount, setVisibleCount] = useState(5);

  const getBgColor = (type) => {
    switch (type) {
      case "success": return "bg-green-100 text-green-700 border-green-500";
      case "warning": return "bg-yellow-100 text-yellow-700 border-yellow-500";
      case "error": return "bg-red-100 text-red-700 border-red-500";
      default: return "bg-gray-100 text-gray-700 border-gray-500";
    }
  };

  const loadMoreNotifications = () => {
    const newCount = visibleCount + 5;
    setNotifications(allNotifications.slice(0, newCount));
    setVisibleCount(newCount);
  };

  return (
    <div className="max-w-lg mx-auto p-4 bg-white">
      <BackButton />
      <h2 className="text-xl font-semibold mb-4">Powiadomienia</h2>
      <ul className="space-y-3">
        {notifications.map(({ id, type, message, icon: Icon }) => (
          <li key={id} className={`flex justify-between items-center gap-3 p-3 border-l-4 rounded ${getBgColor(type)}`}>
            <div className="flex items-center gap-3">
              <Icon className="text-xl" />
              <span>{message}</span>
            </div>
            <span className="text-xs text-red-600 flex items-center gap-1"><FaStar /> Nowe</span>
          </li>
        ))}
      </ul>
      {visibleCount < allNotifications.length && (
        <button onClick={loadMoreNotifications} className="mt-4 w-full p-2 bg-blue-500 text-white rounded hover:bg-blue-600 transition">
          Pokaż więcej
        </button>
      )}
    </div>
  );
}
