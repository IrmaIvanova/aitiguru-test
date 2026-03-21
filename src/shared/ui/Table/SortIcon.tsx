// shared/ui/Table/SortIcon.tsx
import React from 'react';

interface SortIconProps {
  sortBy: string;
  columnKey: string;
  order: 'asc' | 'desc';
  className?: string;
}

export const SortIcon: React.FC<SortIconProps> = ({
  sortBy,
  columnKey,
  order,
  className = '',
}) => {
  const isActive = sortBy === columnKey;

  if (!isActive) {
    // Неактивная сортировка - показываем серую иконку при наведении
    return (
      <span className={`
        ml-1 inline-block opacity-0 group-hover:opacity-50 
        transition-opacity duration-200 text-[#B2B3B9]
        ${className}
      `}>
        ↑↓
      </span>
    );
  }

  // Активная сортировка - синяя стрелка
  return (
    <span className={`
      ml-1 inline-block text-blue-600 font-bold
      ${className}
    `}>
      {order === 'asc' ? '↑' : '↓'}
    </span>
  );
};