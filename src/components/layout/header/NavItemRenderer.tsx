import Link from 'next/link';
import { NavItemRendererProps } from '@/types';
import { NavDropdown } from './NavDropdown';

// Тимчасові заглушки
const Languages: React.FC = () => <div>Languages Component</div>;
const Features: React.FC = () => <div>Features Component</div>;
const Theme: React.FC = () => <div>Theme Component</div>;

export const NavItemRenderer: React.FC<NavItemRendererProps> = ({
  navItem,
  isOpen,
}) => {
  switch (navItem.type) {
    case 'link':
      return (
        <li>
          <Link
            href={navItem.src}
            className="nav-link text-white flex h-[104px] items-center"
          >
            {navItem.title}
          </Link>
        </li>
      );

    case 'list':
      return (
        <NavDropdown isOpen={isOpen} trigger={navItem.title}>
          <div className="z-10 grid grid-cols-[62%_auto] grid-rows-2 gap-3 min-w-[400px] xl:w-[631px]">
            {navItem.content.map(({ src, name, description }, index) => (
              <Link
                key={index}
                href={src}
                className={`${index === 1 ? 'row-span-2 col-start-2 h-full flex flex-col justify-between' : ''}  dropdown-link block p-5 rounded-md transition duration-700 text-white `}
              >
                <h4 className="mb-[10px]">{name}</h4>
                <p className="text-p2-d text-text-gray">{description}</p>
              </Link>
            ))}
          </div>
        </NavDropdown>
      );

    case 'settings':
      return (
        <NavDropdown
          isOpen={isOpen}
          trigger={navItem.title}
          className="right-0 left-20"
        >
          <div className="p-5 grid gap-[25px]">
            <Languages />
            <Features />
            <Theme />
          </div>
        </NavDropdown>
      );

    default:
      return null;
  }
};
