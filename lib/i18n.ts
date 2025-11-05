export type Locale = 'hu' | 'en';

export const defaultLocale: Locale = 'hu';

export const locales: Locale[] = ['hu', 'en'];

export const localeNames: Record<Locale, string> = {
  hu: 'Magyar',
  en: 'English',
};

export const localeFlags: Record<Locale, string> = {
  hu: '🇭🇺',
  en: '🇬🇧',
};
