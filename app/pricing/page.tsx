import { Metadata } from 'next';
import { PricingPageContent } from '@/components/pricing/PricingPageContent';

export const metadata: Metadata = {
  title: 'Árazás - B OnSite',
  description: 'Konfigurálja egyedi ajánlatát. Válassza ki a szükséges modulokat és a felhasználók számát.',
};

export default function PricingPage() {
  return <PricingPageContent />;
}
