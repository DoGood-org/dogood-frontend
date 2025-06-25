'use client';

import Link from 'next/link';
import { ListDropdownProps } from '@/types';
import { useLocale } from 'next-intl';

export const ListDropdown: React.FC<ListDropdownProps> = ({
  listItem,
  setIsOpen,
}) => {
  const locale = useLocale();
  const { content } = listItem;
  return (
    <ul className="z-10">
      {content.map(({ src, name, description }, index) => (
        <li key={`${index}-${name}`}>
          <Link
            href={`/${locale}${src}`}
            onClick={() => setIsOpen(false)}
            className="dropdown-link block p-5 rounded-md transition duration-700 text-white px-6 py-3"
          >
            <p>{name}</p>
            <p className="text-[14px]/5 text-text-gray mt-2">{description}</p>
          </Link>
        </li>
      ))}
    </ul>
  );
};
