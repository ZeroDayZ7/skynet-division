'use client';

import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Button } from '@/components/ui/button';
import { Label } from '@/components/ui/label';
import { useSupportForm } from './useSupportForm';
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from '@/components/ui/card';

export function SupportForm() {
  const { user, message, setMessage, loading, handleSubmit, t } = useSupportForm();

  return (
    <div className="flex flex-1 items-center justify-center">
      <Card className="w-full max-w-4xl">
        <CardHeader>
          <CardTitle>{t('title')}</CardTitle>
          <CardDescription>{t('description')}</CardDescription>
        </CardHeader>

        <CardContent className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="name">{t('form.nameLabel')}</Label>
            <Input
              id="name"
              disabled
              value={user?.username || ''}
              placeholder={t('form.namePlaceholder')}
              autoComplete="off"
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="message">{t('form.messageLabel')}</Label>
            <Textarea
              id="message"
              value={message}
              onChange={(e) => setMessage(e.target.value)}
              placeholder={t('form.messagePlaceholder')}
              rows={6}
              className="min-h-[150px]"
              autoComplete="off"
            />
          </div>

          <Button onClick={handleSubmit} disabled={loading} className="w-full">
            {loading ? t('form.submitting') : t('form.submit')}
          </Button>
        </CardContent>
      </Card>
    </div>
  );
}
