import BackButton from '@/components/ui/BackButton';
import MainMenuButton from '@/components/ui/MainMenuButton';

export default function DocumentsLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="flex h-screen flex-col">
      {/* TopBar */}
      <header className="fixed top-0 right-0 left-0 z-50 flex h-10 
      items-center space-x-4 border-b bg-gray-100 px-4 py-3 
      shadow dark:bg-card">
        <BackButton />
        <MainMenuButton />
      </header>

      {/* Treść */}
      <main className="mt-10 flex-1 overflow-y-auto px-2">{children}</main>
    </div>
  );
}
