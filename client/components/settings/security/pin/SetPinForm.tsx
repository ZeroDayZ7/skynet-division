// components/SetPinForm.tsx
import { InputOTP, InputOTPGroup, InputOTPSlot } from '@/components/ui/input-otp';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';

interface SetPinFormProps {
  pin: string;
  confirmPin: string;
  password: string;
  error: string;
  isLoading: boolean;
  onPinChange: (value: string) => void;
  onConfirmPinChange: (value: string) => void;
  onPasswordChange: (value: string) => void;
  onSubmit: (e: React.FormEvent) => void;
  onCancel: () => void;
}

export function SetPinForm({
  pin,
  confirmPin,
  password,
  error,
  isLoading,
  onPinChange,
  onConfirmPinChange,
  onPasswordChange,
  onSubmit,
  onCancel,
}: SetPinFormProps) {
  return (
    <form onSubmit={onSubmit} className="space-y-6">
      <div className="flex flex-col items-center">
        <InputOTP value={pin} onChange={onPinChange} maxLength={4}>
          <InputOTPGroup className="justify-center">
            <InputOTPSlot index={0} />
            <InputOTPSlot index={1} />
            <InputOTPSlot index={2} />
            <InputOTPSlot index={3} />
          </InputOTPGroup>
        </InputOTP>
        <div className="text-center text-sm">Nowy kod PIN (4 cyfry)</div>
      </div>

      <div className="flex flex-col items-center">
        <InputOTP value={confirmPin} onChange={onConfirmPinChange} maxLength={4}>
          <InputOTPGroup className="justify-center">
            <InputOTPSlot index={0} />
            <InputOTPSlot index={1} />
            <InputOTPSlot index={2} />
            <InputOTPSlot index={3} />
          </InputOTPGroup>
        </InputOTP>
        <div className="text-center text-sm">Potwierdź kod PIN</div>
      </div>

      <div className="flex flex-col items-center">
        <Label htmlFor="password">Aktualne hasło</Label>
        <Input
          id="password"
          type="password"
          value={password}
          onChange={(e) => onPasswordChange(e.target.value)}
          required
          className="w-full max-w-xs"
          autoComplete="off"
        />
      </div>

      {error && (
        <p className="text-destructive text-center text-sm font-medium">
          {error}
        </p>
      )}

      <div className="flex justify-end gap-2 pt-4">
        <Button variant="outline" onClick={onCancel} type="button">
          Anuluj
        </Button>
        <Button type="submit" disabled={isLoading}>
          {isLoading ? 'Zapisywanie...' : 'Zapisz zmiany'}
        </Button>
      </div>
    </form>
  );
}