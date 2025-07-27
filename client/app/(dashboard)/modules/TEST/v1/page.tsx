import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Progress } from "@/components/ui/progress";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Calendar } from "@/components/ui/calendar";
import { Badge } from "@/components/ui/badge";
import { Search, FileText, CalendarIcon, User, CheckCircle, Clock } from "lucide-react";
import { useState } from "react";

export default function GovernmentModule() {
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedDate, setSelectedDate] = useState<Date | undefined>(new Date());

  const services = [
    { id: 1, name: "Wniosek o dowód osobisty", category: "Dokumenty", status: "W trakcie", progress: 60 },
    { id: 2, name: "Rejestracja pojazdu", category: "Pojazdy", status: "Zakończony", progress: 100 },
    { id: 3, name: "Zezwolenie na budowę", category: "Budownictwo", status: "Oczekujący", progress: 20 },
    { id: 4, name: "Zgłoszenie urodzenia", category: "Stan cywilny", status: "W trakcie", progress: 80 },
  ];

  const filteredServices = services.filter((service) =>
    service.name.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div className="min-h-screen bg-gray-100 p-4 md:p-8">
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="max-w-7xl mx-auto space-y-6"
      >
        {/* Header */}
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-4">
            <Avatar>
              <AvatarImage src="/avatar.png" alt="User" />
              <AvatarFallback>JD</AvatarFallback>
            </Avatar>
            <div>
              <h1 className="text-2xl font-bold">Witaj, Jan Kowalski</h1>
              <p className="text-sm text-gray-500">Twój osobisty panel obywatelski</p>
            </div>
          </div>
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="outline">Konto <User className="ml-2 h-4 w-4" /></Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent>
              <DropdownMenuItem>Profil</DropdownMenuItem>
              <DropdownMenuItem>Ustawienia</DropdownMenuItem>
              <DropdownMenuItem>Wyloguj</DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>

        {/* Search Bar */}
        <div className="relative">
          <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-gray-500" />
          <Input
            className="pl-10"
            placeholder="Wyszukaj usługę lub wniosek..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
        </div>

        {/* Main Content */}
        <Tabs defaultValue="overview" className="space-y-6">
          <TabsList className="grid w-full grid-cols-4 gap-2">
            <TabsTrigger value="overview">Przegląd</TabsTrigger>
            <TabsTrigger value="services">Usługi</TabsTrigger>
            <TabsTrigger value="appointments">Terminy</TabsTrigger>
            <TabsTrigger value="documents">Dokumenty</TabsTrigger>
          </TabsList>

          {/* Overview Tab */}
          <TabsContent value="overview">
            <div className="grid gap-6 md:grid-cols-2">
              <Card>
                <CardHeader>
                  <CardTitle>Twoje wnioski</CardTitle>
                  <CardDescription>Śledź status swoich spraw</CardDescription>
                </CardHeader>
                <CardContent>
                  <ScrollArea className="h-[300px] pr-4">
                    {filteredServices.map((service) => (
                      <motion.div
                        key={service.id}
                        className="mb-4 flex items-center justify-between rounded-lg border p-4"
                        initial={{ opacity: 0, x: -20 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ duration: 0.3 }}
                      >
                        <div className="flex items-center space-x-4">
                          <FileText className="h-6 w-6 text-blue-500" />
                          <div>
                            <p className="font-medium">{service.name}</p>
                            <p className="text-sm text-gray-500">{service.category}</p>
                          </div>
                        </div>
                        <div className="text-right">
                          <Badge
                            variant={
                              service.status === "Zakończony"
                                ? "default"
                                : service.status === "W trakcie"
                                ? "secondary"
                                : "outline"
                            }
                          >
                            {service.status}
                          </Badge>
                          <Progress value={service.progress} className="mt-2 w-24" />
                        </div>
                      </motion.div>
                    ))}
                  </ScrollArea>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle>Nadchodzące terminy</CardTitle>
                  <CardDescription>Twoje zaplanowane wizyty</CardDescription>
                </CardHeader>
                <CardContent>
                  <Calendar
                    mode="single"
                    selected={selectedDate}
                    onSelect={setSelectedDate}
                    className="rounded-md border"
                  />
                  <div className="mt-4 space-y-2">
                    <div className="flex items-center space-x-2">
                      <CalendarIcon className="h-4 w-4 text-blue-500" />
                      <p className="text-sm">Wizyta w urzędzie - 28.07.2025, 10:00</p>
                    </div>
                    <div className="flex items-center space-x-2">
                      <CalendarIcon className="h-4 w-4 text-blue-500" />
                      <p className="text-sm">Termin odbioru dowodu - 05.08.2025, 12:00</p>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>
          </TabsContent>

          {/* Services Tab */}
          <TabsContent value="services">
            <Card>
              <CardHeader>
                <CardTitle>Dostępne usługi</CardTitle>
                <CardDescription>Wybierz usługę, którą chcesz zrealizować</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="grid gap-4 md:grid-cols-3">
                  {[
                    "Wniosek o dowód osobisty",
                    "Rejestracja pojazdu",
                    "Zgłoszenie urodzenia",
                    "Zezwolenie na budowę",
                    "Podatki lokalne",
                    "Usługi komunalne",
                  ].map((service, index) => (
                    <motion.div
                      key={index}
                      className="rounded-lg border p-4 hover:bg-gray-50"
                      whileHover={{ scale: 1.02 }}
                      transition={{ duration: 0.2 }}
                    >
                      <div className="flex items-center space-x-2">
                        <FileText className="h-5 w-5 text-blue-500" />
                        <p className="font-medium">{service}</p>
                      </div>
                      <Button className="mt-2 w-full" variant="outline">
                        Rozpocznij
                      </Button>
                    </motion.div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          {/* Appointments Tab */}
          <TabsContent value="appointments">
            <Card>
              <CardHeader>
                <CardTitle>Zarządzaj terminami</CardTitle>
                <CardDescription>Zaplanuj lub zmień wizyty w urzędzie</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div className="flex items-center justify-between rounded-lg border p-4">
                    <div className="flex items-center space-x-2">
                      <CalendarIcon className="h-5 w-5 text-blue-500" />
                      <div>
                        <p className="font-medium">Wizyta w urzędzie</p>
                        <p className="text-sm text-gray-500">28.07.2025, 10:00</p>
                      </div>
                    </div>
                    <Button variant="outline">Zmień termin</Button>
                  </div>
                  <Button className="w-full">Zaplanuj nowy termin</Button>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          {/* Documents Tab */}
          <TabsContent value="documents">
            <Card>
              <CardHeader>
                <CardTitle>Twoje dokumenty</CardTitle>
                <CardDescription>Przeglądaj i pobieraj swoje dokumenty</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {[
                    { name: "Dowód osobisty", status: "Ważny", expiry: "15.12.2027" },
                    { name: "Prawo jazdy", status: "Ważny", expiry: "20.03.2029" },
                    { name: "Paszport", status: "Wygasły", expiry: "10.05.2024" },
                  ].map((doc, index) => (
                    <motion.div
                      key={index}
                      className="flex items-center justify-between rounded-lg border p-4"
                      initial={{ opacity: 0, x: -20 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ duration: 0.3 }}
                    >
                      <div className="flex items-center space-x-2">
                        <FileText className="h-5 w-5 text-blue-500" />
                        <div>
                          <p className="font-medium">{doc.name}</p>
                          <p className="text-sm text-gray-500">Ważny do: {doc.expiry}</p>
                        </div>
                      </div>
                      <Badge variant={doc.status === "Ważny" ? "default" : "destructive"}>
                        {doc.status}
                      </Badge>
                    </motion.div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </motion.div>
    </div>
  );
}