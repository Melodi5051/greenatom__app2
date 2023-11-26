import { getMe } from "../API/axios.main";
import { mainStore } from "../store/main.store";
import { userStore } from "../store/user.store";

export const getMeHelper = (): void => {
  getMe().then((dataUser) => {
    userStore.setUser(dataUser);
    mainStore.setLoading(false);
  });
};
