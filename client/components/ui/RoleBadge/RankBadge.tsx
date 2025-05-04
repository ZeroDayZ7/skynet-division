"use client";

import React from "react";
import { Clock } from "lucide-react";
import { cn } from "@/lib/utils";
import { roleMeta } from "./roleMeta";
import { UserRole } from "./types/UserRole";

export default function RankBadge({
  role,
  showLabel = true,
  showUsername = false, // nowy prop
  username,
  size = "md",
  className,
}: {
  role: UserRole;
  showLabel?: boolean;
  showUsername?: boolean; // nowy prop
  username?: string; // nowy prop
  size?: "sm" | "md" | "lg";
  className?: string;
}) {
  const { label, icon, colors, rarity } = roleMeta[role];

  const sizeClasses = {
    sm: { badge: "px-2 py-1 text-xs", icon: "w-5 h-5", hexagon: "w-7 h-7" },
    md: { badge: "px-3 py-1.5 text-sm", icon: "w-4 h-4", hexagon: "w-5 h-5" },
    lg: { badge: "px-4 py-2 text-base", icon: "w-5 h-5", hexagon: "w-6 h-6" },
  };

  return (
    <div
      className={cn(
        "relative inline-flex items-center gap-2 rounded border",
        colors.primary,
        colors.border,
        sizeClasses[size].badge,
        "font-mono font-medium tracking-wider shadow-lg",
        rarity > 8 ? colors.glow : "",
        className
      )}
    >
      {rarity >= 7 && (
        <div className="absolute -right-1 -top-1">
          <div className={cn("rounded-full w-2 h-2", colors.text, "shadow-lg")} />
        </div>
      )}
      {role === "white_rose" && (
        <>
          <div className="absolute -top-1 -left-1">
            <Clock className="w-3 h-3 text-pink-400" />
          </div>
          <div className="absolute -bottom-1 -right-1">
            <Clock className="w-3 h-3 text-pink-400" />
          </div>
        </>
      )}
      <div className={cn("flex items-center justify-center rounded", colors.secondary, sizeClasses[size].hexagon)}>
        <div className={cn("flex items-center justify-center", colors.text, sizeClasses[size].icon)}>
          {icon}
        </div>
      </div>

      {showLabel && (
        <span className={cn(colors.text, "tracking-widest uppercase", role === "white_rose" && "font-bold")}>
          {label}
        </span>
      )}

      {!showLabel && showUsername && username && (
        <span className={cn(colors.text, "tracking-widest")}>{username}</span>
      )}

      {role === "white_rose" && (
        <div className="absolute inset-0 rounded border-2 border-pink-700 opacity-20"></div>
      )}
    </div>
  );
}
