'use client';

import { useLanguage } from '@/contexts/LanguageContext';
import { modules } from '@/lib/pricing-data';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import Link from 'next/link';
import * as Icons from 'lucide-react';

export function ModulesPageContent() {
  const { t, locale } = useLanguage();

  const getTranslation = (key: string) => {
    const parts = key.split('.');
    let value: any = t;
    for (const part of parts) {
      value = value[part];
    }
    return value;
  };

  const getIcon = (iconName: string) => {
    const Icon = (Icons as any)[iconName];
    return Icon ? <Icon className="h-12 w-12" /> : null;
  };

  const formatPrice = (price: number) => {
    return new Intl.NumberFormat('hu-HU').format(price);
  };

  return (
    <div className="py-20 bg-gray-50">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h1 className="text-4xl font-bold text-[#32406f] sm:text-5xl mb-4">
            {t.modules.title}
          </h1>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            {t.modules.subtitle}
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-12">
          {modules.map((module) => (
            <Card
              key={module.id}
              className="group hover:shadow-xl transition-all duration-300 border-2 hover:border-[#f6821f]/50"
            >
              <CardHeader>
                <div className="flex items-start justify-between">
                  <div className="flex items-start space-x-4">
                    <div className="text-[#f6821f] group-hover:scale-110 transition-transform">
                      {getIcon(module.icon)}
                    </div>
                    <div>
                      <CardTitle className="text-[#32406f] text-2xl mb-2">
                        {getTranslation(module.nameKey)}
                      </CardTitle>
                      <div className="flex gap-2">
                        <Badge variant="secondary">
                          {formatPrice(module.basePrice)} Ft / {t.pricing.perMonth}
                        </Badge>
                        <Badge variant="outline">
                          +{formatPrice(module.pricePerUser)} Ft / {t.pricing.users}
                        </Badge>
                      </div>
                    </div>
                  </div>
                </div>
              </CardHeader>
              <CardContent>
                <CardDescription className="text-gray-600 text-base mb-4">
                  {getTranslation(module.descriptionKey)}
                </CardDescription>
                <ul className="space-y-2 text-sm text-gray-600 mb-4">
                  <li className="flex items-center">
                    <span className="mr-2 text-[#f6821f]">✓</span>
                    {locale === 'hu' ? 'Teljes körű adatkezelés' : 'Complete data management'}
                  </li>
                  <li className="flex items-center">
                    <span className="mr-2 text-[#f6821f]">✓</span>
                    {locale === 'hu' ? 'Valós idejű jelentések' : 'Real-time reports'}
                  </li>
                  <li className="flex items-center">
                    <span className="mr-2 text-[#f6821f]">✓</span>
                    {locale === 'hu' ? 'Mobil alkalmazás támogatás' : 'Mobile app support'}
                  </li>
                  <li className="flex items-center">
                    <span className="mr-2 text-[#f6821f]">✓</span>
                    {locale === 'hu' ? 'API integráció' : 'API integration'}
                  </li>
                </ul>
              </CardContent>
            </Card>
          ))}
        </div>

        <div className="text-center">
          <Link href="/pricing">
            <Button size="lg" className="bg-[#f6821f] hover:bg-[#e5771e] text-white">
              {t.pricing.title}
            </Button>
          </Link>
        </div>
      </div>
    </div>
  );
}
