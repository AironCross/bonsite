'use client';

import Link from 'next/link';
import { useLanguage } from '@/contexts/LanguageContext';

export function Footer() {
  const { t } = useLanguage();
  const currentYear = new Date().getFullYear();

  return (
    <footer className="border-t bg-gray-50">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          <div className="col-span-1 md:col-span-2">
            <div className="flex items-center space-x-2 mb-4">
              <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-[#32406f]">
                <span className="text-xl font-bold text-white">B</span>
              </div>
              <span className="text-xl font-bold text-[#32406f]">OnSite</span>
            </div>
            <p className="text-sm text-gray-600 max-w-md">
              {t.hero.subtitle}
            </p>
          </div>

          <div>
            <h3 className="font-semibold text-[#32406f] mb-4">
              {t.nav.home}
            </h3>
            <ul className="space-y-2">
              <li>
                <Link
                  href="/modules"
                  className="text-sm text-gray-600 hover:text-[#f6821f] transition-colors"
                >
                  {t.nav.modules}
                </Link>
              </li>
              <li>
                <Link
                  href="/pricing"
                  className="text-sm text-gray-600 hover:text-[#f6821f] transition-colors"
                >
                  {t.nav.pricing}
                </Link>
              </li>
              <li>
                <Link
                  href="/about"
                  className="text-sm text-gray-600 hover:text-[#f6821f] transition-colors"
                >
                  {t.nav.about}
                </Link>
              </li>
            </ul>
          </div>

          <div>
            <h3 className="font-semibold text-[#32406f] mb-4">
              {t.contact.title}
            </h3>
            <ul className="space-y-2 text-sm text-gray-600">
              <li>B Consulting Kft.</li>
              <li>info@bonsite.hu</li>
              <li>+36 1 234 5678</li>
            </ul>
          </div>
        </div>

        <div className="mt-8 pt-8 border-t text-center text-sm text-gray-600">
          <p>
            &copy; {currentYear} B Consulting Kft. {t.about.values}.
          </p>
        </div>
      </div>
    </footer>
  );
}
