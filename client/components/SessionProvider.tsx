'use client';

import { useSession } from "../lib/useSession";
import { ReactNode, useEffect } from "react";
import { usePathname, useRouter } from "next/navigation";
import { FaSpinner } from "react-icons/fa";

export default function SessionProvider({ children }: { children: ReactNode }) {
  const { isAuthenticated } = useSession();
  const pathname = usePathname();
  const router = useRouter();

  useEffect(() => {
    if (isAuthenticated === true && pathname === '/login') {
      router.replace('/dashboard');
    }
  }, [isAuthenticated, pathname, router]);

  if (isAuthenticated === null) {
    // Spinner + tekst "Loading..." na środku
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="flex flex-col items-center">
          <FaSpinner className="text-6xl text-gray-600 animate-spin" />
          <span className="mt-4 text-lg text-gray-700">Loading...</span>
        </div>
      </div>
    );
  }

  if (!isAuthenticated && pathname !== '/login') return null;

  return <>{children}</>;
}
