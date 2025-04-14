// app/page.tsx
import Image from 'next/image';
import Link from 'next/link';
import { Button } from '@/components/ui/button';

export default function HomePage() {
  return (
    <div className="mx-auto px-4 py-8 flex flex-col items-center space-y-6">
      <Image
        src="/images/logo.jpg"
        alt="Logo aplikacji"
        className="rounded-full"
        width={200}
        height={112}
        priority
      />
      <h1 className="mt-4 text-2xl font-bold text-gray-700 dark:text-gray-200">
        Aplikacja Obywatelska
      </h1>
      <p className="text-center text-gray-600 dark:text-gray-300 max-w-md">
        Zarządzaj swoimi sprawami obywatelskimi w jednym miejscu. Zaloguj się lub zarejestruj, aby
        zacząć.
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