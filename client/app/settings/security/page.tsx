// app/settings/security/page.tsx
// SSR
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { TwoFactorSwitch } from './TwoFactorSwitch';

async function getTwoFactorStatus() {
  try {
    const response = await fetch('http://localhost:3000/api/two-factor/status', {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
      },
      credentials: 'include',
    });

    if (!response.ok) {
      throw new Error('Failed to fetch 2FA status');
    }

    const data = await response.json();
    return data.isEnabled as boolean;
  } catch (error) {
    console.error('Error fetching 2FA status:', error);
    return false;
  }
}

export default async function SecuritySettings() {
  const isTwoFactorEnabled = await getTwoFactorStatus();

  return (
    <div className="container mx-auto px-4 py-8 dark:text-green-500">
      <h1 className="text-3xl font-bold mb-8">Bezpieczeństwo</h1>

      <div className="space-y-6">
        <Card>
          <CardHeader>
            <CardTitle>Ochrona konta</CardTitle>
          </CardHeader>
          <CardContent className="space-y-6">
            <TwoFactorSwitch initialEnabled={isTwoFactorEnabled} />
          </CardContent>
        </Card>
      </div>
    </div>
  );
}