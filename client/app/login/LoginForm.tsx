// LoginForm.tsx
'use client';

import { UseFormReturn } from 'react-hook-form'; // Importuj typy react-hook-form
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form';
import { FaSpinner, FaEye, FaEyeSlash } from 'react-icons/fa';
import { LoginSchema } from './useLoginForm'; // Importuj typ z hooka
// import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert" // Przykład komponentu do błędów
import { Terminal } from "lucide-react" // Ikona do alertu
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert" // Przykład komponentu do błędów


interface LoginFormProps {
  form: UseFormReturn<LoginSchema>; // Przyjmij całą instancję form
  isLoading: boolean;
  isSubmitting: boolean;
  showPassword?: boolean; // Opcjonalne, jeśli logika jest w hooku
  toggleShowPassword?: () => void; // Opcjonalne
  onSubmit: (e?: React.BaseSyntheticEvent) => Promise<void>; // Handler z hooka
  formError: string | null; // Błąd do wyświetlenia
  csrfTokenReady: boolean; // Informacja o gotowości tokenu
}

export function LoginForm({
  form,
  isLoading,
  isSubmitting,
  showPassword,
  toggleShowPassword,
  onSubmit,
  formError,
  csrfTokenReady
}: LoginFormProps) {

  // isLoading teraz obejmuje też czas ładowania CSRF
  const isDisabled = isLoading || isSubmitting;

  return (
    <Form {...form}> {/* Rozpakuj całą instancję form */}
      <form onSubmit={onSubmit} className="space-y-4">
        {/* Wyświetl błąd ogólny formularza */}
        {formError && (
           <Alert variant="destructive">
             <Terminal className="h-4 w-4" />
             <AlertTitle>Błąd Logowania</AlertTitle>
             <AlertDescription>
               {formError}
             </AlertDescription>
           </Alert>
        )}

        {/* Pole Email */}
        <FormField
          control={form.control}
          name="email"
          render={({ field }) => (
            <FormItem>
              <FormLabel htmlFor='email'>E-mail</FormLabel>
              <FormControl>
                <Input 
                {...field}
                id="email"
                disabled={isDisabled} 
                autoComplete="username" 
                placeholder="email@example.com" />
              </FormControl>
              <FormMessage /> {/* Błędy walidacji dla pola */}
            </FormItem>
          )}
        />

        {/* Pole Hasło */}
        <FormField
          control={form.control}
          name="password"
          render={({ field }) => (
            <FormItem>
              <FormLabel htmlFor='password'>Hasło</FormLabel>
              <FormControl>
                <div className="relative">
                  <Input
                    {...field}
                    id='password'
                    type={showPassword ? 'text' : 'password'}
                    disabled={isDisabled}
                    autoComplete="current-password"
                    placeholder="******"
                  />
                  {/* Przycisk do pokazywania hasła */}
                  {toggleShowPassword && (
                     <button
                       type="button"
                       onClick={toggleShowPassword}
                       className="absolute top-1/2 right-3 -translate-y-1/2 text-gray-500 hover:text-gray-700 disabled:cursor-not-allowed"
                       disabled={isDisabled}
                       aria-label={showPassword ? "Ukryj hasło" : "Pokaż hasło"}
                     >
                       {showPassword ? <FaEyeSlash /> : <FaEye />}
                     </button>
                  )}
                </div>
              </FormControl>
              <FormMessage /> {/* Błędy walidacji dla pola */}
            </FormItem>
          )}
        />

        {/* Przycisk Submit */}
        <Button type="submit" className="w-full" disabled={isDisabled || !csrfTokenReady}>
          {isSubmitting || isLoading ? ( // Pokaż spinner, gdy trwa wysyłanie LUB ładowanie CSRF
            <>
              <FaSpinner className="mr-2 h-4 w-4 animate-spin" />
              {isSubmitting ? 'Logowanie...' : 'Ładowanie...'}
            </>
          ) : (
            'Zaloguj się'
          )}
        </Button>
         {/* Informacja o braku tokenu, jeśli przycisk jest wyłączony z tego powodu */}
         {!csrfTokenReady && !isLoading && (
            <p className="text-xs text-muted-foreground text-center">Formularz nie jest gotowy (brak tokenu CSRF).</p>
         )}
      </form>
    </Form>
  );
}