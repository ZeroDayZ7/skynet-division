"use client";

import LoginModal from "./LoginModal";

export default function TopBar() {
  return (
    <nav className="w-full bg-blue-500 p-4 flex justify-between items-center">
      <h1 className="text-white text-xl font-bold">SKNet</h1>
      <LoginModal /> {/* Tutaj przycisk otwierający modal */}
    </nav>
  );
}
