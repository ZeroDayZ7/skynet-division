// lib/constants/roleMeta.ts

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
  } from "lucide-react";
  import { UserRole } from "./types/UserRole";
  
  export const roleMeta = {
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
  } as const satisfies Record<UserRole, any>;
  