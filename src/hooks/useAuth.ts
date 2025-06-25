import { UseAuth } from '@/types/authType';
import { authStore } from '@/zustand/stores/authStore';

export const useAuth = (): UseAuth => {
  const isLoggedIn = authStore((state) => state.isLoggedIn);
  const user = authStore((state) => state.user);

  return { isLoggedIn, user };
};
