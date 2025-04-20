// 'use server';
import { Button } from '@/components/ui/button';
// import { getSession } from '@/lib/session'; // przykładowe pobieranie sesji
import { useRouter } from 'next/navigation';

export default function AdminPanelButton() {
  const permissions = [
    {
      name: 'adminPanel',
      enabled: false,
      hidden: false,
    },
    {
      name: 'userSearch',
      enabled: true,
      hidden: false,
    },
    {
      name: 'userCreate',
      enabled: false,
      hidden: true,
    },
    {
      name: 'userDelete',
      enabled: false,
      hidden: true,
    },
    {
      name: 'viewLogs',
      enabled: true,
      hidden: false,
    },
  ];

  const adminPanel = permissions.find((permission) => permission.name === 'adminPanel');
  const isAdminPanelEnabled = adminPanel?.enabled;
  const isAdminPanelHidden = adminPanel?.hidden;

  if (!isAdminPanelHidden) return null;

  const router = useRouter();
  const handleRedirect = () => {
    if (isAdminPanelEnabled) {
      router.push('/test1/admin'); // Zmieniamy trasę na panel admina
    }
  };

  return (
    <div>
      <Button 
      className={`mt-4 block rounded bg-blue-600 px-4 py-2 text-white ${!isAdminPanelEnabled ? 'cursor-not-allowed opacity-50' : ''}`} 
      disabled={!isAdminPanelEnabled}
      onClick={handleRedirect}
      >
        Panel Administracyjny
      </Button>
    </div>
  );
}
