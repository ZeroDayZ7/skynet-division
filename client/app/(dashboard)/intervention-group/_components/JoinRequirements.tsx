// app/(dashboard)/intervention-group/_components/JoinRequirements.tsx
import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/card';

export default function JoinRequirements() {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Jak dołączyć?</CardTitle>
      </CardHeader>
      <CardContent className="grid md:grid-cols-2 gap-6">
        <div className="space-y-3">
          <h3 className="text-lg font-medium text-red-600">Wymagania</h3>
          <ul className="space-y-2">
            <li className="flex items-start gap-2">
              <span className="text-red-500">•</span>
              <span>Pełne dane osobowe w profilu</span>
            </li>
            <li className="flex items-start gap-2">
              <span className="text-red-500">•</span>
              <span>Weryfikacja tożsamości</span>
            </li>
            <li className="flex items-start gap-2">
              <span className="text-red-500">•</span>
              <span>Przeszkolenie podstawowe</span>
            </li>
          </ul>
        </div>
        <div className="space-y-3">
          <h3 className="text-lg font-medium text-red-600">Korzyści</h3>
          <ul className="space-y-2">
            <li className="flex items-start gap-2">
              <span className="text-red-500">•</span>
              <span>Dostęp do systemu alarmowego</span>
            </li>
            <li className="flex items-start gap-2">
              <span className="text-red-500">•</span>
              <span>Specjalne uprawnienia</span>
            </li>
            <li className="flex items-start gap-2">
              <span className="text-red-500">•</span>
              <span>Szkolenia specjalistyczne</span>
            </li>
          </ul>
        </div>
      </CardContent>
    </Card>
  );
}