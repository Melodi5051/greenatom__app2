import { getMe } from "../API/axios.main";
import { mainStore } from "../store/main.store";
import { userStore } from "../store/user.store";
import { IEmployee } from "../types/employerTypes";

export const getMeHelper = (): void => {
  getMe().then((dataUser: IEmployee) => {
    userStore.setUser(dataUser);
    mainStore.setLoading(false);
  });
};
