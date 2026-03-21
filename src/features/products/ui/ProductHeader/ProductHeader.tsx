// features/product-search/ui/ProductHeader.tsx
import React, { useState, useEffect, useCallback } from 'react';
import { useDebounce } from 'use-debounce';
import { Input } from '../../../../shared/ui/Input/Input';

interface ProductSearchProps {
  onSearch: (query: string) => void;
  initialValue?: string;
  title?: string;
}

export const ProductHeader: React.FC<ProductSearchProps> = ({
  onSearch,
  initialValue = '',
  title
}) => {
  const [searchTerm, setSearchTerm] = useState(initialValue);
  const [debouncedSearch] = useDebounce(searchTerm, 500);

  // Отдельный useEffect для вызова onSearch при изменении debouncedSearch
  useEffect(() => {
    console.log('🔍 ProductHeader calling onSearch with:', debouncedSearch);
    onSearch(debouncedSearch);
  }, [debouncedSearch, onSearch]);

  return (
    <div className="flex gap-64 items-center bg-[#fff] px-[30px] py-[26px] rounded-[10px] mb-7">
      {title && (
        <h2 className="text-2xl font-semibold text-gray-900">
          {title}
        </h2>
      )}

      <div className="relative flex-1">
        <Input
          type="text" // 👈 Важно: НЕ search, чтобы не было двойного debounce
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          placeholder="Найти"
          leftIcon="/src/assets/svg/Search.svg" // 👈 Добавьте иконку поиска
        />
      </div>
    </div>
  );
};
