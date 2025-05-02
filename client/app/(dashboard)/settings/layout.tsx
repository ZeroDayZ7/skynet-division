'use client';

import { Bell, Languages, Palette, Settings, Shield } from 'lucide-react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { cn } from '@/lib/utils';

const items = [
  { label: 'Ogólne', href: '/settings/general', icon: Settings },
  { label: 'Wygląd', href: '/settings/appearance', icon: Palette },
  { label: 'Język', href: '/settings/language', icon: Languages },
  { label: 'Powiadomienia', href: '/settings/notifications', icon: Bell },
  { label: 'Bezpieczeństwo', href: '/settings/security', icon: Shield },
];

export default function SettingsLayout({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();

  return (
    <div className="flex flex-col md:flex-row">
      <aside className="w-full md:w-60">
        <nav className="space-y-1">
          {items.map(({ label, href, icon: Icon }) => (
            <Link
              key={href}
              href={href}
              className={cn(
                'flex items-center gap-2 rounded-md px-3 py-2 text-sm font-medium transition-colors',
                pathname === href
                  ? 'bg-muted text-primary'
                  : 'text-muted-foreground hover:bg-muted hover:text-primary'
              )}
            >
              <Icon className="h-4 w-4" />
              <span>{label}</span>
            </Link>
          ))}
        </nav>
      </aside>
      <main className="flex-1 p-2">{children}</main>
    </div>
  );
}
