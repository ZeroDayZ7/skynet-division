// components/GuideSection.tsx
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

interface GuideSectionProps {
  handleNavigation: (link: string) => void;
}

export default function GuideSection({ handleNavigation }: GuideSectionProps) {
  return (
    <div className="mt-10">
      <h2 className="text-2xl font-bold mb-4">Dowiedz się więcej</h2>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <Card
          className="cursor-pointer hover:shadow-md transition"
          onClick={() => handleNavigation("/dashboard/citizens-projects/guide/writing")}
          role="button"
          tabIndex={0}
          onKeyDown={(e) => e.key === "Enter" && handleNavigation("/dashboard/citizens-projects/guide/writing")}
        >
          <CardHeader className="pb-2">
            <CardTitle className="text-lg">Jak napisać dobry projekt?</CardTitle>
          </CardHeader>
          <CardContent className="pt-0">
            <p className="text-sm text-muted-foreground">
              Poznaj zasady pisania efektywnych projektów obywatelskich.
            </p>
          </CardContent>
        </Card>
        <Card
          className="cursor-pointer hover:shadow-md transition"
          onClick={() => handleNavigation("/dashboard/citizens-projects/guide/budget")}
          role="button"
          tabIndex={0}
          onKeyDown={(e) => e.key === "Enter" && handleNavigation("/dashboard/citizens-projects/guide/budget")}
        >
          <CardHeader className="pb-2">
            <CardTitle className="text-lg">Planowanie budżetu</CardTitle>
          </CardHeader>
          <CardContent className="pt-0">
            <p className="text-sm text-muted-foreground">
              Jak oszacować koszty i zaplanować budżet projektu.
            </p>
          </CardContent>
        </Card>
        <Card
          className="cursor-pointer hover:shadow-md transition"
          onClick={() => handleNavigation("/dashboard/citizens-projects/guide/promotion")}
          role="button"
          tabIndex={0}
          onKeyDown={(e) => e.key === "Enter" && handleNavigation("/dashboard/citizens-projects/guide/promotion")}
        >
          <CardHeader className="pb-2">
            <CardTitle className="text-lg">Promowanie projektu</CardTitle>
          </CardHeader>
          <CardContent className="pt-0">
            <p className="text-sm text-muted-foreground">
              Strategie zdobywania poparcia dla Twojego projektu.
            </p>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}