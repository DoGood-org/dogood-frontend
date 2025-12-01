import { FAQSection, NewsList } from '@/components';
import { ContactSupportSection } from '@/components/support/ContactSupportSection';
import React from 'react';

const SupportPage: React.FC = () => {
  return (
    <>
      <FAQSection />
      <ContactSupportSection />
      <NewsList />
    </>
  );
};

export default SupportPage;
