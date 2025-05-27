export interface NavContentItem {
  name: string;
  description: string;
  src: string;
}

export type NavItem =
  | {
      type: 'link';
      title: string;
      src: string;
    }
  | {
      type: 'list';
      title: string;
      content: NavContentItem[];
    }
  | {
      type: 'settings';
      title: string;
    };

export interface NavItemRendererProps {
  navItem: NavItem;
  isOpen: boolean;
  onToggle: () => void;
  children?: React.ReactNode;
}

export interface NavDropdownProps {
  trigger: React.ReactNode;
  children: React.ReactNode;
  isOpen: boolean;
  className?: string;
}
