import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { AppBrand } from '@/components/auth/AppBrand';
import { useTranslations } from 'next-intl';

export default function HomePage() {
  const t = useTranslations('LoginPage');

  return (
    <div className="flex min-h-screen flex-col items-center justify-center space-y-2">
      <AppBrand />
      <p className="max-w-md text-center">{t('loginDescription')}</p>
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
