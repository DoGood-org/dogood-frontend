import {
  AboutHero,
  WhatWeDo,
  MissionAndBelieve,
  MeetGoodBot,
  OurEcosystem,
  OurTeam,
  SupportMission,
} from '@/components/aboutPage';
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
