'use client';

import { AppBrand } from "@/components/auth/AppBrand";
import { useTranslations } from 'next-intl';

export default function DashboardPage() {
  const t = useTranslations('Dashboard');

  return (
    <div className="flex flex-1 flex-col items-center justify-center text-center space-y-8">
      <div className="animate-fade-in">
        
        <div className="my-6 flex items-center justify-center">
          <AppBrand />
        </div>

        <div className="relative group">
          <p className="text-xl font-mono text-gray-400 italic mb-2">
            "{t('slogan')}"
          </p>
          <div className="absolute -bottom-1 left-0 w-0 h-0.5 bg-gradient-to-r from-red-500 to-purple-500 group-hover:w-full transition-all duration-500"></div>
        </div>
      </div>
    </div>
  );
}