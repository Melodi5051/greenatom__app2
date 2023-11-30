import { getMe } from "../API/axios.main";
import { userStore } from "../store/user.store";
import { IEmployee } from "../types/employerTypes";

export const getMeHelper = (): void => {
  getMe().then((dataUser: IEmployee) => {
    userStore.setUser(dataUser);
    userStore.setRole(dataUser.role.name)
  });
};
