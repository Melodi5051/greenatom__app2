import { getMe } from "../API/axios.main";
import { mainStore } from "../store/main.store";
import { userStore } from "../store/user.store";
import { IEmployer } from "../types/employerTypes";

export const getMeHelper = (): void => {
  getMe().then((dataUser: IEmployer) => {
    userStore.setUser(dataUser);
    mainStore.setLoading(false);
  });
};
