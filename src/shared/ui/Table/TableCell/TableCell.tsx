import React from 'react';

interface ITableCellProps {
  value: any;
  column: {
    key: string;
    render?: (value: any, row?: any) => React.ReactNode;
  };
  row?: any;
  className?: string;
}

export const TableCell: React.FC<ITableCellProps> = ({
  value,
  column,
  row,
  className = '',
}) => {
  const content = column.render 
    ? column.render(value, row)
    : typeof value === 'number' 
      ? value.toLocaleString('ru-RU')
      : value;

  return (
    <td className={`px-4 py-3 text-left max-w-xs ${className}`}>
      {content}
    </td>
  );
};