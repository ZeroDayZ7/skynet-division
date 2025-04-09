"use client";

import LoginForm from "@/components/auth/LoginForm";
import Image from "next/image";

export default function LoginPage() {
  return (
    <div className="min-h-screen flex items-center justify-center p-4">
      <div className="w-full max-w-md rounded-lg shadow-lg p-6 dark:shadow-cyan-500/50">
        <div className="flex flex-col items-center mb-6">
          <Image
            src="/logo/logo.jpg"
            alt="Logo aplikacji"
            className="rounded-full"
            width={200}
            height={112}
            priority
          />
          <h1 className="text-2xl font-bold text-gray-800 mt-4 dark:text-white">
            Aplikacja Obywatelska
          </h1>
        </div>
        <LoginForm />
      </div>
    </div>
  );
}