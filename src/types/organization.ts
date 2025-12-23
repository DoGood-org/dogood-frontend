import {
  ContentPanelProps,
  ContentProps,
  IUserAccount,
  PaymentProps,
  TaskProps,
  UserDetailedProps,
} from './accountType';
import { ReviewProps } from './reviewType';
import { FormLocation } from './settings';
// import { ITaskDetails } from './tasks.type';

export interface OrganizationProps {
  id: string;
  name: string;
  description: string;
  members: IUserAccount[];
  logo: string;
}

export interface OrganizationContelPanelProps extends ContentPanelProps {
  organization: OrganizationDetailedProps;
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
  user: UserDetailedProps;
}

export interface OrganizationDetailedProps {
  id: string;
  name: string;
  avatar: string;
  description?: string;
  email?: string;
  phoneNumber?: string;
  location?: FormLocation;
  paymentOptions?: PaymentProps[];
  paymentOptionIds?: number[];
  tasks: TaskProps[] | [];
  reviews?: ReviewProps[];
  reviewsWrittenOrg?: ReviewProps[];
  members: UserOrganization[];
  moreInfo?: string;
}

export interface OrgMobileNavProps {
  views: ContentProps[];
  activeView: string;
  onChange: (view: string) => void;
}

export interface OrganizationApiResponse {
  status: string;
  code: string;
  message: string;
  data: {
    organization: OrganizationDetailedProps;
  };
}
