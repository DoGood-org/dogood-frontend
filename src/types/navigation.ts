export interface NavContentItem {
  name: string;
  description: string;
  src: string;
}

export interface SettingContentItem {
  id: string;
  name: string;
  description: string;
}

export interface SettingsContentProps {
  settingItem: Extract<NavItem, { type: 'settings' }>;
  children?: React.ReactNode;
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
      content: SettingContentItem[];
    }
  | {
      type: 'icon';
      title: string;
      content: NavButtonProps[];
    };

export type NavButtonProps = {
  name: string;
  src: string;
  // variant: 'primary' | 'outline';
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
  // iconSize?: string; //size for CaretDown-icon - default 'size-6'
  // padding?: string; //padding between trigger and CaretDown-icon - default 'p-4'
  isIcon?: boolean; //if true - trigger is icon
}
