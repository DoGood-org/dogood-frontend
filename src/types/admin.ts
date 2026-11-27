import { DateRange } from 'react-day-picker';
import { TaskProps } from './accountType';
import { UserOrganization } from './organization';
import { ReviewProps } from './reviewType';
import { FormLocation } from './settings';
import { CSSProperties, JSX, RefObject } from 'react';
import { ITaskDetails } from './tasks.type';
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

/** -------------------admin reviews ------------------- */
export type TargetType = 'PLATFORM' | 'USER' | 'ORGANIZATION';
export type ReviewStatus = 'PENDING' | 'CONFIRMED' | 'REJECTED';
export type AuthorType = 'USER' | 'SYSTEM';

export interface IReviewAuthor {
  id: string;
  name: string;
}

export interface IAdminReviews {
  id: string;
  rating: number;
  comment: string;
  authorType: AuthorType;
  authorUserId: string | null;
  authorOrganizationId: string | null;
  targetType: TargetType;
  targetUserId: string | null;
  targetOrganizationId: string | null;
  status: ReviewStatus;
  createdAt: string;
  updatedAt: string;
  author: IReviewAuthor;
}
export interface ActiveFiltersBarProps {
  activeFilters: string[];
  onReset: () => void;
  onRemoveFilter?: (value: string) => void;
  className?: string;
  allLabel?: string;
}
export interface ButtonsPanelProps {
  activeTab: string;
  onTabChange: (tab: string) => void;
}
export interface FilterOption {
  value: string;
  label: string | JSX.Element;
}
export type FilterValues = {
  status?: string;
  rating?: string;
  category?: string;
  role?: string;
  dateRange?: DateRange;
  date?: Date;
  [key: string]: string | Date | DateRange | undefined;
};
export type FilterPanelProps = {
  config: FilterConfig[];
  onFilterChange?: (filters: FilterValues) => void;
};
export type SelectFilterConfig = {
  type: 'select';
  key: string;
  placeholderKey: string;
  placeholder?: string;
  options: FilterOption[];
  triggerClassName?: string;
};
export type DateFilterConfig = Omit<DatePickerProps, 'value' | 'onChange'> & {
  type: 'date';
  key: string;
};
export type FilterConfig = SelectFilterConfig | DateFilterConfig;
export interface FilterSelectProps {
  value: string;
  onValueChange: (value: string) => void;
  options: FilterOption[];
  translationNamespace?: string;
  placeholderKey?: string;
  placeholder?: string;
  triggerClassName?: string;
  contentClassName?: string;
  triggerStyle?: CSSProperties;
  disabled?: boolean;
}
export type ActionConfig = {
  id: string;
  icon: React.ElementType;
  label: string;
  href?: string;
  action?: () => void;
};
export interface ReviewsListProps {
  reviews: IAdminReviews[];
  itemsPerSlide?: number;
}

type BaseProps = {
  className?: string;
  placeholder?: string;
  numberOfMonths?: number;
  disabled?: boolean;
  align?: 'start' | 'center' | 'end';
};

export type DatePickerRangeProps = BaseProps & {
  mode: 'range';
  value?: DateRange;
  onChange: (value: DateRange | undefined) => void;
};

export type DatePickerSingleProps = BaseProps & {
  mode: 'single';
  value?: Date;
  onChange: (value: Date | undefined) => void;
};

export type DatePickerProps = DatePickerRangeProps | DatePickerSingleProps;

export type DateRangePickerProps = Omit<DatePickerRangeProps, 'mode'>;

/** -------------------admin tasks ------------------- */
export interface IAdminTask {
  id: string;
  title: string;
  description: string;
  picture: string | null;
  startDate: string;
  startTime: string;
  endDate: string;
  location: { lat: number; lng: number };
  locationName: string;
  status: string;
  amount: number | null;
  currentAmount: number | null;
  currency: string | null;
  requirements: string;
  categories: string[];
  host: ITaskDetails['host'];
  joinedUsers: Array<{ id: number; name: string }>;
}
export interface TasksListProps {
  tasks: IAdminTask[];
  itemsPerSlide?: number;
}
/** -------------------admin users ------------------- */
export interface IAdminUser {
  id: string;
  name: string;
  avatar: string;
  email: string;
  role: string;
  status: string;
  createdAt: string;
}
export interface UsersListProps {
  users: IAdminUser[];
  itemsPerSlide?: number;
}
