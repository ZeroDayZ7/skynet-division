'use client';

import { Dialog, DialogTrigger, DialogContent, DialogTitle, DialogDescription, DialogClose } from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { useState } from 'react';
import { toast } from 'sonner';
import { SupportTicket, SupportTicketStatus, useSupportMessages } from './useSupportMessages';

interface TicketModalProps {
  ticket: SupportTicket;
}

const TicketModal = ({ ticket }: TicketModalProps) => {
  const [response, setResponse] = useState<string>(''); // Odpowiedź administratora
  const [isSubmitting, setIsSubmitting] = useState<boolean>(false); // Blokada formularza
  const [status, setStatus] = useState<SupportTicketStatus>(ticket.status); // Inicjalizacja statusu

  const { updateTicketStatus } = useSupportMessages();

  const handleResponseChange = (event: React.ChangeEvent<HTMLTextAreaElement>) => {
    setResponse(event.target.value);
  };

  const handleStatusChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    const newStatus = event.target.value as SupportTicketStatus;
    setStatus(newStatus);
  };

  const handleSubmitResponse = async () => {
    if (!response.trim()) {
      toast.error('Please provide a response.');
      return;
    }

    setIsSubmitting(true);

    try {
      await updateTicketStatus({
        ticketId: ticket.id,
        response: response.trim(),
        status,
      });
      setResponse(''); // Czyszczenie odpowiedzi po sukcesie
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button variant="outline" size="sm">View</Button>
      </DialogTrigger>

      <DialogContent>
        <DialogTitle>{ticket.subject}</DialogTitle>
        <DialogDescription>{/* Informacje o zgłoszeniu */}</DialogDescription>

        <div className="grid grid-cols-[auto_1fr] gap-4">

          <div className="font-bold">Status:</div>
          <select
            value={status}
            onChange={handleStatusChange}
            className="p-2 border rounded-md bg-card"
            disabled={isSubmitting}
          >
            <option value="open">Open</option>
            <option value="inprogress">In Progress</option>
            <option value="closed">Closed</option>
          </select>

          <div className="font-bold">Date:</div>
          <div>{new Date(ticket.createdAt).toLocaleDateString()}</div>

          <div className="font-bold">User: ({ticket.user_id})</div>
          <div>{ticket.message}</div>

          <div className="font-bold">Support: ({ticket.responder_id})</div>
          <div>{ticket.response}</div>
        </div>

        <div className="mt-4">
          <div className="font-bold">Admin Response:</div>
          <textarea
            className="w-full h-24 p-2 border rounded-md"
            placeholder="Type your response here..."
            value={response}
            onChange={handleResponseChange}
            disabled={isSubmitting}
          />
        </div>

        <div className="mt-4 flex justify-end">
          <Button onClick={handleSubmitResponse} variant="outline" disabled={isSubmitting}>
            {isSubmitting ? 'Sending...' : 'Send Response'}
          </Button>
        </div>

        <DialogClose asChild>
          <Button variant="outline">Close</Button>
        </DialogClose>
      </DialogContent>
    </Dialog>
  );
};

export default TicketModal;