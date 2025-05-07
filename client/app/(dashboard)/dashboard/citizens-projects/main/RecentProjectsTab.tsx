// components/RecentProjectsTab.tsx
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { ChevronRight } from "lucide-react";
import { RecentProject } from "./citizenProjects";
import { getCategoryColor, getStatusColor } from "./projectUtils";

interface RecentProjectsTabProps {
  projects: RecentProject[];
  handleNavigation: (link: string) => void;
}

export default function RecentProjectsTab({ projects, handleNavigation }: RecentProjectsTabProps) {
  return (
    <div className="space-y-3">
      {projects.map((project) => (
        <Card
          key={project.id}
          className="overflow-hidden hover:bg-muted/5 transition cursor-pointer"
          onClick={() => handleNavigation(`/dashboard/citizens-projects/details/${project.id}`)}
          role="button"
          tabIndex={0}
          onKeyDown={(e) =>
            e.key === "Enter" && handleNavigation(`/dashboard/citizens-projects/details/${project.id}`)
          }
        >
          <div className="flex items-center p-4">
            <div className="flex-1">
              <h3 className="font-medium">{project.title}</h3>
              <div className="flex items-center mt-1 space-x-2">
                <Badge className={getCategoryColor(project.category)}>{project.category}</Badge>
                <span className="text-sm text-muted-foreground">{project.createdAt}</span>
              </div>
            </div>
            <div className="flex items-center space-x-3">
              <Badge className={getStatusColor(project.status)}>{project.status}</Badge>
              <ChevronRight className="h-5 w-5 text-muted-foreground" />
            </div>
          </div>
        </Card>
      ))}
      <div className="flex justify-center mt-8">
        <Button
          variant="outline"
          onClick={() => handleNavigation("/dashboard/citizens-projects/recent")}
        >
          Zobacz wszystkie ostatnie projekty
          <ChevronRight className="ml-2 h-4 w-4" />
        </Button>
      </div>
    </div>
  );
}