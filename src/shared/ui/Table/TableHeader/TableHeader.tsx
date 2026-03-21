import React from 'react';
import { SortIcon } from '../SortIcon';

export interface IColumn {
  key: string;
  label: string;
  sortable?: boolean;
  className?: string;
  render?: (value: any, row?: any) => React.ReactNode;
  renderHeader?: () => React.ReactNode;
}

interface ITableHeaderProps {
  columns: IColumn[];
  sortBy: string;
  order: 'asc' | 'desc';
  onSort: (key: string) => void;
}

export const TableHeader: React.FC<ITableHeaderProps> = ({
  columns,
  sortBy,
  order,
  onSort,
}) => {

  return (
    <thead>
      <tr className="border-b border-gray-100">
        {columns.map((column) => (
          <th
            key={column.key}
            className={`
              px-4 py-3 text-left text-sm font-medium text-[#B2B3B9]
              ${column.sortable ? 'cursor-pointer hover:bg-gray-50 group' : ''}
              transition-all duration-200
              ${column.className || ''}
            `}
            onClick={() => column.sortable && onSort(column.key)}
          >
            {column.renderHeader ? (
              column.renderHeader()
            ) : (
              <div className="flex items-center gap-1">
                <span className={sortBy === column.key ? 'text-gray-700 font-medium' : ''}>
                  {column.label}
                </span>
                {column.sortable && (
                  <SortIcon
                    sortBy={sortBy}
                    columnKey={column.key}
                    order={order}
                  />
                )}
              </div>
            )}
          </th>
        ))}
      </tr>
    </thead>
  );
};

// import React from 'react';

// export interface IColumn {
//   key: string;
//   label: string;
//   sortable?: boolean;
//   className?: string;
//   render?: (value: any, row?: any) => React.ReactNode;
//   renderHeader?: () => React.ReactNode; // 👈 Добавьте для кастомного рендера заголовка

// }

// interface ITableHeaderProps {
//   columns: IColumn[];
//   sortBy: string;
//   order: 'asc' | 'desc';
//   onSort: (key: string) => void;
// }

// export const TableHeader: React.FC<ITableHeaderProps> = ({
//   columns,
//   sortBy,
//   order,
//   onSort,
// }) => {
//   const renderSortIcon = (columnKey: string) => {
//     if (sortBy !== columnKey) return null;
//     return (
//       <span className="ml-1 inline-block">
//         {order === 'asc' ? '↑' : '↓'}
//       </span>
//     );
//   };

//   return (
//     <thead>
//       <tr className=" border-b border-gray-100">
//         {columns.map((column) => (
//           <th
//             key={column.key}
//             className={`
             
//               px-4 py-3 text-left text-sm font-medium text-[#B2B3B9]
//               ${column.sortable ? 'cursor-pointer hover:bg-gray-100' : ''}
//               transition-colors
//               ${column.className || ''}
//             `}
//             onClick={() => column.sortable && onSort(column.key)}
//           >

//             {column.renderHeader ? (
//               column.renderHeader()
//             ) : (
//               <div className="flex items-center gap-1">
//                 <span>{column.label}</span>
//                 {column.sortable && renderSortIcon(column.key)}
//               </div>
//             )}
//           </th>
//         ))}
//       </tr>
//     </thead>
//   );
// };