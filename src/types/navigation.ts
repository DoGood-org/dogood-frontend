export interface NavContentItem {
  name: string;
  description: string;
  src: string;
}

export interface SettingContentItem {
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
    };

export type NavButtonProps = {
  name: string;
  src: string;
  variant: 'primary' | 'outline';
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
