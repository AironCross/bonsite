'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { LanguageSwitcher } from './LanguageSwitcher';
import { useLanguage } from '@/contexts/LanguageContext';
import { useAuth } from '@/contexts/AuthContext';
import { Button } from '@/components/ui/button';
import { Menu, X } from 'lucide-react';
import { useState } from 'react';
import { createClient } from '@/utils/supabase/client';
import { useRouter } from 'next/navigation';

export function Header() {
  const { t } = useLanguage();
  const { user } = useAuth();
  const pathname = usePathname();
  const router = useRouter();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const handleLogout = async () => {
    const supabase = createClient();
    await supabase.auth.signOut();
    router.push('/');
    router.refresh();
  };

  const navLinks = [
    { href: '/', label: t.nav.home },
    { href: '/modules', label: t.nav.modules },
    { href: '/pricing', label: t.nav.pricing },
    { href: '/about', label: t.nav.about },
  ];

  const isActive = (href: string) => pathname === href;

  return (
    <header className="sticky top-0 z-50 w-full border-b bg-white/80 backdrop-blur-md">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex h-16 items-center justify-between">
          <div className="flex items-center">
            <Link href="/" className="flex items-center space-x-2">
              <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-[#32406f]">
                <span className="text-xl font-bold text-white">B</span>
              </div>
              <span className="text-xl font-bold text-[#32406f]">OnSite</span>
            </Link>
          </div>

          <nav className="hidden md:flex md:items-center md:space-x-1">
            {navLinks.map((link) => (
              <Link key={link.href} href={link.href}>
                <Button
                  variant="ghost"
                  className={
                    isActive(link.href)
                      ? 'text-[#f6821f]'
                      : 'text-gray-700 hover:text-[#32406f]'
                  }
                >
                  {link.label}
                </Button>
              </Link>
            ))}
          </nav>

          <div className="hidden md:flex md:items-center md:space-x-2">
            <LanguageSwitcher />
            {user ? (
              <>
                <Link href="/dashboard">
                  <Button variant="ghost">{t.nav.dashboard}</Button>
                </Link>
                <Button variant="outline" onClick={handleLogout}>
                  {t.nav.logout}
                </Button>
              </>
            ) : (
              <>
                <Link href="/login">
                  <Button variant="ghost">{t.nav.login}</Button>
                </Link>
                <Link href="/register">
                  <Button
                    className="bg-[#f6821f] hover:bg-[#e5771e] text-white"
                  >
                    {t.nav.register}
                  </Button>
                </Link>
              </>
            )}
          </div>

          <div className="flex md:hidden">
            <Button
              variant="ghost"
              size="icon"
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            >
              {mobileMenuOpen ? (
                <X className="h-6 w-6" />
              ) : (
                <Menu className="h-6 w-6" />
              )}
            </Button>
          </div>
        </div>

        {mobileMenuOpen && (
          <div className="md:hidden py-4 space-y-2">
            {navLinks.map((link) => (
              <Link key={link.href} href={link.href}>
                <Button
                  variant="ghost"
                  className={`w-full justify-start ${
                    isActive(link.href) ? 'text-[#f6821f]' : 'text-gray-700'
                  }`}
                  onClick={() => setMobileMenuOpen(false)}
                >
                  {link.label}
                </Button>
              </Link>
            ))}
            <div className="pt-4 border-t space-y-2">
              <LanguageSwitcher />
              {user ? (
                <>
                  <Link href="/dashboard" className="block">
                    <Button
                      variant="ghost"
                      className="w-full justify-start"
                      onClick={() => setMobileMenuOpen(false)}
                    >
                      {t.nav.dashboard}
                    </Button>
                  </Link>
                  <Button
                    variant="outline"
                    className="w-full"
                    onClick={() => {
                      handleLogout();
                      setMobileMenuOpen(false);
                    }}
                  >
                    {t.nav.logout}
                  </Button>
                </>
              ) : (
                <>
                  <Link href="/login" className="block">
                    <Button
                      variant="ghost"
                      className="w-full justify-start"
                      onClick={() => setMobileMenuOpen(false)}
                    >
                      {t.nav.login}
                    </Button>
                  </Link>
                  <Link href="/register" className="block">
                    <Button
                      className="w-full bg-[#f6821f] hover:bg-[#e5771e] text-white"
                      onClick={() => setMobileMenuOpen(false)}
                    >
                      {t.nav.register}
                    </Button>
                  </Link>
                </>
              )}
            </div>
          </div>
        )}
      </div>
    </header>
  );
}
