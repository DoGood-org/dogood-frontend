'use client';
import React from 'react';
import {
  AboutHero,
  WhatWeDo,
  MissionAndBelieve,
  MeetGoodBot,
  OurEcosystem,
  OurTeam,
  SupportMission,
} from '@/app/[locale]/about';

const AboutPage: React.FC = () => {
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

export default AboutPage;
