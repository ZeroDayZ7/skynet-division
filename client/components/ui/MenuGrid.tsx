'use client';

import { useRouter } from 'next/navigation';
import { useState } from 'react';
import { IconType } from 'react-icons';
import { FaSpinner } from 'react-icons/fa';

import { Card, CardContent } from '@/components/ui/card';
import { cn } from '@/lib/utils'; // jeśli używasz `cn` z shadcn/ui

interface MenuItem {
  icon: IconType;
  link: string;
  label: string;
  enabled: boolean;
  visible?: boolean;
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
    <div className={cn('grid gap-4 p-2', gridCols, className)}>
      {items
        .filter((item) => item.visible !== false)
        .map(({ icon: Icon, link, label, enabled }, index) => (
          <Card
            key={index}
            onClick={() => enabled && handleNavigation(link, index)}
            className={cn(
              'transition-colors border shadow-md',
              enabled ? 'hover:bg-accent' : 'opacity-50 pointer-events-none'
            )}
          >
            <CardContent className="flex flex-col items-center justify-center p-2">
              {loadingIndex === index ? (
                <FaSpinner className="text-4xl mb-2 animate-spin" />
              ) : (
                <Icon className="text-4xl mb-2" />
              )}
              <span className="text-sm text-center">{label}</span>
            </CardContent>
          </Card>
        ))}
    </div>
  );
}
