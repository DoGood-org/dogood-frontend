import { Tlocale } from './locale';
import { OrganizationProps } from './organization';
import { ReviewProps } from './reviewType';
import { Theme } from './theme';

export interface ContentProps {
  view: string;
  people?: string;
  id: string;
}

export interface UserDetailedProps {
  id: number;
  name: string;
  avatar?: string;
  customerId?: string;
  paymentOptions?: PaymentProps[];
  email: string;
  siteRole: string;
  bio?: string;
  gender: string;
  birthDate?: string;
  phoneNumber?: string;
  userSettings: UserSettingsProps;
  location?: Location;
  hostedTasks?: HostedTaskProps[];
  joinedTasks?: TaskProps[];
  reviewsWritten?: ReviewProps[];
  reviewsReceived?: ReviewProps[];
  organizations?: OrganizationProps[];
}

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
