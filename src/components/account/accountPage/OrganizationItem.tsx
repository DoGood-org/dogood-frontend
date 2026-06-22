import { LinkWithArrow } from '@/components/ui/LinkWithArrow';
import { OrganizationItemProps } from '@/types';
import { useLocale, useTranslations } from 'next-intl';
import Image from 'next/image';
import { JSX } from 'react';

export const OrganizationItem = ({
  organization,
}: OrganizationItemProps): JSX.Element => {
  const { id, name, description, _count, avatar } = organization;
  const t = useTranslations('account');
  const locale = useLocale();
  const contentViews = t.raw('contentViews') as any[];
  const membersCount = _count.members;

  const org = contentViews.find((view) => view.id === 'organization');

  const people = org?.people ?? '';

  return (
    <div className="flex flex-col w-full p-8 rounded-lg bg-card md:flex-row md:gap-8">
      <Image
        src={avatar ? avatar : '/account/avatar.png'}
        alt={`${name} logo`}
        width={263}
        height={263}
        className="shrink-0 w-[263p] h-[263px] object-cover rounded-lg self-center md:self-start"
      />
      <div className="flex flex-col w-full mt-8 md:mt-0">
        <h3 className="text-h3">{name}</h3>
        <p className="mt-4 text-base">
          {membersCount}&nbsp;{people}
        </p>
        <p className="mt-6 text-base whitespace-pre-line">{description}</p>
        <LinkWithArrow
          href={`/${locale}/organization/${id}`}
          text={t('accountButton')}
          className="self-end mt-7"
        />
      </div>
    </div>
  );
};
