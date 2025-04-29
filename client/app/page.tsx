// app/page.tsx
import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { AppBrand } from '@/components/auth/AppBrand';

export default function HomePage() {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center space-y-2 px-4 py-4">
      <AppBrand />
      <p className="text-center text-gray-600 dark:text-gray-300 max-w-md">
        Zaloguj się lub zarejestruj, aby zacząć.
      </p>
      <div className="flex space-x-4">
        <Button asChild>
          <Link href="/login">Zaloguj się</Link>
        </Button>
        <Button asChild variant="outline">
          <Link href="/register">Zarejestruj się</Link>
        </Button>
      </div>
    </div>
  );
}