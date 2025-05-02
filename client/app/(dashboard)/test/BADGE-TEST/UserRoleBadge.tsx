"use client";

import React from "react";
import {
  Terminal,
  User,
  ShieldCheck,
  Ghost,
  UserPlus,
  ShieldHalf,
  ScanLine,
  Eye,
  ShieldAlert,
  Crown,
  Clock,
  // Hexagon, // Hexagon import is not used in the rendering, can be removed
} from "lucide-react";
import { cn } from "@/lib/utils"; // Zakładam, że masz tę funkcję

// Typy rang użytkowników
export type UserRole =
  | "init"
  | "user"
  | "operator"
  | "ghost"
  | "recruit"
  | "agent"
  | "cipher"
  | "watcher"
  | "root"
  | "white_rose";

// Interfejs właściwości komponentu
interface RankBadgeProps {
  role: UserRole;
  showLabel?: boolean;
  size?: "sm" | "md" | "lg";
  className?: string;
}

// Metadane dla każdej rangi
const roleMeta: Record<
  UserRole,
  {
    label: string;
    icon: React.ReactNode;
    colors: {
      primary: string;
      secondary: string;
      border: string;
      text: string;
      glow: string;
    };
    rarity: number; // 1-10 scale for visual effects
  }
> = {
  init: {
    label: "INIT",
    icon: <Terminal className="stroke-[2.5px]" />,
    colors: {
      primary: "bg-zinc-900",
      secondary: "bg-zinc-800",
      border: "border-zinc-700",
      text: "text-zinc-400",
      glow: "shadow-zinc-900/80",
    },
    rarity: 1,
  },
  user: {
    label: "USER",
    icon: <User className="stroke-[2.5px]" />,
    colors: {
      primary: "bg-slate-900",
      secondary: "bg-slate-800",
      border: "border-blue-900",
      text: "text-blue-400",
      glow: "shadow-blue-900/50",
    },
    rarity: 2,
  },
  operator: {
    label: "OPERATOR",
    icon: <ShieldCheck className="stroke-[2.5px]" />,
    colors: {
      primary: "bg-cyan-950",
      secondary: "bg-cyan-900",
      border: "border-cyan-800",
      text: "text-cyan-400",
      glow: "shadow-cyan-900/50",
    },
    rarity: 3,
  },
  ghost: {
    label: "GHOST",
    icon: <Ghost className="stroke-[2.5px]" />,
    colors: {
      primary: "bg-zinc-950",
      secondary: "bg-zinc-900",
      border: "border-zinc-700",
      text: "text-zinc-300",
      glow: "shadow-white/20",
    },
    rarity: 4,
  },
  recruit: {
    label: "RECRUIT",
    icon: <UserPlus className="stroke-[2.5px]" />,
    colors: {
      primary: "bg-purple-950",
      secondary: "bg-purple-900",
      border: "border-purple-700",
      text: "text-purple-400",
      glow: "shadow-purple-900/50",
    },
    rarity: 5,
  },
  agent: {
    label: "AGENT",
    icon: <ShieldHalf className="stroke-[2.5px]" />,
    colors: {
      primary: "bg-red-950",
      secondary: "bg-red-900",
      border: "border-red-800",
      text: "text-red-500",
      glow: "shadow-red-900/50",
    },
    rarity: 6,
  },
  cipher: {
    label: "CIPHER",
    icon: <ScanLine className="stroke-[2.5px]" />,
    colors: {
      primary: "bg-emerald-950",
      secondary: "bg-emerald-900",
      border: "border-emerald-700",
      text: "text-emerald-400",
      glow: "shadow-emerald-900/50",
    },
    rarity: 7,
  },
  watcher: {
    label: "WATCHER",
    icon: <Eye className="stroke-[2.5px]" />,
    colors: {
      primary: "bg-amber-950",
      secondary: "bg-amber-900",
      border: "border-amber-700",
      text: "text-amber-400",
      glow: "shadow-amber-900/50",
    },
    rarity: 8,
  },
  root: {
    label: "ROOT",
    icon: <ShieldAlert className="stroke-[2.5px]" />,
    colors: {
      primary: "bg-rose-950",
      secondary: "bg-rose-900",
      border: "border-rose-700",
      text: "text-rose-500",
      glow: "shadow-rose-900/70",
    },
    rarity: 9,
  },
  white_rose: {
    label: "WHITE ROSE",
    icon: <Crown className="stroke-[2.5px]" />,
    colors: {
      primary: "bg-black",
      secondary: "bg-pink-950",
      border: "border-pink-700",
      text: "text-pink-400",
      glow: "shadow-pink-900/70",
    },
    rarity: 10,
  },
};

export function RankBadge({
  role,
  showLabel = true,
  size = "md",
  className,
}: RankBadgeProps) {
  const { label, icon, colors, rarity } = roleMeta[role];

  // Obliczanie stylu wielkości
  const sizeClasses = {
    sm: {
      badge: "px-2 py-1 text-xs",
      icon: "w-3 h-3",
      hexagon: "w-4 h-4",
    },
    md: {
      badge: "px-3 py-1.5 text-sm",
      icon: "w-4 h-4",
      hexagon: "w-5 h-5",
    },
    lg: {
      badge: "px-4 py-2 text-base",
      icon: "w-5 h-5",
      hexagon: "w-6 h-6",
    },
  };

  // Elementy graficzne na podstawie rzadkości
  const rarityElement = rarity >= 7 && (
    <div className="absolute -right-1 -top-1">
      <div className={cn(
        "rounded-full w-2 h-2",
        colors.text,
        "shadow-lg",
        `shadow-${colors.text.split("-")[1]}-500/50` // Uwaga: ta klasa cienia zależy od konwencji nazewnictwa kolorów w Tailwind
      )} />
    </div>
  );

  // Dodatkowe elementy dla White Rose
  const whiteRoseElements = role === "white_rose" && (
    <>
      <div className="absolute -top-1 -left-1">
        <Clock className="w-3 h-3 text-pink-400" />
      </div>
      <div className="absolute -bottom-1 -right-1">
        <Clock className="w-3 h-3 text-pink-400" />
      </div>
    </>
  );

  return (
    <div
      className={cn(
        "relative inline-flex items-center gap-2 rounded border",
        colors.primary,
        colors.border,
        sizeClasses[size].badge,
        "font-mono font-medium tracking-wider",
        "shadow-lg", // Podstawowy cień dla wszystkich odznak
        // rarity > 5 ? "shadow-lg" : "", // Usunięta redundantna klasa shadow-lg
        rarity > 8 ? colors.glow : "",
        className
      )}
    >
      {rarityElement}
      {whiteRoseElements}

      {/* Zmieniona struktura flexbox, aby wyśrodkować ikonę w jej wewnętrznym kontenerze */}
      <div className={cn(
        "flex items-center justify-center rounded-sm", // Centrowanie przeniesione na ten div
        colors.secondary,
        sizeClasses[size].hexagon
      )}>
        <div className={cn(
          colors.text,
          sizeClasses[size].icon,
          // Usunięto flex items-center justify-center stąd
          )}>
          {icon} {/* Ikona jest teraz bezpośrednio w wyśrodkowanym kontenerze */}
        </div>
      </div>

      {showLabel && (
        <span className={cn(
          colors.text,
          "tracking-widest uppercase",
          role === "white_rose" ? "font-bold" : ""
        )}>
          {label}
        </span>
      )}

      {role === "white_rose" && (
        <div className="absolute inset-0 rounded border-2 border-pink-700 opacity-20"></div>
      )}
    </div>
  );
}

// Komponent wyświetlający wszystkie rangi
export default function RankBadgeShowcase() {
  return (
    <div className="bg-black p-8 rounded-lg shadow-2xl border border-zinc-800">
      <h2 className="text-zinc-400 font-mono text-xl mb-6 text-center tracking-widest border-b border-zinc-800 pb-4">
        DARK ARMY :: USER RANKS
      </h2>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-6">
        {(Object.keys(roleMeta) as UserRole[]).map((role) => (
          <div key={role} className="flex flex-col items-center space-y-3">
            <RankBadge role={role} size="lg" />
            <div className="text-xs text-zinc-600 font-mono">{roleMeta[role].rarity}/10</div>
          </div>
        ))}
      </div>

      <div className="mt-10 border-t border-zinc-900 pt-6">
        <h3 className="text-zinc-500 font-mono text-sm mb-4">BADGE VARIANTS</h3>
        <div className="flex flex-wrap gap-4">
          <RankBadge role="white_rose" size="sm" />
          <RankBadge role="white_rose" size="md" />
          <RankBadge role="white_rose" size="lg" />
          <RankBadge role="white_rose" size="md" showLabel={false} />
        </div>
      </div>

      <div className="mt-8 text-xs text-zinc-700 font-mono text-center">
        :: fsociety.dat :: {new Date().getFullYear()}
      </div>
    </div>
  );
}

// Pojedynczy komponent do szybkiego użycia
export function UserRankBadge({ role, className }: { role: UserRole; className?: string }) {
  return <RankBadge role={role} className={className} />;
}