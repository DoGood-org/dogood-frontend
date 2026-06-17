type NavigationItem = {
  label: string;
  translationKey: string;
  Icon: React.ComponentType<{ className?: string }>;
  path: string;
};

export interface NavigationPageProps {
  items: NavigationItem[];
  t: (key: string) => string;
  showLabels?: boolean;
  linkClassName?: string;
  iconClassName?: string;
  className?: string;
  navLabels?: string;
}

export interface SidebarNavigationProps {
  items: NavigationItem[];
  translation: (key: string) => string;
  navClassName?: string;
  menuWrapperClassName?: string;
}

export type Page = 'Account' | 'Chat' | 'Map' | 'Goals' | 'Settings';
