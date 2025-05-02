'use client'

import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import { useTranslations } from 'next-intl'
import {
  User,
  Star,
  ShieldCheck,
  Calendar,
  Award,
  CheckCircle,
} from 'lucide-react'

export default function UserProfilePage() {
  const t = useTranslations('UserProfile')

  return (
    <div className="container py-4">
      {/* <h1 className="text-2xl font-bold mb-4">{t('title')}</h1>
      <p className="text-muted-foreground mb-4">{t('description')}</p> */}

      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <User className="w-5 h-5" />
            {t('profile.title')}
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-4 text-sm">
          <div className="flex items-center justify-between">
            <span className="text-muted-foreground">{t('profile.nickname')}</span>
            <span className="font-medium">janek1990</span>
          </div>

          <div className="flex items-center justify-between">
            <span className="text-muted-foreground">{t('profile.rank')}</span>
            <Badge variant="default" className="gap-1">
              <Star className="w-4 h-4" /> Platinum
            </Badge>
          </div>

          <div className="flex items-center justify-between">
            <span className="text-muted-foreground">{t('profile.role')}</span>
            <Badge variant="outline" className="gap-1">
              <ShieldCheck className="w-4 h-4" /> Admin
            </Badge>
          </div>

          <div className="flex items-center justify-between">
            <span className="text-muted-foreground">{t('profile.points')}</span>
            <span className="font-medium">1 530</span>
          </div>

          <div className="flex items-center justify-between">
            <span className="text-muted-foreground">{t('profile.joined')}</span>
            <div className="flex items-center gap-2">
              <Calendar className="w-4 h-4 text-muted-foreground" />
              <span>12.03.2023</span>
            </div>
          </div>

          <div className="flex items-center justify-between">
            <span className="text-muted-foreground">{t('profile.status')}</span>
            <div className="flex items-center gap-2 text-green-600 font-medium">
              <CheckCircle className="w-4 h-4" /> Aktywne
            </div>
          </div>

          {/* <div className="pt-4">
            <Button className="w-full">{t('profile.edit')}</Button>
          </div> */}
        </CardContent>
      </Card>
    </div>
  )
}
