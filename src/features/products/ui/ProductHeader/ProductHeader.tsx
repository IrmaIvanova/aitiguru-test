// features/product-search/ui/ProductHeader.tsx
import React, { memo, useCallback } from 'react';
import { Input } from '../../../../shared/ui/Input/Input';

interface ProductSearchProps {
  onSearch: (query: string) => void;
  title?: string;
}

export const ProductHeader = memo<ProductSearchProps>(({
  onSearch,
  title
}) => {
  // Стабилизируем функцию, чтобы она не менялась при каждом рендере
  const handleSearch = useCallback((value: string) => {
    console.log('🔍 Search:', value);
    onSearch(value);
  }, [onSearch]);

  return (
    <div className="flex gap-64 items-center bg-[#fff] px-[30px] py-[26px] rounded-[10px] mb-7">
      {title && (
        <h2 className="text-2xl font-semibold text-gray-900">
          {title}
        </h2>
      )}

      <div className="relative flex-1">
        <Input
          type="search"
          onSearch={handleSearch}
          placeholder="Найти"
          leftIcon="/src/assets/svg/Search.svg"
          debounceMs={500}
        />
      </div>
    </div>
  );
});

ProductHeader.displayName = 'ProductHeader';

// import React, { memo, useCallback } from 'react';
// import { Input } from '../../../../shared/ui/Input/Input';

// interface ProductSearchProps {
//   onSearch: (query: string) => void;
//   title?: string;
// }

// export const ProductHeader = memo<ProductSearchProps>(({
//   onSearch,
//   title
// }) => {
//   const handleSearch = useCallback((value: string) => {
//     console.log('🔍 Search:', value);
//     onSearch(value);
//   }, [onSearch]);

//   return (
//     <div className="flex gap-64 items-center bg-[#fff] px-[30px] py-[26px] rounded-[10px] mb-7">
//       {title && (
//         <h2 className="text-2xl font-semibold text-gray-900">
//           {title}
//         </h2>
//       )}

//       <div className="relative flex-1">
//         <Input
//           type="search"
//           onSearch={handleSearch}
//           placeholder="Найти"
//           leftIcon="/src/assets/svg/Search.svg"
//           debounceMs={500}
//         />
//       </div>
//     </div>
//   );
// });

// ProductHeader.displayName = 'ProductHeader';