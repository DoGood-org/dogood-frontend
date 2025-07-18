export interface UseAuth {
  isLoggedIn: boolean;
  user: User | null;
}

export interface User {
  id: string;
  name: string;
  email: string;
  avatarUrl?: string;
}

export interface AuthState {
  isLoggedIn: boolean;
  user: User | null;
  login: (userData: User) => void;
  logout: () => void;
}
export interface IForgot {
  newPassword: string;
  repeatNewPassword: string;
}
export interface FormRegister {
  name: string;
  email: string;
  password: string;
  repeatPassword: string;
}
export type FormRegisterPerson = FormRegister;
export type FormRegisterCompany = FormRegister & {
  companyName: string;
};
export type FormLogin = {
  email: string;
  password: string;
};
