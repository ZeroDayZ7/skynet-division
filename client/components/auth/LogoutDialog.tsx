'use client';

import { useState } from 'react';
import { useAuth } from '@/context/AuthContext';
import { useRouter } from 'next/navigation';
import { toast } from 'sonner';
import { LogOut } from 'lucide-react';
import {
  AlertDialog,
  AlertDialogContent,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogCancel,
  AlertDialogAction,
} from '@/components/ui/alert-dialog';
import { logout } from '@/lib/api/auth';

interface LogoutDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

export default function LogoutDialog({ open, onOpenChange }: LogoutDialogProps) {
  const [loading, setLoading] = useState(false);
  const { logout: authLogout } = useAuth();
  const router = useRouter();

  const handleLogout = async () => {
    setLoading(true);
    try {
      await logout();
      authLogout();
      toast.success('Wylogowano pomyślnie');
      router.replace('/');
    } catch (error) {
      console.error('[LogoutDialog] Błąd przy wylogowywaniu:', error);
      toast.error('Błąd podczas wylogowywania');
    } finally {
      setLoading(false);
    }
  };

  return (
    <AlertDialog open={open} onOpenChange={onOpenChange}>
      <AlertDialogContent>
        <AlertDialogHeader>
          <AlertDialogTitle className="flex items-center gap-2">
            <LogOut className="h-5 w-5" />
            Czy na pewno chcesz się wylogować?
          </AlertDialogTitle>
          <AlertDialogDescription>
            Zostaniesz wylogowany z aplikacji i przekierowany na stronę główną.
          </AlertDialogDescription>
        </AlertDialogHeader>
        <AlertDialogFooter>
          <AlertDialogCancel disabled={loading}>Anuluj</AlertDialogCancel>
          <AlertDialogAction
            onClick={handleLogout}
            disabled={loading}
            className="text-grey-500 bg-red-800 hover:bg-red-700"
          >
            {loading ? 'Wylogowywanie...' : 'Wyloguj się'}
          </AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
}
