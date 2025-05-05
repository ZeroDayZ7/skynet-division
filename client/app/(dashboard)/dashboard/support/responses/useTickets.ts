'use client';

import { useReducer, useCallback, useEffect } from 'react';
import { toast } from 'sonner';
import { Ticket } from './ticket';
import { fetchClient } from '@/lib/fetchClient';

const TICKETS_LIMIT = 5; // Maksymalna liczba ticketów do pobrania

/**
 * Interfejs stanu dla listy ticketów
 */
interface TicketsState {
  tickets: Ticket[];
  loading: boolean;
  error: string | null;
  includeClosed: boolean;
}

/**
 * Typy akcji dla reducera listy ticketów
 */
type TicketsAction =
  | { type: 'START_LOADING' }
  | { type: 'SET_TICKETS'; tickets: Ticket[] }
  | { type: 'SET_ERROR'; error: string }
  | { type: 'INCLUDE_CLOSED' }
  | { type: 'RESET' };

/**
 * Reducer dla listy ticketów
 * @param state - Aktualny stan
 * @param action - Akcja do wykonania
 */
function ticketsReducer(state: TicketsState, action: TicketsAction): TicketsState {
  switch (action.type) {
    case 'START_LOADING':
      return { ...state, loading: true, error: null };
    case 'SET_TICKETS':
      return { ...state, tickets: action.tickets, loading: false, error: null };
    case 'SET_ERROR':
      return { ...state, loading: false, error: action.error };
    case 'INCLUDE_CLOSED':
      return { ...state, includeClosed: true };
    case 'RESET':
      return { tickets: [], loading: false, error: null, includeClosed: false };
    default:
      return state;
  }
}

/**
 * Hook do zarządzania listą ticketów użytkownika
 * @returns Obiekt z ticketami, metodami i stanami
 */
export function useTickets() {
  const [state, dispatch] = useReducer(ticketsReducer, {
    tickets: [],
    loading: true,
    error: null,
    includeClosed: false,
  });

  /**
   * Pobiera tickety z API
   * @param includeClosed - Czy uwzględnić tickety zamknięte
   */
  const fetchTickets = useCallback(
    async (includeClosed: boolean = false) => {
      dispatch({ type: 'START_LOADING' });
      try {
        const status = includeClosed
          ? ['new', 'open', 'in_progress', 'closed']
          : ['new', 'open', 'in_progress'];
        const response = await fetchClient(
          `/api/support?status=${status.join(',')}&limit=${TICKETS_LIMIT}`
        );
        if (!response.success) {
          throw new Error('Nie udało się pobrać zgłoszeń');
        }
        dispatch({ type: 'SET_TICKETS', tickets: response.data });
      } catch (err) {
        const errorMessage = 'Wystąpił błąd podczas pobierania zgłoszeń';
        dispatch({ type: 'SET_ERROR', error: errorMessage });
        toast.error(errorMessage);
      }
    },
    []
  );

  // Początkowe pobieranie ticketów
  useEffect(() => {
    fetchTickets();
  }, [fetchTickets]);

  /**
   * Ładuje tickety, w tym zamknięte
   */
  const loadClosedTickets = useCallback(() => {
    dispatch({ type: 'INCLUDE_CLOSED' });
    fetchTickets(true);
  }, [fetchTickets]);

  /**
   * Odświeża listę ticketów
   */
  const refetch = useCallback(() => {
    fetchTickets(state.includeClosed);
  }, [fetchTickets, state.includeClosed]);

  return {
    tickets: state.tickets,
    loading: state.loading,
    error: state.error,
    loadTickets: fetchTickets,
    loadClosedTickets,
    refetch,
  };
}