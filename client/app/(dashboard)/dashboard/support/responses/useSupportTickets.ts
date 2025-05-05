'use client';

import { useReducer, useCallback } from 'react';
import * as SupportApi from './supportApi';
import { SupportTicket, TicketMessage } from './support';

/**
 * Interfejs stanu ticketa
 */
interface TicketDetails {
  id: number;
  messages: TicketMessage[];
  status: 'new' | 'open' | 'in_progress' | 'closed';
  subject: string;
  createdAt: string;
  loading: boolean;
  error: string | null;
}

/**
 * Stan reducer'a - mapa ticketów według ID
 */
type State = {
  tickets: SupportTicket[];
  ticketDetails: Record<number, TicketDetails>;
};

/**
 * Akcje reducer'a
 */
type Action =
  | { type: 'FETCH_TICKETS'; tickets: SupportTicket[] }
  | { type: 'FETCH_CLOSED_TICKETS'; tickets: SupportTicket[] }
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
    case 'FETCH_TICKETS':
      return {
        ...state,
        tickets: action.tickets,
      };
    case 'FETCH_CLOSED_TICKETS':
      return {
        ...state,
        tickets: [...state.tickets, ...action.tickets],
      };
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
      return {
        ...state,
        ticketDetails: {
          ...state.ticketDetails,
          [action.id]: {
            ...action.data,
            loading: false,
            error: null,
          },
        },
        tickets: state.tickets.map((ticket) =>
          ticket.id === action.id ? { ...ticket, status: action.data.status } : ticket
        ),
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
      return {
        ...state,
        ticketDetails: {
          ...state.ticketDetails,
          [action.id]: {
            ...state.ticketDetails[action.id],
            messages: [...state.ticketDetails[action.id].messages, action.message],
          },
        },
      };
    case 'SET_TICKET_STATUS':
      return {
        ...state,
        tickets: state.tickets.map((ticket) =>
          ticket.id === action.id ? { ...ticket, status: action.status } : ticket
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
      return { tickets: [], ticketDetails: {} };
    default:
      return state;
  }
}

/**
 * Hook do zarządzania ticketami wsparcia
 */
export function useSupportTickets() {
  const [state, dispatch] = useReducer(reducer, { tickets: [], ticketDetails: {} });

  /**
   * Pobieranie listy ticketów
   */
  const fetchTickets = useCallback(async (status: string[] = ['new', 'open', 'in_progress']) => {
    try {
      const tickets = await SupportApi.getTickets(status, 5);
      dispatch({ type: 'FETCH_TICKETS', tickets });
    } catch (err) {
      console.error('Błąd pobierania ticketów:', err);
    }
  }, []);

  /**
   * Pobieranie zamkniętych ticketów
   */
  const fetchClosedTickets = useCallback(async () => {
    try {
      const tickets = await SupportApi.getTickets(['closed'], 5);
      dispatch({ type: 'FETCH_CLOSED_TICKETS', tickets });
    } catch (err) {
      console.error('Błąd pobierania zamkniętych ticketów:', err);
    }
  }, []);

  /**
   * Ładowanie szczegółów ticketa
   */
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
          status: data.status,
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

  /**
   * Wysyłanie wiadomości
   */
  const sendMessage = useCallback(async (id: number, message: string) => {
    try {
      const newMessage = await SupportApi.sendMessage(id, message);
      dispatch({ type: 'ADD_MESSAGE', id, message: newMessage });
    } catch (err) {
      throw new Error('Błąd wysyłania wiadomości');
    }
  }, []);

  /**
   * Zamykanie ticketa
   */
  const closeTicket = useCallback(async (id: number, reason?: string) => {
    try {
      await SupportApi.closeTicket(id, reason);
      dispatch({ type: 'SET_TICKET_STATUS', id, status: 'closed' });
    } catch (err) {
      throw new Error('Błąd zamykania ticketa');
    }
  }, []);

  /**
   * Resetowanie stanu
   */
  const reset = useCallback(() => {
    dispatch({ type: 'RESET' });
  }, []);

  return {
    tickets: state.tickets,
    ticketDetails: state.ticketDetails,
    fetchTickets,
    fetchClosedTickets,
    loadTicketDetails,
    sendMessage,
    closeTicket,
    reset,
  };
}