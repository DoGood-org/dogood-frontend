import type { IconName } from '@/hooks/useIconComponents';
export interface NavContentItem {
  name: string;
  description: string;
  src: string;
}
export interface ListDropdownProps {
  listItem: Extract<NavItem, { type: 'list' }>;
  setIsOpen: (open: boolean) => void;
  toggleMenu?: () => void;
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
      icon: string;
    }
  | {
      type: 'list';
      title: string;
      icon: string;
      content: NavContentItem[];
    }
  | {
      type: 'settings';
      title: string;
      icon: string;
      content: SettingContentItem[];
    }
  | {
      type: 'icon';
      title: string;
      icon: string;
      content: {
        logged: AccountContentItem[];
        noLogged: AccountContentItem[];
      };
    };

type BaseProps = {
  navItem: NavItem;
  isActive?: boolean;
  children?: React.ReactNode;
  onToggle?: () => void;
};

type DesktopProps = BaseProps & {
  variant: 'desktop';
  toggleMenu?: never;
  openItem?: never;
  setOpenItem?: never;
};

type MobileProps = BaseProps & {
  variant: 'mobile';
  toggleMenu: () => void;
  openItem?: string;
  setOpenItem?: (item: string) => void;
};

export type NavItemRendererProps = DesktopProps | MobileProps;

export interface NavDropdownProps {
  trigger: React.ReactNode;
  children: React.ReactNode;
  isOpen: boolean;
  setIsOpen: (value: boolean) => void;
  className?: string;
  isIcon?: boolean; //if true - trigger is icon
}

export interface MobileDropdownProps {
  trigger: React.ReactNode;
  children: React.ReactNode;
  icon: string;
  navItem: NavItem;
  openItem: string | undefined;
  setOpenItem: (value: string) => void;
  className?: string;
}
