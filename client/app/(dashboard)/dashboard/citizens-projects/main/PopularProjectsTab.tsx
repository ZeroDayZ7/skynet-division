// components/PopularProjectsTab.tsx
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { HoverCard, HoverCardContent, HoverCardTrigger } from "@/components/ui/hover-card";
import { Progress } from "@/components/ui/progress";
import { ThumbsUp, Clock, ChevronRight } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { PopularProject } from "./citizenProjects";
import { getCategoryColor } from "./projectUtils";

interface PopularProjectsTabProps {
  projects: PopularProject[];
  handleNavigation: (link: string) => void;
}

export default function PopularProjectsTab({ projects, handleNavigation }: PopularProjectsTabProps) {
  return (
    <div className="space-y-4">
      {projects.map((project) => (
        <Card
          key={project.id}
          className="overflow-hidden hover:shadow-md transition cursor-pointer"
          onClick={() => handleNavigation(`/dashboard/citizens-projects/details/${project.id}`)}
          role="button"
          tabIndex={0}
          onKeyDown={(e) =>
            e.key === "Enter" && handleNavigation(`/dashboard/citizens-projects/details/${project.id}`)
          }
        >
          <CardHeader className="pb-3">
            <div className="flex items-start justify-between">
              <div>
                <CardTitle>{project.title}</CardTitle>
                <CardDescription className="mt-1">
                  <Badge className={getCategoryColor(project.category)}>{project.category}</Badge>
                </CardDescription>
              </div>
              <HoverCard>
                <HoverCardTrigger asChild>
                  <Avatar className="cursor-pointer">
                    <AvatarImage src={project.author.avatar} alt={project.author.name} />
                    <AvatarFallback>{project.author.name.charAt(0)}</AvatarFallback>
                  </Avatar>
                </HoverCardTrigger>
                <HoverCardContent className="w-64">
                  <div className="flex justify-between space-x-4">
                    <Avatar>
                      <AvatarImage src={project.author.avatar} />
                      <AvatarFallback>{project.author.name.charAt(0)}</AvatarFallback>
                    </Avatar>
                    <div>
                      <h4 className="text-sm font-semibold">{project.author.name}</h4>
                      <p className="text-sm text-muted-foreground">Autor projektu</p>
                      <div className="flex items-center pt-2">
                        <Button variant="outline" size="sm">
                          Zobacz profil
                        </Button>
                      </div>
                    </div>
                  </div>
                </HoverCardContent>
              </HoverCard>
            </div>
          </CardHeader>
          <CardContent className="pb-4">
            <div className="space-y-4">
              <div className="flex justify-between items-center text-sm">
                <div className="flex items-center">
                  <ThumbsUp className="mr-1 h-4 w-4 text-blue-500" />
                  <span>{project.votes} głosów</span>
                </div>
                <div className="flex items-center">
                  <Clock className="mr-1 h-4 w-4 text-amber-500" />
                  <span>Pozostało {project.daysLeft} dni</span>
                </div>
              </div>
              <div className="space-y-1">
                <div className="flex justify-between text-sm">
                  <span>Postęp głosowania</span>
                  <span className="font-medium">{project.progress}%</span>
                </div>
                <Progress value={project.progress} className="h-2" />
              </div>
            </div>
          </CardContent>
        </Card>
      ))}
      <div className="flex justify-center mt-8">
        <Button
          variant="outline"
          onClick={() => handleNavigation("/dashboard/citizens-projects/popular")}
        >
          Zobacz wszystkie popularne projekty
          <ChevronRight className="ml-2 h-4 w-4" />
        </Button>
      </div>
    </div>
  );
}