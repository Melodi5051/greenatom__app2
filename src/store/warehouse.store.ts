import { makeAutoObservable } from "mobx";
import { IConstTableAlias, IMyTableMOBX } from "../components/MyTable/MyTable";
import { IProduct } from "../types/warehouseTypes";

class Warehouse {
  constructor() {
    makeAutoObservable(this)
  }

  constData: IProduct[] = [];

  constTableAlias: IConstTableAlias = {
    id: {
      title: "ID"
    }
  }
}