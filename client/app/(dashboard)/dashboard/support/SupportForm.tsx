'use client';

import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Button } from '@/components/ui/button';
import { Label } from '@/components/ui/label';
import { useSupportForm } from './useSupportForm';
import { off } from 'process';

export function SupportForm() {
  const { user, message, setMessage, loading, handleSubmit, t } = useSupportForm();

  return (
    <div className="flex flex-1 items-center justify-center">
      <div className="flex flex-col max-w-xl space-y-4">
      <h1 className="text-2xl font-bold">{t('title')}</h1>
      <p className="text-muted-foreground">{t('description')}</p>

      <div className="space-y-4">
        <div className="space-y-2">
          <Label htmlFor="name">{t('form.nameLabel')}</Label>
          <Input
            id="name"
            disabled
            value={user?.nick || ''}
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
            autoComplete='off'
          />
        </div>

        <Button
          onClick={handleSubmit}
          disabled={loading}
          className="w-full"
        >
          {loading ? t('form.submitting') : t('form.submit')}
        </Button>
      </div>
    </div>
    </div>
  );
}
