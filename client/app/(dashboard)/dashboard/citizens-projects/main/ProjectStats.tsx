// components/ProjectStats.tsx
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import type { ProjectStats } from "./citizenProjects";

interface ProjectStatsProps {
  stats: ProjectStats;
}

export default function ProjectStats2({ stats }: ProjectStatsProps) {
  return (
    <Card className="mb-8">
      <CardHeader>
        <CardTitle className="text-xl">Statystyki projektów</CardTitle>
        <CardDescription>Dane dotyczące aktualnego budżetu obywatelskiego</CardDescription>
      </CardHeader>
      <CardContent>
        <div className="grid grid-cols-2 md:grid-cols-5 gap-4 text-center">
          <div className="flex flex-col items-center">
            <p className="text-3xl font-bold text-primary">{stats.total}</p>
            <p className="text-sm text-muted-foreground">Wszystkich projektów</p>
          </div>
          <div className="flex flex-col items-center">
            <p className="text-3xl font-bold text-green-600">{stats.approved}</p>
            <p className="text-sm text-muted-foreground">Zaakceptowanych</p>
          </div>
          <div className="flex flex-col items-center">
            <p className="text-3xl font-bold text-amber-600">{stats.inProgress}</p>
            <p className="text-sm text-muted-foreground">W realizacji</p>
          </div>
          <div className="flex flex-col items-center">
            <p className="text-3xl font-bold text-blue-600">{stats.completed}</p>
            <p className="text-sm text-muted-foreground">Zakończonych</p>
          </div>
          <div className="flex flex-col items-center">
            <p className="text-3xl font-bold text-purple-600">{(stats.budget / 1000000).toFixed(1)} mln</p>
            <p className="text-sm text-muted-foreground">Budżet (PLN)</p>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}