// import { ModeToggle } from '@/components/theme/theme-button';
// import BackButton from '@/components/ui/BackButton';
// import MainMenuButton from '@/components/ui/MainMenuButton';
import { PermissionsProvider } from '@/context/PermissionsContext';

export default function DocumentsLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="flex h-screen flex-col">

      <header className="fixed top-0 right-0 left-0 z-50 flex h-10 items-center space-x-4 border-b bg-gray-100 px-4 py-3 shadow dark:bg-gray-900">
ss
      </header>

      {/* Treść */}
      <PermissionsProvider>
      <main>{children}</main>
      </PermissionsProvider>
    </div>
  );
}
