'use client';

import { useParams } from 'next/navigation';
import Link from 'next/link';
import { Button } from '@/components/ui/button';

const accountItems = [
  { label: 'Informacje o koncie', path: 'info' },
  { label: 'Zmień hasło', path: 'change-password' },
  { label: 'Zarządzaj logowaniami', path: 'logins' },
  { label: 'Usuń konto', path: 'delete' },
  { label: 'Połączone aplikacje', path: 'apps' },
];

const monetizationItems = [
  { label: 'Ustawienia reklam', path: 'ads' },
  { label: 'Przychody', path: 'earnings' },
];

const premiumItems = [
  { label: 'Kup Premium', path: 'buy' },
  { label: 'Zarządzaj subskrypcją', path: 'manage' },
];

const submenuMap: Record<string, { label: string; path: string }[]> = {
  account: accountItems,
  monetization: monetizationItems,
  premium: premiumItems,
};

export default function SubmenuPage() {
  const params = useParams();
  const submenu = params.submenu as string;

  const submenuItems = submenuMap[submenu] || [];

  return (
    <>
      {submenuItems.length > 0 ? (
        <ul className="space-y-2">
          {submenuItems.map((item) => (
            <li key={item.path}>
              <Link
                href={`/settings/${submenu}/${item.path}`}
                className="block px-4 py-2 rounded-lg hover:bg-gray-700 transition"
              >
                {item.label}
              </Link>
            </li>
          ))}
        </ul>
      ) : (
        <p>Brak dodatkowych opcji.</p>
      )}
    </>
  );
}
