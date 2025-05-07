// components/ProjectTabs.tsx
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { PopularProject, RecentProject } from "./citizenProjects";
import OverviewTab from "./OverviewTab";
import PopularProjectsTab from "./PopularProjectsTab";
import RecentProjectsTab from "./RecentProjectsTab";
import { useState } from "react";

interface ProjectTabsProps {
  popularProjects: PopularProject[];
  recentProjects: RecentProject[];
  handleNavigation: (link: string) => void;
}

export default function ProjectTabs({ popularProjects, recentProjects, handleNavigation }: ProjectTabsProps) {
  const [activeTab, setActiveTab] = useState("overview");

  return (
    <Tabs value={activeTab} onValueChange={setActiveTab} className="mb-6">
      <TabsList className="grid w-full grid-cols-3 mb-6">
        <TabsTrigger value="overview">Przegląd</TabsTrigger>
        <TabsTrigger value="popular">Popularne projekty</TabsTrigger>
        <TabsTrigger value="recent">Ostatnio dodane</TabsTrigger>
      </TabsList>
      <TabsContent value="overview">
        <OverviewTab handleNavigation={handleNavigation} />
      </TabsContent>
      <TabsContent value="popular">
        <PopularProjectsTab projects={popularProjects} handleNavigation={handleNavigation} />
      </TabsContent>
      <TabsContent value="recent">
        <RecentProjectsTab projects={recentProjects} handleNavigation={handleNavigation} />
      </TabsContent>
    </Tabs>
  );
}