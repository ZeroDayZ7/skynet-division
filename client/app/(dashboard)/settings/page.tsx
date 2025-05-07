'use client';

import Link from 'next/link';
import { useRouter } from 'next/navigation';

const settingsItems = [
  { label: 'Twoje konto', path: 'account' },
  { label: 'Monetyzacja', path: 'monetization' },
  { label: 'Premium', path: 'premium' },
  { label: 'Subskrypcje twórców treści', path: 'subscriptions' },
  { label: 'Bezpieczeństwo i dostęp do konta', path: 'security' },
  { label: 'Prywatność i bezpieczeństwo', path: 'privacy' },
  { label: 'Powiadomienia', path: 'notifications' },
  { label: 'Dostępność, wyświetlanie i języki', path: 'accessibility' },
  { label: 'Dodatkowe materiały', path: 'resources' },
  { label: 'Centrum Pomocy', path: 'help' },
];

export default function SettingsPage() {
  return (
    <div className="text-white p-4">
      <h1 className="text-xl font-bold mb-4">Ustawienia</h1>
      <input
        type="text"
        placeholder="Ustawienia wyszukiwania"
        className="w-full px-3 py-2 rounded-lg bg-gray-800 text-white mb-4"
      />
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
