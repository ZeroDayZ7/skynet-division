import LoginModal from "@/components/LoginModal";

export default function Home() {
  return (
    <main className="flex flex-col min-h-screen">
      
      {/* Sekcja z treścią na środku */}
      <div className="flex-1 flex flex-col items-center text-center">
          <LoginModal />
      </div>
    </main>
  );
}
