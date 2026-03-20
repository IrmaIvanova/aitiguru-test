// features/product-search/ui/ProductSearch.tsx
import React, { useState, useEffect, useCallback } from 'react';
import { useDebounce } from 'use-debounce';
import { Input } from '../../../../shared/ui/Input/Input';

interface ProductSearchProps {
  onSearch: (query: string) => void;
  initialValue?: string;
  title?: string
}

export const ProductHeader: React.FC<ProductSearchProps> = ({
  onSearch,
  initialValue = '',
  title
}) => {
  const [searchTerm, setSearchTerm] = useState(initialValue);
  const [debouncedSearch] = useDebounce(searchTerm, 500);

  // Используем useCallback чтобы стабилизировать функцию
  const handleSearch = useCallback(() => {
    onSearch(debouncedSearch);
  }, [debouncedSearch, onSearch]);

  // useEffect теперь зависит от стабильной функции handleSearch
  useEffect(() => {
    handleSearch();
  }, [handleSearch]); // 👈 Зависимость от handleSearch

  return (
    <div className="flex gap-64 items-center bg-[#fff] px-[30px] py-[26px] rounded-[10px] mb-7">

      {title &&
        <h2 className="text-2xl font-semibold text-gray-900">
          {title}
        </h2>}


      <div className="relative flex-1">
        <Input
          type="search"
          onSearch={handleSearch}
          placeholder="Найти"
          debounceMs={500}
        />
      </div>
    </div>

  );
};