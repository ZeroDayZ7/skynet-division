'use client';

import React from 'react';
import { cn } from '@/lib/utils'; // lub skąd używasz cn()

type ChatMessageProps = {
  message: {
    id: number;
    message: string;
    sender_id: number;
    sender: {
      id: number;
      username: string;
    };
  };
  currentUserId: number;
};

export default function ChatMessage({ message, currentUserId }: ChatMessageProps) {
  const isCurrentUser = message.sender_id === currentUserId;

  return (
    <div className={cn('flex', isCurrentUser ? 'justify-end' : 'justify-start')}>
      <div
        className={cn(
          'rounded-md p-2 max-w-[70%]',
          isCurrentUser ? 'bg-primary text-white' : 'bg-muted'
        )}
      >
        <div className="text-sm font-semibold mb-1">{message.sender.username}</div>
        <div className="text-sm whitespace-pre-wrap">{message.message}</div>
      </div>
    </div>
  );
}
