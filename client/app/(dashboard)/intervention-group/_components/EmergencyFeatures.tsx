// app/(dashboard)/intervention-group/_components/EmergencyFeatures.tsx
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from '@/components/ui/card';
import { EmergencyButton } from '../EmergencyButtonWithJoinInfo';

export default function EmergencyFeatures() {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Funkcje alarmowe</CardTitle>
        <CardDescription>
          Poniższy przycisk to <strong>wersja testowa</strong> przycisku bezpieczeństwa, który otrzyma każda osoba
          przyjęta do Grupy Interwencyjnej. Możesz tutaj swobodnie przetestować jego działanie.
        </CardDescription>
      </CardHeader>
      <CardContent className="flex justify-center">
        <EmergencyButton />
      </CardContent>
    </Card>
  );
}
