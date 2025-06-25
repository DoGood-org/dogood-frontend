import type { IconName } from '@/hooks/useIconComponents';
export interface NavContentItem {
  name: string;
  description: string;
  src: string;
}
export interface ListDropdownProps {
  listItem: Extract<NavItem, { type: 'list' }>;
  setIsOpen: (open: boolean) => void;
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

export type AccountContentItem = {
  name: string;
  src: string;
  icon: IconName;
  isLogged: boolean;
};

export interface AccountContentProps {
  accountItem: Extract<NavItem, { type: 'icon' }>;
  children?: React.ReactNode;
  onClose?: () => void;
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
      content: {
        logged: AccountContentItem[];
        noLogged: AccountContentItem[];
      };
    };

export interface NavItemRendererProps {
  navItem: NavItem;
  isActive: boolean;
  onToggle: () => void;
  children?: React.ReactNode;
}

export interface NavDropdownProps {
  trigger: React.ReactNode;
  children: React.ReactNode;
  isOpen: boolean;
  setIsOpen: (value: boolean) => void;
  className?: string;
  isIcon?: boolean; //if true - trigger is icon
}
