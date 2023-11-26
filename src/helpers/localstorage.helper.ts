import { authStore } from "../store/auth.store";

export const getTokenFromLocalStorage = (): string => {
  const data = localStorage.getItem("token");
  const token: string = data ? JSON.parse(data) : "";
  return token;
};

export const getCurrentPathToLocalStorage = (): string | null => {
  return localStorage.getItem("lastPath");
};

export const setCurrentPathToLocalStorage = (path: string): void => {
  localStorage.setItem("lastPath", path);
};

export const removeCurrentPathToLocalStorage = (): void => {
  localStorage.removeItem("lastPath");
};

export const setTokenToLocalStorage = (token: string): void => {
  localStorage.setItem("token", JSON.stringify(token));
};

export const removeTokenToLocalStorage = (): void => {
  authStore.setIsAuth(false);
  localStorage.removeItem("token");
};
