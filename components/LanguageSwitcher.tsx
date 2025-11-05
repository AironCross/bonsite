'use client';

import { useLanguage } from '@/contexts/LanguageContext';
import { Button } from '@/components/ui/button';
import { localeFlags, Locale } from '@/lib/i18n';

export function LanguageSwitcher() {
  const { locale, setLocale } = useLanguage();

  const toggleLocale = () => {
    setLocale(locale === 'hu' ? 'en' : 'hu');
  };

  const nextLocale: Locale = locale === 'hu' ? 'en' : 'hu';

  return (
    <Button
      variant="ghost"
      size="sm"
      onClick={toggleLocale}
      className="text-sm font-medium"
      aria-label={`Switch to ${nextLocale === 'en' ? 'English' : 'Hungarian'}`}
    >
      {localeFlags[nextLocale]} {nextLocale.toUpperCase()}
    </Button>
  );
}
