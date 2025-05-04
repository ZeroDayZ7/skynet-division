// components/RankBadgeShowcase.tsx
"use client";

import RankBadge from "./RankBadge";
import { roleMeta } from "./roleMeta";
import type { UserRole } from "./types/UserRole";

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
    </div>
  );
}
