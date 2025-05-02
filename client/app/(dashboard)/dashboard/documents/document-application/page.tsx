'use client'

import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { useTranslations } from 'next-intl'
import {
  IdCard,
  File,
  PlusCircle,
  FileText,
} from 'lucide-react'

export default function ElectronicDocumentsHome() {
  const t = useTranslations('EDocuments')

  return (
    <div className="container">
      <h1 className="text-2xl font-bold mb-4">{t('title')}</h1>
      <p className="text-muted-foreground mb-4">{t('description')}</p>

      <div className="grid grid-cols-1">
        {/* Wnioski */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <PlusCircle className="w-5 h-5" />
              {t('requests.title')}
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <Button className="w-full justify-start" variant="outline">
              <FileText className="mr-2 h-4 w-4" />
              {t('requests.newApplication')}
            </Button>
            <Button className="w-full justify-start" variant="outline">
              <IdCard className="mr-2 h-4 w-4" />
              {t('requests.updateId')}
            </Button>
            <Button className="w-full justify-start" variant="outline">
              <File className="mr-2 h-4 w-4" />
              {t('requests.updatePassport')}
            </Button>
          </CardContent>
        </Card>

        {/* Dokumenty dostępne
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <IdCard className="w-5 h-5" />
              {t('documents.title')}
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="flex items-center justify-between border rounded-md p-3">
              <span>{t('documents.idCard')}</span>
              <Button size="sm" variant="secondary">{t('documents.open')}</Button>
            </div>
            <div className="flex items-center justify-between border rounded-md p-3">
              <span>{t('documents.passport')}</span>
              <Button size="sm" variant="secondary">{t('documents.open')}</Button>
            </div>
          </CardContent>
        </Card> */}
      </div>
    </div>
  )
}
