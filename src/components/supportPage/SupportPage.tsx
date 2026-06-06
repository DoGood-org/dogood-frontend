import React from 'react';
import { FAQSection } from './FAQSection';
import { ContactSupportSection } from './ContactSupportSection';
import { NewsList } from '../main/news/NewsList';

export const SupportPage = (): React.JSX.Element => {
  return (
    <>
      <FAQSection />
      <ContactSupportSection />
      <NewsList />
    </>
  );
};
