import React from 'react';

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

  // Возвращаем JSX с использованием useMemo
  return (
    <table>
      <thead>
        <tr>
          {Object.keys(data[0]).map((header, index) => (
            <th key={index}>{header}</th>
          ))}
        </tr>
      </thead>
      <tbody>
        {data.map((row, rowIndex) => (
          <tr key={rowIndex}>
            {Object.keys(row).map((header, colIndex) => (
              <td key={colIndex}>{row[header]}</td>
            ))}
          </tr>
        ))}
      </tbody>
    </table>
  );
};

export default React.memo(Table);
