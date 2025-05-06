'use client';

interface TicketDetailsSubjectProps {
  subject: string;
}

export function TicketDetailsSubject({ subject }: TicketDetailsSubjectProps) {
  return (
    <div>
      <p className="text-sm text-muted-foreground mb-1">Temat: {subject}</p>
    </div>
  );
}