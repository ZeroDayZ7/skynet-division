import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { AppBrand } from '@/components/auth/AppBrand';
import { useTranslations } from 'next-intl';

export default function HomePage() {
  const t = useTranslations('LoginPage'); // Użyj 'LoginPage', ponieważ tam są klucze

  return (
    <div className="min-h-screen flex flex-col items-center justify-center space-y-2">
      <AppBrand />
      <p className="text-center max-w-md">
        {t('loginDescription')}
      </p>
      <div className="flex space-x-4">
        <Button asChild>
          <Link href="/login">{t('login')}</Link>
        </Button>
        <Button asChild variant="outline">
          <Link href="/register">{t('register')}</Link>
        </Button>
      </div>
    </div>
  );
}
