'use client';

import LoginForm from '@/components/auth/LoginForm';
import Image from 'next/image';

export default function LoginPage() {
  return (
    <div className="flex min-h-screen items-center justify-center p-4">
      <div className="w-full max-w-md rounded-lg p-6 shadow-lg">
        <div className="mb-6 flex flex-col items-center">
          <Image src="/images/logo.jpg" alt="Logo aplikacji" className="rounded-full" width={200} height={112} priority />
          <h1 className="mt-4 text-2xl font-bold text-gray-700 dark:text-gray-200">Aplikacja Obywatelska</h1>
        </div>
        <LoginForm />
      </div>
    </div>
  );
}
