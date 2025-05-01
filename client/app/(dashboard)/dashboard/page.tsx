'use client';

import { AppBrand } from "@/components/auth/AppBrand";
import { useTranslations } from 'next-intl';

export default function DashboardPage() {
  const t = useTranslations('Dashboard');

  return (
    <div className="flex flex-1 flex-col items-center justify-center text-center space-y-8">
      <div className="animate-fade-in">
        <h1 className="text-4xl font-extrabold tracking-tight bg-clip-text bg-gradient-to-r from-red-600 to-purple-600">
          {t('welcome')}
        </h1>
        
        <div className="my-6 flex items-center justify-center">
          <AppBrand />
        </div>

        <div className="relative group">
          <p className="text-xl font-mono text-gray-400 italic mb-2">
            "{t('slogan')}"
          </p>
          <div className="absolute -bottom-1 left-0 w-0 h-0.5 bg-gradient-to-r from-red-500 to-purple-500 group-hover:w-full transition-all duration-500"></div>
        </div>

        <p className="max-w-2xl mt-8 text-lg text-gray-300 leading-relaxed">
          {t('description')}
        </p>

        <div className="mt-12 flex justify-center">
          <button className="px-8 py-3 bg-gradient-to-r from-red-700 to-purple-800 rounded-lg font-bold tracking-wider hover:scale-105 transition-transform duration-300 shadow-lg shadow-purple-900/30">
            {t('cta')}
          </button>
        </div>
      </div>
    </div>
  );
}