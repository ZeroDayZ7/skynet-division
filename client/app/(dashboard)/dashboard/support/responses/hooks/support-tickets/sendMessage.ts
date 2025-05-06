'use client';

import { useMutation, useQueryClient } from '@tanstack/react-query';
import * as SupportApi from '../../api';
import { TicketMessage, TicketDetails } from './types';

export function useSendMessage() {
  const queryClient = useQueryClient();

  return useMutation<TicketMessage, Error, { id: number; message: string }>({
    mutationFn: async ({ id, message }) => {
      const data = await SupportApi.sendMessage(id, message);
      console.log('[useSendMessage] Sent message:', data);
      return data;
    },
    onSuccess: (newMessage, { id }) => {
      queryClient.setQueryData(['ticketDetails', id], (old: TicketDetails | undefined) => {
        if (!old) return old;
        return {
          ...old,
          messages: [...(old.messages ?? []), newMessage],
        };
      });
    },
    onError: (error) => {
      console.error('[useSendMessage] Error sending message:', error);
    },
  });
}