import React, { JSX } from 'react';
import { GrantsHero } from './GrantsHero';
import { WhatAreGrants } from './WhatAreGrants';
import { TransparencyAndTrust } from './TransparencyAndTrust';
import { TypesOfGrants } from './TypesOfGrants';
import { HowToApply } from './HowToApply';
import { FAQSection } from './FAQSection';
import { WhatPeopleSay } from '../ui/globalReviews/WhatPeopleSay';
import { BecameAVolunteer } from './BecameAVolunteer';

export const GrantsPage = (): JSX.Element => {
  return (
    <>
      <GrantsHero />
      <WhatAreGrants />
      <TypesOfGrants />
      <TransparencyAndTrust />
      <WhatPeopleSay />
      <HowToApply />
      <FAQSection />
      <BecameAVolunteer />
    </>
  );
};
