import { authStore } from "../store/auth.store";

export const useAuth = (): boolean => {
  return authStore.isAuth;
};
