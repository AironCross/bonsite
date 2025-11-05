'use client';

import { useLanguage } from '@/contexts/LanguageContext';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Award, Target, Lightbulb, Shield, Users, TrendingUp } from 'lucide-react';
import Link from 'next/link';

export function AboutPageContent() {
  const { t, locale } = useLanguage();

  const values = [
    {
      icon: Shield,
      title: { hu: 'Megbízhatóság', en: 'Reliability' },
      description: {
        hu: 'Partnereink hosszú távú bizalmát minőségi munkával és folyamatos támogatással érdemeljük ki.',
        en: 'We earn the long-term trust of our partners through quality work and continuous support.',
      },
    },
    {
      icon: Lightbulb,
      title: { hu: 'Innováció', en: 'Innovation' },
      description: {
        hu: 'A legújabb technológiákat használjuk, hogy ügyfeleink mindig előnyben legyenek.',
        en: 'We use the latest technologies to keep our clients ahead of the curve.',
      },
    },
    {
      icon: Award,
      title: { hu: 'Minőség', en: 'Quality' },
      description: {
        hu: 'Minden projektünkben kiváló minőségre törekszünk, a tervezéstől a kivitelezésig.',
        en: 'We strive for excellence in every project, from design to implementation.',
      },
    },
    {
      icon: Users,
      title: { hu: 'Ügyfélközpontúság', en: 'Customer Focus' },
      description: {
        hu: 'Ügyfeleink egyedi igényeit helyezzük középpontba, rugalmas megoldásokat kínálva.',
        en: 'We put our clients unique needs at the center, offering flexible solutions.',
      },
    },
  ];

  const stats = [
    {
      icon: Users,
      value: '250+',
      label: { hu: 'Ügyfél', en: 'Clients' },
    },
    {
      icon: Award,
      value: '15+',
      label: { hu: 'Év tapasztalat', en: 'Years Experience' },
    },
    {
      icon: Target,
      value: '98%',
      label: { hu: 'Ügyfél elégedettség', en: 'Client Satisfaction' },
    },
    {
      icon: TrendingUp,
      value: '50k+',
      label: { hu: 'Aktív felhasználó', en: 'Active Users' },
    },
  ];

  return (
    <div className="bg-white">
      <section className="py-20 bg-gradient-to-br from-[#32406f] via-[#3d4d7e] to-[#32406f]">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-3xl mx-auto text-center text-white">
            <h1 className="text-4xl font-bold sm:text-5xl mb-6">
              {t.about.title}
            </h1>
            <p className="text-xl text-gray-200 mb-4">
              {t.about.subtitle}
            </p>
            <p className="text-lg text-gray-300">
              {t.about.description}
            </p>
          </div>
        </div>
      </section>

      <section className="py-20 bg-gray-50">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl font-bold text-[#32406f] sm:text-4xl mb-4">
              {t.about.values}
            </h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-5xl mx-auto">
            {values.map((value, index) => {
              const Icon = value.icon;
              return (
                <Card key={index} className="border-2 hover:border-[#f6821f]/50 transition-colors">
                  <CardHeader>
                    <div className="flex items-center space-x-4">
                      <div className="flex h-12 w-12 items-center justify-center rounded-lg bg-[#f6821f]/10">
                        <Icon className="h-6 w-6 text-[#f6821f]" />
                      </div>
                      <CardTitle className="text-[#32406f]">
                        {value.title[locale]}
                      </CardTitle>
                    </div>
                  </CardHeader>
                  <CardContent>
                    <CardDescription className="text-base">
                      {value.description[locale]}
                    </CardDescription>
                  </CardContent>
                </Card>
              );
            })}
          </div>
        </div>
      </section>

      <section className="py-16 bg-white">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8 max-w-5xl mx-auto">
            {stats.map((stat, index) => {
              const Icon = stat.icon;
              return (
                <div key={index} className="text-center">
                  <Icon className="h-10 w-10 text-[#f6821f] mx-auto mb-4" />
                  <div className="text-4xl font-bold text-[#32406f] mb-2">
                    {stat.value}
                  </div>
                  <div className="text-gray-600">{stat.label[locale]}</div>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      <section className="py-20 bg-gradient-to-r from-[#f6821f] to-[#e5771e]">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl font-bold text-white sm:text-4xl mb-6">
            {locale === 'hu'
              ? 'Készen áll a kezdésre?'
              : 'Ready to get started?'}
          </h2>
          <p className="text-xl text-white/90 mb-10 max-w-2xl mx-auto">
            {locale === 'hu'
              ? 'Lépjen kapcsolatba velünk, és kezdjük el közösen a digitális transzformációt!'
              : 'Contact us and let\'s start your digital transformation together!'}
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link href="/pricing">
              <Button size="lg" className="bg-white text-[#f6821f] hover:bg-gray-100">
                {t.pricing.requestOffer}
              </Button>
            </Link>
            <Link href="/modules">
              <Button
                size="lg"
                variant="outline"
                className="border-white text-white hover:bg-white/10"
              >
                {t.modules.title}
              </Button>
            </Link>
          </div>
        </div>
      </section>

      <section className="py-20 bg-gray-50">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-3xl mx-auto">
            <h2 className="text-3xl font-bold text-[#32406f] mb-8 text-center">
              {locale === 'hu' ? 'Kapcsolat' : 'Contact'}
            </h2>
            <Card>
              <CardContent className="pt-6">
                <div className="space-y-4">
                  <div>
                    <h3 className="font-semibold text-[#32406f] mb-2">
                      B Consulting Kft.
                    </h3>
                    <p className="text-gray-600">
                      {locale === 'hu'
                        ? '1234 Budapest, Példa utca 12.'
                        : '1234 Budapest, Example Street 12.'}
                    </p>
                  </div>
                  <div>
                    <h3 className="font-semibold text-[#32406f] mb-2">
                      {locale === 'hu' ? 'Elérhetőség' : 'Contact'}
                    </h3>
                    <p className="text-gray-600">Email: info@bonsite.hu</p>
                    <p className="text-gray-600">
                      {locale === 'hu' ? 'Telefon' : 'Phone'}: +36 1 234 5678
                    </p>
                  </div>
                  <div>
                    <h3 className="font-semibold text-[#32406f] mb-2">
                      {locale === 'hu' ? 'Nyitvatartás' : 'Business Hours'}
                    </h3>
                    <p className="text-gray-600">
                      {locale === 'hu'
                        ? 'Hétfő - Péntek: 9:00 - 17:00'
                        : 'Monday - Friday: 9:00 AM - 5:00 PM'}
                    </p>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>
    </div>
  );
}
