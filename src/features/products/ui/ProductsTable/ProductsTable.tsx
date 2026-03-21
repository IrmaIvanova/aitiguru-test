import React, { useState } from 'react';
import { TableHeader, type IColumn } from '../../../../shared/ui/Table/TableHeader';
import type { IProduct } from '../../../products/api/productsApi';
// import { columns } from './constantHeader'
// import { TableRow } from '../../../../shared/ui/Table/TableRows/TablRows';
import { TableCell } from '../../../../shared/ui/Table/TableCell/TableCell';



interface ProductsTableProps {
  products: IProduct[];
  onSort: (field: string) => void;
  sortBy: string;
  order: 'asc' | 'desc';
}

export const ProductsTable: React.FC<ProductsTableProps> = ({
  products,
  onSort,
  sortBy,
  order,
}) => {
  // Определяем колонки с кастомным рендерингом
  const [selectedRows, setSelectedRows] = useState<Set<number>>(new Set());
  const [selectAll, setSelectAll] = useState(false);

  // Обработчик выбора всех
  const handleSelectAll = () => {
    if (selectAll) {
      setSelectedRows(new Set());
    } else {
      setSelectedRows(new Set(products.map(p => p.id)));
    }
    setSelectAll(!selectAll);
  };

  // Обработчик выбора строки

  const handleSelectRow = (id: number) => {
    const newSelected = new Set(selectedRows);
    if (newSelected.has(id)) {
      newSelected.delete(id);
    } else {
      newSelected.add(id);
    }
    setSelectedRows(newSelected);
    setSelectAll(newSelected.size === products.length);
  };


  const columns: IColumn[] = [
    // Чекбокс в заголовке
    {
      key: 'select',
      label: '',
      sortable: false,
      className: 'w-10',
      renderHeader: () => (

        <input
          type="checkbox"
          checked={selectAll}
          onChange={handleSelectAll}
          className="w-4 h-4 rounded border-gray-300 text-blue-600 focus:ring-blue-500"
        />


      ),
      render: (_, row) => (
        <input
          type="checkbox"
          checked={selectedRows.has(row.id)}
          onChange={() => handleSelectRow(row.id)}
          className="w-4 h-4 rounded border-gray-300 text-blue-600 focus:ring-blue-500"
        />
      ),
    },
    // Аватарка
    {
      key: 'thumbnail',
      label: '',
      sortable: false,
      className: 'w-12',
      render: (value, row) => (
        <div className="w-10 h-10 rounded-[8px] border-gray-200 bg-[#C4c4c4] overflow-hidden flex-shrink-0">
          {value ? (
            <img
              src={value}
              alt={row.title}
              className="w-full h-full object-cover"
            />
          ) : (
            <div className="w-full h-full flex items-center justify-center text-gray-400 text-sm">
              📦
            </div>
          )}
        </div>
      ),
    },
    // Наименование
    {
      key: 'title',
      label: 'Наименование',
      sortable: true,
      render: (value, row) => (
        <div>
          <div className="font-medium text-gray-900">{value}</div>
          <div className="text-sm text-[#B2B3B9]">{row.category}</div>
        </div>
      ),
    },
    // Вендор
    {
      key: 'brand',
      label: 'Вендор',
      sortable: true,
         render: (value, row) => (
        <div>
          <div className="font-medium text-gray-900">{value}</div>
        </div>
      ),
    
    },
    // Артикул
    {
      key: 'sku',
      label: 'Артикул',
      sortable: true,
    },
    // Оценка
    {
      key: 'rating',
      label: 'Оценка',
      sortable: true,
      render: (value) => (
        <>
          <span className={value < 3 ? 'text-red-600 font-medium' : 'text-gray-700'}>
            {value}
          </span>
          <span className={'text-gray-700'}>
            /5
          </span>
        </>
      ),
    },
    // Цена
    {
      key: 'price',
      label: 'Цена, ₽',
      sortable: true,
      className: 'font-medium',
      render: (value) => {
        const [integer, decimal] = value.toFixed(2).split('.');
        return (
          <span>
            {parseInt(integer).toLocaleString('ru-RU')}
            <span className="text-[#B2B3B9]">,{decimal}</span>
          </span>
        );
      },
    },
    // какая-то синяя кнопка
    {
      key: 'opt',
      label: '',
      sortable: true,
      className: 'font-medium',
      render: (value) => (
      <div className='flex gap-6'>
        <button
        onClick={() => { }}
        className="bg-blue-600 text-white px-2 rounded-full hover:bg-blue-700                             
                            transition-colors flex items-center gap-2"
      >
        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
        </svg>

      </button>

        <button
          onClick={() => { }}
          className=""
        >
          <svg
            className="w-5 h-5"
            fill="none"
            stroke="#B2B3B9"
            viewBox="0 0 24 24"
          >
            <circle cx="12" cy="12" r="10" stroke="#B2B3B9" strokeWidth={1.5} fill="none" />
            <circle cx="12" cy="12" r="1.5" fill="#B2B3B9" stroke="none" />
            <circle cx="8" cy="12" r="1.5" fill="#B2B3B9" stroke="none" />
            <circle cx="16" cy="12" r="1.5" fill="#B2B3B9" stroke="none" />
          </svg>
        </button>
      </div>),
    },
 
  ];

  return (
    <div className="overflow-x-auto">
      <table className="w-full">
        <TableHeader
          columns={columns}
          sortBy={sortBy}
          order={order}
          onSort={onSort}
        />
        <tbody>
          {products.map((product, index) => (
            <tr
              key={product.id}
              className={`border-b border-gray-100 `}
            >
              {columns.map((column) => (
                <TableCell
                  key={column.key}
                  value={product[column.key as keyof IProduct]}
                  column={column}
                  row={product}
                  className={column.key === 'price' ? 'font-medium' : ''}
                />
              ))}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};