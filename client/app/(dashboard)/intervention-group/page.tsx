'use client';

import { useState } from 'react';
import dynamic from 'next/dynamic';
import { Button } from '@/components/ui/button';
import InterventionHeader from './_components/InterventionHeader';

const AboutProject = dynamic(() => import('./_components/AboutProject'), { ssr: false });
const JoinRequirements = dynamic(() => import('./_components/JoinRequirements'), { ssr: false });
const VisualPanels = dynamic(() => import('./_components/VisualPanels'), { ssr: false });
const EmergencyFeatures = dynamic(() => import('./_components/EmergencyFeatures'), { ssr: false });

export default function InterventionGroupPage() {
  const [step, setStep] = useState(0);

  const next = () => setStep(prev => prev + 1);
  const reset = () => setStep(0);

  return (
    <div className="xl:w-2/3 sm:w-full mx-auto space-y-4">
      <InterventionHeader />

      {step >= 1 && <AboutProject />}
      {step >= 2 && <JoinRequirements />}
      {step >= 3 && <VisualPanels />}
      {step >= 4 && <EmergencyFeatures />}

      <div className="flex justify-center mt-4">
        {step < 4 ? (
          <Button variant="outline" onClick={next}>
            Czytaj więcej
          </Button>
        ) : (
          <Button variant="ghost" onClick={reset}>
            Zwiń wszystko
          </Button>
        )}
      </div>
    </div>
  );
}
