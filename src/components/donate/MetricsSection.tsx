import React, { JSX } from 'react';
import { Section } from '../ui/Section';
import { Volunteers, Radius, LocationBlue } from '../icons';
import { useTranslations } from 'next-intl';

const icons = [Volunteers, Radius, LocationBlue];

export default function MetricsSection(): JSX.Element {
  const t = useTranslations('donatePage');
  const metrics = t.raw('metrics') as any[];

  return (
    <Section withContainer={false}>
      <ul className="flex flex-wrap items-stretch justify-center max-w-xl gap-8 mx-auto md:max-w-2xl lg:max-w-7xl">
        {metrics.map((metric, index) => {
          const Icon = icons[index];
          return (
            <li
              key={metric.title}
              className="flex flex-col items-center h-full max-w-xs gap-4 text-center "
            >
              <div className="p-4 border rounded-full w-fit">
                <Icon className="size-10" />
              </div>
              <h3 className="font-bold text-border">{metric.count}</h3>
              <h4 className="font-bold">{metric.title}</h4>
              <p className="text-gray-500">{metric.description}</p>
            </li>
          );
        })}
      </ul>
    </Section>
  );
}
