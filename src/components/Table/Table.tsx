import React from 'react';
import styles from "./Table.module.scss";
import { classnames } from '../../helpers/main.helper';
import { observer } from 'mobx-react-lite';
import { modalmobx } from '../../store/modal.store';
import { notificator } from '../../store/notify.store';
import Button from '../Button/Button';


export interface TableContext {
  name: string
  headerAlias: {}
}

export interface TableRow {
  [key: string]: string | number;
}

export interface TableProps {
  data: TableRow[];
  refreshTable: () => void
  context: TableContext
}

const Table: React.FC<TableProps> = observer(({ data, refreshTable, context }) => {
  console.log("ТАБЛИЦА ОТРИСОВАНА")

  const TABLE_RAW_HEADER = Object.keys(data[0]);

  // Возвращаем JSX с использованием useMemo
  return (
    <>

      <div style={{ backgroundColor: "#f1f1f1", marginTop: '25px', border: '1px solid #ddd' }}>
        <Button viewtype="text" style={{ backgroundColor: "#f1f1f1" }} onClick={() => {
          modalmobx.setChildren(
            <>
              <h4>({context.name}) Добавление значения</h4>
              <p>Это новый параграф</p>
              <div className={classnames(styles.modalButtons)}>
                <Button viewtype="v2" onClick={() => modalmobx.show(false)}>Записать и закрыть</Button>
                <Button viewtype="v4" onClick={() => null}>Записать </Button>
                <Button viewtype="v3" onClick={() => modalmobx.show(false)}>Закрыть</Button>
              </div>
            </>
          )
          modalmobx.setModalCloseable(true)
          modalmobx.show()
        }}>
          Добавить
        </Button>
        <Button viewtype="text" style={{ backgroundColor: "#f1f1f1" }} onClick={() => {
          modalmobx.setChildren(
            <>
              <h4>({context.name}) Изменение значения</h4>
              <p>Это другой параграф</p>

              <div className={classnames(styles.modalButtons)}>
                <Button viewtype="v2" onClick={() => modalmobx.show(false)}>Записать и закрыть</Button>
                <Button viewtype="v4" onClick={() => null}>Записать </Button>
                <Button viewtype="v3" onClick={() => modalmobx.show(false)}>Закрыть</Button>
              </div>
            </>
          )
          modalmobx.show()
        }}>
          Изменить
        </Button>
        <Button viewtype="text" style={{ backgroundColor: "#f1f1f1" }}>
          Фильтрация
        </Button>
        <Button viewtype="text" style={{ backgroundColor: "#f1f1f1" }}>
          Сортировка
        </Button>
        <Button viewtype="text" style={{ backgroundColor: "#f1f1f1" }} onClick={() => { refreshTable(); notificator.push({ children: "Данные обновлены" }) }}>
          Обновить данные
        </Button>
        <Button viewtype="text" style={{ backgroundColor: "#f1f1f1" }}>
          Справка
        </Button>
      </div>
      <table className={classnames(styles.table)}>
        <tbody>
          <tr>
            {
              Object.keys(data[0]).map((name, index) => <th key={index}>{name}</th>)
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
