import { authStore } from "../store/auth.store";

export const getTokenFromLocalStorage = (name: string): string => {
  const data = localStorage.getItem(name);
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

export const setTokenToLocalStorage = (name: string, token: string): void => {
  localStorage.setItem(name, JSON.stringify(token));
  authStore.setIsAuth(true);
};

export const removeTokenToLocalStorage = (name: string): void => {
  authStore.setIsAuth(false);
  localStorage.removeItem(name);
};
