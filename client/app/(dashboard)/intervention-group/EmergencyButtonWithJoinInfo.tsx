// components/EmergencyButton.tsx
'use client';

import { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog';
import {
  AlertTriangle,
  LocateFixed,
  Satellite,
  ShieldAlert,
  CheckCircle2,
} from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

export function EmergencyButton() {
  const [isOpen, setIsOpen] = useState(false);
  const [clickCount, setClickCount] = useState(0);
  const [alarmStage, setAlarmStage] = useState<
    'idle' | 'confirming' | 'locating' | 'sending' | 'complete'
  >('idle');

  const handleClick = () => {
    const newCount = clickCount + 1;
    setClickCount(newCount);

    if (newCount === 1) {
      setIsOpen(true);
      setAlarmStage('confirming');
    }

    if (newCount >= 5 && alarmStage === 'confirming') {
      setAlarmStage('locating');
      startAlarmSequence();
    }
  };

  const startAlarmSequence = () => {
    // Symulacja procesu alarmowego
    setTimeout(() => setAlarmStage('locating'), 0);
    setTimeout(() => setAlarmStage('sending'), 2000);
    setTimeout(() => setAlarmStage('complete'), 4000);
  };

  const resetCounter = () => {
    setIsOpen(false);
    setClickCount(0);
    setTimeout(() => setAlarmStage('idle'), 500);
  };

  const renderAlarmStatus = () => {
    switch (alarmStage) {
      case 'confirming':
        return (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="space-y-6 text-center"
          >
            <AlertTriangle className="mx-auto h-16 w-16 animate-pulse text-red-600" />
            <DialogTitle className="text-2xl text-red-600">
              Potwierdź alarm awaryjny
            </DialogTitle>
            <p className="text-white">
              Kliknij przycisk {5 - clickCount} razy aby aktywować alarm
            </p>
          </motion.div>
        );
      case 'locating':
        return (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="space-y-6 text-center"
          >
            <motion.div
              animate={{ rotate: 360 }}
              transition={{ repeat: Infinity, duration: 2, ease: 'linear' }}
            >
              <LocateFixed className="mx-auto h-16 w-16 text-yellow-500" />
            </motion.div>
            <DialogTitle className="text-2xl text-yellow-500">
              Ładowanie lokalizacji...
            </DialogTitle>
            <p className="text-white">Trwa ustalanie Twojej pozycji GPS</p>
          </motion.div>
        );
      case 'sending':
        return (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="space-y-6 text-center"
          >
            <motion.div
              animate={{ y: [-5, 5, -5] }}
              transition={{ repeat: Infinity, duration: 1 }}
            >
              <Satellite className="mx-auto h-16 w-16 text-orange-500" />
            </motion.div>
            <DialogTitle className="text-2xl text-orange-500">
              Przesyłanie danych...
            </DialogTitle>
            <p className="text-white">Łączenie z Centrum Kryzysowym</p>
          </motion.div>
        );
      case 'complete':
        return (
         <>
              <AlertTriangle className="mx-auto h-16 w-16 text-green-500" />
           
            <DialogTitle className="text-2xl text-green-500">
              ALARM PRZEKAZANY!
            </DialogTitle>
            <div className="space-y-4">
              <p className="text-white">
                Pomoc została wezwana. Oczekuj kontaktu.
              </p>
              <div className="flex items-center justify-center gap-2 text-green-400">
                <CheckCircle2 className="h-5 w-5" />
                <span>
                  Numer zgłoszenia: {Math.floor(Math.random() * 10000)}
                </span>
              </div>
            </div>
            </>
        );
      default:
        return null;
    }
  };

  return (
    <>
      {/* Przycisk awaryjny */}
      <div>
        <Button
          onClick={handleClick}
          variant="destructive"
          size="lg"
          className="h-16 w-16 animate-pulse rounded-full shadow-xl"
        >
          <AlertTriangle className="h-8 w-8" />
        </Button>
      </div>

      {/* Full-screen dialog */}
      <Dialog open={isOpen} onOpenChange={resetCounter}>
        <DialogContent className="flex h-screen max-h-none w-full max-w-none flex-col items-center justify-center border-0 bg-gray-900">
          <AnimatePresence mode="wait">{renderAlarmStatus()}</AnimatePresence>

          {alarmStage === 'confirming' && (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="mt-8 w-full max-w-xs"
            >
              <Button
                variant="destructive"
                size="lg"
                onClick={handleClick}
                className="h-14 w-full text-lg"
              >
                <AlertTriangle className="mr-2 h-6 w-6" />
                {clickCount < 5 ? `Potwierdź (${clickCount}/5)` : 'Aktywuj'}
              </Button>
            </motion.div>
          )}

          {alarmStage === 'complete' && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 1 }}
              className="mt-8 w-full max-w-xs"
            >
              <Button
                variant="outline"
                onClick={resetCounter}
                className="w-full border-white text-white hover:bg-white/10"
              >
                Zamknij
              </Button>
            </motion.div>
          )}
        </DialogContent>
      </Dialog>
    </>
  );
}
