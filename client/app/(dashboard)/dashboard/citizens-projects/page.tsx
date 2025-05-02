"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { 
  Plus, 
  ListFilter, 
  Info, 
  Clock, 
  Award, 
  TrendingUp, 
  FileText, 
  Calendar, 
  Users, 
  ChevronRight, 
  ThumbsUp, 
  Loader2, 
  Bell,
  AlertCircle,
  Check
} from "lucide-react";

import { Card, CardContent, CardFooter, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { Separator } from "@/components/ui/separator";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import {
  HoverCard,
  HoverCardContent,
  HoverCardTrigger,
} from "@/components/ui/hover-card";

export default function CitizenProjectsHome() {
  const [isLoading, setIsLoading] = useState(false);
  const [activeTab, setActiveTab] = useState("overview");
  const [popularProjects, setPopularProjects] = useState([]);
  const [recentProjects, setRecentProjects] = useState([]);
  const [projectStats, setProjectStats] = useState({
    total: 0,
    approved: 0,
    inProgress: 0,
    completed: 0,
    budget: 0
  });
  const [notifications, setNotifications] = useState(3);
  const router = useRouter();

  useEffect(() => {
    // Symulacja ładowania danych
    const loadData = async () => {
      setIsLoading(true);
      
      // Symulacja opóźnienia API
      await new Promise(resolve => setTimeout(resolve, 800));
      
      // Przykładowe dane
      setPopularProjects([
        {
          id: 1,
          title: "Rewitalizacja parku miejskiego",
          category: "Ekologia",
          votes: 348,
          progress: 78,
          daysLeft: 12,
          author: {
            name: "Aleksandra Kowalska",
            avatar: "/api/placeholder/32/32"
          }
        },
        {
          id: 2,
          title: "Budowa centrum kultury",
          category: "Kultura",
          votes: 267,
          progress: 54,
          daysLeft: 18,
          author: {
            name: "Piotr Nowak",
            avatar: "/api/placeholder/32/32"
          }
        },
        {
          id: 3,
          title: "Rozbudowa ścieżek rowerowych",
          category: "Infrastruktura",
          votes: 192,
          progress: 45,
          daysLeft: 25,
          author: {
            name: "Tomasz Wiśniewski",
            avatar: "/api/placeholder/32/32"
          }
        },
      ]);
      
      setRecentProjects([
        {
          id: 4,
          title: "Warsztaty programowania dla dzieci",
          category: "Edukacja",
          createdAt: "2 dni temu",
          status: "Nowy"
        },
        {
          id: 5,
          title: "Modernizacja placu zabaw",
          category: "Infrastruktura",
          createdAt: "3 dni temu",
          status: "Weryfikacja"
        },
        {
          id: 6,
          title: "Koncerty plenerowe w parku",
          category: "Kultura",
          createdAt: "5 dni temu",
          status: "Zaakceptowany"
        },
      ]);
      
      setProjectStats({
        total: 127,
        approved: 64,
        inProgress: 38,
        completed: 25,
        budget: 4500000
      });
      
      setIsLoading(false);
    };
    
    loadData();
  }, []);

  const handleNavigation = (link) => {
    setIsLoading(true);
    router.push(link);
  };

  const getCategoryColor = (category) => {
    const colors = {
      "Ekologia": "bg-green-100 text-green-800 hover:bg-green-200",
      "Infrastruktura": "bg-blue-100 text-blue-800 hover:bg-blue-200",
      "Kultura": "bg-purple-100 text-purple-800 hover:bg-purple-200",
      "Edukacja": "bg-amber-100 text-amber-800 hover:bg-amber-200",
      "Zdrowie": "bg-red-100 text-red-800 hover:bg-red-200",
      "Sport": "bg-orange-100 text-orange-800 hover:bg-orange-200"
    };
    
    return colors[category] || "bg-gray-100 text-gray-800 hover:bg-gray-200";
  };

  const getStatusColor = (status) => {
    const colors = {
      "Nowy": "bg-blue-100 text-blue-800",
      "Weryfikacja": "bg-amber-100 text-amber-800",
      "Zaakceptowany": "bg-green-100 text-green-800",
      "Odrzucony": "bg-red-100 text-red-800",
      "W realizacji": "bg-purple-100 text-purple-800",
      "Zakończony": "bg-gray-100 text-gray-800"
    };
    
    return colors[status] || "bg-gray-100 text-gray-800";
  };

  if (isLoading) {
    return (
      <div className="flex-1 flex flex-col items-center justify-center min-h-[500px]">
        <Loader2 className="h-12 w-12 text-primary animate-spin mb-4" />
        <p className="text-lg text-muted-foreground">Ładowanie projektów obywatelskich...</p>
      </div>
    );
  }

  return (
    <div className="container mx-auto py-6 px-4 max-w-6xl">
      {/* Nagłówek */}
      <div className="mb-8 flex flex-col md:flex-row justify-between items-start md:items-center">
        <div>
          <h1 className="text-3xl font-bold">Projekty Obywatelskie</h1>
          <p className="text-muted-foreground mt-1">Współtwórz swoją społeczność lokalną</p>
        </div>
        
        <div className="flex space-x-2 mt-4 md:mt-0">
          <TooltipProvider>
            <Tooltip>
              <TooltipTrigger asChild>
                <Button variant="outline" size="icon" className="relative" onClick={() => router.push("/dashboard/citizens-projects/notifications")}>
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

      {/* Komunikaty systemowe */}
      <Alert className="mb-6 border-amber-200 bg-grey-500">
        <AlertCircle className="h-4 w-4 text-amber-600" />
        <AlertTitle>Ważna informacja</AlertTitle>
        <AlertDescription>
          Nabór projektów na rok 2026 rozpocznie się 1 czerwca 2025. Przygotuj swoje pomysły!
        </AlertDescription>
      </Alert>

      {/* Karty akcji */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-8">
        <Card className="cursor-pointer hover:shadow-lg transition" onClick={() => handleNavigation("/dashboard/citizens-projects/new")}>
          <CardHeader className="flex flex-row items-center justify-between pb-2 space-y-0">
            <CardTitle className="text-lg font-medium">Dodaj Projekt</CardTitle>
            <Plus className="h-5 w-5 text-primary" />
          </CardHeader>
          <CardContent className="pt-2">
            <p className="text-sm text-muted-foreground">Zgłoś swój pomysł do budżetu obywatelskiego</p>
          </CardContent>
        </Card>
        
        <Card className="cursor-pointer hover:shadow-lg transition" onClick={() => handleNavigation("/dashboard/citizens-projects/list")}>
          <CardHeader className="flex flex-row items-center justify-between pb-2 space-y-0">
            <CardTitle className="text-lg font-medium">Przeglądaj Projekty</CardTitle>
            <ListFilter className="h-5 w-5 text-primary" />
          </CardHeader>
          <CardContent className="pt-2">
            <p className="text-sm text-muted-foreground">Zobacz i oceń projekty innych mieszkańców</p>
          </CardContent>
        </Card>
        
        <Card className="cursor-pointer hover:shadow-lg transition" onClick={() => handleNavigation("/dashboard/citizens-projects/my-projects")}>
          <CardHeader className="flex flex-row items-center justify-between pb-2 space-y-0">
            <CardTitle className="text-lg font-medium">Moje Projekty</CardTitle>
            <FileText className="h-5 w-5 text-primary" />
          </CardHeader>
          <CardContent className="pt-2">
            <p className="text-sm text-muted-foreground">Sprawdź status swoich zgłoszonych projektów</p>
          </CardContent>
        </Card>
      </div>

      {/* Statystyki */}
      <Card className="mb-8">
        <CardHeader>
          <CardTitle className="text-xl">Statystyki projektów</CardTitle>
          <CardDescription>Dane dotyczące aktualnego budżetu obywatelskiego</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-2 md:grid-cols-5 gap-4 text-center">
            <div className="flex flex-col items-center">
              <p className="text-3xl font-bold text-primary">{projectStats.total}</p>
              <p className="text-sm text-muted-foreground">Wszystkich projektów</p>
            </div>
            <div className="flex flex-col items-center">
              <p className="text-3xl font-bold text-green-600">{projectStats.approved}</p>
              <p className="text-sm text-muted-foreground">Zaakceptowanych</p>
            </div>
            <div className="flex flex-col items-center">
              <p className="text-3xl font-bold text-amber-600">{projectStats.inProgress}</p>
              <p className="text-sm text-muted-foreground">W realizacji</p>
            </div>
            <div className="flex flex-col items-center">
              <p className="text-3xl font-bold text-blue-600">{projectStats.completed}</p>
              <p className="text-sm text-muted-foreground">Zakończonych</p>
            </div>
            <div className="flex flex-col items-center">
              <p className="text-3xl font-bold text-purple-600">{(projectStats.budget / 1000000).toFixed(1)} mln</p>
              <p className="text-sm text-muted-foreground">Budżet (PLN)</p>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Zakładki z treścią */}
      <Tabs defaultValue="overview" className="mb-6" onValueChange={setActiveTab}>
        <TabsList className="grid w-full grid-cols-3 mb-6">
          <TabsTrigger value="overview">Przegląd</TabsTrigger>
          <TabsTrigger value="popular">Popularne projekty</TabsTrigger>
          <TabsTrigger value="recent">Ostatnio dodane</TabsTrigger>
        </TabsList>
        
        <TabsContent value="overview">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {/* Karta z instrukcją */}
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
                    <p className="text-sm text-muted-foreground">Wypełnij formularz z opisem projektu, lokalizacją i szacowanym budżetem.</p>
                  </div>
                </div>
                
                <div className="flex items-start space-x-3">
                  <div className="bg-primary/10 p-2 rounded-full">
                    <Check className="h-5 w-5 text-primary" />
                  </div>
                  <div>
                    <h4 className="font-medium">Weryfikacja</h4>
                    <p className="text-sm text-muted-foreground">Projekt przechodzi ocenę formalną i merytoryczną przez zespół ekspertów.</p>
                  </div>
                </div>
                
                <div className="flex items-start space-x-3">
                  <div className="bg-primary/10 p-2 rounded-full">
                    <Users className="h-5 w-5 text-primary" />
                  </div>
                  <div>
                    <h4 className="font-medium">Głosowanie</h4>
                    <p className="text-sm text-muted-foreground">Mieszkańcy głosują na projekty, które ich zdaniem powinny zostać zrealizowane.</p>
                  </div>
                </div>
                
                <div className="flex items-start space-x-3">
                  <div className="bg-primary/10 p-2 rounded-full">
                    <Award className="h-5 w-5 text-primary" />
                  </div>
                  <div>
                    <h4 className="font-medium">Realizacja</h4>
                    <p className="text-sm text-muted-foreground">Projekty z największą liczbą głosów są realizowane z budżetu miasta.</p>
                  </div>
                </div>
              </CardContent>
              <CardFooter>
                <Button variant="outline" onClick={() => handleNavigation("/dashboard/citizens-projects/guide")} className="w-full">
                  Poznaj szczegółowe zasady
                  <ChevronRight className="ml-2 h-4 w-4" />
                </Button>
              </CardFooter>
            </Card>
            
            {/* Terminarz */}
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
                    <Badge variant="outline" className="bg-green-50 text-green-700 border-green-200">Zakończone</Badge>
                    <p className="font-medium">Przyjmowanie zgłoszeń</p>
                  </div>
                  <p className="text-sm text-muted-foreground">01.02 - 31.03.2025</p>
                </div>
                <Separator />
                
                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-2">
                    <Badge variant="outline" className="bg-amber-50 text-amber-700 border-amber-200">Trwa</Badge>
                    <p className="font-medium">Weryfikacja projektów</p>
                  </div>
                  <p className="text-sm text-muted-foreground">01.04 - 31.05.2025</p>
                </div>
                <Separator />
                
                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-2">
                    <Badge variant="outline" className="bg-gray-50 text-gray-700 border-gray-200">Planowane</Badge>
                    <p className="font-medium">Głosowanie mieszkańców</p>
                  </div>
                  <p className="text-sm text-muted-foreground">01.06 - 30.06.2025</p>
                </div>
                <Separator />
                
                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-2">
                    <Badge variant="outline" className="bg-gray-50 text-gray-700 border-gray-200">Planowane</Badge>
                    <p className="font-medium">Ogłoszenie wyników</p>
                  </div>
                  <p className="text-sm text-muted-foreground">15.07.2025</p>
                </div>
                <Separator />
                
                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-2">
                    <Badge variant="outline" className="bg-gray-50 text-gray-700 border-gray-200">Planowane</Badge>
                    <p className="font-medium">Realizacja zwycięskich projektów</p>
                  </div>
                  <p className="text-sm text-muted-foreground">01.01 - 31.12.2026</p>
                </div>
              </CardContent>
              <CardFooter>
                <Button variant="outline" onClick={() => handleNavigation("/dashboard/citizens-projects/calendar")} className="w-full">
                  Zobacz pełny harmonogram
                  <ChevronRight className="ml-2 h-4 w-4" />
                </Button>
              </CardFooter>
            </Card>
          </div>
        </TabsContent>
        
        <TabsContent value="popular">
          <div className="space-y-4">
            {popularProjects.map((project) => (
              <Card key={project.id} className="overflow-hidden hover:shadow-md transition cursor-pointer" onClick={() => handleNavigation(`/dashboard/citizens-projects/details/${project.id}`)}>
                <CardHeader className="pb-3">
                  <div className="flex items-start justify-between">
                    <div>
                      <CardTitle>{project.title}</CardTitle>
                      <CardDescription className="mt-1">
                        <Badge className={getCategoryColor(project.category)}>
                          {project.category}
                        </Badge>
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
                            <p className="text-sm text-muted-foreground">
                              Autor projektu
                            </p>
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
              <Button variant="outline" onClick={() => handleNavigation("/dashboard/citizens-projects/popular")}>
                Zobacz wszystkie popularne projekty
                <ChevronRight className="ml-2 h-4 w-4" />
              </Button>
            </div>
          </div>
        </TabsContent>
        
        <TabsContent value="recent">
          <div className="space-y-3">
            {recentProjects.map((project) => (
              <Card key={project.id} className="overflow-hidden hover:bg-muted/5 transition cursor-pointer" onClick={() => handleNavigation(`/dashboard/citizens-projects/details/${project.id}`)}>
                <div className="flex items-center p-4">
                  <div className="flex-1">
                    <h3 className="font-medium">{project.title}</h3>
                    <div className="flex items-center mt-1 space-x-2">
                      <Badge className={getCategoryColor(project.category)}>
                        {project.category}
                      </Badge>
                      <span className="text-sm text-muted-foreground">{project.createdAt}</span>
                    </div>
                  </div>
                  <div className="flex items-center space-x-3">
                    <Badge className={getStatusColor(project.status)}>
                      {project.status}
                    </Badge>
                    <ChevronRight className="h-5 w-5 text-muted-foreground" />
                  </div>
                </div>
              </Card>
            ))}
            
            <div className="flex justify-center mt-8">
              <Button variant="outline" onClick={() => handleNavigation("/dashboard/citizens-projects/recent")}>
                Zobacz wszystkie ostatnie projekty
                <ChevronRight className="ml-2 h-4 w-4" />
              </Button>
            </div>
          </div>
        </TabsContent>
      </Tabs>

      {/* Sekcja dodatkowa - Poradniki */}
      <div className="mt-10">
        <h2 className="text-2xl font-bold mb-4">Dowiedz się więcej</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <Card className="cursor-pointer hover:shadow-md transition" onClick={() => handleNavigation("/dashboard/citizens-projects/guide/writing")}>
            <CardHeader className="pb-2">
              <CardTitle className="text-lg">Jak napisać dobry projekt?</CardTitle>
            </CardHeader>
            <CardContent className="pt-0">
              <p className="text-sm text-muted-foreground">Poznaj zasady pisania efektywnych projektów obywatelskich.</p>
            </CardContent>
          </Card>
          
          <Card className="cursor-pointer hover:shadow-md transition" onClick={() => handleNavigation("/dashboard/citizens-projects/guide/budget")}>
            <CardHeader className="pb-2">
              <CardTitle className="text-lg">Planowanie budżetu</CardTitle>
            </CardHeader>
            <CardContent className="pt-0">
              <p className="text-sm text-muted-foreground">Jak oszacować koszty i zaplanować budżet projektu.</p>
            </CardContent>
          </Card>
          
          <Card className="cursor-pointer hover:shadow-md transition" onClick={() => handleNavigation("/dashboard/citizens-projects/guide/promotion")}>
            <CardHeader className="pb-2">
              <CardTitle className="text-lg">Promowanie projektu</CardTitle>
            </CardHeader>
            <CardContent className="pt-0">
              <p className="text-sm text-muted-foreground">Strategie zdobywania poparcia dla Twojego projektu.</p>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}