'use client';

import AdminPanelButton from './AdminPanelButton';

export default function DashboardPage() {
  return (
    <div>
      <h1 className="text-xl">Witaj w panelu!</h1>

      {/* Kilka przycisków z clienta */}
      <button>Moje dane</button><br />
      <button>Wiadomości</button><br />
      <button>Ustawienia</button><br />

      {/* SSR-owy przycisk do panelu admina */}
      <AdminPanelButton />
    </div>
  );
}
