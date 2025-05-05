'use client';

import React from 'react';
import { cn } from '@/lib/utils';

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
    <div
      className={cn(
        'flex w-full px-4 py-1',
        isCurrentUser ? 'justify-end' : 'justify-start'
      )}
    >
      <div
        className={cn(
          'max-w-[80%] px-4 py-2 rounded-xl shadow-md transition-all duration-200 animate-in fade-in slide-in-from-bottom-2',
          isCurrentUser
            ? 'bg-cyan-900 text-primary rounded-tr-none'
            : 'bg-muted text-foreground rounded-tl-none'
        )}
      >
        <div className="text-xs font-semibold text-muted-foreground mb-1">
          {message.sender.username}
        </div>
        <div className="text-sm whitespace-pre-wrap break-words">
          {message.message}
        </div>
      </div>
    </div>
  );
}
