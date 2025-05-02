import { Card, CardHeader, CardTitle } from '@/components/ui/card';
import Image from 'next/image';

export default function InterventionHeader() {
  return (
    <Card className="text-center">
      <CardHeader>
        <p className="text-muted-foreground">
          Szybka reakcja w sytuacjach kryzysowych
        </p>
        <div className="flex justify-center mt-4">
          <Image
            src="/TEST/grpint — kopia.jpg"
            alt="Opis obrazka"
            className='rounded-xl'
            width={500}
            height={500}
          />
        </div>
      </CardHeader>
    </Card>
  );
}
