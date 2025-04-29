'use client';

import Image from 'next/image';

export function AppBrand() {
  return (
    <div className="flex items-center space-x-2">
      <h1 className="text-2xl font-bold text-gray-700 dark:text-gray-200">
        DARK
      </h1>
      <Image
        src="/images/logo.png"
        alt="Logo aplikacji"
        className="rounded-full"
        width={77}
        height={79}
        priority
      />
      <h1 className="text-2xl font-bold text-gray-700 dark:text-gray-200">
        ARMY
      </h1>
    </div>
  );
}
