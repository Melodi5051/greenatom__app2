import { authStore } from "../store/auth.store";

export const getTokenFromLocalStorage = (): string => {
  const data = localStorage.getItem("token");
  const token: string = data ? JSON.parse(data) : "";
  return token;
};

export const setTokenToLocalStorage = (token: string): void => {
  localStorage.setItem("token", JSON.stringify(token));
};

export const removeTokenToLocalStorage = (): void => {
  authStore.setIsAuth(false);
  localStorage.removeItem("token");
};
