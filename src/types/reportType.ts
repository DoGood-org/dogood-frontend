import { IUser } from './userReviewsType';

export interface IReportItem {
  id: string;
  reportedUser: IUser;
  reportedBy: IUser;
  reason: string;
  status: string;
  date: string;
}
export interface IReportDetailsMob {
  setIsOpen: (arg0: boolean) => void;
  report: IReportItem;
}
export interface ModalReportControls extends IReportDetailsMob {
  isOpen: boolean;
  setIsOpen: (arg0: boolean) => void;
  report: IReportItem;
}

export interface RenderFieldProps {
  label?: string;
  value: React.ReactNode;
  className?: string;
  labelClassName?: string;
  valueClassName?: string;
}

export interface RenderRowProps {
  children: React.ReactNode;
  className?: string;
  onClick?: () => void;
}

export interface RenderUserProps {
  user: {
    avatar: string;
    name: string;
  };
  className?: string;
}

export interface HeaderItem {
  label: string;
}

export interface ReportListDeskProps {
  reports: IReportItem[];
}

export interface SearchInputProps {
  onSearch: (query: string) => void;
  placeholder?: string;
  className?: string;
  debounceDelay?: number;
}
