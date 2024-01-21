import React from 'react';
import style from "./Table.module.scss";
import { classnames } from '../../helpers/main.helper';
import { InputSimple } from '../Input/Input';

export interface TableRow {
  [key: string]: string | number;
}

export interface TableProps {
  data: TableRow[];
}

const Table: React.FC<TableProps> = ({ data }) => {
  // Проверяем, есть ли данные
  if (!data || data.length === 0) {
    return <p>No data available</p>;
  }

  console.log("ТАБЛИЦА ОТРИСОВАНА")

  // Возвращаем JSX с использованием useMemo
  return (
    <table className={classnames(style.table)}>
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
  );
};

export default React.memo(Table);
