import React, { ReactNode, useEffect, useState } from "react";
import styles from "./MyTable.module.scss";
import { Button, ButtonGroup, Form, InputGroup, Spinner, Table } from "react-bootstrap";
import { IEmployee } from "../../types/employerTypes";
import { isEmpty, isObject, toNumber, zipObject } from "lodash";
import { observer } from "mobx-react-lite";
import { classnames, objFromMobx } from "../../helpers/main.helper";
import { notificator } from "../../store/notify.store";
import Loader from "../Loader/Loader";
import { modalmobx } from "../../store/modal.store";
import Create from "./Modals/Create";
import AutoGenForm, { ITableFormAction } from "../AutoGenForm/AutoGenForm";


export interface IConstTableAlias {
  [key: string]: {
    title: string,
    formTag?: ITableFormAction[],
    dataType?: "number" | "string",
    inputType?: React.HTMLInputTypeAttribute | "selector",
    props?: {[key: string]: () => any},
    notInForm?: boolean
  }
}

/**
   * Ссылка на хранилище MobX
   * 
   * В хранилище обязательно должны быть следующие поля:
   * - `constData` - данные, полученные с сервера и готовые к обработке таблицей
   * - `constTableAlias` - объект, содержащий ру-подписи для шапки таблицы
   * - `constTableAlias.tableTitle` - Строка. Название таблицы
   * 
   * Методы (все методы должны возвращать код состояния):
   * - `getAll` - метод на получение и обновление данных. Аргументом передается пагинация
   * - `create`, `remove`, `edit` - методы на создание, удаление и изменение данных. Аргументом передается объект.
   */
export interface IMyTableMOBX {
  constData: { [key: string]: any }
  // constTableAlias: { [key: string]: any }
  constTableAlias: IConstTableAlias
  constTableTitle: string

  getAll: (queryParameters: { [key: string]: any }) => Promise<{ [key: string]: any }>
  create: (data: Record<any, any>) => Promise<number>
  remove: (data: { id: string | number }) => Promise<number>
  edit: (data: Record<any, any>) => Promise<number>
}



interface IMyTableProps {
  mobx: IMyTableMOBX

  paginator: {
    [key: string]: number
  }
}

interface IMyTableButtonGroup extends IMyTableProps {
  paginatorNew: {
    page: { value: number, setter: React.Dispatch<React.SetStateAction<number>> }
    size: { value: number, setter: React.Dispatch<React.SetStateAction<number>> }
  }
}

interface IPaginator extends IMyTableProps {
  paginatorNew: {
    page: { value: number, setter: React.Dispatch<React.SetStateAction<number>> }
    size: { value: number, setter: React.Dispatch<React.SetStateAction<number>> }
  }
}


const MyTableButtonGroup: React.FC<IMyTableButtonGroup> = ((props) => {
  return (<>
    <ButtonGroup aria-label="Операции над таблицей">
      <Button
        variant="light"
        size="sm"
        onClick={() => {
          modalmobx.setChildren(<AutoGenForm mobx={props.mobx} action="create" />)
          modalmobx.show()
        }}
      >Создать</Button>
      <Button
        variant="light"
        size="sm"
        onClick={() => {
          modalmobx.setChildren(<AutoGenForm mobx={props.mobx} action="edit" />)
          modalmobx.show()
        }}
      >Изменить</Button>
      <Button
        variant="light"
        size="sm"
        onClick={() => {
          modalmobx.setChildren(<AutoGenForm mobx={props.mobx} action="remove" />)
          modalmobx.show()
        }}
      >Удалить</Button>
      <Button
        variant="light"
        size="sm"
        onClick={() => {
          modalmobx.setChildren(<AutoGenForm mobx={props.mobx} action="filter" />)
          modalmobx.show()
        }}
      >Фильтр</Button>
      <Button
        variant="light"
        size="sm"
        onClick={() => {
          modalmobx.setChildren(<AutoGenForm mobx={props.mobx} action="properties" />)
          modalmobx.show()
        }}
      >Свойства</Button>
      <Button
        variant="light"
        size="sm"
        onClick={() => { props.mobx.getAll({ ...props.paginator }); props.paginatorNew.page.setter(Object.values(props.paginator)[0]); props.paginatorNew.size.setter(Object.values(props.paginator)[1]); notificator.push({ children: "Данные обновлены" }) }}>Обновить</Button>
      <Button
        variant="light"
        size="sm"
        onClick={() => {
          modalmobx.setChildren(<AutoGenForm mobx={props.mobx} action="help" />)
          modalmobx.show()
        }}
      >Справка</Button>
    </ButtonGroup>
  </>)
})


const MyTableItem: React.FC<{ value: any, [key: string]: any }> = (props) => {
  return <td key={props.jndex}>{
    isObject(props.value) ? Object.values(props.value).join(", ") : props.value
  }</td>;
}


const Paginator: React.FC<IPaginator> = (props) => {
  const fetchData = (pageValue?: number | string, sizeValue?: number | string) => {

    const page = pageValue !== undefined ? pageValue : props.paginatorNew.page.value;
    const size = sizeValue !== undefined ? sizeValue : props.paginatorNew.size.value;

    props.mobx.getAll(zipObject(Object.keys(props.paginator), [toNumber(page), toNumber(size)]))
  }


  const makeNextPage = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (toNumber(e.target.value) >= 0) {
      // if (!(toNumber(e.target.value) >= props.paginatorNew.page.value && isEmpty(props.mobx.constData)) && toNumber(e.target.value) >= 0)
      // notificator.push({children: "Это последняя страница"})
      props.paginatorNew.page.setter(toNumber(e.target.value))
    }
  }

  const makePageSize = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (toNumber(e.target.value) >= 0 && toNumber(e.target.value) <= 999) {
      props.paginatorNew.size.setter(toNumber(e.target.value))
    }
  }

  return (
    <div className={classnames(styles.paginator)}>
      <div className={classnames(styles.side, 'my-auto')}>
        <InputGroup size="sm">
          <InputGroup.Text id="basic-addon1">Страница:</InputGroup.Text>
          <Form.Control
            type="number"
            placeholder="Страница"
            aria-label="Страница"
            id="basic-addon1"
            aria-describedby="basic-addon1"
            value={props.paginatorNew.page.value}
            onChange={(e) => {
              makeNextPage(e as any);
              fetchData(e.target.value);
            }}
          />
          <InputGroup.Text id="basic-addon2">Размер страницы:</InputGroup.Text>
          <Form.Control
            type="number"
            placeholder="Размер страницы"
            aria-label="Размер страницы"
            id="basic-addon2"
            aria-describedby="basic-addon2"
            value={props.paginatorNew.size.value}
            onChange={(e) => {
              makePageSize(e as any)
              fetchData(undefined, e.target.value);
            }}
          />
          <InputGroup.Text id="basic-addon3">Таблица:</InputGroup.Text>
          <Form.Control
            type="text"
            placeholder="Таблица"
            aria-label="Таблица"
            id="basic-addon3"
            aria-describedby="basic-addon3"
            defaultValue={`${props.mobx.constTableTitle}`}
            disabled
            aria-disabled
          />

        </InputGroup>
      </div>

      <div className={classnames(styles.side, 'my-auto')}>
        <ButtonGroup aria-label="Операции над таблицей">
          <Button
            variant="light"
            size="sm"
            onClick={() => {
              if (props.paginatorNew.page.value - 1 >= 0) {
                props.paginatorNew.page.setter(props.paginatorNew.page.value - 1);
                fetchData(props.paginatorNew.page.value - 1)
              }
            }}
            disabled={props.paginatorNew.page.value === 0}
          >← Назад</Button>

          <Button
            variant="light"
            size="sm"
            onClick={() => {
              props.paginatorNew.page.setter(props.paginatorNew.page.value + 1);
              fetchData(props.paginatorNew.page.value + 1)
            }}
            disabled={isEmpty(props.mobx.constData)}
          >Вперед →</Button>
        </ButtonGroup>
      </div>
    </div>
  )
};


/**
 * Первый аргумент в пагинаторе - Страница
 * Ворой аргумент в пагинаторе - Размер страницы
 */
const MyTable: React.FC<IMyTableProps> = (props) => {
  const [page, setPage] = useState(Object.values(props.paginator)[0])
  const [size, setSize] = useState(Object.values(props.paginator)[1])

  useEffect(() => {
    props.mobx.getAll(props.paginator)
  }, [])



  return (
    <>
      <MyTableButtonGroup mobx={props.mobx} paginator={props.paginator} paginatorNew={{
        page: { value: page, setter: setPage },
        size: { value: size, setter: setSize }
      }} />
      <div className={styles.tableContainer}>
        {
          isEmpty(props.mobx.constData)
            ? <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '50vh', color: 'grey', userSelect: 'none' }}>
              <h3 className={classnames("mx-auto", "my-auto")}>На этой странице данных нет!</h3>
            </div>
            : <Table striped bordered hover size="sm" className={classnames(styles.table)}>
              <thead>
                <tr>
                  {
                    Object.keys(props.mobx.constData[0]).map((value: string, index: number) => {
                      return <th key={index} className={styles.tableHeader}>{props.mobx.constTableAlias[value].title}</th>
                    })
                  }
                </tr>
              </thead>
              <tbody>
                {
                  props.mobx.constData.map((empl: IEmployee, index: number) => {
                    return <tr key={index}>
                      {
                        Object.keys(empl).map((keyName: string, jndex: number) => {
                          return <MyTableItem value={empl[keyName]} key={jndex} />;
                        })
                      }
                    </tr>
                  })
                }
              </tbody>
            </Table>
        }
      </div>
      <Paginator mobx={props.mobx} paginator={props.paginator} paginatorNew={{
        page: { value: page, setter: setPage },
        size: { value: size, setter: setSize }
      }} />
    </>
  )
};

export default observer(MyTable);
