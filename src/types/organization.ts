import { User } from './authType';

export interface OrganizationProps {
  id: string;
  name: string;
  description: string;
  members: User[];
  logo: string;
}

export interface OrganizationItemProps {
  organization: OrganizationProps;
}

export interface OrganizationListProps {
  organizations?: OrganizationProps[];
}
