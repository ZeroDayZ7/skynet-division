"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { AlertTriangle, Zap } from "lucide-react"; // Możesz dodać inne ikony alarmowe

export function EmergencyButton() {
  const [isOpen, setIsOpen] = useState(false);
  const [clickCount, setClickCount] = useState(0);

  const handleClick = () => {
    const newCount = clickCount + 1;
    setClickCount(newCount);

    if (newCount === 1) {
      setIsOpen(true);
    }

    if (newCount >= 5) {
      // Aktywacja alarmu
      console.log("ALARM AKTYWOWANY!");
      // Tutaj dodaj rzeczywistą logikę alarmu
    }
  };

  const resetCounter = () => {
    setIsOpen(false);
    setClickCount(0);
  };

  return (
    <>
      {/* Przycisk awaryjny */}
      <div className="fixed top-0 right-0 z-[9999]">
        <Button
          onClick={handleClick}
          variant="destructive"
          size="icon"
          className="h-14 w-14 shadow-xl animate-pulse z-[9999]"
        >
          <AlertTriangle className="h-8 w-8" />
        </Button>
      </div>

      {/* Full-screen dialog */}
      <Dialog open={isOpen} onOpenChange={resetCounter}>
        <DialogContent className="w-full h-screen max-w-none max-h-none flex flex-col justify-center items-center border-0 bg-black">
          <div className="text-center space-y-6 flex flex-col justify-between h-full">
            <DialogHeader>
              <AlertTriangle className="mx-auto h-16 w-16 text-red-600" />
              <DialogTitle className="text-2xl text-red-600">
                {clickCount < 5 ? (
                  <>Potwierdź alarm awaryjny</>
                ) : (
                  <>ALARM AKTYWOWANY!</>
                )}
              </DialogTitle>
            </DialogHeader>

            <div className="flex flex-col items-center space-y-6 flex-grow justify-center animate-pulse">
              <p className="text-2xl text-white">
                {clickCount < 5
                  ? `Kliknij przycisk ${5 - clickCount} razy`
                  : "ALARM AKTYWOWOWANY!"}
              </p>

              <Button
                variant="destructive"
                size="lg"
                onClick={handleClick}
                className="w-full max-w-xs mx-auto text-lg h-50 bg-red-500 hover:bg-red-800 focus:ring-2 focus:ring-red-500"
              >
                <AlertTriangle className="mr-2 h-6 w-6" />
                {clickCount < 5 ? `Potwierdź (${clickCount}/5)` : "WYSŁANO!"}
              </Button>
            </div>
          </div>
        </DialogContent>
      </Dialog>
    </>
  );
}
