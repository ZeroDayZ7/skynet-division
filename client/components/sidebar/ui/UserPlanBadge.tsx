// components/UserPlanBadge.tsx
'use client';

import { FC } from 'react';
import { Badge } from '@/components/ui/badge';
import { Star, Sparkles } from 'lucide-react';
import { cn } from '@/lib/utils';
import Link from 'next/link'; // Import Link z Next.js

type UserPlanBadgeProps = {
  plan: 'free' | 'pro' | 'platinum';
  label?: string; 
  className?: string;
};

export const UserPlanBadge: FC<UserPlanBadgeProps> = ({ plan, label, className }) => {
  const planLabel = plan === 'pro' ? 'Pro' : plan === 'platinum' ? 'Platinum' : ''; // Określenie etykiety dla planu

  if (plan === 'free') {
    return (
      <>
        <Sparkles className="mr-2 h-4 w-4" />
        <Link href="/upgrade">
            {label}
        </Link>
      </>
    );
  }

  return (
    <Badge className={cn("gap-2 text-xs mr-2", className)}>
      <Star className="w-3 h-3" /> {planLabel}
    </Badge>
  );
};
