// components/ui/loader.tsx
import { Loader2 } from "lucide-react";
import { cn } from "@/lib/utils";

export function Loader({ message = "Ładowanie...", className }: { message?: string; className?: string }) {
  return (
    <div className={cn("flex items-center justify-center gap-2 text-muted-foreground p-4", className)}>
      <Loader2 className="h-5 w-5 animate-spin" />
      <span>{message}</span>
    </div>
  );
}
