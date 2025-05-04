'use client';

import { Dialog, DialogTrigger, DialogContent, DialogTitle, DialogDescription, DialogClose } from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { useState } from 'react';
import { toast } from 'sonner';
import { SupportTicket, SupportTicketStatus, useSupportMessages } from './useSupportMessages'; // Importowanie hooka

interface TicketModalProps {
  ticket: { id: number, user_id: number, subject: string, status: string, createdAt: string, message: string };
}

const TicketModal = ({ ticket }: TicketModalProps) => {
  const [response, setResponse] = useState<string>('');  // Odpowiedź administratora
  const [isSubmitting, setIsSubmitting] = useState<boolean>(false); // Blokada formularza podczas wysyłania
  const [status, setStatus] = useState<SupportTicketStatus>('open'); // Stan statusu

  // Hook z funkcją do aktualizacji statusu i wysyłania odpowiedzi
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
      // Używamy updateTicketStatus do wysłania odpowiedzi i aktualizacji statusu
      await updateTicketStatus(ticket.id, response.trim(), status);
      setResponse(''); // Czyszczenie odpowiedzi po wysłaniu
    } catch (error) {
      console.error('Error sending response:', error);
      toast.error('Failed to send response');
    } finally {
      setIsSubmitting(false); // Przywrócenie stanu po zakończeniu wysyłania
    }
  };

  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button variant="outline" size="sm">View</Button>
      </DialogTrigger>

      <DialogContent>
        <DialogTitle>{ticket.subject}</DialogTitle>
        <DialogDescription>
          {/* Informacje o zgłoszeniu */}
        </DialogDescription>

        <div className="grid grid-cols-[auto_1fr] gap-4">
          <div className="font-bold">User:</div>
          <div>{ticket.user_id}</div>

          <div className="font-bold">Status:</div>
          <select
            value={status}
            onChange={handleStatusChange}
            className="p-2 border rounded-md bg-card"
            disabled={isSubmitting} // Zablokowanie selecta podczas wysyłania
          >
            <option value="open">Open</option>
            <option value="in_progress">In Progress</option>
            <option value="closed">Closed</option>
          </select>

          <div className="font-bold">Date:</div>
          <div>{new Date(ticket.createdAt).toLocaleDateString()}</div>

          <div className="font-bold">Description:</div>
          <div>{ticket.message}</div>
        </div>

        <div className="mt-4">
          <div className="font-bold">Admin Response:</div>
          <textarea
            className="w-full h-24 p-2 border rounded-md"
            placeholder="Type your response here..."
            value={response}
            onChange={handleResponseChange}
            disabled={isSubmitting} // Zablokowanie pola podczas wysyłania
          />
        </div>

        <div className="mt-4 flex justify-end">
          <Button
            onClick={handleSubmitResponse}
            variant="outline"
            disabled={isSubmitting} // Zablokowanie przycisku podczas wysyłania
          >
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
