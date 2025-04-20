'use client';

import { useEffect, useState } from 'react';
import Link from 'next/link';
import { FaUserShield } from 'react-icons/fa';

interface UserPermissions {
  role: string;
  permissions: string[];
}

export default function AdminPanelButton() {
  const [permissions, setPermissions] = useState<UserPermissions | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchPermissions() {
      try {
        const res = await fetch('/api/users/permissions', {
          method: 'GET',
          headers: {
            'Content-Type': 'application/json',
          },
        });

        if (!res.ok) return;

        const json = await res.json();
        if (json.success && json.data) {
          setPermissions(json.data);
        }
      } catch (error) {
        console.error('Błąd pobierania uprawnień:', error);
      } finally {
        setLoading(false);
      }
    }

    fetchPermissions();
  }, []);

  if (loading || !permissions || permissions.role !== 'admin') {
    return null;
  }

  return (
    <Link
      href="/admin"
      className="flex flex-col items-center justify-center p-4 rounded shadow-md bg-card border dark:text-green-500 dark:hover:text-green-300 transition-colors duration-200 dark:hover:bg-muted/80"
    >
      <FaUserShield className="text-4xl mb-2" />
      <span className="text-sm">Panel Administracyjny</span>
    </Link>
  );
}
