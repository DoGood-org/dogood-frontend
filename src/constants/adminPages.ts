import {
  Buildings,
  Dashboard,
  StarOrg,
  Support,
  UserList,
} from '@/components/icons';

export const adminPages = [
  {
    label: 'Dashboard',
    translationKey: 'dashboard',
    Icon: Dashboard,
    path: '/admin',
  },
  {
    label: 'User list',
    translationKey: 'userList',
    Icon: UserList,
    path: '/admin/users',
  },
  {
    label: 'Organization list',
    translationKey: 'organizations',
    Icon: Buildings,
    path: '/admin/organizations',
  },
  {
    label: 'Support',
    translationKey: 'support',
    Icon: Support,
    path: '/admin/support',
  },
  {
    label: 'Reviews',
    translationKey: 'reviews',
    Icon: StarOrg,
    path: '/admin/reviews',
  },
];
