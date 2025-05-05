import { useState } from 'react';
import { useTranslations } from 'next-intl';
import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import {
  Table,
  TableHeader,
  TableRow,
  TableHead,
  TableBody,
  TableCell,
} from '@/components/ui/table';
import { useSupportMessages } from './useSupportMessages';
import { Loader } from '@/components/ui/loader';
import { format } from 'date-fns';
import { pl } from 'date-fns/locale';
import ResponseDetails from './ResponseDetails';

export default function Responses() {
  const t = useTranslations();
  const { responses, loading, error } = useSupportMessages();
  const [selectedResponseId, setSelectedResponseId] = useState<number | null>(null);

  if (loading) return <Loader />;
  if (error) return <div>{error}</div>;

  const selectedResponse = responses.find((r) => r.id === selectedResponseId);

  return (
    <div className="space-y-2">
      {responses.length === 0 ? (
        <div>Nie masz żadnych wiadomości wsparcia.</div>
      ) : (
        <Card>
          <CardHeader>
            <CardTitle>Twoje wiadomości do supportu</CardTitle>
          </CardHeader>
          <CardContent className="overflow-x-auto">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead className="w-[120px]">Data</TableHead>
                  <TableHead>Temat</TableHead>
                  <TableHead>Status</TableHead>
                  <TableHead className="text-right">Akcja</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {responses.map((response) => (
                  <TableRow key={response.id} className="hover:bg-muted/50">
                    <TableCell>
                      {format(new Date(response.createdAt), 'dd.MM.yyyy', {
                        locale: pl,
                      })}
                    </TableCell>
                    <TableCell>
                      {t(`support.topics.${response.subject}`)}
                    </TableCell>
                    <TableCell>{t(`status.${response.status}`)}</TableCell>
                    <TableCell className="text-right">
                      <Button
                        variant="outline"
                        size="sm"
                        className="w-[100px]"
                        onClick={() =>
                          setSelectedResponseId((prev) =>
                            prev === response.id ? null : response.id,
                          )
                        }
                      >
                        {selectedResponseId === response.id ? 'Ukryj' : 'Zobacz'}
                      </Button>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </CardContent>
        </Card>
      )}

      {selectedResponse && <ResponseDetails response={selectedResponse} />}
    </div>
  );
}
