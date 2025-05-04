'use client';

import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Button } from '@/components/ui/button';
import { Label } from '@/components/ui/label';
import { useSupportForm } from './useSupportForm';
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from '@/components/ui/card';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Loader } from '@/components/ui/loader';

export default function SupportForm() {
  const { 
    user, 
    message, 
    setMessage, 
    topic, 
    setTopic, 
    loading, 
    handleSubmit, 
    t 
  } = useSupportForm();
  
  if (loading) return <Loader />;

  return (
    <div className="flex flex-1 items-center justify-center">
      <Card className="w-full max-w-2xl">
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
            <Label htmlFor="topic">{t('form.topicLabel')}</Label>
            <Select value={topic} onValueChange={setTopic}>
              <SelectTrigger>
                <SelectValue placeholder={t('form.topicPlaceholder')} />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="general">{t('form.topics.general')}</SelectItem>
                <SelectItem value="technical">{t('form.topics.technical')}</SelectItem>
                <SelectItem value="billing">{t('form.topics.billing')}</SelectItem>
                <SelectItem value="account">{t('form.topics.account')}</SelectItem>
                <SelectItem value="bug">{t('form.topics.bug')}</SelectItem>
                <SelectItem value="feature">{t('form.topics.feature')}</SelectItem>
              </SelectContent>
            </Select>
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

          <Button 
            onClick={handleSubmit} 
            disabled={loading || !message.trim() || !topic}
            className="w-full"
          >
            {loading ? t('form.submitting') : t('form.submit')}
          </Button>
        </CardContent>
      </Card>
    </div>
  );
}