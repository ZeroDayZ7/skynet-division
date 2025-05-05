'use client';

import { useReducer, useCallback } from 'react';
import * as SupportApi from './api';
import { SupportTicket, TicketMessage, TicketDetails } from './types/support';
import { SupportTicketStatus } from '@/app/admin/support-messages/useSupportMessages';

/**
 * Stan reducer'a
 */
type State = {
  tickets: SupportTicket[];
  ticketDetails: Record<number, TicketDetails>;
  loading: boolean;
  error: string | null;
};

/**
 * Akcje reducer'a
 */
type Action =
  | { type: 'START_FETCHING' }
  | { type: 'FETCH_TICKETS'; tickets: SupportTicket[] }
  | { type: 'FETCH_CLOSED_TICKETS'; tickets: SupportTicket[] }
  | { type: 'SET_ERROR'; error: string }
  | { type: 'START_LOADING_DETAILS'; id: number }
  | {
      type: 'SET_TICKET_DETAILS';
      id: number;
      data: Omit<TicketDetails, 'loading' | 'error'>;
    }
  | { type: 'SET_TICKET_ERROR'; id: number; error: string }
  | { type: 'ADD_MESSAGE'; id: number; message: TicketMessage }
  | { type: 'SET_TICKET_STATUS'; id: number; status: string }
  | { type: 'RESET' };

/**
 * Reducer do zarządzania stanem ticketów
 */
function reducer(state: State, action: Action): State {
  switch (action.type) {
    case 'START_FETCHING':
      return { ...state, loading: true, error: null };
    case 'FETCH_TICKETS':
      return {
        ...state,
        tickets: action.tickets,
        loading: false,
        error: null,
      };
    case 'FETCH_CLOSED_TICKETS':
      return {
        ...state,
        tickets: [...state.tickets, ...action.tickets],
        loading: false,
        error: null,
      };
    case 'SET_ERROR':
      return { ...state, loading: false, error: action.error };
    case 'START_LOADING_DETAILS':
      return {
        ...state,
        ticketDetails: {
          ...state.ticketDetails,
          [action.id]: {
            ...(state.ticketDetails[action.id] || {
              id: action.id,
              messages: [],
              status: 'new',
              subject: '',
              createdAt: '',
            }),
            loading: true,
            error: null,
          },
        },
      };
      case 'SET_TICKET_DETAILS':
        console.log('[ADD_MESSAGE] typeof action.id:', typeof action.id);
console.log('[ADD_MESSAGE] Object.keys(state.ticketDetails):', Object.keys(state.ticketDetails));

        console.log('[SET_TICKET_DETAILS] action.id:', action.id);
        console.log('[SET_TICKET_DETAILS] action.data:', action.data);
        console.log('[SET_TICKET_DETAILS] state.ticketDetails (before):', state.ticketDetails);
        console.log('[SET_TICKET_DETAILS] state.tickets (before):', state.tickets);
      
        const updatedTicketDetails = {
          ...state.ticketDetails,
          [action.id]: {
            ...action.data,
            loading: false,
            error: null,
          },
        };
      
        const updatedTickets = state.tickets.map((ticket) =>
          ticket.id === action.id
            ? { ...ticket, status: action.data.status }
            : ticket,
        );
      
        console.log('[SET_TICKET_DETAILS] updatedTicketDetails:', updatedTicketDetails);
        console.log('[SET_TICKET_DETAILS] updatedTickets:', updatedTickets);
      
        return {
          ...state,
          ticketDetails: updatedTicketDetails,
          tickets: updatedTickets,
        };
      
    case 'SET_TICKET_ERROR':
      return {
        ...state,
        ticketDetails: {
          ...state.ticketDetails,
          [action.id]: {
            ...(state.ticketDetails[action.id] || {
              id: action.id,
              messages: [],
              status: 'new',
              subject: '',
              createdAt: '',
            }),
            loading: false,
            error: action.error,
          },
        },
      };
      case 'ADD_MESSAGE':
        console.log('[ADD_MESSAGE] action.id:', action.id);
        console.log('[ADD_MESSAGE] action.message:', action.message);
      
        const ticket = state.ticketDetails[action.id];
        console.log('[ADD_MESSAGE] state.ticketDetails[action.id]:', ticket);
      
        if (!ticket) {
          console.warn(`[ADD_MESSAGE] Brak ticketDetails dla id: ${action.id}, nie dodaję wiadomości.`);
          return state;
        }
      
        const updatedMessages = [...(ticket.messages || []), action.message];
        console.log('[ADD_MESSAGE] updatedMessages:', updatedMessages);
      
        const updatedTicket = {
          ...ticket,
          messages: updatedMessages,
        };
        console.log('[ADD_MESSAGE] updatedTicket:', updatedTicket);
      
        const updatedState = {
          ...state,
          ticketDetails: {
            ...state.ticketDetails,
            [action.id]: updatedTicket,
          },
        };
        console.log('[ADD_MESSAGE] updatedState:', updatedState);
      
        return updatedState;
      
    case 'SET_TICKET_STATUS':
      return {
        ...state,
        tickets: state.tickets.map((ticket) =>
          ticket.id === action.id
            ? { ...ticket, status: action.status }
            : ticket,
        ),
        ticketDetails: {
          ...state.ticketDetails,
          [action.id]: {
            ...state.ticketDetails[action.id],
            status: action.status,
          },
        },
      };
    case 'RESET':
      return { tickets: [], ticketDetails: {}, loading: false, error: null };
    default:
      return state;
  }
}

/**
 * Hook do zarządzania ticketami wsparcia
 */
export function useSupportTickets() {
  const [state, dispatch] = useReducer(reducer, {
    tickets: [],
    ticketDetails: {},
    loading: false,
    error: null,
  });

  const fetchTickets = useCallback(
    async (status: string[] = ['new', 'open', 'in_progress']) => {
      dispatch({ type: 'START_FETCHING' });
      try {
        const tickets = await SupportApi.getTickets(status, 5);
        dispatch({ type: 'FETCH_TICKETS', tickets });
      } catch (err) {
        dispatch({
          type: 'SET_ERROR',
          error: 'Nie udało się pobrać ticketów.',
        });
      }
    },
    [],
  );

  const fetchClosedTickets = useCallback(async () => {
    dispatch({ type: 'START_FETCHING' });
    try {
      const tickets = await SupportApi.getTickets(['closed'], 5);
      dispatch({ type: 'FETCH_CLOSED_TICKETS', tickets });
    } catch (err) {
      dispatch({
        type: 'SET_ERROR',
        error: 'Nie udało się pobrać zamkniętych ticketów.',
      });
    }
  }, []);

  const loadTicketDetails = useCallback(async (id: number) => {
    dispatch({ type: 'START_LOADING_DETAILS', id });
    try {
      const data = await SupportApi.getTicketDetails(id);
      dispatch({
        type: 'SET_TICKET_DETAILS',
        id,
        data: {
          id,
          messages: data.messages,
          status: data.status as SupportTicketStatus,
          subject: data.subject,
          createdAt: data.createdAt,
        },
      });
    } catch (err) {
      dispatch({
        type: 'SET_TICKET_ERROR',
        id,
        error: 'Nie udało się pobrać szczegółów ticketa.',
      });
    }
  }, []);

  const sendMessage = useCallback(async (id: number, message: string) => {
    try {
      const response = await SupportApi.sendMessage(id, message);
      // if (response) {
      //   const messageData = response;
      //   console.log(`Kurwa: ${JSON.stringify(messageData, null, 2)}`);
      //   console.log(`id: ${id}`);
      //   // return;
      // }

      dispatch({ type: 'ADD_MESSAGE', id, message: response });
      return response;
    } catch (err) {
      throw new Error(`Błąd wysyłania wiadomości ${err}`);
    }
  }, []);

  const closeTicket = useCallback(async (id: number, reason?: string) => {
    try {
      await SupportApi.closeTicket(id, reason);
      dispatch({ type: 'SET_TICKET_STATUS', id, status: 'closed' });
    } catch (err) {
      throw new Error('Błąd zamykania ticketa');
    }
  }, []);

  const reset = useCallback(() => {
    dispatch({ type: 'RESET' });
  }, []);

  return {
    tickets: state.tickets,
    ticketDetails: state.ticketDetails,
    loading: state.loading,
    error: state.error,
    fetchTickets,
    fetchClosedTickets,
    loadTicketDetails,
    sendMessage,
    closeTicket,
    reset,
  };
}
