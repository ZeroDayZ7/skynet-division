'use client';

import Link from 'next/link';

const settingsItems = [
  { label: 'Twoje konto', path: 'account' },            // → ma submenu
  { label: 'Bezpieczeństwo', path: 'security' },        // → od razu panel
  // { label: 'Prywatność i bezpieczeństwo', path: 'privacy' }, // → od razu panel
  // { label: 'Powiadomienia', path: 'notifications' },
  // { label: 'Dostępność, wyświetlanie i języki', path: 'accessibility' },
  // { label: 'Dodatkowe materiały', path: 'resources' },
  // { label: 'Centrum Pomocy', path: 'help' },
];

export default function SettingsPage() {
  return (
    <div className="text-white p-4">
      <h1 className="text-xl font-bold mb-4">Ustawienia</h1>
      <ul className="space-y-2">
        {settingsItems.map((item) => (
          <li key={item.path}>
            <Link
              href={`/settings/${item.path}`}
              className="block px-4 py-2 rounded-lg hover:bg-gray-700 transition"
            >
              {item.label}
            </Link>
          </li>
        ))}
      </ul>
    </div>
  );
}
