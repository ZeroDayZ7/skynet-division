// app/(dashboard)/intervention-group/_components/VisualPanels.tsx
import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/card';
import { AlertTriangle, Users } from 'lucide-react';

export default function VisualPanels() {
  return (
    <div className="grid md:grid-cols-2 gap-4">
      <Card>
        <CardHeader className="pb-2">
          <div className="bg-red-100 p-3 rounded-full w-fit mx-auto">
            <AlertTriangle className="h-6 w-6 text-red-600" />
          </div>
        </CardHeader>
        <CardContent className="text-center space-y-2">
          <CardTitle className="text-xl">System Alarmowy</CardTitle>
          <p className="text-muted-foreground">
            Natychmiastowe powiadomienia o zdarzeniach wymagających interwencji
          </p>
        </CardContent>
      </Card>

      <Card>
        <CardHeader className="pb-2">
          <div className="bg-blue-100 p-3 rounded-full w-fit mx-auto">
            <Users className="h-6 w-6 text-blue-600" />
          </div>
        </CardHeader>
        <CardContent className="text-center space-y-2">
          <CardTitle className="text-xl">Koordynacja Zespołu</CardTitle>
          <p className="text-muted-foreground">
            Komunikacja i zarządzanie akcjami w czasie rzeczywistym
          </p>
        </CardContent>
      </Card>
    </div>
  );
}