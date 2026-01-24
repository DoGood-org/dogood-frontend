import { IUserSettings } from './authType';
import { Tlocale } from './locale';
import { OrganizationProps, OrganizationRole } from './organization';
import { ReviewProps } from './reviewType';
import { Theme } from './theme';

export interface ContentProps {
  view: string;
  people?: string;
  id: string;
  isAdmin?: boolean;
  title?: string;
  icon?: string;
}

export interface IUserAccount {
  id: string;
  name: string;
  email: string;
  avatarUrl?: string;
  siteRole?: string;
  userSettings?: IUserSettings;
}

export interface ContentPanelProps {
  views: ContentProps[];
  viewComponents: Record<string, React.ReactNode>;
  role?: OrganizationRole | 'USER';
}
export interface UserDetailedProps {
  id: string | number;
  name: string;
  customerId?: string;
  paymentOptions: PaymentProps[] | [];
  email: string;
  siteRole: string;
  profile: UserProfileProps | null;
  userSettings: UserSettingsProps;
  location?: Location | null;
  hostedTasks?: HostedTaskProps[];
  joinedTasks?: TaskProps[];
  reviewsWritten?: ReviewProps[];
  reviewsReceived?: ReviewProps[];
  organizations?: OrganizationProps[];
}

export type UserProfileProps = {
  avatar: string | null;
  bio: string | null;
  gender: string;
  birthDate: string | null;
  phoneNumber: string | null;
};

// export interface UserDetailedProps {
//   id: string | number;
//   name: string;
//   avatar?: string;
//   customerId?: string;
//   paymentOptions: PaymentProps[];
//   email: string;
//   siteRole: string;
//   bio?: string;
//   gender: string;
//   birthDate?: string;
//   phoneNumber?: string;
//   userSettings: UserSettingsProps;
//   location?: Location;
//   hostedTasks?: HostedTaskProps[];
//   joinedTasks?: TaskProps[];
//   reviewsWritten?: ReviewProps[];
//   reviewsReceived?: ReviewProps[];
//   organizations?: OrganizationProps[];
// }

export type PaymentProps = {
  id: number;
  name: string;
};

export type Location = {
  id: number;
  country: string;
  region: string;
  city: string;
};

export type UserSettingsProps = {
  theme: Theme;
  language: Tlocale;
};

export type MarkerCategoryType = 'medicine' | 'nature' | 'animal' | 'food';

export type HostedTaskProps = {
  id: number;
  title: string;
  status: string;
};
export interface TaskProps {
  id: number;
  title: string;
  description: string;
  avatar?: string;
  category: MarkerCategoryType;
  status?: string;
  startDate?: string;
  endDate?: string;
  startTime?: string;
  locationName?: Location;
}

export interface TaskItemProps {
  task: TaskProps;
}

export type TaskListProps = {
  tasks?: TaskProps[];
};

export interface IUserApiResponse {
  status: string;
  data: {
    user: UserDetailedProps;
  };
}
