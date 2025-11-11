import { IUserAccount, Location, PaymentProps } from './accountType';
import { ReviewItemProps } from './reviewType';
import { ITaskDetails } from './tasks.type';

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

export type OrganizationRole = 'ADMIN' | 'MODERATOR' | 'MEMBER';

export type MembershipStatus = 'ACTIVE' | 'INVITED' | 'REMOVED' | 'PENDING';

export interface UserOrganization {
  id: string;
  userId: string;
  organizationId: string;
  role: OrganizationRole;
  status: MembershipStatus;
}

export interface OrganizationDetailedProps {
  id: string;
  name: string;
  avatar: string;
  description?: string;
  email?: string;
  phoneNumber?: string;
  location: Location;
  paymentOptions: PaymentProps[];
  tasks: ITaskDetails[];
  reviews: ReviewItemProps[];
  reviewsWrittenOrg?: ReviewItemProps[];
  members: UserOrganization[];
}
