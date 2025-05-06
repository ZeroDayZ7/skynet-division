'use client';

import { useEffect, useRef } from 'react';
import ChatMessage from '../ChatMessage';
import type { TicketMessage } from '../../types/support';

interface TicketDetailsMessagesProps {
  messages: TicketMessage[];
  currentUserId: number;
}

export function TicketDetailsMessages({ messages, currentUserId }: TicketDetailsMessagesProps) {
  const messagesContainerRef = useRef<HTMLDivElement>(null);

  const scrollToBottom = () => {
    if (messagesContainerRef.current) {
      messagesContainerRef.current.scrollTo({
        top: messagesContainerRef.current.scrollHeight,
        behavior: 'smooth',
      });
    }
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages.length]);

  return (
    <div className="space-y-2">
      <p className="text-sm text-muted-foreground mb-1">Rozmowa</p>
      <div
        ref={messagesContainerRef}
        className="space-y-2 max-h-[400px] overflow-y-auto pr-2"
      >
        {messages.length > 0 ? (
          messages.map((msg, index) => (
            <ChatMessage
              key={msg.id}
              message={{
                id: msg.id,
                message: msg.message,
                sender_id: msg.sender_id,
                sender: {
                  username: msg.sender.username,
                  role: msg.sender.role,
                },
                createdAt: msg.createdAt,
              }}
              currentUserId={currentUserId}
              showUsername={index === 0 || messages[index - 1].sender_id !== msg.sender_id}
              showTimestamp
              isFirstMessageInGroup={index === 0 || messages[index - 1].sender_id !== msg.sender_id}
            />
          ))
        ) : (
          <p className="italic text-muted-foreground">Brak wiadomości w rozmowie.</p>
        )}
      </div>
    </div>
  );
}