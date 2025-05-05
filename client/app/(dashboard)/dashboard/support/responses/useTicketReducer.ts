import { useReducer, useCallback } from 'react';

interface TicketMessage {
  id: number;
  message: string;
  sender_id: number;
  sender: {
    username: string;
    role: string;
  };
}

interface TicketDetails {
  id: number;
  messages: TicketMessage[];
  status: string;
  subject: string;
  loading: boolean;
  error: string | null;
}

type State = Record<number, TicketDetails>;

type Action =
  | { type: 'START_LOADING'; id: number }
  | { type: 'SET_DETAILS'; id: number; data: Omit<TicketDetails, 'loading' | 'error'> }
  | { type: 'SET_ERROR'; id: number; error: string }
  | { type: 'ADD_MESSAGE'; id: number; message: TicketMessage }
  | { type: 'SET_STATUS'; id: number; status: string }
  | { type: 'RESET' };

function reducer(state: State, action: Action): State {
  switch (action.type) {
    case 'START_LOADING':
      return {
        ...state,
        [action.id]: { ...state[action.id], loading: true, error: null },
      };
    case 'SET_DETAILS':
      return {
        ...state,
        [action.id]: {
          ...action.data,
          loading: false,
          error: null,
        },
      };
    case 'SET_ERROR':
      return {
        ...state,
        [action.id]: {
          ...(state[action.id] || {}),
          loading: false,
          error: action.error,
        },
      };
    case 'ADD_MESSAGE':
      return {
        ...state,
        [action.id]: {
          ...state[action.id],
          messages: [...state[action.id].messages, action.message],
        },
      };
    case 'SET_STATUS':
      return {
        ...state,
        [action.id]: {
          ...state[action.id],
          status: action.status,
        },
      };
    case 'RESET':
      return {};
    default:
      return state;
  }
}

export function useTicketReducer() {
  const [state, dispatch] = useReducer(reducer, {});

  const loadTicket = useCallback(async (id: number) => {
    dispatch({ type: 'START_LOADING', id });

    try {
      const res = await fetch(`/api/support/${id}`);
      const json = await res.json();
      if (!json.success) throw new Error('Błąd ładowania ticketu');

      dispatch({
        type: 'SET_DETAILS',
        id,
        data: {
          id,
          messages: json.data.messages,
          status: json.data.status,
          subject: json.data.subject,
        },
      });
    } catch (err) {
      dispatch({ type: 'SET_ERROR', id, error: 'Nie udało się pobrać danych.' });
    }
  }, []);

  const sendMessage = useCallback(async (id: number, message: string) => {
    const res = await fetch(`/api/support/${id}/reply`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ message }),
    });

    const json = await res.json();
    if (!json.success) throw new Error('Błąd podczas wysyłania wiadomości');

    dispatch({ type: 'ADD_MESSAGE', id, message: json.data });
  }, []);

  const closeTicket = useCallback(async (id: number) => {
    const res = await fetch(`/api/support/${id}/close`, {
      method: 'POST',
    });

    const json = await res.json();
    if (!json.success) throw new Error('Błąd podczas zamykania ticketu');

    dispatch({ type: 'SET_STATUS', id, status: 'closed' });
  }, []);

  const reset = useCallback(() => dispatch({ type: 'RESET' }), []);

  return {
    tickets: state,
    loadTicket,
    sendMessage,
    closeTicket,
    reset,
  };
}
