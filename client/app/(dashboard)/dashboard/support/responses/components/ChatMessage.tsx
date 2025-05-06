'use client';

import React from 'react';
import { cn } from '@/lib/utils';
import { format } from 'date-fns';
import { pl } from 'date-fns/locale';

type ChatMessageProps = {
  message: {
    id: number;
    message: string;
    sender_id: number;
    createdAt: string;
    sender: {
      username: string;
      role: string;
    };
  };
  currentUserId: number;
  showUsername?: boolean;
  showTimestamp?: boolean;
  isFirstMessageInGroup?: boolean;
};

export default function ChatMessage({
  message,
  currentUserId,
  showUsername = false,
  showTimestamp = false,
  isFirstMessageInGroup = false,
}: ChatMessageProps) {
  const isCurrentUser = message.sender_id === currentUserId;
  const isSupport = message.sender.role === 'admin' || message.sender.role === 'root';
  const formattedTime = format(new Date(message.createdAt), 'HH:mm', { locale: pl });
                                                            //dd.MM.yyyy HH:mm
  return (
    <div
      className={cn(
        'flex w-full',
        isCurrentUser ? 'justify-end' : 'justify-start',
        isFirstMessageInGroup ? 'mt-4' : 'mt-1'
      )}
    >
      <div
        className={cn(
          'flex flex-col max-w-[80%]',
          isCurrentUser ? 'items-end' : 'items-start'
        )}
      >
        {showUsername && (
          <span
            className={cn(
              'text-xs font-medium mb-1 px-2',
              isCurrentUser ? 'text-primary' : 'text-muted-foreground'
            )}
          >
            {isCurrentUser ? 'Ty' : message.sender.username}
            {isSupport && ' (Support)'}
          </span>
        )}
        <div
          className={cn(
            'rounded-lg px-3 py-2 text-sm whitespace-pre-wrap break-words shadow-md',
            isCurrentUser
              ? 'bg-primary text-primary-foreground rounded-br-none'
              : 'bg-muted text-foreground rounded-bl-none',
            !showUsername && (isCurrentUser ? 'rounded-tr-lg' : 'rounded-tl-lg')
          )}
        >
          {message.message}
        </div>
        {showTimestamp && (
          <span
            className={cn(
              'text-xs mt-1 px-2 text-muted-foreground',
              isCurrentUser ? 'text-right' : 'text-left'
            )}
          >
            {formattedTime}
          </span>
        )}
      </div>
    </div>
  );
}