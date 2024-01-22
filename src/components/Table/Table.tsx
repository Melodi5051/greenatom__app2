import React, { FormEvent, FormEventHandler, useRef, useState } from 'react';
import styles from "./Table.module.scss";
import { classnames, createFieldsByPath } from '../../helpers/main.helper';
import { observer } from 'mobx-react-lite';
import { modalmobx } from '../../store/modal.store';
import { notificator } from '../../store/notify.store';
import Button from '../Button/Button';
import Input, { EyeInput } from '../Input/Input';
import Select from '../Select/Select';
import { get, isEmpty, result } from 'lodash';


export type FormActions = "add" | "edit";

export interface TableRow {
  [key: string]: string | number;
}

export interface TableProps {
  data: TableRow[];
  context: TableContext
}

export type IFormFieldConfig = (string | { title: string; inputType: React.HTMLInputTypeAttribute | "select"; props?: { [key: string]: any } })

export interface TableContext {
  /**
   * Название таблицы
   */
  title: string

  /**
   * Функция для обновления данных в таблице
   */
  refreshTable: () => void

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
      writeCallback: (form: any) => Promise<any>
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


const AutogenModalForm = observer(({ context, pathToFields }: { context: TableContext, pathToFields: string }) => {
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
                <Input name={alias} id={alias} />
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
                    ? <Select name={alias.title} id={alias.title} {...alias.props} options={alias.props && alias.props.options} />
                    : alias.inputType === "password"
                      ? <EyeInput name={alias.title} id={alias.title} />
                      : <Input name={alias.title} type={alias.inputType} id={alias.title} />
                }
              </td>
            </tr>
        })
      }
    </>
  else
    return null
})



const ModalTableForm = ({ context, pathToFields }: { context: TableContext, pathToFields: string }) => {

  const submitFunction = (e: React.FormEvent<HTMLFormElement>) => {
    const formData = new FormData(e.currentTarget);
    const obj: { [key: string]: any } = { ...(Object.fromEntries(formData.entries()) as unknown) as object };

    console.log(e)

    var resultObject = {};

    Object.keys(obj).forEach((k: string) => {
      if (targetObject)
        resultObject = createFieldsByPath(resultObject, k, obj[k]);
    })

    console.log("result", resultObject)

    // логика обработки данных формы
    targetObject.writeCallback(resultObject)
      .then(context.refreshTable)
      .catch((error: Error) => notificator.push({ children: `Ошибка записи в таблицу: ${error}`, type: "error" }));
  }

  const targetObject = get(context.actions, pathToFields);
  if (!isEmpty(targetObject))
    return (
      <form id={'add-modal'}
        onSubmit={(e: React.FormEvent<HTMLFormElement>) => {
          e.preventDefault();

          const submitter = (((e.nativeEvent as any).submitter) as HTMLElement)

          if ((submitter.tagName === "BUTTON" && submitter.getAttribute("type") === "submit"))
            submitFunction(e);
        }}
      >
        <table className={classnames(styles.inputs)}>
          <tbody>
            {/* автогенерируемые формы на основе context */}
            <AutogenModalForm context={context} pathToFields={`${pathToFields}.nessesaryFields`} />
            <AutogenModalForm context={context} pathToFields={`${pathToFields}.optionalFields`} />
          </tbody>
        </table>
        <div className={classnames(styles.modalButtons)}>
          <Button type='submit' viewtype="v2" onClick={() => {
            // onSubmit(formE);
            modalmobx.hide()
          }}>Записать и закрыть</Button>


          <Button type='submit' viewtype="v4" onClick={() => {
          }}>Записать</Button>


          <Button viewtype="v3" onClick={() => {
            modalmobx.hide()
          }}>Закрыть</Button>
        </div>
      </form>
    )
  else
    return null;
};


const Table: React.FC<TableProps> = observer(({ data, context }) => {
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
                2. √ Изменить вид формы Изменение записи. Для ID изменить: 1, 2, 3
                3. Прокрутка таблицы без прокрутки шапки таблицы и блока
                  с операциями
              */}
              <ModalTableForm context={context} pathToFields='add' />
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

              <ModalTableForm context={context} pathToFields='edit' />
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
        <Button viewtype="text" onClick={() => { context.refreshTable(); notificator.push({ children: "Данные обновлены" }) }}>
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
