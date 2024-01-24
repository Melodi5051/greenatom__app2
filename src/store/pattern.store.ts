/**
 * Здесь будет находиться родительский класс, от которого будут создавать новые экземпляры
 * 
 * Это позволит сэкономить время на написание сторов и внедрение таблицы на страницу
 */

import { makeAutoObservable } from "mobx";
import { ROUTES_BY_ROLE } from "../router/router";

class ParentMobXStore {
    constructor() {
        makeAutoObservable(this)
    }

    
  constData: {[key: string]: any} = {};

  constTableTitle: string = ""

  updateIds = () => {
    return this.constData.map((empl: {[key: string]: any}) => { return { name: `${empl.id}` }; })
  }

  updateRoles = () => {
    return Object.keys(ROUTES_BY_ROLE).map((e) => { return { name: e } })
  }

}