'use client';

import { Switch } from '@/components/ui/switch';
import { Label } from '@/components/ui/label';
import { Button } from '@/components/ui/button';
import { ShieldCheck, ShieldOff } from 'lucide-react';
import { toast } from 'sonner';
import { Loader } from '@/components/ui/loader';

interface TwoFactorSwitchProps {
  checked: boolean;
  disabled: boolean;
  isPinSet: boolean | null;
  onCheckedChange: (checked: boolean) => void;
  onRequirePinSetup: () => void;
}

export default function TwoFactorSwitch({
  checked,
  disabled,
  isPinSet,
  onCheckedChange,
  onRequirePinSetup,
}: TwoFactorSwitchProps) {
  const handleChange = (nextChecked: boolean) => {
    if (nextChecked && !isPinSet) {
      toast.warning('Kod PIN nie jest ustawiony', {
        description: 'Aby włączyć 2FA, musisz najpierw ustawić kod PIN.',
        action: {
          label: 'Ustaw PIN',
          onClick: onRequirePinSetup,
        },
      });
      return;
    }

    onCheckedChange(nextChecked);

    if (nextChecked) {
      toast.success('2FA włączone', {
        description: 'Kod z aplikacji autoryzacyjnej będzie wymagany przy logowaniu.',
        icon: <ShieldCheck className="h-5 w-5" />,
      });
    } else {
      toast.warning('2FA wyłączone', {
        description: 'Dwuetapowe uwierzytelnianie zostało wyłączone.',
        icon: <ShieldOff className="h-5 w-5" />,
      });
    }
  };

  const renderControl = () => {
    if (disabled) {
      return (
        <Button variant="outline" disabled>
          <Loader />
        </Button>
      );
    }

    if (isPinSet === null) {
      return (
        <Button variant="outline" disabled aria-label="Błąd ładowania danych">
          Błąd ładowania
        </Button>
      );
    }

    return (
      <Switch
        id="2fa"
        checked={checked}
        onCheckedChange={handleChange}
        disabled={disabled}
      />
    );
  };

  return (
    <div className="flex items-center justify-between">
      <div>
        <Label htmlFor="2fa">Uwierzytelnianie dwuskładnikowe</Label>
        <p className="text-muted-foreground text-sm">
          Wymagaj kodu z aplikacji autoryzacyjnej przy logowaniu
        </p>
      </div>
      {renderControl()}
    </div>
  );
}
