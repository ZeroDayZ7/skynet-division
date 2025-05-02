"use client";

import { useState, useEffect, ChangeEvent, FormEvent } from "react";
import { z } from "zod";
import { Card, CardHeader, CardTitle, CardDescription, CardContent, CardFooter } from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Button } from "@/components/ui/button";
import { toast } from "sonner";
import { AlertCircle, Loader2 } from "lucide-react";
import { Alert, AlertDescription } from "@/components/ui/alert";

// Definicja typów dla kategorii
export const categories = [
  "Ekologia",
  "Infrastruktura",
  "Edukacja",
  "Zdrowie",
  "Kultura",
  "Sport",
  "Inne",
] as const;

export type ProjectCategory = typeof categories[number];

// Definicja schematu walidacji za pomocą biblioteki Zod
const projectSchema = z.object({
  name: z.string().min(3, "Nazwa projektu musi mieć co najmniej 3 znaki").max(100, "Nazwa projektu jest za długa"),
  description: z.string().min(20, "Opis musi mieć co najmniej 20 znaków").max(2000, "Opis jest za długi"),
  category: z.enum(categories, {
    errorMap: () => ({ message: "Wybierz kategorię z listy" }),
  }),
  location: z.string().min(3, "Lokalizacja musi mieć co najmniej 3 znaki"),
  budget: z.string().refine((val) => !isNaN(Number(val)) && Number(val) > 0, {
    message: "Budżet musi być liczbą większą niż 0",
  }),
});

// Typ formularza na podstawie schematu
type ProjectFormData = z.infer<typeof projectSchema> & {
  image: File | null;
};

// Typ błędów formularza
type FormErrors = Partial<Record<keyof ProjectFormData, string>>;

export default function NewProjectForm() {
  // Stan formularza
  const [formData, setFormData] = useState<ProjectFormData>({
    name: "",
    description: "",
    category: "" as ProjectCategory, // Pusty string do poprawnego wyświetlania placeholdera
    location: "",
    budget: "",
    image: null,
  });

  // Stan błędów
  const [errors, setErrors] = useState<FormErrors>({});
  const [isSubmitting, setIsSubmitting] = useState<boolean>(false);
  const [generalError, setGeneralError] = useState<string>("");

  // Czyszczenie błędów przy zmianie pola
  useEffect(() => {
    setErrors({});
    setGeneralError("");
  }, [formData]);

  // Obsługa zmiany pól tekstowych
  const handleChange = (e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  // Obsługa zmiany pliku
  const handleFileChange = (e: ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files;
    
    if (files && files.length > 0) {
      const file = files[0];
      
      // Walidacja typu pliku (tylko obrazy)
      if (!file.type.startsWith("image/")) {
        setErrors((prev) => ({ ...prev, image: "Plik musi być obrazem" }));
        return;
      }
      
      // Walidacja rozmiaru pliku (max 5MB)
      if (file.size > 5 * 1024 * 1024) {
        setErrors((prev) => ({ ...prev, image: "Maksymalny rozmiar pliku to 5MB" }));
        return;
      }
      
      setFormData((prev) => ({ ...prev, image: file }));
    } else {
      setFormData((prev) => ({ ...prev, image: null }));
    }
  };

  // Obsługa zmiany kategorii
  const handleCategoryChange = (value: string) => {
    setFormData((prev) => ({ ...prev, category: value as ProjectCategory }));
  };

  // Walidacja formularza
  const validateForm = (): boolean => {
    try {
      // Walidacja pól tekstowych za pomocą Zod
      projectSchema.parse(formData);
      
      // Ręczna walidacja pliku (opcjonalnie)
      if (formData.image) {
        if (!formData.image.type.startsWith("image/")) {
          setErrors((prev) => ({ ...prev, image: "Plik musi być obrazem" }));
          return false;
        }
        
        if (formData.image.size > 5 * 1024 * 1024) {
          setErrors((prev) => ({ ...prev, image: "Maksymalny rozmiar pliku to 5MB" }));
          return false;
        }
      }
      
      return true;
    } catch (err) {
      if (err instanceof z.ZodError) {
        // Mapowanie błędów Zod na stan błędów
        const formattedErrors: FormErrors = {};
        err.errors.forEach((error) => {
          const path = error.path[0] as keyof ProjectFormData;
          formattedErrors[path] = error.message;
        });
        setErrors(formattedErrors);
      } else {
        setGeneralError("Wystąpił błąd podczas walidacji formularza");
      }
      return false;
    }
  };

  // Wysyłanie formularza
  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    
    if (!validateForm()) return;
    
    setIsSubmitting(true);
    
    try {
      // Przygotowanie danych do wysłania
      const formPayload = new FormData();
      formPayload.append("name", formData.name);
      formPayload.append("description", formData.description);
      formPayload.append("category", formData.category);
      formPayload.append("location", formData.location);
      formPayload.append("budget", formData.budget);
      
      if (formData.image) {
        formPayload.append("image", formData.image);
      }
      
      // Symulacja wywołania API
      // W rzeczywistości użylibyśmy fetch lub axios
      await new Promise((resolve) => setTimeout(resolve, 1000));
      
      // Sukces
      toast.success("Projekt został pomyślnie zgłoszony");
      
      // Resetowanie formularza po sukcesie
      setFormData({
        name: "",
        description: "",
        category: "" as ProjectCategory,
        location: "",
        budget: "",
        image: null,
      });
      
      // Resetowanie pola input typu file
      const fileInput = document.getElementById("image") as HTMLInputElement;
      if (fileInput) fileInput.value = "";
      
    } catch (error) {
      console.error("Błąd podczas wysyłania formularza:", error);
      toast.error("Wystąpił błąd podczas zgłaszania projektu");
      setGeneralError("Nie udało się zgłosić projektu. Spróbuj ponownie później.");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <Card className="max-w-4xl mx-auto shadow-lg">
      <CardHeader>
        <CardTitle className="text-2xl font-bold">Zgłoś Projekt Obywatelski</CardTitle>
        <CardDescription>
          Wypełnij poniższy formularz, aby zgłosić swój projekt do budżetu obywatelskiego.
        </CardDescription>
      </CardHeader>
      
      <form onSubmit={handleSubmit}>
        <CardContent className="space-y-6">
          {generalError && (
            <Alert variant="destructive">
              <AlertCircle className="h-4 w-4" />
              <AlertDescription>{generalError}</AlertDescription>
            </Alert>
          )}

          <div className="space-y-2">
            <Label htmlFor="name" className="font-medium">
              Nazwa Projektu *
            </Label>
            <Input
              id="name"
              name="name"
              value={formData.name}
              onChange={handleChange}
              placeholder="Wpisz nazwę projektu"
              className={errors.name ? "border-red-500" : ""}
            />
            {errors.name && <p className="text-red-500 text-sm mt-1">{errors.name}</p>}
          </div>

          <div className="space-y-2">
            <Label htmlFor="description" className="font-medium">
              Opis Projektu *
            </Label>
            <Textarea
              id="description"
              name="description"
              value={formData.description}
              onChange={handleChange}
              placeholder="Opisz szczegółowo swój projekt"
              rows={5}
              className={errors.description ? "border-red-500" : ""}
            />
            {errors.description && (
              <p className="text-red-500 text-sm mt-1">{errors.description}</p>
            )}
          </div>

          <div className="space-y-2">
            <Label htmlFor="category" className="font-medium">
              Kategoria *
            </Label>
            <Select
              value={formData.category}
              onValueChange={handleCategoryChange}
            >
              <SelectTrigger className={errors.category ? "border-red-500" : ""}>
                <SelectValue placeholder="Wybierz kategorię" />
              </SelectTrigger>
              <SelectContent>
                {categories.map((category) => (
                  <SelectItem key={category} value={category}>
                    {category}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
            {errors.category && <p className="text-red-500 text-sm mt-1">{errors.category}</p>}
          </div>

          <div className="space-y-2">
            <Label htmlFor="location" className="font-medium">
              Lokalizacja *
            </Label>
            <Input
              id="location"
              name="location"
              value={formData.location}
              onChange={handleChange}
              placeholder="Podaj lokalizację projektu"
              className={errors.location ? "border-red-500" : ""}
            />
            {errors.location && <p className="text-red-500 text-sm mt-1">{errors.location}</p>}
          </div>

          <div className="space-y-2">
            <Label htmlFor="budget" className="font-medium">
              Budżet (PLN) *
            </Label>
            <Input
              type="text"
              inputMode="numeric"
              id="budget"
              name="budget"
              value={formData.budget}
              onChange={handleChange}
              placeholder="Wpisz szacowany budżet"
              className={errors.budget ? "border-red-500" : ""}
            />
            {errors.budget && <p className="text-red-500 text-sm mt-1">{errors.budget}</p>}
          </div>

          <div className="space-y-2">
            <Label htmlFor="image" className="font-medium">
              Zdjęcie (opcjonalnie)
            </Label>
            <Input
              type="file"
              id="image"
              accept="image/*"
              onChange={handleFileChange}
              className={errors.image ? "border-red-500" : ""}
            />
            {errors.image && <p className="text-red-500 text-sm mt-1">{errors.image}</p>}
            <p className="text-gray-500 text-xs">
              Akceptowane formaty: JPG, PNG, GIF. Maksymalny rozmiar: 5MB
            </p>
          </div>
        </CardContent>

        <CardFooter className="flex flex-col space-y-4">
          <Button
            type="submit"
            disabled={isSubmitting}
            className="w-full bg-blue-600 hover:bg-blue-700"
          >
            {isSubmitting ? (
              <>
                <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                Wysyłanie...
              </>
            ) : (
              "Dodaj Projekt"
            )}
          </Button>
          <p className="text-gray-500 text-xs text-center">
            * - pola wymagane
          </p>
        </CardFooter>
      </form>
    </Card>
  );
}