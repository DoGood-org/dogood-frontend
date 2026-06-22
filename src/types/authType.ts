import {
  HostedTaskProps,
  PaymentProps,
  TaskProps,
  UserProfileProps,
} from './accountType';
import { Tlocale } from './locale';
import { OrganizationProps } from './organization';
import { ReviewProps } from './reviewType';

export interface UseAuth {
  isLoggedIn: boolean;
  isEmailVerified: boolean;
  user: ICurrentUser | null;
}
export interface IUserSettings {
  theme: 'light' | 'dark';
  // language: string;
  language: Tlocale;
}

export interface User {
  id: number | string;
  name: string;
  email: string;
  avatarUrl?: string;
  siteRole?: string;
  userSettings: IUserSettings;
}

export interface ICurrentUser extends User {
  avatar: string | null;
  bio: string | null;
  birthDate: string | null;
  createdAt: string;
  email: string;
  gender: string | null;
  hostedTasks: HostedTaskProps[] | [];
  isEmailVerified: true;
  joinedTasks: TaskProps[] | [];
  locationId: null;
  name: string;
  organizations: OrganizationProps[] | [];
  paymentOptions: PaymentProps[] | [];
  stripeCustomerId?: string;
  phoneNumber: string | null;
  reviewsReceived: ReviewProps[] | [];
  reviewsWrittenUser: ReviewProps[] | [];
  siteRole: string;
  tasks: TaskProps[] | [];
  updatedAt: string;
  profile: UserProfileProps | null;
}

export interface AuthState {
  isLoggedIn: boolean;
  user: User | null;
  login: (userData: User) => void;
  logout: () => void;
}

export type TForgotEmail = {
  email: string;
};

export type TForgotPassword = {
  newPassword: string;
  repeatNewPassword: string;
};

export interface FormRegister {
  name: string;
  email: string;
  password: string;
  repeatPassword: string;
}
export type FormRegisterPerson = FormRegister;

export type FormLogin = {
  email: string;
  password: string;
};

export type LoginDTO = {
  email: string;
  password: string;
};

export type RegisterDTO = {
  email: string;
  password: string;
  name: string;
};

export type ResetPasswordDTO = {
  token: string;
  password: string;
};

export interface IBannedUser {
  accountId: string;
  suspendedOn: string;
  suspensionType: string;
  reason: string;
  banExpiresAt: string | null;
}

export interface IBannedCurrentUser {
  isBanned: true;
  bannedUser: IBannedUser;
}

export type CurrentUserResult = ICurrentUser | IBannedCurrentUser | null;
