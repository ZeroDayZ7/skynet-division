'use client';

import { useRouter } from 'next/navigation';
import { useState } from 'react';
import { IconType } from 'react-icons';
import { FaSpinner } from 'react-icons/fa';


interface MenuItem {
  icon: IconType;
  link: string;
  label: string;
  enabled: boolean;
  hidden?: boolean;
}

interface MenuGridProps {
  items: MenuItem[];
  gridCols?: string;
  className?: string;
}

export default function MenuGrid({
  items,
  gridCols = 'grid-cols-2 md:grid-cols-3 lg:grid-cols-4',
  className = '',
}: MenuGridProps) {
  const router = useRouter();
  const [loadingIndex, setLoadingIndex] = useState<number | null>(null);

  const handleNavigation = (link: string, index: number) => {
    setLoadingIndex(index);
    router.push(link);
  };

  return (
    <div className={`grid gap-4 p-2 ${gridCols} ${className}`}>
      {items.map(({ icon: Icon, link, label, enabled }, index) => (
        <button
          key={index}
          onClick={() => enabled && handleNavigation(link, index)}
          className={`flex flex-col items-center justify-center p-4 rounded shadow-md
            bg-card border dark:text-green-500  dark:hover:text-green-300 transition-colors duration-200 dark:hover:bg-muted/80
            ${enabled ? '' : 'opacity-50 cursor-not-allowed disabled:dark:hover:text-green-500'}`}
          disabled={!enabled || loadingIndex === index}
        >
          {loadingIndex === index ? (
            <FaSpinner className="text-4xl mb-2 animate-spin" />
          ) : (
            <Icon className="text-4xl mb-2" />
          )}
          <span className="text-sm">{label}</span>
        </button>
      ))}

      
    </div>
  );
}
