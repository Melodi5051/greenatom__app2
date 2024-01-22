import React, { ReactNode } from 'react';
import styles from "./Table.module.scss";
import { classnames } from '../../helpers/main.helper';
import { observer } from 'mobx-react-lite';
import { modalmobx } from '../../store/modal.store';
import { notificator } from '../../store/notify.store';
import Button from '../Button/Button';
import Input from '../Input/Input';


export interface TableRow {
  [key: string]: string | number;
}

export interface TableProps {
  data: TableRow[];
  refreshTable: () => void
  context: TableContext
}

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
       * Отображаются **всегда** в этой форме
       */
      nessesaryFields: string[]

      /**
       * Поля, необязательные для заполнения. Перечислять поля, используемые для общения с сервером
       * 
       * Отображаются **всегда** в этой форме
       */
      optionalFields?: string[]

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
      nessesaryFields: string[]

      /**
       * Поля, необязательные для заполнения. Перечислять поля, используемые для общения с сервером
       * 
       * Отображаются **всегда** в этой форме
       */
      optionalFields?: string[]

      /**
       * Колбек для кнопок "Записать" и "Записать и закрыть". Закрытие формы добавления новой записи в таблицу происходит автоматически для кнопки "Записать и закрыть"
       * 
       * Например здесь может быть функция запроса на сервер
       */
      writeCallback: () => Promise<any>
    },


  }
}


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
              <h4>({context.title}) Добавление записи</h4>
              <p>Заполните необходимые поля и нажмите кнопку "Записать" или "Записать и закрыть", чтобы сделать новую запись в таблице {context.title}</p>

              <table className={classnames(styles.inputs)}>
                <tbody>
                  {/* автогенерируемые формы на основе context */}
                  {
                    context.actions.add.nessesaryFields.map((alias: string, index: number) => {
                      return <tr className={styles.someInput} key={index}>
                        <td>
                          <span>{context.headerAlias[alias] || alias}</span>

                        </td>
                        <td>
                          <Input />
                        </td>
                      </tr>
                    })
                  }

                </tbody>
              </table>

              <div className={classnames(styles.modalButtons)}>
                <Button viewtype="v2" onClick={() => {
                  context.actions.add.writeCallback()
                    .then(refreshTable)
                    .catch((error) => notificator.push({ children: `Ошибка записи в таблицу: ${error}`, type: "error" }))

                  modalmobx.show(false)
                }}>Записать и закрыть</Button>
                <Button viewtype="v4" onClick={() => {
                  context.actions.add.writeCallback()
                    .then(refreshTable)
                    .catch((error) => notificator.push({ children: `Ошибка записи в таблицу: ${error}`, type: "error" }))
                }}>Записать </Button>
                <Button viewtype="v3" onClick={() => {
                  modalmobx.show(false)
                }}>Закрыть</Button>
              </div>
            </>
          )
          modalmobx.setModalCloseable(true)
          modalmobx.show()
        }}>
          Добавить
        </Button>
        <Button viewtype="text" onClick={() => {
          modalmobx.setChildren(
            <>
              <h4>({context.title}) Изменение записи</h4>
              <p>Здесь можно изменить одно или несколько полей в выбранной записи</p>

              <table className={classnames(styles.inputs)}>
                <tbody>
                  {/* автогенерируемые формы на основе context */}
                  {
                    context.actions.edit.nessesaryFields.map((alias: string, index: number) => {
                      return <tr className={styles.someInput} key={index}>
                        <td>
                          <span>{context.headerAlias[alias] || alias}</span>

                        </td>
                        <td>
                          <Input />
                        </td>
                      </tr>
                    })
                  }

                </tbody>
              </table>

              <div className={classnames(styles.modalButtons)}>
                <Button viewtype="v2" onClick={() => {
                  context.actions.edit.writeCallback()
                    .then(refreshTable)
                    .catch((error) => notificator.push({ children: `Ошибка записи в таблицу: ${error}`, type: "error" }))

                  modalmobx.show(false)
                }}>Записать и закрыть</Button>
                <Button viewtype="v4" onClick={() => {
                  context.actions.edit.writeCallback()
                    .then(refreshTable)
                    .catch((error) => notificator.push({ children: `Ошибка записи в таблицу: ${error}`, type: "error" }))
                }}>Записать </Button>
                <Button viewtype="v3" onClick={() => {
                  modalmobx.show(false)
                }}>Закрыть</Button>
              </div>
            </>
          )
          modalmobx.show()
        }}>
          Изменить
        </Button>
        <Button viewtype="text">
          Фильтрация
        </Button>
        <Button viewtype="text">
          Отображение
        </Button>
        <Button viewtype="text">
          Сортировка
        </Button>
        <Button viewtype="text" onClick={() => { refreshTable(); notificator.push({ children: "Данные обновлены" }) }}>
          Обновить данные
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
