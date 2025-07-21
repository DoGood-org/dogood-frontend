import { LinkWithArrow } from '@/components/ui/LinkWithArrow';
import { OrganizationItemProps } from '@/types';
import { useTranslations } from 'next-intl';
import Image from 'next/image';
import { JSX } from 'react';

export const OrganizationItem = ({
  organization,
}: OrganizationItemProps): JSX.Element => {
  const { name, description, members, logo } = organization;
  const t = useTranslations('account');
  const contentViews = t.raw('contentViews') as any[];

  const org = contentViews.find((view) => view.id === 'organization');

  const people = org?.people ?? '';

  return (
    <div className="bg-card p-8 rounded-lg flex flex-col md:flex-row md:gap-8">
      <Image
        src={logo}
        alt={`${name} logo`}
        width={263}
        height={263}
        className="w-[263p] h-[263px] rounded-lg self-center md:self-start"
      />
      <div className="mt-8 md:mt-0 flex flex-col">
        <h3 className="text-h3">{name}</h3>
        <p className="mt-4 text-base">
          {members.length}&nbsp;{people}
        </p>
        <p className="mt-6 text-base">{description}</p>
        <LinkWithArrow
          href=""
          text={t('accountButton')}
          className="self-end mt-7"
        />
      </div>
    </div>
  );
};
