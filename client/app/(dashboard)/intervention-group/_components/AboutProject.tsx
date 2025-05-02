// app/(dashboard)/intervention-group/_components/AboutProject.tsx
import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/card';

export default function AboutProject() {
  return (
    <Card>
      <CardHeader>
        <CardTitle>O projekcie</CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        <p>
          Grupa Interwencyjna to specjalny zespół przeszkolonych osób gotowych
          do natychmiastowego działania w sytuacjach wymagających szybkiej
          pomocy.
        </p>
        <p>
          Członkowie grupy mają dostęp do specjalnych narzędzi umożliwiających
          koordynację akcji ratunkowych i wsparcie osób potrzebujących.
        </p>
        <ul className="list-disc pl-6 space-y-2">
          <li>Natychmiastowe powiadomienia o zdarzeniach</li>
          <li>Bezpośredni dostęp do systemu alarmowego</li>
          <li>Mapa interwencji w czasie rzeczywistym</li>
          <li>Szkolenia i certyfikacje</li>
        </ul>
      </CardContent>
    </Card>
  );
}