import BackButton from "@/components/ui/BackButton"
import MainMenuButton from "@/components/ui/MainMenuButton"

export default function DocumentsLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <>
      <div className="pt-4 pl-4 flex items-center space-x-4">
        <BackButton />
        <MainMenuButton />
      </div>
      <div className="flex-1">{children}</div>
    </>
  );
}
