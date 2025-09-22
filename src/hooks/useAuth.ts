import { UseAuth } from '@/types/authType';
import { authStore } from '@/zustand/stores/authStore';

export const useAuth = (): UseAuth => {
  const { user, isLoggedIn, isEmailVerified } = authStore();

  return { isLoggedIn, user, isEmailVerified };
};
