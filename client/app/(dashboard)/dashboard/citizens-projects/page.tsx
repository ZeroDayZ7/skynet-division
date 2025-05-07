// app/(dashboard)/dashboard/citizens-projects/page.tsx
"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { AlertCircle, Loader2 } from "lucide-react";
import type { PopularProject, RecentProject, ProjectStats } from "./main/citizenProjects";
import ProjectHeader from "./main/ProjectHeader";
import ActionCards from "./main/ActionCards";
import ProjectStats2 from "./main/ProjectStats";
import ProjectTabs from "./main/ProjectTabs";
import GuideSection from "./main/GuideSection";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";

export default function CitizenProjectsHome() {
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [popularProjects, setPopularProjects] = useState<PopularProject[]>([]);
  const [recentProjects, setRecentProjects] = useState<RecentProject[]>([]);
  const [projectStats, setProjectStats] = useState<ProjectStats>({
    total: 0,
    approved: 0,
    inProgress: 0,
    completed: 0,
    budget: 0,
  });
  const [notifications, setNotifications] = useState(3);
  const router = useRouter();

  useEffect(() => {
    const loadData = async () => {
      setIsLoading(true);
      try {
        // Simulate API delay
        await new Promise((resolve) => setTimeout(resolve, 800));

        setPopularProjects([
          {
            id: 1,
            title: "Rewitalizacja parku miejskiego",
            category: "Ekologia",
            votes: 348,
            progress: 78,
            daysLeft: 12,
            author: { name: "Aleksandra Kowalska", avatar: "/api/placeholder/32/32" },
          },
          {
            id: 2,
            title: "Budowa centrum kultury",
            category: "Kultura",
            votes: 267,
            progress: 54,
            daysLeft: 18,
            author: { name: "Piotr Nowak", avatar: "/api/placeholder/32/32" },
          },
          {
            id: 3,
            title: "Rozbudowa ścieżek rowerowych",
            category: "Infrastruktura",
            votes: 192,
            progress: 45,
            daysLeft: 25,
            author: { name: "Tomasz Wiśniewski", avatar: "/api/placeholder/32/32" },
          },
        ]);

        setRecentProjects([
          {
            id: 4,
            title: "Warsztaty programowania dla dzieci",
            category: "Edukacja",
            createdAt: "2 dni temu",
            status: "Nowy",
          },
          {
            id: 5,
            title: "Modernizacja placu zabaw",
            category: "Infrastruktura",
            createdAt: "3 dni temu",
            status: "Weryfikacja",
          },
          {
            id: 6,
            title: "Koncerty plenerowe w parku",
            category: "Kultura",
            createdAt: "5 dni temu",
            status: "Zaakceptowany",
          },
        ]);

        setProjectStats({
          total: 127,
          approved: 64,
          inProgress: 38,
          completed: 25,
          budget: 4500000,
        });
      } catch (err) {
        setError("Nie udało się załadować danych projektów.");
        console.error(err);
      } finally {
        setIsLoading(false);
      }
    };

    loadData();
  }, []);

  const handleNavigation = (link: string) => {
    setIsLoading(true);
    router.push(link);
  };

  if (isLoading) {
    return (
      <div className="flex-1 flex flex-col items-center justify-center min-h-[500px]">
        <Loader2 className="h-12 w-12 text-primary animate-spin mb-4" aria-label="Ładowanie" />
        <p className="text-lg text-muted-foreground">Ładowanie projektów obywatelskich...</p>
      </div>
    );
  }

  if (error) {
    return (
      <div className="container mx-auto py-6 px-4 max-w-6xl">
        <Alert variant="destructive">
          <AlertCircle className="h-4 w-4" />
          <AlertTitle>Błąd</AlertTitle>
          <AlertDescription>{error}</AlertDescription>
        </Alert>
      </div>
    );
  }

  return (
    <div className="container mx-auto py-6 px-4 max-w-6xl">
      <ProjectHeader notifications={notifications} handleNavigation={handleNavigation} />
      <ActionCards handleNavigation={handleNavigation} />
      <ProjectStats2 stats={projectStats} />
      <ProjectTabs
        popularProjects={popularProjects}
        recentProjects={recentProjects}
        handleNavigation={handleNavigation}
      />
      <GuideSection handleNavigation={handleNavigation} />
    </div>
  );
}