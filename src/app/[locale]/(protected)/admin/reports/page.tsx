import { Section } from '@/components/ui/Section';
import { JSX } from 'react';

export default async function AdminReportsPage(): Promise<JSX.Element> {
  return (
    <Section className="bg-admin-background min-h-[300px] rounded-lg mb-4 lg:mb-0 flex justify-center text-center w-full">
      <h1>AdminReportsPage</h1>
    </Section>
  );
}
