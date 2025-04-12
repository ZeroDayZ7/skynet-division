"use client";

import { memo, useState } from "react";
import { FaBell } from "react-icons/fa";
import { useAuth } from "@/context/auth-context";
import { Button } from "../ui/button";
import { Sheet, SheetTrigger, SheetContent, SheetHeader, SheetTitle, SheetDescription } from "@/components/ui/sheet";

const Notifications = () => {
  const { user } = useAuth();
  const [open, setOpen] = useState(false);

  const count = user?.notifications ?? 0;
  const displayCount = count > 9 ? "9+" : count;

  return (
    <Sheet open={open} onOpenChange={setOpen}>
      <SheetTrigger asChild>
        <div className="relative inline-block">
          <Button
            variant="ghost"
            size="icon"
          >
            <FaBell />
          </Button>

          {count > 0 && (
            <span className="absolute top-0 right-2 translate-x-1/2 -translate-y-1/2 
            bg-red-500 text-xs font-bold rounded-full w-6 h-6 
            flex items-center justify-center select-none dark:bg-card dark:border dark:text-green-300">
              {displayCount}
            </span>
          )}
        </div>
      </SheetTrigger>
      <SheetContent side="right" className="w-full sm:w-96">
        <SheetHeader>
          <SheetTitle>Powiadomienia</SheetTitle>
          <SheetDescription>Oto Twoje najnowsze powiadomienia.</SheetDescription>
        </SheetHeader>
        <div className="p-6">
          {/* Tutaj możesz wstawić dynamiczną listę powiadomień */}
          {count === 0 ? (
            <p className="text-sm text-muted-foreground text-center mt-4">Brak nowych powiadomień.</p>
          ) : (
            <ul className="space-y-2">
              {[...Array(count)].map((_, i) => (
                <li key={i} className="bg-gray-100 dark:bg-gray-800 p-3 rounded-md text-sm">
                  Przykładowe powiadomienie #{i + 1}
                </li>
              ))}
            </ul>
          )}
        </div>
      </SheetContent>
    </Sheet>
  );
};

export default memo(Notifications);
