import Link from 'next/link';
import { NavItemRendererProps } from '@/types';
import { NavDropdown } from './NavDropdown';
import { SettingsList } from './SettingList';
import { Button } from '@/components/ui/Button';
import { User } from '@/components/icons';
import { NavButtons } from './NavButtons';

export const NavItemRenderer: React.FC<NavItemRendererProps> = ({
  navItem,
  isOpen,
}) => {
  switch (navItem.type) {
    case 'link':
      return (
        <li>
          <Button asChild variant="ghost" size="md">
            <Link
              href={navItem.src}
              className="nav-link text-white flex items-center"
            >
              {navItem.title}
            </Link>
          </Button>
        </li>
      );

    case 'list':
      return (
        <NavDropdown
          isOpen={isOpen}
          trigger={navItem.title}
          className="min-w-[330px]"
        >
          <ul className="z-10">
            {navItem.content.map(({ src, name, description }, index) => (
              <li key={`${index}-${name}`}>
                <Link
                  href={src}
                  className="dropdown-link block p-5 rounded-md transition duration-700 text-white px-6 py-3"
                >
                  <p className="">{name}</p>
                  <p className="text-[14px]/5 text-text-gray mt-2">
                    {description}
                  </p>
                </Link>
              </li>
            ))}
          </ul>
        </NavDropdown>
      );

    case 'settings':
      return (
        <NavDropdown isOpen={isOpen} trigger={navItem.title} className="">
          <SettingsList settingItem={navItem} />
        </NavDropdown>
      );

    case 'icon':
      return (
        <NavDropdown
          isOpen={isOpen}
          trigger={<User className="size-6" />}
          className=""
          isIcon
        >
          <NavButtons />
        </NavDropdown>
      );

    default:
      return null;
  }
};
