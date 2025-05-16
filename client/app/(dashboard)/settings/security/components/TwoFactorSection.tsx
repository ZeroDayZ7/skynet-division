'use client'; // Dyrektywa Next.js oznaczająca, że ten komponent działa po stronie klienta (w przeglądarce)

import { Switch } from '@/components/ui/switch'; // Komponent przełącznika (ON/OFF)
import { Label } from '@/components/ui/label'; // Etykieta dla elementu formularza
import { Button } from '@/components/ui/button'; // Stylowany przycisk
import { ShieldCheck, ShieldOff } from 'lucide-react'; // Ikony do wyświetlania w toastach
import { toast } from 'sonner'; // Biblioteka do wyświetlania powiadomień
import { Loader } from '@/components/ui/loader'; // Komponent loadera (np. spinner)

interface TwoFactorSwitchProps {
  checked: boolean; // Czy 2FA jest aktualnie włączone
  disabled: boolean; // Czy kontrolka ma być zablokowana (np. przy ładowaniu)
  isPinSet: boolean | null; // Czy PIN jest ustawiony, null oznacza, że jeszcze nie załadowano
  onCheckedChange: (checked: boolean) => void; // Callback przy zmianie stanu przełącznika
  onRequirePinSetup: () => void; // Callback do otwarcia okna konfiguracji PIN-u, jeśli potrzebny
}

export default function TwoFactorSwitch({
  checked,
  disabled,
  isPinSet,
  onCheckedChange,
  onRequirePinSetup,
}: TwoFactorSwitchProps) {
  // Funkcja obsługująca zmianę stanu przełącznika
  const handleChange = (nextChecked: boolean) => {
    // Jeśli użytkownik chce włączyć 2FA, ale nie ustawił PIN-u
    if (nextChecked && !isPinSet) {
      // Wyświetl ostrzeżenie z możliwością przejścia do ustawienia PIN-u
      toast.warning('Kod PIN nie jest ustawiony', {
        description: 'Aby włączyć 2FA, musisz najpierw ustawić kod PIN.',
        action: {
          label: 'Ustaw PIN',
          onClick: onRequirePinSetup,
        },
      });
      return;
    }

    // Wywołanie przekazanego callbacka przy zmianie stanu
    onCheckedChange(nextChecked);

    // Wyświetlenie komunikatu w zależności od nowego stanu
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

  // Funkcja renderująca odpowiednią kontrolkę (switch, loader lub błąd)
  const renderControl = () => {
    if (disabled) {
      // Gdy kontrolka jest wyłączona, pokazujemy loader
      return (
        <Button variant="outline" disabled>
          <Loader />
        </Button>
      );
    }

    if (isPinSet === null) {
      // Gdy isPinSet nie zostało jeszcze załadowane
      return (
        <Button variant="outline" disabled aria-label="Błąd ładowania danych">
          Błąd ładowania
        </Button>
      );
    }

    // W normalnym przypadku zwracamy przełącznik
    return (
      <Switch
        id="2fa"
        checked={checked}
        onCheckedChange={handleChange}
        disabled={disabled}
      />
    );
  };

  // Główna struktura UI komponentu
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
