import { Metadata } from 'next';
import { DashboardContent } from '@/components/dashboard/DashboardContent';

export const metadata: Metadata = {
  title: 'Áttekintés - B OnSite',
  description: 'B OnSite felhasználói áttekintés',
};

export default function DashboardPage() {
  return <DashboardContent />;
}
