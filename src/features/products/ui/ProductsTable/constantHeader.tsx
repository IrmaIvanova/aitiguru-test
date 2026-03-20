import type { IColumn } from "../../../../shared/ui/Table/TableHeader";

// export const columns: IColumn[] = [
//     {
//       key: 'title',
//       label: 'Наименование',
//       sortable: true,
//       render: (value, row) => (
//         <div>
//           <div className="font-medium text-gray-900">{value}</div>
//           <div className="text-sm text-[#B2B3B9]">{row.category}</div>
//         </div>
//       ),
//     },
//     {
//       key: 'brand',
//       label: 'Вендор',
//       sortable: true,
//     },
//     {
//       key: 'sku',
//       label: 'Артикул',
//       sortable: true,
//     },
//     {
//       key: 'rating',
//       label: 'Оценка',
//       sortable: true,
//       render: (value) => (
//         <span className={value < 3 ? 'text-red-600 font-medium' : 'text-gray-700'}>
//           {value}/5
//         </span>
//       ),
//     },
//     {
//       key: 'price',
//       label: 'Цена, ₽',
//       sortable: true,
//       className: 'font-medium',
//       render: (value) => `${value.toLocaleString('ru-RU')} ₽`,
//     },
//   ];
export const columns: IColumn[] = [
  // Чекбокс для выбора строк
  {
    key: 'select',
    label: '',
    sortable: false,
    className: 'w-10',
    render: (_, row) => (
      <input
        type="checkbox"
        checked={false} // Нужно будет связать с состоянием
        onChange={() => {}}
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
      <span className={value < 3 ? 'text-red-600 font-medium' : 'text-gray-700'}>
        {value}/5
      </span>
    ),
  },
  // Цена
  {
    key: 'price',
    label: 'Цена, ₽',
    sortable: true,
    className: 'font-medium',
    render: (value) => `${value.toLocaleString('ru-RU')} ₽`,
  },
];