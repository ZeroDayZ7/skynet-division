'use client';

import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { z } from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form';
import {
  AlertDialog,
  AlertDialogContent,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogCancel,
} from '@/components/ui/alert-dialog';
import { Badge } from '@/components/ui/badge';
import { toast } from 'sonner';
import { FaSpinner } from 'react-icons/fa';

// Importowanie funkcji z register.services.ts
import {
  checkEmailAvailability,
  registerUser,
} from '@/services/register.service';

// Schemat walidacji
const registerSchema = z.object({
  email: z.string().email('Nieprawidłowy adres e-mail'),
});

type RegisterSchema = z.infer<typeof registerSchema>;

export default function RegisterForm() {
  const [emailAvailable, setEmailAvailable] = useState<boolean | null>(null);
  const [checkingEmail, setCheckingEmail] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [showModal, setShowModal] = useState(false);
  const [formData, setFormData] = useState<RegisterSchema | null>(null);

  const form = useForm<RegisterSchema>({
    resolver: zodResolver(registerSchema),
    defaultValues: {
      email: '',
    },
  });

  // Sprawdzanie dostępności e-maila
  const handleCheckEmail = async (email: string) => {
    setCheckingEmail(true);
    setEmailAvailable(null);
  
    try {
      const available = await checkEmailAvailability(email);
      setEmailAvailable(available);
      if (!available) {
        toast.error("Email jest już zajęty", {
          duration: 5000,
          position: "top-center",
          icon: "⚠️",
        });
      }
    } catch (error: any) {
      const errorMessage = error.message || "Nie udało się sprawdzić dostępności e-maila";
      toast.error(errorMessage, {
        duration: 5000,
        position: "top-center",
        icon: "❌",
      });
      setEmailAvailable(null);
    } finally {
      setCheckingEmail(false);
    }
  };

  // Obsługa submitu formularza
  const onSubmit = (data: RegisterSchema) => {
    if (!emailAvailable) return;
    setFormData(data);
    setShowModal(true); // Pokazujemy modal
  };

  // Potwierdzenie rejestracji w modalu
  const handleConfirmRegistration = async () => {
    if (!formData || isSubmitting) return;
    setIsSubmitting(true);
    try {
      const response = await registerUser(formData.email);
      if (response.success) {
        setIsSubmitting(false);
        setShowModal(false);
        form.reset(); // Reset formularza
        setEmailAvailable(null);
        toast.success('Użytkownik zarejestrowany', {
          description: 'Hasło zostało wysłane na podany e-mail',
          duration: 5000,
          position: 'top-center',
          richColors: true,
          icon: '✔',
        });
      } else {
        throw new Error(response.message);
      }
    } catch (error) {
      toast.error('Wystąpił błąd podczas rejestracji.');
    }
    setIsSubmitting(false);
  };

  return (
    <div className="p-4">
      <h1 className="mb-4 text-2xl font-bold text-gray-800 dark:text-gray-100">
        Zarejestruj Użytkownika
      </h1>
      <Form {...form}>
        <form
          onSubmit={form.handleSubmit(onSubmit)}
          className="mx-auto max-w-sm space-y-4"
        >
          <FormField
            control={form.control}
            name="email"
            render={({ field }) => (
              <FormItem>
                <FormLabel>E-mail</FormLabel>
                <div className="flex items-center gap-2">
                  <FormControl>
                    <Input
                      placeholder="Twój e-mail"
                      disabled={checkingEmail || isSubmitting}
                      {...field}
                    />
                  </FormControl>
                  <Button
                    type="button"
                    variant="outline"
                    onClick={() => handleCheckEmail(field.value)}
                    disabled={checkingEmail || !field.value || isSubmitting}
                    className="w-20"
                  >
                    {checkingEmail ? (
                      <FaSpinner className="animate-spin" />
                    ) : (
                      'Sprawdź'
                    )}
                  </Button>
                </div>
                <div className="min-h-[20px]">
                  <FormMessage />
                </div>
                <div className="min-h-[20px] text-sm">
                  {emailAvailable === true && (
                    <div className="text-green-600">E-mail dostępny ✅</div>
                  )}
                  {emailAvailable === false && (
                    <div className="text-red-500">
                      E-mail jest już zajęty ❌
                    </div>
                  )}
                </div>
              </FormItem>
            )}
          />

          {emailAvailable === true && (
            <Button type="submit" className="w-full" disabled={isSubmitting}>
              {isSubmitting ? 'Rejestrowanie...' : 'Zarejestruj'}
            </Button>
          )}
        </form>
      </Form>

      {/* Modal potwierdzenia */}
      <AlertDialog open={showModal} onOpenChange={setShowModal}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Rejestracja nowego użytkownika</AlertDialogTitle>
            <AlertDialogDescription>
              Użytkownik zostanie zarejestrowany z adresem e-mail
              <br />
              <Badge className="m-2 px-4 text-xl">{formData?.email}</Badge>
              <br />
              Hasło zostanie wysłane na podany adres e-mail
              <br />
              <b className="text-xl text-yellow-500">Czy dane są prawidłowe?</b>
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel
              disabled={isSubmitting}
              onClick={() => setShowModal(false)}
            >
              Anuluj
            </AlertDialogCancel>
            <Button
              onClick={handleConfirmRegistration}
              disabled={isSubmitting}
              variant="destructive"
              className="mb-2"
            >
              {isSubmitting ? 'Rejestracja...' : 'Potwierdź'}
            </Button>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </div>
  );
}
