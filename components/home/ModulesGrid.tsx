'use client';

import { useLanguage } from '@/contexts/LanguageContext';
import { modules } from '@/lib/pricing-data';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import Link from 'next/link';
import * as Icons from 'lucide-react';

export function ModulesGrid() {
  const { t } = useLanguage();

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
    return Icon ? <Icon className="h-8 w-8" /> : null;
  };

  return (
    <section className="py-20 bg-gray-50">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-3xl font-bold text-[#32406f] sm:text-4xl mb-4">
            {t.modules.title}
          </h2>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            {t.modules.subtitle}
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-12">
          {modules.map((module) => (
            <Card
              key={module.id}
              className="group hover:shadow-xl transition-all duration-300 hover:-translate-y-1 border-2 hover:border-[#f6821f]/50"
            >
              <CardHeader>
                <div className="mb-4 text-[#f6821f] group-hover:scale-110 transition-transform">
                  {getIcon(module.icon)}
                </div>
                <CardTitle className="text-[#32406f] text-lg">
                  {getTranslation(module.nameKey)}
                </CardTitle>
              </CardHeader>
              <CardContent>
                <CardDescription className="text-gray-600">
                  {getTranslation(module.descriptionKey)}
                </CardDescription>
              </CardContent>
            </Card>
          ))}
        </div>

        <div className="text-center">
          <Link href="/modules">
            <Button size="lg" className="bg-[#f6821f] hover:bg-[#e5771e] text-white">
              {t.common.learnMore}
            </Button>
          </Link>
        </div>
      </div>
    </section>
  );
}
