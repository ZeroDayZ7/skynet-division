'use client';

import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import dynamic from 'next/dynamic';
import { Faq } from './faq/Faq'; // Zaimportowano komponent FAQ
import { Loader } from "@/components/ui/loader";

// Dynamicznie importujemy komponenty z opóźnieniem
const SupportForm = dynamic(() => import('./contact/SupportForm'), {
  ssr: false, // Zapewnia, że komponent jest renderowany tylko po stronie klienta
  loading: () => <Loader />, // Pokazuje komunikat lub loader podczas ładowania
});

const Responses = dynamic(() => import('./responses/Responses'), {
  ssr: false, // Zapewnia, że komponent jest renderowany tylko po stronie klienta
  loading: () => <Loader />, // Pokazuje komunikat lub loader podczas ładowania
});


export default function SupportPage() {
  return (
    <Tabs defaultValue="faq" className="max-w-2xl mx-auto">
      <TabsList className="grid w-full grid-cols-3">
        <TabsTrigger value="faq">FAQ</TabsTrigger>
        <TabsTrigger value="support">Kontakt </TabsTrigger>
        <TabsTrigger value="responses">Odpowiedzi</TabsTrigger>
      </TabsList>

      <TabsContent value="faq">
        <Faq /> {/* Dodanie komponentu FAQ */}
      </TabsContent>

      <TabsContent value="support">
        <SupportForm /> {/* Dynamicznie załadowany komponent SupportForm */}
      </TabsContent>

      <TabsContent value="responses">
        <Responses /> {/* Dynamicznie załadowany komponent Responses */}
      </TabsContent>
    </Tabs>
  );
}
