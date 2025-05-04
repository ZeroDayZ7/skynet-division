'use client';

import { useState, useEffect } from 'react';

export function useLoadingTimeout(timeout: number) {
  const [loading, setLoading] = useState<boolean>(true);

  useEffect(() => {
    const loadingTimeout = setTimeout(() => {
      setLoading(false);
    }, timeout);

    return () => clearTimeout(loadingTimeout); // Wyczyść timeout po unmount
  }, [timeout]);

  return loading;
}
