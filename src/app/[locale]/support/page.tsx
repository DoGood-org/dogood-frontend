import { NewsList } from '@/components/main/news/NewsList';
import { ContactSupportSection } from '@/components/support/ContactSupportSection';
import { FAQSection } from '@/components/support/FAQSection';
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
