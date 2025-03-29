"use client";

import { useState, useEffect } from "react";
import { FaBell } from "react-icons/fa";

export default function Notifications() {
  const [count, setCount] = useState<number>(0);

  useEffect(() => {
    // Symulacja danych powiadomień za pomocą tablicy
    const notifications = [
      { id: 1, message: "Nowa wiadomość!" },
      { id: 2, message: "Aktualizacja profilu." },
      { id: 3, message: "Przypomnienie o spotkaniu." },
      { id: 4, message: "Nowy komentarz." },
      { id: 5, message: "Zaproszenie do grupy." },
    ];

    // Losowa liczba powiadomień z tablicy
    // const randomCount = Math.floor(Math.random() * (notifications.length + 1));
    setCount(4);
  }, []);

  const displayCount = count > 9 ? "9+" : count;

  return (
    <div className="relative">
      <FaBell className="text-gray-600 hover:text-blue-500 text-2xl cursor-pointer" />
      {count > 0 && (
        <span className="absolute -top-2 -right-2 bg-red-500 text-white text-xs font-bold rounded-full w-5 h-4 flex items-center justify-center">
          {displayCount}
        </span>
      )}
    </div>
  );
}