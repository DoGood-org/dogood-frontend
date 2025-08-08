import SidebarUserIcon from '@/components/icons/SidebarUserIcon';
import ChatIcon from '@/components/icons/ChatIcon';
import MapIcon from '@/components/icons/MapIcon';
import GoalsIcon from '@/components/icons/GoalsIcon';
import SettingsIcon from '@/components/icons/SettingsIcon';

export const navigationPages = [
  {
    label: 'Account',
    translationKey: 'account',
    Icon: SidebarUserIcon,
    path: '/account',
  },
  {
    label: 'Chat',
    translationKey: 'chat',
    Icon: ChatIcon,
    path: '/account/chat',
  },
  {
    label: 'Map',
    translationKey: 'map',
    Icon: MapIcon,
    path: '/account/map',
  },
  {
    label: 'Goals',
    translationKey: 'goals',
    Icon: GoalsIcon,
    path: '/account/goals',
  },
  {
    label: 'Settings',
    translationKey: 'settings',
    Icon: SettingsIcon,
    path: '/account/settings',
  },
];
