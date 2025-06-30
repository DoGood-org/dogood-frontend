'use client';

import Link from 'next/link';
import { ListDropdownProps } from '@/types';
import { useLocale } from 'next-intl';

export const ListDropdown: React.FC<ListDropdownProps> = ({
  listItem,
  setIsOpen,
  toggleMenu,
}) => {
  const handleOnClick = (): void => {
    setIsOpen(false);
    if (toggleMenu) toggleMenu();
  };
  const locale = useLocale();
  const { content } = listItem;
  return (
    <ul className="z-10">
      {content.map(({ src, name, description }, index) => (
        <li key={`${index}-${name}`}>
          <Link
            href={`/${locale}${src}`}
            // onClick={() => setIsOpen(false)}
            onClick={handleOnClick}
            className="hover:text-btn-hover focus:text-btn-hover lg:hover:text-white lg:focus:text-white lg:border-1 lg:border-transparent lg:hover:border-btn-outline-hover lg:dropdown-link block p-5 rounded-md transition duration-700 text-white px-6 py-3"
          >
            <p>{name}</p>
            <p className="hidden lg:block text-[14px]/5 text-text-gray mt-2">
              {description}
            </p>
          </Link>
        </li>
      ))}
    </ul>
  );
};
