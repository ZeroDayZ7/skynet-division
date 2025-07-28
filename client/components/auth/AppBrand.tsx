'use client';

import Link from 'next/link';
import Image from 'next/image';
import React from 'react';

export const AppBrand: React.FC = () => {
  return (
    <Link
      href="/"
      className="group flex items-center space-x-3 transition-colors duration-200"
    >
      <h1 className="text-2xl font-extrabold tracking-wide text-gray-800 dark:text-gray-100">
        <span className="text-blue-600 dark:text-blue-400">
          {process.env.NEXT_PUBLIC_SYSTEM_NAME || 'System Kasandra'}
        </span>
      </h1>
      <Image
        src="/images/logo.png"
        alt="Logo"
        className="rounded-full border border-gray-300 shadow-sm transition-transform group-hover:scale-105 dark:border-gray-700"
        width={64}
        height={64}
        priority
      />
    </Link>
  );
};
