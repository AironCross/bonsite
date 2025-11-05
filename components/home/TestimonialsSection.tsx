'use client';

import { useLanguage } from '@/contexts/LanguageContext';
import { Card, CardContent } from '@/components/ui/card';
import { Quote } from 'lucide-react';

export function TestimonialsSection() {
  const { t, locale } = useLanguage();

  const testimonials = [
    {
      hu: {
        text: 'A B OnSite-tal sikerült egyetlen platformra integrálnunk összes működési folyamatunkat. A megtérülés 6 hónap alatt megvolt.',
        author: 'Kovács János',
        position: 'Ügyvezető, Gyártó Kft.',
      },
      en: {
        text: 'With B OnSite, we managed to integrate all our operational processes into a single platform. ROI was achieved in 6 months.',
        author: 'János Kovács',
        position: 'CEO, Manufacturing Ltd.',
      },
    },
    {
      hu: {
        text: 'A moduláris felépítésnek köszönhetően pontosan azt tudjuk használni, amire szükségünk van. Fantasztikus rugalmasság!',
        author: 'Nagy Éva',
        position: 'HR vezető, Logisztika Zrt.',
      },
      en: {
        text: 'Thanks to the modular structure, we can use exactly what we need. Fantastic flexibility!',
        author: 'Éva Nagy',
        position: 'HR Manager, Logistics Inc.',
      },
    },
    {
      hu: {
        text: 'A beléptető és vendégkezelő modul bevezetése óta a recepciós munka 70%-kal csökkent. Hihetetlenül hatékony!',
        author: 'Szabó Péter',
        position: 'Facility Manager, Office Park',
      },
      en: {
        text: 'Since implementing the access control and visitor management modules, reception work has decreased by 70%. Incredibly efficient!',
        author: 'Péter Szabó',
        position: 'Facility Manager, Office Park',
      },
    },
  ];

  return (
    <section className="py-20 bg-white">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-3xl font-bold text-[#32406f] sm:text-4xl mb-4">
            {t.testimonials.title}
          </h2>
          <p className="text-lg text-gray-600">
            {t.testimonials.subtitle}
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {testimonials.map((testimonial, index) => (
            <Card key={index} className="border-2 hover:border-[#f6821f]/50 transition-colors">
              <CardContent className="pt-6">
                <Quote className="h-10 w-10 text-[#f6821f] mb-4 opacity-50" />
                <p className="text-gray-700 mb-6 italic">
                  "{testimonial[locale].text}"
                </p>
                <div>
                  <p className="font-semibold text-[#32406f]">
                    {testimonial[locale].author}
                  </p>
                  <p className="text-sm text-gray-600">
                    {testimonial[locale].position}
                  </p>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
}
