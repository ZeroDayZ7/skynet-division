// components/ProjectHeader.tsx
import { Bell, Plus, AlertCircle } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";

interface ProjectHeaderProps {
  notifications: number;
  handleNavigation: (link: string) => void;
}

export default function ProjectHeader({ notifications, handleNavigation }: ProjectHeaderProps) {
  return (
    <>
      <div className="mb-8 flex flex-col md:flex-row justify-between items-start md:items-center">
        <div>
          <h1 className="text-3xl font-bold">Projekty Obywatelskie</h1>
          <p className="text-muted-foreground mt-1">Współtwórz swoją społeczność lokalną</p>
        </div>
        <div className="flex space-x-2 mt-4 md:mt-0">
          <TooltipProvider>
            <Tooltip>
              <TooltipTrigger asChild>
                <Button
                  variant="outline"
                  size="icon"
                  className="relative"
                  onClick={() => handleNavigation("/dashboard/citizens-projects/notifications")}
                  aria-label={`Powiadomienia (${notifications})`}
                >
                  <Bell className="h-4 w-4" />
                  {notifications > 0 && (
                    <span className="absolute top-0 right-0 h-3 w-3 bg-red-500 rounded-full text-[10px] flex items-center justify-center text-white translate-x-1 -translate-y-1"></span>
                  )}
                </Button>
              </TooltipTrigger>
              <TooltipContent>
                <p>Powiadomienia ({notifications})</p>
              </TooltipContent>
            </Tooltip>
          </TooltipProvider>
          <Button onClick={() => handleNavigation("/dashboard/citizens-projects/new")}>
            <Plus className="h-4 w-4 mr-2" />
            Nowy projekt
          </Button>
        </div>
      </div>
      <Alert className="mb-6 border-amber-200 bg-grey-500">
        <AlertCircle className="h-4 w-4 text-amber-600" />
        <AlertTitle>Ważna informacja</AlertTitle>
        <AlertDescription>
          Nabór projektów na rok 2026 rozpocznie się 1 czerwca 2025. Przygotuj swoje pomysły!
        </AlertDescription>
      </Alert>
    </>
  );
}