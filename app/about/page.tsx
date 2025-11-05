import { Metadata } from 'next';
import { AboutPageContent } from '@/components/about/AboutPageContent';

export const metadata: Metadata = {
  title: 'Rólunk - B OnSite',
  description: 'B Consulting Kft. - Több mint 15 éves tapasztalat a digitális működésmenedzsment területén.',
};

export default function AboutPage() {
  return <AboutPageContent />;
}
