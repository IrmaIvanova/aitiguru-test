// shared/ui/Table/TableRow.tsx
import React from 'react';
import { TableCell } from '../TableCell/TableCell';
import type { IColumn } from '../TableHeader/index';

interface ITableRowProps {
  row: any;
  columns: IColumn[];
  rowIndex: number;
  getRowKey: (row: any) => string | number;
}

export const TableRow: React.FC<ITableRowProps> = ({
  row,
  columns,
  rowIndex,
  getRowKey,
}) => {
  return (
    <tr
      key={getRowKey(row)}
      className={`
        border-b 
        border-gray-100 
        hover:bg-gray-50 
        transition-colors
        ${rowIndex % 2 === 0 ? 'bg-white' : 'bg-gray-50/30'}
      `}
    >
      {columns.map((column) => (
        <TableCell
          key={column.key}
          value={row[column.key]}
          column={column}
          row={row}
          className={column.key === 'price' ? 'font-medium' : ''}
        />
      ))}
    </tr>
  );
};