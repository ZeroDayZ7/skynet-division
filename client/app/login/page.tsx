// LoginPage.tsx
'use client';

import { LoginForm } from './LoginForm';
import { useLoginForm } from './useLoginForm';
// import { useRouter } from 'next/navigation'; // Jeśli potrzebujesz przekierowania

export default function LoginPage() {
  // Użyj nowego hooka, który zawiera całą logikę formularza
  const {
    form,
    isLoading,
    isSubmitting,
    showPassword,
    toggleShowPassword,
    onSubmit, // Ten onSubmit pochodzi z form.handleSubmit opakowanego w hooku
    formError,
    csrfTokenReady
  } = useLoginForm();

  // const router = useRouter(); // Do ewentualnego przekierowania

  // Logikę PO pomyślnym zalogowaniu można obsłużyć w `useLoginForm`
  // lub tutaj, np. obserwując jakiś stan z kontekstu Auth

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100">
      <div className="p-8 bg-white rounded shadow-md w-full max-w-md">
        <h1 className="text-2xl font-bold mb-6 text-center">Logowanie</h1>
        <LoginForm
          form={form}
          isLoading={isLoading}
          isSubmitting={isSubmitting}
          showPassword={showPassword}
          toggleShowPassword={toggleShowPassword}
          onSubmit={onSubmit} // Przekaż handler z hooka
          formError={formError} // Przekaż błąd
          csrfTokenReady={csrfTokenReady} // Przekaż stan gotowości tokenu
        />
        {/* Możesz dodać tutaj linki np. do rejestracji czy odzyskiwania hasła */}
      </div>
    </div>
  );
}