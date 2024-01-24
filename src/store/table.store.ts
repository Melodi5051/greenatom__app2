import { toNumber } from "lodash";
import { makeAutoObservable, runInAction } from "mobx";

class MyTablePaginator {
  constructor() {
    makeAutoObservable(this)
  }

  page: number = 0
  pageName: string = ''
  
  size: number = 50
  sizeName: string = ''

  setPage(v: number | string) {
    runInAction(() => {
      this.page = toNumber(v);
    })
  }

  setSize(v: number | string) {
    runInAction(() => {
      this.size = toNumber(v);
    })
  }

  setPageName(v: string) {
    runInAction(() => {
      this.pageName = v;
    })
  }

  setSizeName(v: string) {
    runInAction(() => {
      this.sizeName = v;
    })
  }
}

export const mytablepaginator = new MyTablePaginator();