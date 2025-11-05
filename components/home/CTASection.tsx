'use client';

import { useLanguage } from '@/contexts/LanguageContext';
import { Button } from '@/components/ui/button';
import { ArrowRight } from 'lucide-react';
import Link from 'next/link';

export function CTASection() {
  const { t } = useLanguage();

  return (
    <section className="py-20 bg-gradient-to-br from-[#f6821f] to-[#e5771e]">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 text-center">
        <h2 className="text-3xl font-bold text-white sm:text-4xl mb-6">
          {t.contact.title}
        </h2>
        <p className="text-xl text-white/90 mb-10 max-w-2xl mx-auto">
          {t.contact.subtitle}
        </p>
        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <Link href="/pricing">
            <Button
              size="lg"
              className="bg-white text-[#f6821f] hover:bg-gray-100 group"
            >
              {t.pricing.requestOffer}
              <ArrowRight className="ml-2 h-5 w-5 transition-transform group-hover:translate-x-1" />
            </Button>
          </Link>
          <Link href="/about">
            <Button
              size="lg"
              variant="outline"
              className="border-white text-white hover:bg-white/10"
            >
              {t.common.learnMore}
            </Button>
          </Link>
        </div>
      </div>
    </section>
  );
}
