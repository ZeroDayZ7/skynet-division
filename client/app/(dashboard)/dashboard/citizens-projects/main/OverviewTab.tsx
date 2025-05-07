// components/OverviewTab.tsx
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import { Info, Calendar, FileText, Check, Users, Award, ChevronRight } from "lucide-react";
import { Badge } from "@/components/ui/badge";

interface OverviewTabProps {
  handleNavigation: (link: string) => void;
}

export default function OverviewTab({ handleNavigation }: OverviewTabProps) {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center">
            <Info className="mr-2 h-5 w-5" />
            Jak działają projekty obywatelskie?
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="flex items-start space-x-3">
            <div className="bg-primary/10 p-2 rounded-full">
              <FileText className="h-5 w-5 text-primary" />
            </div>
            <div>
              <h4 className="font-medium">Zgłoś pomysł</h4>
              <p className="text-sm text-muted-foreground">
                Wypełnij formularz z opisem projektu, lokalizacją i szacowanym budżetem.
              </p>
            </div>
          </div>
          <div className="flex items-start space-x-3">
            <div className="bg-primary/10 p-2 rounded-full">
              <Check className="h-5 w-5 text-primary" />
            </div>
            <div>
              <h4 className="font-medium">Weryfikacja</h4>
              <p className="text-sm text-muted-foreground">
                Projekt przechodzi ocenę formalną i merytoryczną przez zespół ekspertów.
              </p>
            </div>
          </div>
          <div className="flex items-start space-x-3">
            <div className="bg-primary/10 p-2 rounded-full">
              <Users className="h-5 w-5 text-primary" />
            </div>
            <div>
              <h4 className="font-medium">Głosowanie</h4>
              <p className="text-sm text-muted-foreground">
                Mieszkańcy głosują na projekty, które ich zdaniem powinny zostać zrealizowane.
              </p>
            </div>
          </div>
          <div className="flex items-start space-x-3">
            <div className="bg-primary/10 p-2 rounded-full">
              <Award className="h-5 w-5 text-primary" />
            </div>
            <div>
              <h4 className="font-medium">Realizacja</h4>
              <p className="text-sm text-muted-foreground">
                Projekty z największą liczbą głosów są realizowane z budżetu miasta.
              </p>
            </div>
          </div>
        </CardContent>
        <CardFooter>
          <Button
            variant="outline"
            onClick={() => handleNavigation("/dashboard/citizens-projects/guide")}
            className="w-full"
          >
            Poznaj szczegółowe zasady
            <ChevronRight className="ml-2 h-4 w-4" />
          </Button>
        </CardFooter>
      </Card>
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center">
            <Calendar className="mr-2 h-5 w-5" />
            Harmonogram
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-2">
              <Badge variant="outline" className="bg-green-50 text-green-700 border-green-200">
                Zakończone
              </Badge>
              <p className="font-medium">Przyjmowanie zgłoszeń</p>
            </div>
            <p className="text-sm text-muted-foreground">01.02 - 31.03.2025</p>
          </div>
          <Separator />
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-2">
              <Badge variant="outline" className="bg-amber-50 text-amber-700 border-amber-200">
                Trwa
              </Badge>
              <p className="font-medium">Weryfikacja projektów</p>
            </div>
            <p className="text-sm text-muted-foreground">01.04 - 31.05.2025</p>
          </div>
          <Separator />
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-2">
              <Badge variant="outline" className="bg-gray-50 text-gray-700 border-gray-200">
                Planowane
              </Badge>
              <p className="font-medium">Głosowanie mieszkańców</p>
            </div>
            <p className="text-sm text-muted-foreground">01.06 - 30.06.2025</p>
          </div>
          <Separator />
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-2">
              <Badge variant="outline" className="bg-gray-50 text-gray-700 border-gray-200">
                Planowane
              </Badge>
              <p className="font-medium">Ogłoszenie wyników</p>
            </div>
            <p className="text-sm text-muted-foreground">15.07.2025</p>
          </div>
          <Separator />
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-2">
              <Badge variant="outline" className="bg-gray-50 text-gray-700 border-gray-200">
                Planowane
              </Badge>
              <p className="font-medium">Realizacja zwycięskich projektów</p>
            </div>
            <p className="text-sm text-muted-foreground">01.01 - 31.12.2026</p>
          </div>
        </CardContent>
        <CardFooter>
          <Button
            variant="outline"
            onClick={() => handleNavigation("/dashboard/citizens-projects/calendar")}
            className="w-full"
          >
            Zobacz pełny harmonogram
            <ChevronRight className="ml-2 h-4 w-4" />
          </Button>
        </CardFooter>
      </Card>
    </div>
  );
}