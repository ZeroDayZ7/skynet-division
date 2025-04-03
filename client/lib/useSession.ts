'use client';

import { useState, useEffect, useCallback } from 'react';
import { useRouter, usePathname } from 'next/navigation';
import { logout } from '../lib/utils/logout'

const apiUrl = process.env.NEXT_PUBLIC_API_SERV;
const cookieName = process.env.NEXT_PUBLIC_SESSION_KEY;

console.log(cookieName);

export function useSession() {
  const [isAuthenticated, setIsAuthenticated] = useState<boolean | null>(null);
  const router = useRouter();
  const pathname = usePathname();

  const hasSessionCookie = useCallback(() => {
    return document.cookie.split(';').some((item) => item.trim().startsWith(`${cookieName}=`));
  }, []);



  const checkSession = useCallback(async () => {
    try {
      const res = await fetch(`${apiUrl}/api/auth/status`, {
        method: 'GET',
        credentials: 'include',
      });

      if (!res.ok) {
        console.log('Session check failed (non-200 status) - redirecting to /login');
        setIsAuthenticated(false);
        if (pathname !== '/login') {
          router.replace('/login');
        }
        return;
      }

      const data = await res.json();
      console.log('Session data:', data); // Debug
      setIsAuthenticated(data.isAuthenticated);

      if (!data.isAuthenticated && pathname !== '/login') {
        console.log('Session invalid - redirecting to /login');
        router.replace('/login');
      } else if (data.isAuthenticated && pathname === '/login') {
        console.log('Authenticated on /login - redirecting to /dashboard');
        router.replace('/dashboard'); // Przekierowanie po zalogowaniu
      }
    } catch (error) {
      console.error('Session check error:', error);
      setIsAuthenticated(false);
      if (pathname !== '/login') {
        console.log('Session check error - redirecting to /login');
        router.replace('/login');
      }
    }
  }, [router, pathname]);

  const sendHeartbeat = useCallback(async () => {
    if (pathname === '/login') return;

    try {
      const res = await fetch(`${apiUrl}/api/auth/status`, {
        method: 'GET',
        credentials: 'include',
      });
      if (!res.ok) throw new Error('Heartbeat failed');
    } catch (error) {
      console.error('Heartbeat error:', error);
      await checkSession();
    }
  }, [pathname, checkSession]);

  useEffect(() => {
    // Sprawdź obecność ciasteczka sesyjnego na początku
    console.log(hasSessionCookie());
    if (!hasSessionCookie()) {
      console.log('Initial check: No session cookie - redirecting to /login');
      setIsAuthenticated(false);
      if (pathname !== '/login') {
        router.replace('/login');
      }
      return; // Przerywamy dalsze sprawdzanie, jeśli nie ma ciasteczka
    }

    // Jeśli ciasteczko istnieje, sprawdzamy sesję z backendem
    checkSession();

    let lastActivity = Date.now();
    let heartbeatInterval: NodeJS.Timeout;
    let sessionCheckInterval: NodeJS.Timeout;

    const handleActivity = () => {
      lastActivity = Date.now();
    };

    const events = ['mousemove', 'keydown', 'click', 'scroll', 'touchstart'];
    events.forEach(event => window.addEventListener(event, handleActivity));

    heartbeatInterval = setInterval(() => {
      const timeSinceLastActivity = Date.now() - lastActivity;
      if (timeSinceLastActivity > 10 * 1000 && pathname !== '/login') {
        logout();
        setIsAuthenticated(false);
        router.replace('/login');
        // sendHeartbeat();
      }
    }, 5 * 60 * 1000);

    // 5 * 60 * 1000

    sessionCheckInterval = setInterval(checkSession, 5 * 60 * 1000);

    return () => {
      clearInterval(heartbeatInterval);
      clearInterval(sessionCheckInterval);
      events.forEach(event => window.removeEventListener(event, handleActivity));
    };
  }, [checkSession, sendHeartbeat, pathname, hasSessionCookie, router]); // Dodano hasSessionCookie i router do zależności

  return { isAuthenticated, checkSession };
}