import { getALLEmployer } from "../API/axios.employer";
import { employerStore } from "../store/employer.store";
import { mainStore } from "../store/main.store";
import { IEmployer } from "../types/employerTypes";

export const getALLEmployerHelper = (): void => {
  mainStore.setLoading(true);
  getALLEmployer().then((response: IEmployer[]) => {
    mainStore.setLoading(false);
    employerStore.setDataEmployers(response);
  });
};
