import { AboutHero } from './AboutHero';
import { WhatWeDo } from './WhatWeDo';
import { MissionAndBelieve } from './MissionAndBelieve';
import { MeetGoodBot } from './MeetGoodBot';
import { OurEcosystem } from './OurEcosystem';
import { OurTeam } from './OurTeam';
import { SupportMission } from './SupportMission';
import { JSX } from 'react';
export const AboutPage = (): JSX.Element => {
  return (
    <>
      <AboutHero />
      <WhatWeDo />
      <MissionAndBelieve />
      <MeetGoodBot />
      <OurEcosystem />
      <OurTeam />
      <SupportMission />
    </>
  );
};
