import { ModeToggle } from '@/components/theme/theme-button';
import BackButton from '@/components/ui/BackButton';
import MainMenuButton from '@/components/ui/MainMenuButton';
import { PermissionsProvider } from '@/context/PermissionsContext';

export default function DocumentsLayout({ children }: { children: React.ReactNode }) {
  return (
    <div>
        <BackButton />

      <main className="mt-10 flex-1 overflow-y-auto px-2">{children}</main>
    </div>
  );
}
