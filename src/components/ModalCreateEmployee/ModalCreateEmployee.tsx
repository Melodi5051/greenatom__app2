import React, { ReactNode, useState } from "react";
import style from "./ModalCreateEmployee.module.scss";
import { JsxAttribute } from "typescript";
import ModalWindow from "../ModalWindow/ModalWindow";
import Button from "../Button/Button";
import Input, { EyeInput } from "../Input/Input";
import plus from "./../../assets/svg/ui-plus.svg";
const ModalCreateEmployee = () => {
  const [modalActive, setModalActive] = useState(false);

  return (
    <div>
      <Button viewtype="v2" onClick={() => setModalActive(true)}>
        НОВЫЙ СОТРУДНИК
        <img src={plus} alt="" />
      </Button>
      <ModalWindow active={modalActive} setActive={setModalActive}>
        <div>
          <div>
            <div>
              <h2 className={style.title}>Создание пользователя</h2>
            </div>

            <form
              className={style.form}
              id="formElement"
              //   onSubmit={(e) => handlerAuth(e)}
            >
              <>
                <div>
                  <label htmlFor="name">Имя</label>
                  <Input
                    type="text"
                    placeholder="Введите имя..."
                    id="name"
                    name="name"
                  />
                </div>

                <div>
                  <label htmlFor="surname">Фамилия</label>
                  <Input
                    type="text"
                    placeholder="Введите фамилию..."
                    id="surname"
                    name="surname"
                  />
                </div>

                <div>
                  <label htmlFor="patronymic">Отчество</label>
                  <Input
                    type="text"
                    placeholder="Введите отчество..."
                    id="patronymic"
                    name="patronymic"
                  />
                </div>

                <div>
                  <label htmlFor="email">Почта</label>
                  <Input
                    type="email"
                    placeholder="Введите почту..."
                    id="email"
                    name="email"
                  />
                </div>

                <div>
                  <label htmlFor="password">Пароль</label>
                  <EyeInput
                    placeholder="Введите пароль..."
                    name="password"
                    id="password"
                  />
                </div>

                <div>
                  <label htmlFor="confirmPassword">Повтор пароля</label>
                  <EyeInput
                    placeholder="Введите повторно пароль..."
                    name="confirmPassword"
                    id="confirmPassword"
                  />
                </div>

                <div>
                  <label htmlFor="salary">Заработная плата</label>
                  <Input
                    type="text"
                    placeholder="Введите заработную плату..."
                    id="salary"
                    name="salary"
                  />
                </div>

                <div>
                  <label htmlFor="phoneNumber">Номер телефона</label>
                  <Input
                    type="tel"
                    placeholder="Введите номер телефона..."
                    id="phoneNumber"
                    name="phoneNumber"
                  />
                </div>

                <div>
                  <label htmlFor="position">Должность</label>
                  <select
                    className={style.positionSelect}
                    // value={}
                    // onChange={(event) =>
                    //     handleFileChangeCategory(selectedCategory, event.target.value, name)
                    // }
                  >
                    <option>Бухгалтер</option>
                    <option>Менеджер</option>
                    <option>И прочее</option>
                  </select>
                </div>

                <div>
                  <label htmlFor="address">Адрес</label>
                  <Input
                    type="text"
                    placeholder="Введите адрес..."
                    id="address"
                    name="address"
                  />
                </div>
                <div className={style.submitButton}>
                  <Button viewtype="v2">СОЗДАТЬ</Button>
                </div>
              </>
            </form>
          </div>
        </div>
      </ModalWindow>
    </div>
  );
};

export default ModalCreateEmployee;
