import BackButton from "@/components/ui/BackButton"

export default function DocumentsLayout({
    children,
  }: {
    children: React.ReactNode
  }) {
    return (
      <>
        <div className="pt-4 pl-4"><BackButton /></div>
        {children}
      </>
    )
  }