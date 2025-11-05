'use client';

import { useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { useLanguage } from '@/contexts/LanguageContext';
import { useAuth } from '@/contexts/AuthContext';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Loader2 } from 'lucide-react';
import Link from 'next/link';

export function DashboardContent() {
  const { t, locale } = useLanguage();
  const { user, loading } = useAuth();
  const router = useRouter();

  useEffect(() => {
    if (!loading && !user) {
      router.push('/login');
    }
  }, [user, loading, router]);

  if (loading) {
    return (
      <div className="flex min-h-[calc(100vh-4rem)] items-center justify-center">
        <Loader2 className="h-8 w-8 animate-spin text-[#f6821f]" />
      </div>
    );
  }

  if (!user) {
    return null;
  }

  return (
    <div className="py-20 bg-gray-50">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-[#32406f] mb-2">
            {t.nav.dashboard}
          </h1>
          <p className="text-gray-600">
            {locale === 'hu' ? 'Üdvözöljük' : 'Welcome'}, {user.email}
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          <Card>
            <CardHeader>
              <CardTitle>{t.modules.title}</CardTitle>
              <CardDescription>
                {locale === 'hu'
                  ? 'Tekintse meg az elérhető modulokat'
                  : 'View available modules'}
              </CardDescription>
            </CardHeader>
            <CardContent>
              <Link href="/modules">
                <Button className="w-full bg-[#f6821f] hover:bg-[#e5771e] text-white">
                  {t.common.learnMore}
                </Button>
              </Link>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>{t.pricing.title}</CardTitle>
              <CardDescription>
                {locale === 'hu'
                  ? 'Konfigurálja egyedi ajánlatát'
                  : 'Configure your custom offer'}
              </CardDescription>
            </CardHeader>
            <CardContent>
              <Link href="/pricing">
                <Button className="w-full bg-[#f6821f] hover:bg-[#e5771e] text-white">
                  {t.pricing.requestOffer}
                </Button>
              </Link>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>{t.about.title}</CardTitle>
              <CardDescription>
                {locale === 'hu'
                  ? 'Tudjon meg többet rólunk'
                  : 'Learn more about us'}
              </CardDescription>
            </CardHeader>
            <CardContent>
              <Link href="/about">
                <Button className="w-full bg-[#32406f] hover:bg-[#3d4d7e] text-white">
                  {t.common.learnMore}
                </Button>
              </Link>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}
