'use client';

import { useLanguage } from '@/contexts/LanguageContext';
import { Building2, Users, Award, TrendingUp } from 'lucide-react';

export function StatsSection() {
  const { locale } = useLanguage();

  const stats = [
    {
      icon: Building2,
      value: '250+',
      label: { hu: 'Ügyfél', en: 'Clients' },
    },
    {
      icon: Users,
      value: '50,000+',
      label: { hu: 'Aktív felhasználó', en: 'Active Users' },
    },
    {
      icon: Award,
      value: '15+',
      label: { hu: 'Év tapasztalat', en: 'Years Experience' },
    },
    {
      icon: TrendingUp,
      value: '98%',
      label: { hu: 'Ügyfél elégedettség', en: 'Client Satisfaction' },
    },
  ];

  return (
    <section className="py-16 bg-gradient-to-r from-[#32406f] to-[#3d4d7e]">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
          {stats.map((stat, index) => {
            const Icon = stat.icon;
            return (
              <div key={index} className="text-center">
                <Icon className="h-10 w-10 text-[#f6821f] mx-auto mb-4" />
                <div className="text-4xl font-bold text-white mb-2">
                  {stat.value}
                </div>
                <div className="text-gray-300">{stat.label[locale]}</div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
