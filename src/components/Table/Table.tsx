import React, { ReactNode, createElement } from 'react';
import styles from "./Table.module.scss";
import { classnames } from '../../helpers/main.helper';
import { observer } from 'mobx-react-lite';
import { modalmobx } from '../../store/modal.store';
import { notificator } from '../../store/notify.store';
import Button from '../Button/Button';
import Input, { EyeInput } from '../Input/Input';
import { JsxElement } from 'typescript';
import Select from '../Select/Select';
import { ROUTES_BY_ROLE } from '../../router/router';
import { get, isEmpty } from 'lodash';


export interface TableRow {
  [key: string]: string | number;
}

export interface TableProps {
  data: TableRow[];
  refreshTable: () => void
  context: TableContext
}

export type IFormFieldConfig = (string | { title: string; inputType: React.HTMLInputTypeAttribute | "select"; props?: {[key: string]: any} })

export interface TableContext {
  /**
   * Название таблицы
   */
  title: string

  /**
   * Объект с читабельными подписями для шапки таблицы
   * 
   * Также сюда можно передать наименования для полей, которые не показываются в таблице, но используются в формах для управления этой таблицей.
   * 
   * Например в таблице нет столбца `password`, но передав `password: 'Пароль'` сюда, слово "Пароль" будет отображено в форме у соответствующего поля ввода для добавления записи в таблицу
   * 
   * -----------
   * 
   * Передавая значения через точку (например `role.name`) можно указать местоположение задаваемого поля в теле запроса на сервер
   * 
   */
  headerAlias: {
    [key: string]: string
  }

  /**
   * Объект с возможными действиями с таблицей
   * 
   * Здесь задаются действия для кнопок, перечисленных над таблицей: Добавить, Изменить, Фильтрация, Сортировка, Справка.
   */
  actions: {
    /**
     * Форма добавления новой записи в таблицу
     */
    add: {
      /**
       * Поля, обязательные для заполнения. Перечислять поля, используемые для общения с сервером
       * 
       * Если значение для поля нестандартное (выпадающий список Select), то можно указать не строку, а объект указанной структуры
       * 
       * Отображаются **всегда** в этой форме
       */
      nessesaryFields: IFormFieldConfig[]

      /**
       * Поля, необязательные для заполнения. Перечислять поля, используемые для общения с сервером
       * 
       * Отображаются **всегда** в этой форме
       */
      optionalFields?: IFormFieldConfig[]

      /**
       * Колбек для кнопок "Записать" и "Записать и закрыть". Закрытие формы добавления новой записи в таблицу происходит автоматически для кнопки "Записать и закрыть"
       * 
       * Например здесь может быть функция запроса на сервер
       */
      writeCallback: () => Promise<any>
    },

    /**
     * Форма добавления новой записи в таблицу
     */
    edit: {
      /**
       * Поля, обязательные для заполнения. Перечислять поля, используемые для общения с сервером
       * 
       * Отображаются **всегда** в этой форме
       */
      nessesaryFields: IFormFieldConfig[]

      /**
       * Поля, необязательные для заполнения. Перечислять поля, используемые для общения с сервером
       * 
       * Отображаются **всегда** в этой форме
       */
      optionalFields?: IFormFieldConfig[]

      /**
       * Колбек для кнопок "Записать" и "Записать и закрыть". Закрытие формы добавления новой записи в таблицу происходит автоматически для кнопки "Записать и закрыть"
       * 
       * Например здесь может быть функция запроса на сервер
       */
      writeCallback: () => Promise<any>
    },


  }
}


const AutogenModalForm = observer(({ context, pathToFields }: {context: TableContext, pathToFields: string}) => {
  const targetObject = get(context.actions, pathToFields);
  if (!isEmpty(targetObject))
    return <>
      {
        targetObject.map((alias: IFormFieldConfig, index: number) => {
          if (typeof alias === "string")
            return <tr className={styles.someInput} key={index}>
              <td>
                <label htmlFor={alias}>{context.headerAlias[alias] || alias} {pathToFields.includes("nessesary") ? <span>*</span> : null}</label>
              </td>
              <td>
                <Input id={alias} />
              </td>
            </tr>
          else
            return <tr className={styles.someInput} key={index}>
              <td>
                <label htmlFor={alias.title}>{context.headerAlias[alias.title] || alias.title}*</label>
              </td>
              <td>
                {
                  alias.inputType === "select"
                    ? <Select id={alias.title} {...alias.props} />
                    : alias.inputType === "password"
                      ? <EyeInput id={alias.title} />
                      : <Input type={alias.inputType} id={alias.title} />
                }
              </td>
            </tr>
        })
      }
    </>
  else
    return null
})


const Table: React.FC<TableProps> = observer(({ data, refreshTable, context }) => {
  console.log("ТАБЛИЦА ОТРИСОВАНА")

  const TABLE_RAW_HEADER = [...Object.keys(data[0])];
  const TABLE_ALIASES_HEADER = [...TABLE_RAW_HEADER].map((plainheader) => context.headerAlias[plainheader] || plainheader)

  // Возвращаем JSX с использованием useMemo
  return (
    <>

      <div className={classnames(styles.operations)}>
        <Button viewtype="text" onClick={() => {
          modalmobx.setChildren(
            <>
              <h4>({context.title}) Создание записи</h4>
              <p>Заполните необходимые поля и нажмите кнопку "Записать" или "Записать и закрыть"</p>

              {/* 
                1. Сделать обработку onSubmit, функцию "Записать" вынести отдельно
                2. Изменить вид формы Изменение записи. Для ID изменить: 1, 2, 3
                3. Прокрутка таблицы без прокрутки шапки таблицы и блока
                  с операциями
              */}
              <form id='modal-addEntity' action="">
                <table className={classnames(styles.inputs)}>
                  <tbody>
                    {/* автогенерируемые формы на основе context */}
                    <AutogenModalForm context={context} pathToFields='add.nessesaryFields'/>
                    <AutogenModalForm context={context} pathToFields='add.optionalFields'/>
                  </tbody>
                </table>
              </form>

              <div className={classnames(styles.modalButtons)}>
                <Button viewtype="v2" onClick={() => {
                  // вынести отдельно
                  context.actions.add.writeCallback()
                    .then(refreshTable)
                    .catch((error) => notificator.push({ children: `Ошибка записи в таблицу: ${error}`, type: "error" }))

                  modalmobx.hide()
                }}>Записать и закрыть</Button>


                <Button viewtype="v4" onClick={() => {
                  context.actions.add.writeCallback()
                    .then(refreshTable)
                    .catch((error) => notificator.push({ children: `Ошибка записи в таблицу: ${error}`, type: "error" }))
                }}>Записать </Button>


                <Button viewtype="v3" onClick={() => {
                  modalmobx.hide()
                }}>Закрыть</Button>
              </div>
            </>
          )
          modalmobx.setModalCloseable(true)
          modalmobx.show()
        }}>
          Создать
        </Button>
        <Button viewtype="text" onClick={() => {
          modalmobx.setChildren(
            <>
              <h4>({context.title}) Изменение записи</h4>
              <p>Здесь можно изменить одно или несколько полей в выбранной записи</p>
              <p>Укажите идентификатор записи, которую надо изменить, затем введите новое значение в необходимое поле</p>

              <table className={classnames(styles.inputs)}>
                <tbody>
                  {/* автогенерируемые формы на основе context */}
                  <AutogenModalForm context={context} pathToFields='edit.nessesaryFields'/>
                  <AutogenModalForm context={context} pathToFields='edit.optionalFields'/>
                  

                </tbody>
              </table>

              <div className={classnames(styles.modalButtons)}>
                <Button viewtype="v2" onClick={() => {
                  context.actions.edit.writeCallback()
                    .then(refreshTable)
                    .catch((error) => notificator.push({ children: `Ошибка записи в таблицу: ${error}`, type: "error" }))

                  modalmobx.hide()
                }}>Записать и закрыть</Button>


                <Button viewtype="v4" onClick={() => {
                  context.actions.edit.writeCallback()
                    .then(refreshTable)
                    .catch((error) => notificator.push({ children: `Ошибка записи в таблицу: ${error}`, type: "error" }))
                }}>Записать </Button>


                <Button viewtype="v3" onClick={() => {
                  modalmobx.hide()
                }}>Закрыть</Button>
              </div>
            </>
          )
          modalmobx.show()
        }}>
          Изменить
        </Button>
        <Button viewtype="text">
          Удалить
        </Button>
        <Button viewtype="text">
          Фильтр
        </Button>
        <Button viewtype="text">
          Вид
        </Button>
        <Button viewtype="text" onClick={() => { refreshTable(); notificator.push({ children: "Данные обновлены" }) }}>
          Обновить
        </Button>
        <Button viewtype="text">
          Справка
        </Button>
      </div>
      <table className={classnames(styles.table)}>
        <tbody>
          <tr>
            {
              // Object.keys(data[0]).map((name, index) => <th key={index}>{name}</th>)
              TABLE_ALIASES_HEADER.map((name, index) => <th key={index} title={TABLE_RAW_HEADER[index]}>{name}</th>)
            }
          </tr>
          {
            data.map((d, index) => {
              return <tr key={index}>
                {
                  Object.keys(d).map((v, jndex) => {
                    if (typeof d[v] !== "object")
                      return <td key={jndex}>{d[v]}</td>
                    else
                      return <td key={jndex}>{Object.values(d[v]).join(", ")}</td>
                  })
                }
              </tr>
            })
          }

        </tbody>
      </table>
    </>
  );
});

export default React.memo(Table);
