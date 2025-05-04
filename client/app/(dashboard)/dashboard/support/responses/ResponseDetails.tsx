import { Card, CardHeader, CardTitle, CardContent, CardDescription } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Separator } from '@/components/ui/separator';
import { MessageSquareReply, User, CalendarCheck, Info } from 'lucide-react';
import { useTranslations } from 'next-intl';
import { cn } from '@/lib/utils';
// import { UserRole, RankBadge } from '@/components/ui/ui/UserRoleBadge';
import { UserRole, RankBadge } from "@/components/ui/RoleBadge/index";


interface ResponseDetailsProps {
  response: {
    createdAt: Date;
    subject: string;
    message: string;
    status: string;
    response?: string;
    responder_id?: number;
    responder?: {
      username: string;
      role: string;
    };
  };
}

export default function ResponseDetails({ response }: ResponseDetailsProps) {
  const t = useTranslations();
  const formattedDate = new Date(response.createdAt).toLocaleString('pl-PL', {
    dateStyle: 'medium',
    timeStyle: 'short',
  });

  return (
    <Card className="w-full">
      <CardHeader>
        <CardTitle className="text-lg flex items-center gap-2">
          <Info className="h-5 w-5 text-muted-foreground" />
          Szczegóły zgłoszenia
        </CardTitle>
        <CardDescription className="flex items-center gap-2 text-sm text-muted-foreground">
          <CalendarCheck className="h-4 w-4" />
          {formattedDate}
        </CardDescription>
      </CardHeader>
      <CardContent className="space-y-4">
        <div>
          <p className="text-sm text-muted-foreground mb-1">Temat</p>
          <p className="font-medium">{t(`support.topics.${response.subject}`)}</p>
        </div>

        <Separator />

        <div>
          <p className="text-sm text-muted-foreground mb-1">Treść wiadomości</p>
          <p className="whitespace-pre-wrap">{response.message}</p>
        </div>

        <Separator />

        <div className="flex items-center gap-2">
          <p className="text-sm text-muted-foreground">Status:</p>
          <Badge variant="outline">{t(`status.${response.status}`)}</Badge> {/* Tłumaczenie bezpośrednie */}
        </div>

        <Separator />

        <div>
          <p className="text-sm text-muted-foreground mb-1 flex items-center gap-1">
            <MessageSquareReply className="h-4 w-4" />
            Odpowiedź
          </p>
          <p className={cn('whitespace-pre-wrap', !response.response && 'italic text-muted-foreground')}>
            {response.response || 'Brak odpowiedzi.'}
          </p>
        </div>

        <Separator />

        <div className="flex items-center gap-2 text-sm text-muted-foreground">
          <User className="h-4 w-4" />
          Udzielona przez: 
          {response.responder ? (
            <>
             <RankBadge role={response.responder.username as UserRole}/>
              {/* <span>{response.responder.username} </span> */}
              <RankBadge role={response.responder.role as UserRole} />
            </>
          ) : (
            'Nieznany'
          )}

        </div>
      </CardContent>
    </Card>
  );
}
