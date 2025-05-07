"use client";
import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { AlertTriangle, Loader, CheckCircle, MapPin, PhoneCall, Bell } from "lucide-react";
import { DialogDescription } from "@radix-ui/react-dialog";

export function EmergencyButton() {
  const [isOpen, setIsOpen] = useState(false);
  const [clickCount, setClickCount] = useState(0);
  const [alarmActive, setAlarmActive] = useState(false);
  const [alarmStage, setAlarmStage] = useState(0);
  const [loadingDots, setLoadingDots] = useState("");

  useEffect(() => {
    let dotsInterval: NodeJS.Timeout | number; // Określamy typ zmiennej
    if (alarmActive && alarmStage < 4) {
      dotsInterval = setInterval(() => {
        setLoadingDots(prev => prev.length >= 3 ? "" : prev + ".");
      }, 500);
    }
    return () => clearInterval(dotsInterval);
  }, [alarmActive, alarmStage]);

  useEffect(() => {
    let stageTimer: NodeJS.Timeout | number;
    if (alarmActive) {
      // Przejście przez różne etapy alarmu
      const stageTimes = [2000, 3000, 4000]; // czasy w ms dla każdego etapu
      
      if (alarmStage < 3) {
        stageTimer = setTimeout(() => {
          setAlarmStage(prev => prev + 1);
        }, stageTimes[alarmStage]);
      }
    }
    return () => clearTimeout(stageTimer);
  }, [alarmActive, alarmStage]);

  const handleClick = () => {
    const newCount = clickCount + 1;
    setClickCount(newCount);
    
    if (newCount === 1) {
      setIsOpen(true);
    }
    
    if (newCount >= 5 && !alarmActive) {
      // Aktywacja alarmu
      setAlarmActive(true);
    }
  };

  const resetCounter = () => {
    if (!alarmActive) {
      setIsOpen(false);
      setClickCount(0);
    }
  };

  const getAlarmContent = () => {
    switch (alarmStage) {
      case 0:
        return (
          <div className="flex flex-col items-center space-y-6 text-center animate-pulse">
            <div className="relative">
              <Loader className="h-16 w-16 text-amber-400 animate-spin" />
              <MapPin className="h-8 w-8 text-red-500 absolute top-4 left-4" />
            </div>
            <p className="text-xl text-amber-400">
              Ładowanie lokalizacji{loadingDots}
            </p>
            <div className="w-full max-w-md bg-gray-800 h-4 rounded-full mt-4">
              <div className="bg-amber-400 h-4 rounded-full animate-[pulse_1s_ease-in-out_infinite]" style={{width: '25%'}}></div>
            </div>
          </div>
        );
      case 1:
        return (
          <div className="flex flex-col items-center space-y-6 text-center">
            <div className="relative">
              <PhoneCall className="h-16 w-16 text-amber-400 animate-pulse" />
              <Bell className="h-8 w-8 text-red-500 absolute top-0 right-0 animate-bounce" />
            </div>
            <p className="text-xl text-amber-400">
              Łączenie z centrum kryzysowym{loadingDots}
            </p>
            <div className="flex space-x-2 mt-4">
              {[1, 2, 3, 4].map((n) => (
                <div key={n} className="w-3 h-3 bg-amber-400 rounded-full animate-bounce" style={{
                  animationDelay: `${n * 0.15}s`
                }}></div>
              ))}
            </div>
            <div className="w-full max-w-md bg-gray-800 h-4 rounded-full mt-4">
              <div className="bg-amber-400 h-4 rounded-full animate-[pulse_1s_ease-in-out_infinite]" style={{width: '50%'}}></div>
            </div>
          </div>
        );
      case 2:
        return (
          <div className="flex flex-col items-center space-y-6 text-center">
            <div className="relative">
              <div className="h-16 w-16 rounded-full bg-amber-500 flex items-center justify-center animate-pulse">
                <AlertTriangle className="h-10 w-10 text-black" />
              </div>
              <div className="absolute -top-2 -right-2 h-6 w-6 bg-red-600 rounded-full animate-ping"></div>
            </div>
            <p className="text-xl text-amber-400">
              Przekazywanie zgłoszenia alarmowego{loadingDots}
            </p>
            <div className="flex flex-wrap justify-center gap-2 mt-2">
              {[1, 2, 3, 4, 5, 6].map((n) => (
                <div key={n} className="px-2 py-1 bg-red-900/50 text-red-200 text-xs rounded-md border border-red-500 animate-pulse" style={{
                  animationDelay: `${n * 0.2}s`
                }}>
                  KOD-{Math.floor(Math.random() * 900) + 100}
                </div>
              ))}
            </div>
            <div className="w-full max-w-md bg-gray-800 h-4 rounded-full mt-4">
              <div className="bg-amber-400 h-4 rounded-full animate-[pulse_1s_ease-in-out_infinite]" style={{width: '75%'}}></div>
            </div>
          </div>
        );
      case 3:
        return (
          <div className="flex flex-col items-center space-y-6 text-center">
            <div className="relative">
              <CheckCircle className="h-16 w-16 text-green-500" />
              <div className="absolute -top-1 -right-1 h-5 w-5 bg-green-400 rounded-full animate-ping opacity-75"></div>
            </div>
            <p className="text-xl text-green-500">
              Alarm przyjęty i potwierdzony!
            </p>
            <div className="p-4 bg-green-900/20 border border-green-500 rounded-lg text-green-300 max-w-md">
              <p className="font-semibold mb-2">Centrum Kryzysowe potwierdza przyjęcie zgłoszenia</p>
              <p className="text-sm">Zespół ratunkowy został wysłany. Proszę pozostać na miejscu i czekać na dalsze instrukcje.</p>
            </div>
            <div className="w-full max-w-md bg-gray-800 h-4 rounded-full mt-4">
              <div className="bg-green-500 h-4 rounded-full" style={{width: '100%'}}></div>
            </div>
            <Button 
              variant="outline"
              size="lg"
              className="mt-4 border-green-500 text-green-500 hover:bg-green-900/20"
              onClick={() => {
                setAlarmActive(false);
                setAlarmStage(0);
                setClickCount(0);
                setIsOpen(false);
              }}
            >
              Powrót
            </Button>
          </div>
        );
      default:
        return null;
    }
  };

  return (
    <>
      {/* Przycisk awaryjny */}
      <div className="">
        <Button
          onClick={handleClick}
          variant="destructive"
          size="icon"
          className="h-14 w-14 shadow-xl animate-pulse"
        >
          <AlertTriangle className="h-8 w-8" />
        </Button>
      </div>

      {/* Full-screen dialog */}
      <Dialog open={isOpen} onOpenChange={resetCounter}>
        <DialogContent className="w-full h-screen max-w-none max-h-none flex flex-col justify-center items-center border-0 bg-black">
          <div className="text-center space-y-6 flex flex-col justify-between h-full max-w-lg w-full">
            <DialogHeader className="pt-8">
              <div className={`mx-auto ${alarmActive ? 'animate-bounce' : ''}`}>
                <AlertTriangle className="mx-auto h-16 w-16 text-red-600" />
              </div>
              <DialogTitle className={`text-2xl ${alarmActive ? 'text-amber-400' : 'text-red-600'} text-center`}>
                {!alarmActive ? (
                  <>Potwierdź alarm awaryjny</>
                ) : (
                  <>ALARM AKTYWOWANY!</>
                )}
              </DialogTitle>
              <DialogDescription className="text-center"></DialogDescription>
            </DialogHeader>

            <div className="flex-grow flex flex-col justify-center">
              {!alarmActive ? (
                <div className="flex flex-col items-center space-y-6">
                  <p className="text-white">
                    Dostęp do tego przycisku mają tylko członkowie Grupy Interwencyjnej.
                  </p>
                  <p className="text-2xl text-white">
                    Kliknij przycisk {5 - clickCount} razy
                  </p>
                  <Button
                    variant="destructive"
                    size="lg"
                    onClick={handleClick}
                    className="w-full max-w-xs mx-auto text-lg h-14 bg-red-600 hover:bg-red-800 focus:ring-2 focus:ring-red-500"
                  >
                    <AlertTriangle className="mr-2 h-6 w-6" />
                    Potwierdź ({clickCount}/5)
                  </Button>
                </div>
              ) : (
                <div className="flex-grow flex flex-col justify-center items-center w-full p-6">
                  {getAlarmContent()}
                </div>
              )}
            </div>

            {!alarmActive && (
              <div className="pb-8">
                <p className="text-gray-400 text-sm">
                  Fałszywe alarmy podlegają sankcjom dyscyplinarnym
                </p>
              </div>
            )}
          </div>
        </DialogContent>
      </Dialog>
    </>
  );
}