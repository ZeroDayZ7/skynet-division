// app/not-found.tsx
'use client';

const NotFound = () => {

  return (
    <div className="min-h-screen flex flex-col items-center justify-center text-center px-6">
      <h1 className="text-5xl font-bold mb-4">404</h1>
      <p className="text-lg text-gray-600 mb-6">Nie znaleziono strony, której szukasz.</p>
    </div>
  );
}

export default NotFound; // Upewnij się, że masz export default!
