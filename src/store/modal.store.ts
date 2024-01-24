import { makeAutoObservable, runInAction } from "mobx";
import { ReactNode } from "react";

class ModalMobX {
  constructor() {
    makeAutoObservable(this)
  }

  /**
   * Устанавливает, открыто ли модальное окошко
   */
  activeStatus: boolean = false;

  /**
   * Контент внутри модального окна
   */
  children: ReactNode = 'Дефолтное значение';

  /**
   * Любые данные, любой контекст для конкретного модального окна.
   * 
   * Контекст может использоваться внутри `this.children`
   */
  context: object = {}

  /**
   * `true`, если окно можно закрыть кликом вне самого окна
   * 
   * `false`, если такого сделать нельзя. Появится warning уведомление
   */
  modalCloseable: boolean = true;

  setModalCloseable(v: boolean = true) {
    runInAction(() => {
      this.modalCloseable = v;
    })
  }

  /**
   * Устанавливает новую разметку внутри модального окна.
   * 
   * @param newChildren Дочерние элементы
   */
  setChildren(newChildren: ReactNode | string) {
    runInAction(() => {
      this.children = newChildren;
    })
  }
  
  /**
   * Показать модальное окно
   */
  show(v: boolean = true) {
    runInAction(() => {
      this.activeStatus = v;
    })
  }

  /**
   * Спрятать модальное окно
   */
  hide() {
    this.activeStatus = false;
    // this.setChildren('');
  }

  /**
   * Спрятать модальное окно и удалить дочерние элементы
   */
  disable() {
    this.activeStatus = false;
    this.setChildren('');
  }
}

/**
 * MobX менеджер состояния для модального окна
 */
export const modalmobx = new ModalMobX();