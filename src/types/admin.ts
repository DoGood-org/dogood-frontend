import { TaskProps } from './accountType';
import { UserOrganization } from './organization';
import { ReviewProps } from './reviewType';
import { FormLocation } from './settings';
import { RefObject } from 'react';

export interface IAdminOrganizations {
  id: string;
  name: string;
  avatar: string;
  description?: string;
  email?: string;
  phoneNumber?: string;
  location?: FormLocation;
  locationId?: number;
  stripeCustomerId?: string;
  tasks?: TaskProps[] | [];
  reviews?: ReviewProps[];
  reviewsWrittenOrg?: ReviewProps[];
  members?: UserOrganization[];
  moreInfo?: string;
  _count: { members: number };
}

export interface IAdminPagination {
  total: number;
  page: number;
  limit: number;
  totalPages: number;
  hasNextPage: boolean;
  hasPreviousPage: boolean;
}

export interface IAdminOrganizationsResponse {
  data: IAdminOrganizations[];
  pagination: IAdminPagination;
}

export type OrganizationListProps = {
  organizations: IAdminOrganizations[];
  pagination: IAdminPagination | null;
  page: number;
  isDesktop: boolean;
  isFetchingMore: boolean;
  loadMoreRef: RefObject<HTMLLIElement | null>;
  onPageChange: (page: number) => void;
};
