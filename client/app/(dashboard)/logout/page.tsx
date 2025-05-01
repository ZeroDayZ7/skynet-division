"use client";

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { Button } from '@/components/ui/button';
import { Loader2, LogOut } from 'lucide-react';
import { useAuth } from '@/context/AuthContext';
import { fetchClient } from '@/lib/fetchClient';

export default function LogoutPage() {
  const [isLoggingOut, setIsLoggingOut] = useState(false);
  const router = useRouter();
  const { logout } = useAuth();

  const handleLogout = async () => {
    setIsLoggingOut(true);
    try {
      await fetchClient('/api/auth/logout', { method: 'POST' });
      logout();
      router.push('/');
    } catch (error) {
      console.error('Logout failed:', error);
      setIsLoggingOut(false);
    }
  };

  return (
    <div className="flex w-full h-screen flex-col items-center justify-center gap-8">
      <div className="max-w-md space-y-4 text-center">
        <LogOut className="mx-auto h-12 w-12" />
        <h1 className="text-2xl font-bold">Wylogować się?</h1>
        <p className="text-muted-foreground">
          Czy na pewno chcesz się wylogować z konta?
        </p>
      </div>
      <div className="flex gap-4">
        <Button
          variant="outline"
          onClick={() => router.back()}
          disabled={isLoggingOut}
        >
          Anuluj
        </Button>
        <Button
          variant="destructive"
          onClick={handleLogout}
          disabled={isLoggingOut}
        >
          {isLoggingOut ? (
            <>
              <Loader2 className="mr-2 h-4 w-4 animate-spin" />
              Wylogowywanie...
            </>
          ) : (
            <>
              <LogOut className="mr-2 h-4 w-4" />
              Wyloguj
            </>
          )}
        </Button>
      </div>
    </div>
  );
}