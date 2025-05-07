// components/ActionCards.tsx
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Plus, ListFilter, FileText } from "lucide-react";

interface ActionCardsProps {
  handleNavigation: (link: string) => void;
}

export default function ActionCards({ handleNavigation }: ActionCardsProps) {
  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-8">
      <Card
        className="cursor-pointer hover:shadow-lg transition"
        onClick={() => handleNavigation("/dashboard/citizens-projects/new")}
        role="button"
        tabIndex={0}
        onKeyDown={(e) => e.key === "Enter" && handleNavigation("/dashboard/citizens-projects/new")}
      >
        <CardHeader className="flex flex-row items-center justify-between pb-2 space-y-0">
          <CardTitle className="text-lg font-medium">Dodaj Projekt</CardTitle>
          <Plus className="h-5 w-5 text-primary" />
        </CardHeader>
        <CardContent className="pt-2">
          <p className="text-sm text-muted-foreground">Zgłoś swój pomysł do budżetu obywatelskiego</p>
        </CardContent>
      </Card>
      <Card
        className="cursor-pointer hover:shadow-lg transition"
        onClick={() => handleNavigation("/dashboard/citizens-projects/list")}
        role="button"
        tabIndex={0}
        onKeyDown={(e) => e.key === "Enter" && handleNavigation("/dashboard/citizens-projects/list")}
      >
        <CardHeader className="flex flex-row items-center justify-between pb-2 space-y-0">
          <CardTitle className="text-lg font-medium">Przeglądaj Projekty</CardTitle>
          <ListFilter className="h-5 w-5 text-primary" />
        </CardHeader>
        <CardContent className="pt-2">
          <p className="text-sm text-muted-foreground">Zobacz i oceń projekty innych mieszkańców</p>
        </CardContent>
      </Card>
      <Card
        className="cursor-pointer hover:shadow-lg transition"
        onClick={() => handleNavigation("/dashboard/citizens-projects/my-projects")}
        role="button"
        tabIndex={0}
        onKeyDown={(e) => e.key === "Enter" && handleNavigation("/dashboard/citizens-projects/my-projects")}
      >
        <CardHeader className="flex flex-row items-center justify-between pb-2 space-y-0">
          <CardTitle className="text-lg font-medium">Moje Projekty</CardTitle>
          <FileText className="h-5 w-5 text-primary" />
        </CardHeader>
        <CardContent className="pt-2">
          <p className="text-sm text-muted-foreground">Sprawdź status swoich zgłoszonych projektów</p>
        </CardContent>
      </Card>
    </div>
  );
}