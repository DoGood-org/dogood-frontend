import React, { JSX } from 'react';
import { Section } from '../ui/Section';
import { Volunteers, Radius, LocationBlue } from '../icons';
import { useTranslations } from 'next-intl';

export default function MetricsSection(): JSX.Element {
  const t = useTranslations('donatePage');
  const metricsText = t.raw('metrics') as any;

  const metrics = [
    {
      icon: Volunteers,
      count: metricsText.metricsOne.count,
      title: metricsText.metricsOne.title,
      description: metricsText.metricsOne.description,
    },
    {
      icon: Radius,
      count: metricsText.metricsTwo.count,
      title: metricsText.metricsTwo.title,
      description: metricsText.metricsTwo.description,
    },
    {
      icon: LocationBlue,
      count: metricsText.metricsThree.count,
      title: metricsText.metricsThree.title,
      description: metricsText.metricsThree.description,
    },
  ];

  return (
    <Section withContainer={false}>
      <ul className="flex justify-center items-stretch  gap-8 flex-wrap max-w-xl md:max-w-2xl lg:max-w-7xl mx-auto">
        {metrics.map((metric, index) => (
          <li
            key={index}
            className="text-center flex flex-col h-full items-center max-w-xs   gap-4 "
          >
            <div className="border  p-4 rounded-full w-fit">
              <metric.icon className="size-10" />
            </div>
            <h3 className="text-[#2C8C8C] font-bold">{metric.count}</h3>
            <h4 className="font-bold">{metric.title}</h4>
            <p className="text-gray-500">{metric.description}</p>
          </li>
        ))}
      </ul>
    </Section>
  );
}
