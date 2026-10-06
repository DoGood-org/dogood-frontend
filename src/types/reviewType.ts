import { DetailedHTMLProps, HTMLAttributes, JSX, KeyboardEvent } from 'react';
import { FieldError } from 'react-hook-form';
export interface UserProps {
  id: string;
  name: string;
  avatar?: string;
}
export interface RatingProps extends DetailedHTMLProps<
  HTMLAttributes<HTMLUListElement>,
  HTMLUListElement
> {
  isEditable?: boolean;
  rating: number;
  setRating?: (rating: number) => void;
  error?: FieldError;
  className?: string;
}
export interface StarItemProps {
  index: number;
  isFilled: boolean;
  isEditable: boolean;
  error?: FieldError;
  changeDisplay: (index: number) => void;
  resetDisplay: () => void;
  onClick: (index: number) => void;
  handleKey: (e: KeyboardEvent) => void;
  computeFocus: (rating: number, index: number) => number;
  className?: string;
}
export interface ReviewProps {
  id: number;
  rating: number;
  comment: string;
  createdAt: string;
  owner?: UserProps;
}
export interface ReviewItemProps {
  review: ReviewProps;
}
export interface ReviewListProps {
  reviews?: ReviewProps[];
}

/** -------------------admin reviews ------------------- */

export type TargetType = 'PLATFORM' | 'USER' | 'ORGANIZATION';
export type ReviewStatus = 'Under consideration' | 'Confirmed' | 'Rejected';
export type AuthorType = 'user' | 'system';
export interface IReviewsItem {
  id: string;
  rating: number;
  comment: string;
  authorType: AuthorType;
  targetType: TargetType;
  targetName: UserProps;
  status: ReviewStatus;
  createdAt: string;
  author: UserProps;
}

export interface FilterValues {
  status?: string;
  rating?: string;
  date?: string;
}

export interface ActiveFiltersBarProps {
  activeFilters: string[];
  onReset: () => void;
  className?: string;
  allLabel?: string;
}

export interface ButtonsPanelProps {
  activeTab: string;
  onTabChange: (tab: string) => void;
}

export interface FilterPanelProps {
  onFilterChange?: (filters: {
    status?: string;
    rating?: string;
    date?: string;
  }) => void;
}

export interface FilterOption {
  value: string;
  label: string | JSX.Element;
}

export interface FilterSelectProps {
  value: string;
  onValueChange: (value: string) => void;
  options: FilterOption[];
  placeholderKey?: string;
  placeholder?: string;
  triggerClassName?: string;
  contentClassName?: string;
  triggerStyle?: React.CSSProperties;
}

export type ActionConfig = {
  id: string;
  icon: React.ElementType;
  label: string;
  href?: string;
  action?: () => void;
};
