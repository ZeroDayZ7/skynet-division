"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { Search, MapPin, ThumbsUp, ChevronLeft, ChevronRight, Filter } from "lucide-react";

import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Badge } from "@/components/ui/badge";
import { Skeleton } from "@/components/ui/skeleton";

interface Project {
  id: number;
  title: string;
  category: string;
  location: string;
  budget: number;
  upvotes: number;
  description: string;
}

export default function CitizenProjects() {
  const [projects, setProjects] = useState<Project[]>([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [filterCategory, setFilterCategory] = useState("");
  const [isLoading, setIsLoading] = useState(true);
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const router = useRouter();

  // Symulacja danych projektów dla widoku UI
  useEffect(() => {
    // Symulacja ładowania danych - tylko dla prezentacji UI
    const mockProjects = [
      {
        id: 1,
        title: "Rewitalizacja parku miejskiego",
        category: "Ekologia",
        location: "Dzielnica Centrum",
        budget: 250000,
        upvotes: 124,
        description: "Projekt zakłada odnowienie zieleni i stworzenie nowych alejek w parku."
      },
      {
        id: 2,
        title: "Budowa ścieżki rowerowej",
        category: "Infrastruktura",
        location: "Osiedle Wschodnie",
        budget: 500000,
        upvotes: 89,
        description: "Nowa ścieżka rowerowa łącząca centrum miasta z osiedlami mieszkaniowymi."
      },
      {
        id: 3,
        title: "Punkt bezpłatnych badań profilaktycznych",
        category: "Zdrowie",
        location: "Dzielnica Północna",
        budget: 175000,
        upvotes: 210,
        description: "Organizacja cyklicznych, bezpłatnych badań dla mieszkańców."
      },
      {
        id: 4,
        title: "Modernizacja placu zabaw",
        category: "Infrastruktura",
        location: "Osiedle Parkowe",
        budget: 120000,
        upvotes: 156,
        description: "Wymiana starych urządzeń i montaż nowych atrakcji dla dzieci."
      },
    ];
    
    setTimeout(() => {
      setProjects(mockProjects);
      setTotalPages(3); // Symulacja większej liczby stron
      setIsLoading(false);
    }, 1000);
  }, [page]);

  const filteredProjects = projects.filter(project =>
    (searchTerm ? project.title.toLowerCase().includes(searchTerm.toLowerCase()) : true) &&
    (filterCategory ? project.category === filterCategory : true)
  );

  const getCategoryColor = (category: string) => {
    switch (category) {
      case "Ekologia": return "bg-green-100 text-green-800 hover:bg-green-200";
      case "Infrastruktura": return "bg-blue-100 text-blue-800 hover:bg-blue-200";
      case "Zdrowie": return "bg-red-100 text-red-800 hover:bg-red-200";
      default: return "bg-gray-100 text-gray-800 hover:bg-gray-200";
    }
  };

  return (
    <div className="container mx-auto py-6 px-4 max-w-4xl">
      <div className="mb-8">
        <h1 className="text-3xl font-bold mb-2">Projekty Obywatelskie</h1>
        <p className="text-gray-500">Przeglądaj i głosuj na projekty w Twojej okolicy</p>
      </div>

      {/* Filters */}
      <div className="flex flex-col md:flex-row gap-4 mb-8">
        <div className="relative flex-grow">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={18} />
          <Input
            placeholder="Szukaj projektów..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="pl-10"
          />
        </div>
        
        <Select value={filterCategory} onValueChange={setFilterCategory}>
          <SelectTrigger className="w-full md:w-[200px]">
            <div className="flex items-center">
              <Filter size={18} className="mr-2" />
              <SelectValue placeholder="Kategoria" />
            </div>
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="ee">Wszystkie kategorie</SelectItem>
            <SelectItem value="Ekologia">Ekologia</SelectItem>
            <SelectItem value="Infrastruktura">Infrastruktura</SelectItem>
            <SelectItem value="Zdrowie">Zdrowie</SelectItem>
          </SelectContent>
        </Select>
      </div>

      {/* Projects List */}
      {isLoading ? (
        <div className="space-y-4">
          {[1, 2, 3].map((i) => (
            <Card key={i} className="overflow-hidden">
              <CardHeader className="pb-2">
                <Skeleton className="h-6 w-3/4 mb-2" />
                <Skeleton className="h-4 w-1/2" />
              </CardHeader>
              <CardContent>
                <Skeleton className="h-4 w-full mb-2" />
                <Skeleton className="h-4 w-5/6" />
              </CardContent>
              <CardFooter>
                <Skeleton className="h-6 w-24" />
              </CardFooter>
            </Card>
          ))}
        </div>
      ) : (
        <>
          {filteredProjects.length > 0 ? (
            <div className="space-y-4">
              {filteredProjects.map((project) => (
                <Card key={project.id} className="overflow-hidden hover:shadow-md transition cursor-pointer" onClick={() => router.push(`/citizens-projects/${project.id}`)}>
                  <CardHeader className="pb-2">
                    <div className="flex items-start justify-between">
                      <CardTitle className="text-xl">{project.title}</CardTitle>
                      <Badge className={getCategoryColor(project.category)}>
                        {project.category}
                      </Badge>
                    </div>
                    <CardDescription className="flex items-center gap-1 mt-1">
                      <MapPin size={14} className="text-gray-500" />
                      {project.location}
                    </CardDescription>
                  </CardHeader>
                  <CardContent>
                    <p className="text-gray-300 mb-2">{project.description}</p>
                    <p className="font-medium">Budżet: {project.budget.toLocaleString()} PLN</p>
                  </CardContent>
                  <CardFooter className="bg-gray-700 flex justify-between py-3">
                    <div className="flex items-center gap-2">
                      <ThumbsUp size={16} className="text-blue-500" />
                      <span className="text-gray-200">{project.upvotes} głosów</span>
                    </div>
                    <Button variant="outline" size="sm">
                      Szczegóły
                    </Button>
                  </CardFooter>
                </Card>
              ))}
            </div>
          ) : (
            <div className="flex flex-col items-center justify-center py-12 text-center bg-gray-700 rounded-lg">
              <Search size={48} className="text-gray-300 mb-4" />
              <h3 className="text-lg font-medium mb-1">Brak wyników</h3>
              <p className="text-gray-300">Nie znaleziono projektów spełniających kryteria wyszukiwania.</p>
            </div>
          )}
        </>
      )}

      {/* Pagination */}
      <div className="flex items-center justify-between mt-8">
        <Button 
          variant="outline" 
          size="sm"
          disabled={page === 1}
          onClick={() => setPage(page - 1)}
          className="flex items-center gap-1"
        >
          <ChevronLeft size={16} />
          Poprzednia
        </Button>
        
        <span className="text-sm text-gray-500">
          Strona {page} z {totalPages}
        </span>
        
        <Button 
          variant="outline" 
          size="sm"
          disabled={page === totalPages}
          onClick={() => setPage(page + 1)}
          className="flex items-center gap-1"
        >
          Następna
          <ChevronRight size={16} />
        </Button>
      </div>
    </div>
  );
}