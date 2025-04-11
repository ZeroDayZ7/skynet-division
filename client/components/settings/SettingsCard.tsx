import Link from "next/link";
import { ReactNode } from "react";

export function SettingsCard({
  title,
  description,
  icon,
  href,
}: {
  title: string;
  description: string;
  icon: ReactNode;
  href: string;
}) {
  return (
    <Link href={href}>
      <div className="border rounded p-6 bg-card hover:bg-zinc-100 
       transition-colors dark:hover:text-green-500 shadow">
        <div className="flex items-center gap-4">
          <div className="p-3 rounded-full">
            {icon}
          </div>
          <div>
            <h3 className="font-medium">
              {title}
            </h3>
            <p className="text-sm">
              {description}
            </p>
          </div>
        </div>
      </div>
    </Link>
  );
}