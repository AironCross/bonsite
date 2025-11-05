import { Metadata } from 'next';
import { ModulesPageContent } from '@/components/modules/ModulesPageContent';

export const metadata: Metadata = {
  title: 'Modulok - B OnSite',
  description: 'Ismerje meg a B OnSite rendszer moduljait: HR, beléptető, teherporta, vendégkezelés, riportok és további funkciók.',
};

export default function ModulesPage() {
  return <ModulesPageContent />;
}
