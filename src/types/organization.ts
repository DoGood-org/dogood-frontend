import { IUserAccount } from './accountType';

export interface OrganizationProps {
  id: string;
  name: string;
  description: string;
  members: IUserAccount[];
  logo: string;
}

export interface OrganizationItemProps {
  organization: OrganizationProps;
}

export interface OrganizationListProps {
  organizations?: OrganizationProps[];
}
