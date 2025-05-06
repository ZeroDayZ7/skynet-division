'use client'

import {
  Card, CardHeader, CardTitle, CardDescription, CardContent
} from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Button } from '@/components/ui/button';
import {
  Select, SelectContent, SelectItem, SelectTrigger, SelectValue
} from '@/components/ui/select';
import {
  Form, FormField, FormItem, FormLabel, FormControl, FormMessage
} from '@/components/ui/form';
import { useSupportForm } from './useSupportForm';

export default function SupportForm() {
  const { user, form, t, onSubmit } = useSupportForm();
  const { control, handleSubmit, watch, formState: { isSubmitting } } = form;

  return (
    <div className="flex flex-1 items-center justify-center">
      <Card className="w-full max-w-2xl">
        <CardHeader>
          <CardTitle>{t('title')}</CardTitle>
          <CardDescription className="text-sm">{t('description')}</CardDescription>
        </CardHeader>

        <Form {...form}>
          <form id="support-form" onSubmit={handleSubmit(onSubmit)}>
            <CardContent className="space-y-6">
              <div className="flex flex-col gap-4 md:flex-row">
                {/* Name field (readonly) */}
                <div className="flex-1 space-y-1">
                  <FormItem>
                    <FormLabel htmlFor="name">{t('form.nameLabel')}</FormLabel>
                    <FormControl>
                      <Input
                        id="name"
                        disabled
                        value={user?.username || ''}
                        placeholder={t('form.namePlaceholder')}
                        autoComplete="off"
                      />
                    </FormControl>
                  </FormItem>
                </div>

                {/* Topic Select */}
                <div className="flex-1">
                  <FormField
                    control={control}
                    name="topic"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>{t('form.topicLabel')}</FormLabel>
                        <Select onValueChange={field.onChange} defaultValue={field.value}>
                          <FormControl>
                            <SelectTrigger className='w-full'>
                              <SelectValue placeholder={t('form.topicPlaceholder')} />
                            </SelectTrigger>
                          </FormControl>
                          <SelectContent>
                            <SelectItem value="general">{t('form.topics.general')}</SelectItem>
                            <SelectItem value="technical">{t('form.topics.technical')}</SelectItem>
                            <SelectItem value="billing">{t('form.topics.billing')}</SelectItem>
                            <SelectItem value="account">{t('form.topics.account')}</SelectItem>
                            <SelectItem value="bug">{t('form.topics.bug')}</SelectItem>
                            <SelectItem value="feature">{t('form.topics.feature')}</SelectItem>
                          </SelectContent>
                        </Select>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </div>
              </div>

              {/* Message Textarea */}
              <FormField
                control={control}
                name="message"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel htmlFor='message'>{t('form.messageLabel')}</FormLabel>
                    <FormControl>
                      <Textarea
                        {...field}
                        id="message"
                        placeholder={t('form.messagePlaceholder')}
                        rows={6}
                        className="min-h-[150px]"
                        autoComplete="off"
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              {/* Submit Button */}
              <Button
                type="submit"
                disabled={!watch('message')?.trim() || !watch('topic') || isSubmitting}
                className="w-full"
              >
                {isSubmitting ? t('form.submitting') : t('form.submit')}
              </Button>
            </CardContent>
          </form>
        </Form>
      </Card>
    </div>
  );
}
