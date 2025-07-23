import { User } from './authType';

export interface OrganizationProps {
  id: number;
  name: string;
  description: string;
  members: User[];
  logo: string;
}

export interface OrganizationItemProps {
  organization: OrganizationProps;
}
